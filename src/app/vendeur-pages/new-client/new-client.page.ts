import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import Swal from 'sweetalert2';
import { IonContent, ModalController } from '@ionic/angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';

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

  constructor(
    private locationService: LocationService,
    private clientService: ClientService,
    private modalCtrl: ModalController,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('running from new client page');
  }

  createNewClient() {
    // TODO create the client linked with the service
    console.log(this.newClient);
    // this.clientService.store(this.newClient).subscribe(

    // );
    Swal.fire({
      icon: 'success',
      title: 'Client ' + this.newClient.name + ' a été créé avec succès',
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2500,
    });
    // navigate to clients pages
    this.router.navigate(['/vendeur-pages/clients']);
    // TODO later try highlgh the new client with badge of en-attente status
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
      if (!this.newClient.price_list_id) {
        Swal.fire({
          icon: 'error',
          title: 'Veuillez remplir les champs importants de crédit !',
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 2500,
        });
        return;

      } else {
        this.credit = false;
        this.logistique = true;
        this.animateLineAndCircle('line-till-3', 'step-3');

        // TODO asign the logistique information of vendeur to the client
        if ((!this.newClient.agency_id)
          || (!this.newClient.warehouse_id)
          || (!this.newClient.zone_id)
          || (!this.newClient.sector_id)
        ) {
          this.newClient.agency_id = 1;
          this.newClient.warehouse_id = 1;
          this.newClient.zone_id = 1;
          this.newClient.sector_id = 1;
        }

      }

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
