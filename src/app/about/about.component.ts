import { isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutComponent {
  @ViewChild('gridcards', { static: true }) gridcards!: ElementRef;
  @ViewChild('gridcards2', { static: true }) gridcards2!: ElementRef;
  private observer: IntersectionObserver | undefined;

  
  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animateThirdContainerOnView(); 
      this.animateFourthontainerOnView();
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
  
  private animateFourthontainerOnView() {
    setTimeout(() => {
      if (!this.gridcards2) return;
  
      // Select all the items to animate within the comparison table
      const itemsToAnimate = this.gridcards2.nativeElement.querySelectorAll('.animate__animated');
  
      itemsToAnimate.forEach((el: Element) => {
        // Create an IntersectionObserver for each individual element
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add the animation class when the item is in view
              const animClass = el.getAttribute('data-anim') || 'animate__fadeIn';
              el.classList.add(animClass, 'animate__visible');
  
              // Stop observing once the element has been animated
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.3 // Adjust this threshold to control when the animation triggers
        });
  
        // Start observing each element
        observer.observe(el);
      });
    }, 200);
  }

}
