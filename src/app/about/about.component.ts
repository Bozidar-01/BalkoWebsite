import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  @ViewChild('gridcards', { static: true }) gridcards!: ElementRef;
  private observer: IntersectionObserver | undefined;

  
  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animateThirdContainerOnView(); 
    }
  }

  private animateThirdContainerOnView() {
    setTimeout(() => {
      if (!this.gridcards) return;
  
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parts = this.gridcards.nativeElement.querySelectorAll('.card');
            parts.forEach((el: Element, index: number) => {
              setTimeout(() => {
                el.classList.add('animate');
              }, 300 * index); // Staggered
            });
  
            if (this.observer) {
              this.observer.unobserve(entry.target);
            }
          }
        });
      }, { threshold: 0.3 });
  
      this.observer.observe(this.gridcards.nativeElement);
    }, 200);
  }

}
