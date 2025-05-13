import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swiper from 'swiper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  private swiper: Swiper | undefined;
  title: string = '';
  img: string[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    // Note: safeUrl for Facebook link is not used in the template; consider removing if unused
    const url = 'https://www.facebook.com/people/BALKO-Brand/61562417596105/';
    this.sanitizer.bypassSecurityTrustUrl(url); // Kept but unused
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'] || 'Promotion';
      const imgParam = params['img'];
      // Parse img param, expecting a JSON string like '["url1", "url2"]'
      try {
        this.img = imgParam ? JSON.parse(imgParam) : [];
        if (!Array.isArray(this.img)) {
          console.error('img param is not an array:', imgParam);
          this.img = [];
        }
      } catch (e) {
        console.error('Failed to parse img param:', imgParam, e);
        this.img = [];
      }
      // Reinitialize Swiper if images change
      if (isPlatformBrowser(this.platformId) && this.img.length > 0) {
        this.initializeSwiper();
      }
    });
  }

  ngAfterViewInit() {
    // Initialize Swiper only if images are available
    if (isPlatformBrowser(this.platformId) && this.img.length > 0) {
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
          setTimeout(() => {
            this.animateSlideText(swiper);
          }, 200);
        },
      },
    });
    setTimeout(() => {
      this.animateSlideText(swiper);
    }, 0);
  }

  private animateSlideText(swiper: Swiper) {
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

  sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}