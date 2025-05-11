import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ApiService],
})
export class AppComponent {
  showScrollButton = false;
  isBrowser: boolean;

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.showScrollButton = window.pageYOffset > 100;
    }
  }

ngOnInit(): void {
  if (this.isBrowser) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.getChild(this.activatedRoute);
        const routeTitle = child.snapshot.data['title'];
        const routeDesc = child.snapshot.data['description']; 

        if (routeTitle) {
          this.titleService.setTitle(routeTitle);
        }
        if (routeDesc) {
          this.metaService.updateTag({ name: 'description', content: routeDesc });
        }

        this.scrollToTop();
      });

    this.onWindowScroll();
  }
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
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
