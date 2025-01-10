import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner'
import { LoaderComponent } from "./components/loader/loader.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, NgxSpinnerModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
