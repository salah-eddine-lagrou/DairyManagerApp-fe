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

      console.log('Latitude:', lat, 'Longitude:', lng);

      this.locationService.reverseGeocode(lat, lng).subscribe((response: any) => {
        if (response && response.display_name) {
          this.location = response;

          console.log(this.location.display_name);

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
          console.error('No results found in reverse geocode response');

          Swal.fire({
            icon: 'error',
            title: 'No results found in reverse geocode response',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });
        }
      }, (error) => {
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
      });

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

}
