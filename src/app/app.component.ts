import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ApiService],
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.router) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        const child = this.getChild(this.activatedRoute);
        const routeTitle = child.snapshot.data['title'];
        if (routeTitle) {
          this.titleService.setTitle(routeTitle); // Set the title dynamically
        }
      });
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
}
