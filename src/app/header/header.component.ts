import { Component, NgZone } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 constructor(private ngZone: NgZone) {}

  searchQuery: string = '';
  isMenuOpen: boolean = false;
  isDropdownOpen = false;

  toggleDropdown() {
    this.ngZone.run(() => {
      this.isDropdownOpen = !this.isDropdownOpen;
    });
      this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Search query:', this.searchQuery);
      alert(`Searching for: ${this.searchQuery}`);
      this.searchQuery = '';
    }
  }

  toggleMenu() {
    this.ngZone.run(() => {
      this.isMenuOpen = !this.isMenuOpen;
    });
  }
}