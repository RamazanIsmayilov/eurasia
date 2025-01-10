import { Component } from '@angular/core';
import { HeaderDropdownComponent } from '../header-dropdown/header-dropdown.component';

@Component({
  selector: 'app-modules-header',
  imports: [HeaderDropdownComponent],
  templateUrl: './modules-header.component.html',
  styleUrl: './modules-header.component.scss'
})
export class ModulesHeaderComponent {

}
