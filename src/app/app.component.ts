import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ApiService],
})
export class AppComponent {
  showScrollButton = false;
  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
@HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 100;
  }
  ngOnInit(): void {
    if (this.router) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        const child = this.getChild(this.activatedRoute);
        const routeTitle = child.snapshot.data['title'];
        if (routeTitle) {
          this.titleService.setTitle(routeTitle); // Set the title dynamically
          this.scrollToTop()
        }
      });
    }
    this.onWindowScroll();
  }

  getChild(route: ActivatedRoute): ActivatedRoute {
    let child = route.firstChild;
    while (child) {
      route = child;
      child = route.firstChild;
    }
    return route;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
