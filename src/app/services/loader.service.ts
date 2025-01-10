import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private activeRequests = 0
  constructor(private spinner: NgxSpinnerService) { }

  async showLoader() {  
    if (this.activeRequests === 0) {
      await this.spinner.show()
    }

    this.activeRequests++
  }

  hideLoader() {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }

    if (this.activeRequests === 0) {
      this.spinner.hide();
    }
  }
}
