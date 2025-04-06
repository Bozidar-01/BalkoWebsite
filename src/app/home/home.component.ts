import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
      autoplay:true,
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