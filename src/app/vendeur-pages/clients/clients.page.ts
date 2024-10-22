import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { User } from 'src/app/models/user';
import { ClientService } from 'src/app/services/client.service';
import { Storage } from '@capacitor/storage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  clients: Client[] = [];
  user: User = new User();
  filteredClients: Client[] = [];
  searchTerm: string = '';
  searchMessage: string = "Essayez d'ajuster votre recherche."
  isLoadingClients: boolean = true;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    console.log("running from clients page");

    this.user = await this.userService.getUserStorage();
    const clients = await this.clientService.getClientsFS();
    if (clients.length > 0) {
      this.clients = clients;
      this.filteredClients = clients;
      this.isLoadingClients = false;
    } else {
      this.loadClients();
    }
  }

  async ionViewWillEnter() {
    this.user = await this.userService.getUserStorage();
  }

  loadClients() {
    if (this.user.id) {
      const vendeur_id = this.user.id;
      this.clientService.getClientsByVendeur(vendeur_id).subscribe(
        async (response: any) => {
          this.clients = await response.data;
          this.filteredClients = await response.data;
          this.clientService.setClientsFS(this.clients);
          if (this.clients.length == 0) {
            this.searchMessage = "Il n'y a pas encore de clients enregistrés.";
          }
          this.isLoadingClients = false;
        },
        (error) => {
          console.error('Error fetching clients:', error);
          this.clients = []; // If there's an error, show an empty state
          this.searchMessage = "Un error occurred lors de chargement de vos clients.";
          this.isLoadingClients = false;
        }
      );
    }
  }

  truncate(value: string, truncate_value: number): string {
    if (value.length > truncate_value) {
      return value.substring(0, (truncate_value - 3)) + '...';
    }
    return value;
  }

  goToClientActions(): void {
    this.router.navigate(['vendeur-pages/client-actions']);
  }

  navigateToNewClient(): void {
    this.router.navigate(['vendeur-pages/new-client']);
  }

  filterClients() {
    const term = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.name?.toLowerCase().includes(term) ||
      client.email?.toLowerCase().includes(term) ||
      client.city?.toLowerCase().includes(term) ||
      client.address?.toLowerCase().includes(term) ||
      client.contact_name?.toLowerCase().includes(term) ||
      client.phone?.toLowerCase().includes(term) ||
      client.code?.toLowerCase().includes(term) ||
      client.credit_limit?.toString().includes(term)
    );
  }

  trackById(index: number, client: Client) {
    return client.id;
  }

}
