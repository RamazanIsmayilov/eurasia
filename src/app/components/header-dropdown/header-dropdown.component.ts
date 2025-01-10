import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header-dropdown',
  imports: [],
  templateUrl: './header-dropdown.component.html',
  styleUrl: './header-dropdown.component.scss'
})
export class HeaderDropdownComponent {
constructor(
    private authService: AuthService,
  ) {}

  logOut() {
    this.authService.logOut()
  }
}
