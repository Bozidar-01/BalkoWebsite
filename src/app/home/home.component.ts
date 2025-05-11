import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, PLATFORM_ID, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
Swiper.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  private swiper: Swiper | undefined;
  @ViewChild('secondContainer', { static: false }) secondContainer!: ElementRef;
  @ViewChild('fourthContainer', { static: false }) fourthContainer!: ElementRef;
  @ViewChild('thirdContainer', { static: true }) thirdContainer!: ElementRef;

  private observer: IntersectionObserver | undefined;
  safeUrl: SafeResourceUrl;
  promotions:any = []
  promotion1:any 
  promotion2:any 
  promotion3:any
  modalOpen = false;
  selectedTitle = '';
  selectedImg = '';
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private sanitizer: DomSanitizer,private apiService:ApiService) {
    const url = 'https://www.facebook.com/people/BALKO-Brand/61562417596105/';
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSwiper();
      this.animateSecondContainerOnView(); 
      this.animateThirdContainerOnView(); 
      this.animatefourthContainerOnView(); 
      this.apiService.getPromotions().subscribe(res => {
        this.promotions = res
       this.promotion1 = this.promotions.length > 0 ? this.promotions[0] : null;
       this.promotion2 = this.promotions.length > 0 ? this.promotions[1] : null;
       this.promotion3 = this.promotions.length > 0 ? this.promotions[2] : null;

        console.log('API Response:',  this.promotion1);
});
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
      autoplay: {
        delay: 5000, // Adjust this value (in milliseconds) to change speed (e.g., 3000 = 3 seconds)
        disableOnInteraction: false, // Optional: Keeps autoplay running after user interaction
      },
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


  private animateSecondContainerOnView() {
    setTimeout(() => {

    if (!this.secondContainer) return;
  
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animatedItems = this.secondContainer.nativeElement.querySelectorAll('.animate-item');
          animatedItems.forEach((el: Element, index: number) => {
            setTimeout(() => {
              el.classList.add('animate-in');
            }, 200 * index);
          });
  
          // Optional: Stop observing after first animation
          if (this.observer) {
            this.observer.unobserve(entry.target);
          }
        }
      });
    }, {
      threshold: 0.3 // how much of element needs to be in view
    });
  
    this.observer.observe(this.secondContainer.nativeElement);
  }, 200 );

  }

  private animateThirdContainerOnView() {
    setTimeout(() => {
      if (!this.thirdContainer) return;
  
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parts = this.thirdContainer.nativeElement.querySelectorAll('.offer-part');
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
  
      this.observer.observe(this.thirdContainer.nativeElement);
    }, 200);
  }
  
  

  private animatefourthContainerOnView() {
    setTimeout(() => {
      if (!this.fourthContainer) return;
  
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedItems = this.fourthContainer.nativeElement.querySelectorAll('.phoneBounceIn');
            animatedItems.forEach((el: Element, index: number) => {
              setTimeout(() => {
                el.classList.add('animate');
              }, 200 * index);
            });
  
            // Unobserve after animating once
            if (this.observer) {
              this.observer.unobserve(entry.target);
            }
          }
        });
      }, {
        threshold: 0.3,
      });
  
      this.observer.observe(this.fourthContainer.nativeElement);
    }, 200);
  }
  
  
}