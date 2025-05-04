import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-work',
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorkComponent {
  @ViewChild('comparisonTable', { static: false }) comparisonTable!: ElementRef;

  modalOpen = false;
  selectedTitle = '';
  selectedImg = '';
  private observer: IntersectionObserver | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animatecomparisonTableOnView();
    }
  }

  openModal(title: string, img: string) {
    this.selectedTitle = title;
    this.selectedImg = img;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }



  private animatecomparisonTableOnView() {
    setTimeout(() => {
      if (!this.comparisonTable) return;
  
      // Select all the items to animate within the comparison table
      const itemsToAnimate = this.comparisonTable.nativeElement.querySelectorAll('.animate__animated');
  
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
