import { LogistiqueService } from './../../services/logistique.service';
import { ClientCategoryService } from './../../services/client-category.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import Swal from 'sweetalert2';
import { IonContent, ModalController, NavController } from '@ionic/angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { ClientCategory } from 'src/app/models/client-category';
import { ClientSubcategory } from 'src/app/models/client-subcategory';
import { Agency } from 'src/app/models/agency';
import { Warehouse } from 'src/app/models/warehouse';
import { Sector } from 'src/app/models/sector';
import { User } from 'src/app/models/user';
import { Zone } from 'src/app/models/zone';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.page.html',
  styleUrls: ['./new-client.page.scss'],
})
export class NewClientPage implements OnInit {
  @ViewChild('itemElement') itemElement!: ElementRef;
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  location: any;
  lat?: number;
  lng?: number;

  user: User = new User();
  newClient: Client = new Client();

  locatedOn: boolean = false;
  loading: boolean = false;

  client: boolean = true;
  credit: boolean = false;
  logistique: boolean = false;
  recap: boolean = false;
  clientInfosFilled: boolean = false;
  animate: boolean = false;
  clientReadyDone: boolean = false;
  clientCategories: ClientCategory[] = [];
  clientSubCategories: ClientSubcategory[] = [];

  constructor(
    private locationService: LocationService,
    private clientService: ClientService,
    private modalCtrl: ModalController,
    private renderer: Renderer2,
    private router: Router,
    private clientCategoryService: ClientCategoryService,
    private navCntrl: NavController,
    private logistiqueService: LogistiqueService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    console.log('running from new client page');
    this.user = await this.userService.getUserStorage();
    await this.loadLogistiques();

    const clientCategories = await this.clientCategoryService.getCategoriesFS();
    if (clientCategories.length > 0) {
      this.clientCategories = clientCategories;
    } else {
      this.getCategories();
      await this.clientCategoryService.setCategoriesFS(clientCategories);
    }
    const clientSubCategories = await this.clientCategoryService.getSubCategoriesFS();
    if (clientSubCategories.length > 0) {
      this.clientSubCategories = clientSubCategories;
    } else {
      this.getSubCategories();
      await this.clientCategoryService.setSubCategoriesFS(clientSubCategories);
    }
  }

  async ionViewWillEnter() {
    this.user = await this.userService.getUserStorage();
  }

  getSubCategories() {
    this.clientCategoryService.getSubCategories().subscribe(
      async (result: any) => {
        if (result.success) {
          this.clientSubCategories = await result.data;
        } else {
          console.warn("No subcategories found.");
        }
      },
      (error) => {
        console.error("Error retrieving subcategories:", error);
      }
    );
  }

  getCategories() {
    this.clientCategoryService.getCategories().subscribe(
      async (result: any) => {
        if (result.success) {
          this.clientCategories = await result.data;
        } else {
          console.warn("No categories found.");
        }
      },
      (error) => {
        console.error("Error retrieving categories:", error);
      }
    );
  }

  choosenCat: ClientCategory = new ClientCategory();
  onSubcategoryChange(subcategoryId: number) {
    const subcategory = this.clientSubCategories.find(sub => sub.id === subcategoryId);
    if (subcategory) {
      const category = this.clientCategories.find(cat => cat.id === subcategory.client_category_id);
      if (category) {
        this.choosenCat = category; // Set the associated category
      }
    }
  }

  agency: Agency = new Agency();
  warehouse: Warehouse = new Warehouse();
  zones: Zone[] = [];
  sectors: Sector[] = [];
  async loadLogistiques() {
    const agency = await this.logistiqueService.getDataFS<Agency>('agency');
    const warehouse = await this.logistiqueService.getDataFS<Warehouse>('warehouse');
    const zones = await this.logistiqueService.getDataFS<Zone[]>('zones');
    const sectors = await this.logistiqueService.getDataFS<Sector[]>('sectors');

    if (agency) {
      this.agency = agency
    } else if (this.user.id) {
      this.logistiqueService.getAgency(this.user.id).subscribe(
        async (result: any) => {
          this.agency = await result.data;
          await this.logistiqueService.setDataFS('agency', agency);
        },
        (error) => { console.error("error retrieving the agencies", error); }
      );
    }

    if (warehouse) {
      this.warehouse = warehouse;
    } else if (this.user.id) {
      this.logistiqueService.getWarehouse(this.user.id).subscribe(
        async (result: any) => {
          this.warehouse = await result.data;
          await this.logistiqueService.setDataFS('warehouse', warehouse);
        },
        (error) => { console.error("Error retrieving the warehouse", error); }
      );
    }

    if (zones && zones.length > 0) {
      this.zones = zones;
    } else if (this.user.id) {
      this.logistiqueService.getZones(this.user.id).subscribe(
        async (result: any) => {
          this.zones = await result.data;
          await this.logistiqueService.setDataFS('zones', zones);
        },
        (error) => { console.error("Error retrieving the zones", error); }
      );
    }

    if (sectors && sectors.length > 0) {
      this.sectors = sectors;
    } else if (this.user.id) {
      this.logistiqueService.getSectors(this.user.id).subscribe(
        async (result: any) => {
          this.sectors = await result.data;
          await this.logistiqueService.setDataFS('sectors', sectors);
        },
        (error) => { console.error("Error retrieving the sectors", error); }
      );
    }
  }

  getClientSubCategory(id: any): ClientSubcategory | undefined {
    return this.clientSubCategories.find(sub => sub.id === id);
  }

  getClientZone(id: any): Zone | undefined {
    return this.zones.find(zone => zone.id === id);
  }

  getClientSector(id: any): Sector | undefined {
    return this.sectors.find(sector => sector.id === id);
  }

  convertPhoneToString(event: any) {
    // Convert the phone number to a string if it's not empty
    if (event) {
      this.newClient.phone = String(event);
    } else {
      this.newClient.phone = ''; // If the input is cleared, set it to an empty string
    }
  }

  createNewClient() {
    this.clientService.createClient(this.newClient).subscribe(
      (response: any) => {
        // Handle success
        Swal.fire({
          icon: 'success',
          title: 'Client ' + this.newClient.name + ' a été créé avec succès',
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 2500,
        });
        const client: Client = response.client;
        console.log("client created : ", client);
        this.clientService.addClientToFS(client);

        // Navigate to clients page after successful creation
        this.navCntrl.setDirection('back');
        this.router.navigate(['/vendeur-pages/clients']);

        // TODO: Highlight the new client with a badge of en-attente status
      },
      (error) => {
        // Handle error
        console.error('Error creating client:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la création du client',
          text: error.message || 'Une erreur est survenue.',
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 2500,
        });
      }
    );
  }

  isFieldFilled(field: keyof Client): boolean {
    const value: any = this.newClient[field];

    if (value === undefined || value === null) {
      return false;
    }

    if (typeof value === 'string') {
      return value.trim() !== '';
    }

    return value !== null && value !== '';
  }

  nextSection() {
    if (this.client) {
      if ((!this.newClient.name || this.newClient.name.trim() === '')
        || (!this.newClient.phone)
        || (!this.newClient.contact_name || this.newClient.contact_name.trim() === '')
        || (!this.newClient.client_subcategory_id)
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Veuillez remplir les champs importants de client !',
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 2500,
        });
        return;

      } else if ((!this.newClient.address || this.newClient.address.trim() === '')
        || (!this.newClient.city || this.newClient.city.trim() === '')
      ) {
        this.located = false;

        setTimeout(() => {
          this.renderer.addClass(this.itemElement.nativeElement, 'highlight-animation');
          setTimeout(() => {
            this.renderer.removeClass(this.itemElement.nativeElement, 'highlight-animation');
          }, 1000);
        }, 100);
        return;

      } else if (this.newClient.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newClient.email)) {
        Swal.fire({
          icon: 'error',
          title: "Entrez un format correct de l'email !",
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 2500,
        });
        return;

      } else {
        this.client = false;
        this.credit = true;
        this.animateLineAndCircle('line-till-2', 'step-2');

        // * initialize the balances
        if ((!this.newClient.credit_limit) || (!this.newClient.credit_note_balance) || (!this.newClient.global_limit)) {
          this.newClient.credit_limit = 0;
          this.newClient.credit_note_balance = 0;
          this.newClient.global_limit = 0;
        }

      }

    } else if (this.credit) {
      this.newClient.agency_id = this.agency.id;
      this.newClient.warehouse_id = this.warehouse.id;
      this.credit = false;
      this.logistique = true;
      this.animateLineAndCircle('line-till-3', 'step-3');
      //  * there is no validation for this (accept client and adapt platfond from admin)

    } else if (this.logistique) {
      // TODO client will be affected to the vendeur logistique informations
      if ((!this.newClient.agency_id)
        || (!this.newClient.warehouse_id)
        || (!this.newClient.zone_id)
        || (!this.newClient.sector_id)
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Veuillez remplir les champs importants de logistique !',
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 2500,
        });
        return;

      } else {
        this.logistique = false;
        this.recap = true;
        this.animateLineAndCircle('line-till-4', 'step-4', true);

        if (!this.clientReadyDone) {
          Swal.fire({
            icon: 'info',
            title: 'Client ' + this.newClient.name + ' est prêt !',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
          });

          // TODO add newClient to clients in local storage with status non-sync and en-attente
        }

      }

    }

    console.log("NEXT : ");
    console.log("client is : ", this.client);
    console.log("credit is : ", this.credit);
    console.log("logistique is : ", this.logistique);
    console.log("recap is : ", this.recap);

  }

  // Navigate back to the previous section
  backSection() {
    if (this.recap) {
      this.recap = false;
      this.logistique = true;
      this.removeClasses('line-till-4', 'step-4');
    } else if (this.logistique) {
      this.logistique = false;
      this.credit = true;
      this.removeClasses('line-till-3', 'step-3');
    } else if (this.credit) {
      this.credit = false;
      this.client = true;
      this.removeClasses('line-till-2', 'step-2');
    }

    console.log("BACK : ");
    console.log("client is : ", this.client);
    console.log("credit is : ", this.credit);
    console.log("logistique is : ", this.logistique);
    console.log("recap is : ", this.recap);
  }

  // Animate the line and circle for transitions
  animateLineAndCircle(lineId: string, circleId: string, isRecap: boolean = false) {
    const line = document.getElementById(lineId);
    const circle = document.getElementById(circleId);
    if (line && circle) {
      setTimeout(() => {
        this.renderer.addClass(line, 'active-line');
        this.renderer.addClass(circle, 'active-step');
        if (isRecap) {
          this.renderer.addClass(circle, 'active-step-recap');
        }
      }, 100);
    }
  }

  // Remove classes during transitions
  removeClasses(lineId: string, circleId: string) {
    const line = document.getElementById(lineId);
    const circle = document.getElementById(circleId);
    if (line && circle) {
      this.renderer.removeClass(line, 'active-line');
      this.renderer.removeClass(circle, 'active-step');
      if (circleId === "step-4") {
        this.renderer.removeClass(circle, 'active-step-recap');
      }
    }
  }

  truncate(value: string): string {
    if (value) {
      const firstWord = value.split(' ')[0]; // Get the first word
      if (firstWord.length > 18) {
        return firstWord.substring(0, 18) + '...'; // Truncate only the first word
      }
    }
    return value; // Return as it is if the first word is not too long
  }

  located: boolean = false;
  async getLocation() {
    if (this.located) {
      Swal.fire({
        icon: 'error',
        title: 'Error displaying map',
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    this.locatedOn = true;
    this.loading = true; // Start loading
    const hasPermission = await this.locationService.checkPermissions();

    if (!hasPermission) {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Location permission denied',
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const position = await this.locationService.getCurrentLocation();
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    this.lat = lat;
    this.lng = lng;

    // Check network status
    const networkStatus = await Network.getStatus();
    if (!networkStatus.connected) {
      // No internet: Only store lat/lng
      this.newClient.location_gps_coordinates = `${lat}, ${lng}`;
      Swal.fire({
        icon: 'info',
        title: 'GPS coordinates saved (No Internet)',
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 2000,
      });
      this.located = true;
      this.loading = false;
      return;
    }

    // Reverse geocode if the internet is available
    try {
      this.locationService.reverseGeocode(lat, lng).subscribe(
        (response: any) => {
          this.loading = false;
          if (response && response.results && response.results.length > 3) {
            const addressComponents = response.results[3].address_components;
            const formattedAddress = response.results[0].formatted_address;

            // Use the getAddressComponent method to extract specific parts
            const country = this.getAddressComponent(addressComponents, 'country');
            const city = this.getAddressComponent(addressComponents, 'locality') ||
              this.getAddressComponent(addressComponents, 'administrative_area_level_1');
            const neighborhood = this.getAddressComponent(addressComponents, 'sublocality') ||
              this.getAddressComponent(addressComponents, 'neighborhood');
            const route = this.getAddressComponent(addressComponents, 'route');

            // Prepare the complete address from the components
            const addressPartsJoin: string[] = [];
            if (neighborhood) addressPartsJoin.push(neighborhood);
            if (route) addressPartsJoin.push(route);
            if (city) {
              addressPartsJoin.push(city);
              this.newClient.city = city; // Fill client city field
            }
            if (country) addressPartsJoin.push(country);

            this.newClient.address = addressPartsJoin.join(", "); // Set the complete address
            this.newClient.location_gps_coordinates = `${lat}, ${lng}`; // Set the GPS coordinates
            this.newClient.location = formattedAddress; // Store the formatted address

            Swal.fire({
              icon: 'success',
              title: 'Location detected successfully',
              toast: true,
              position: 'bottom',
              showConfirmButton: false,
              timer: 1200,
            });
            this.located = true;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Fewer than 4 results found in reverse geocode response',
              toast: true,
              position: 'bottom',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        },
        (error) => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error during reverse geocoding',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    } catch (error) {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Error getting location',
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  // Helper method to extract specific address components
  getAddressComponent(components: any[], type: string): string | null {
    const component = components.find(c => c.types.includes(type));
    return component ? component.long_name : null;
  }


  isModalOpen = false;
  async openMapModal() {
    this.isModalOpen = true;
    const modal = await this.modalCtrl.create({
      component: NewClientPage,
      cssClass: 'map-modal-class',
      componentProps: {
        lat: this.lat,
        lng: this.lng
      }
    });
    return await modal.present();
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
