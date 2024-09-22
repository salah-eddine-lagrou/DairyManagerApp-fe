import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.page.html',
  styleUrls: ['./new-client.page.scss'],
})
export class NewClientPage implements OnInit {
  location: any;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    console.log("running from new client page");
  }

  async getLocation() {
    const hasPermission = await this.locationService.checkPermissions();
    if (!hasPermission) {
      Swal.fire({
        icon: 'error',
        title: 'Location permission denied',
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
      return;
    }

    try {
      const position = await this.locationService.getCurrentLocation();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      // const lat = 34.246353377203135;
      // const lng = -6.548987075082444;

      console.log('Latitude:', lat, 'Longitude:', lng);

      this.locationService.reverseGeocode(lat, lng).subscribe(
        (response: any) => {
          if (response && response.results && response.results.length > 3) {
            // ! TODO got problem in filter data from result from gomaps lets disscuss it later okay
            const addressComponents = response.results[3].address_components;
            const formattedAddress = response.results[0].formatted_address;

            // Extract specific details
            const country = this.getAddressComponent(addressComponents, 'country');
            const city = this.getAddressComponent(addressComponents, 'locality') || this.getAddressComponent(addressComponents, 'administrative_area_level_1');
            const neighborhood = this.getAddressComponent(addressComponents, 'sublocality') || this.getAddressComponent(addressComponents, 'neighborhood');
            const route = this.getAddressComponent(addressComponents, 'route');

            // Get the first part of the formatted address
            const addressParts = formattedAddress.split(',');
            const primaryAddress = formattedAddress || 'N/A';

            // Use the neighborhood from the formatted address if it's "N/A"
            const finalNeighborhood = neighborhood !== 'N/A' ? neighborhood : addressParts[0] || 'N/A'; // Use first part if neighborhood is "N/A"

            // Construct a formatted address with the desired components
            const completeAddress = `
              Address: ${primaryAddress}
              Country: ${country || 'N/A'}
              City: ${city || 'N/A'}
              Neighborhood: ${finalNeighborhood}
              Route: ${route || 'N/A'}
            `;

            console.log('Formatted Address:', completeAddress);

            this.location = completeAddress; // Store the complete address

            Swal.fire({
              icon: 'success',
              title: 'Location detected successfully',
              toast: true,
              position: 'bottom',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            });
          } else {
            console.error('Fewer than 4 results found in reverse geocode response');

            Swal.fire({
              icon: 'error',
              title: 'Fewer than 4 results found in reverse geocode response',
              toast: true,
              position: 'bottom',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error during reverse geocoding',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });
          console.error('Error during reverse geocoding', error);
        }
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error getting location',
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
      console.error('Error getting location', error);
    }
  }

  // Helper method to extract specific address components
  getAddressComponent(components: any[], type: string): string | null {
    const component = components.find(c => c.types.includes(type));
    return component ? component.long_name : null;
  }



}
