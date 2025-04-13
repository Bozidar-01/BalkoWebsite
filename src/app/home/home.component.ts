import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, PLATFORM_ID, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';Swiper.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  private swiper: Swiper | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSwiper();
    }
  }

  private initializeSwiper(attempts = 0, maxAttempts = 5) {
    const container = this.swiperContainer?.nativeElement;
    if (!container || !container.querySelector('.swiper-wrapper')) {
      if (attempts < maxAttempts) {
        console.log(`Swiper DOM not ready, retrying (${attempts + 1}/${maxAttempts})`);
        setTimeout(() => this.initializeSwiper(attempts + 1, maxAttempts), 100);
      } else {
        console.error('Failed to initialize Swiper: DOM not ready after max attempts');
      }
      return;
    }

    const swiper = new Swiper(container, {
      loop: true,
      // autoplay: {
      //   delay: 3000, // Adjust this value (in milliseconds) to change speed (e.g., 3000 = 3 seconds)
      //   disableOnInteraction: false, // Optional: Keeps autoplay running after user interaction
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
        slideChangeTransitionEnd: () => {
          this.animateSlideText(swiper);
        },
      },
    });
    setTimeout(() => {
      this.animateSlideText(swiper);
    }, 0);
  }

  ngOnDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = undefined;
    }
  }

  
  animateSlideText(swiper: Swiper) {
    const slides = swiper.slides;
    slides.forEach((slide: HTMLElement) => {
      const text = slide.querySelector('.slide-text');
      if (text) {
        text.classList.remove('animate-in');
      }
    });

    const activeSlide = slides[swiper.activeIndex];
    const activeText = activeSlide.querySelector('.slide-text');
    if (activeText) {
      activeText.classList.add('animate-in');
    }
  }
}