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

  getLocation() {
    this.locationService.getCurrentLocation().then((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log('Latitude:', lat, 'Longitude:', lng);  // Log coordinates

      this.locationService.reverseGeocode(lat, lng).subscribe((response: any) => {
        if (response && response.display_name) {
          this.location = response;

          console.log(this.location.display_name); // Corrected for Nominatim API
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Location detected successfully"
          });
        } else {
          console.error('No results found in reverse geocode response');
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "No results found in reverse geocode response"
          });
        }
      }, (error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "Error during reverse geocoding"
        });
        console.error('Error during reverse geocoding', error);
      });

    }).catch((error) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Error getting location"
      });
      console.error('Error getting location', error);
    });
  }





}
