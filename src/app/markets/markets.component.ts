import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Swiper from 'swiper';

@Component({
  selector: 'app-markets',
  imports: [CommonModule],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class MarketsComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  private swiper: Swiper | undefined;
  private observer: IntersectionObserver | undefined;
  @ViewChild('thirdContainer', { static: true }) thirdContainer!: ElementRef;

  markets: Array<any> = [
    { name: 'БАЛКОПРОМ 1', city: 'СТРУГА', location: 'Ул. ПРОЛЕТЕРСКИ БРИГАДИ Бр.ББ', link: 'https://www.google.com/maps/place/BALKOPROM+1/@41.1792906,20.6762032,17z/data=!3m1!4b1!4m6!3m5!1s0x62d266d0877f1c27:0x65c0688ba52a101c!8m2!3d41.1792906!4d20.6762032!16s%2Fg%2F11vxxl6j6k?entry=ttu&g_ep=EgoyMDI1MDQyMi4wIKXMDSoASAFQAw%3D%3D' },
    { name: 'БАЛКОПРОМ 2', city: 'СТРУГА', location: 'Ул. МОША ПИЈАДЕ Бр.24', link: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x1350e722779df907:0x9c4cf6bfeb6a27e2?sa=X&ved=1t:8290&ictx=111' },
    { name: 'БАЛКОПРОМ 3', city: 'СТРУГА', location: 'Ул. ЈНА Бр.9', link: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x1350e73b9c7ed8db:0xdba30cd79ef60c7?sa=X&ved=1t:8290&ictx=111' },
    { name: 'БАЛКОПРОМ 4', city: 'СТРУГА', location: 'Ул. РИСТО КРЛЕ Бр.ББ', link: 'https://www.google.com/maps/search/41.181696,+20.681720?coh=219680&entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКОПРОМ 5', city: 'СТРУГА', location: 'Ул. ВЕЉКО ВЛАХОВИЌ Бр.1', link: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x1350e71cefed0f6b:0x153d23682c930bb?sa=X&ved=1t:8290&ictx=111' },
    { name: 'БАЛКОПРОМ 6', city: 'ЛОЖАНИ', location: '', link: 'https://www.google.com/maps/place/Balko+prom+6/@41.2270223,20.6753221,146m/data=!3m1!1e3!4m7!3m6!1s0x1350e126dced6c59:0x768b714474587c00!8m2!3d41.226824!4d20.6759433!15sCgtiYWxrb3Byb20gNpIBDWdyb2Nlcnlfc3RvcmXgAQA!16s%2Fg%2F11j398g4b6?coh=225992&entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКОПРОМ 7', city: 'ВРАНИШТА', location: '', link: 'https://www.google.com/maps/place/Balko+Prom+7/@41.210631,20.6631909,52m/data=!3m1!1e3!4m7!3m6!1s0x1350e14877070907:0xb4489e36702a767e!8m2!3d41.2106172!4d20.663375!15sCgtiYWxrb3Byb20gN1oNIgtiYWxrb3Byb20gN5IBDWdyb2Nlcnlfc3RvcmXgAQA!16s%2Fg%2F11fsx8kf9l?coh=225992&entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКОПРОМ 8', city: 'ОХРИД', location: 'Ул. РИСТО ЧАДО Бр.1', link: 'https://www.google.com/maps/place/Market+Agro+Eli/@41.1221206,20.8221833,53m/data=!3m1!1e3!4m6!3m5!1s0x1350db6fad315a69:0x1beed84bb57c7ea8!8m2!3d41.1220913!4d20.8224841!16s%2Fg%2F11gfnycm59?coh=225992&entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКОПРОМ 9', city: 'ОХРИД', location: 'Ул. КАРПОШ ВОЈВОДА Бр.46', link: 'https://www.google.com/maps/place/Balko%D0%BF%D1%80%D0%BE%D0%BC+9/@41.1139229,20.8076724,1770m/data=!3m1!1e3!4m7!3m6!1s0x1350db331629615b:0x5edd8da28dab070e!8m2!3d41.1129258!4d20.8166897!15sCgtiYWxrb3Byb20gOZIBBXN0b3Jl4AEA!16s%2Fg%2F11tmygljp5?coh=225992&entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКОПРОМ 11', city: 'МОРОИШТА', location: '', link: 'https://www.google.com/maps/place/Balkoprom+11/@41.2023642,20.7002521,62m/data=!3m1!1e3!4m6!3m5!1s0x1350e1dd6026185f:0x9b6a23da9a611d61!8m2!3d41.2024838!4d20.7003946!16s%2Fg%2F11x7_6qlks?entry=tts&g_ep=EgoyMDI1MDMxOS4yIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКО КОМПАНИ 1', city: 'СТРУГА', location: 'Ул. КЕЈ 8-МИ НОЕМВРИ Бр.22', link: 'https://www.google.com/maps/place/Balko+Kompani+1/@41.1813278,20.6784494,161m/data=!3m1!1e3!4m6!3m5!1s0x1350e78ab0c9b567:0x6458d20b45b087a9!8m2!3d41.1814651!4d20.6789188!16s%2Fg%2F11sfkwjmvm?entry=ttu&g_ep=EgoyMDI1MDQyMi4wIKXMDSoASAFQAw%3D%3D' },
    { name: 'БАЛКО КОМПАНИ 2', city: 'МИСЛЕШЕВО', location: 'Ул. ЕДВАРД КАРДЕЉ', link: 'https://www.google.com/maps/place/Balko+Kompani+2/@41.1824289,20.7013619,76m/data=!3m1!1e3!4m6!3m5!1s0x1350e73c9efc063d:0x786980bef14fa48!8m2!3d41.1823021!4d20.7014004!16s%2Fg%2F11s7xmx2pq?coh=225992&entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКО КОМПАНИ 3', city: 'СТРУГА', location: 'Ул. МАРШАЛ ТИТО Бр. ББ', link: 'https://www.google.com/maps/place/Balko+Kompani+3/@41.1776499,20.6726211,585m/data=!3m1!1e3!4m7!3m6!1s0x1350e7af0e5519ab:0xf5654b53fc07f944!8m2!3d41.17743!4d20.6752731!15sCg9CYWxrbyBLb21wYW5pIDOSAQ1ncm9jZXJ5X3N0b3Jl4AEA!16s%2Fg%2F11w3_dw28k?coh=225992&entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКО КОМПАНИ 4', city: 'СТРУГА', location: 'Ул. 15-ТИ КОРПУС Бр.38А', link: 'https://www.google.com/maps/place/Balko+kompani+4/@41.17534,20.6665948,1169m/data=!3m1!1e3!4m7!3m6!1s0x1350e71a017f195b:0x346026270d4cb1a!8m2!3d41.1753407!4d20.6761317!15sCg9CYWxrbyBLb21wYW5pIDSSAQtzdXBlcm1hcmtldOABAA!16s%2Fg%2F11bbvpp7mq?coh=225992&entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКО КОМПАНИ 5', city: 'ВЕВЧАНИ', location: '', link: 'https://www.google.com/maps/place/Balko+Kompani+5/@41.2374626,20.5902828,584m/data=!3m2!1e3!4b1!4m6!3m5!1s0x1350e3ab2628bfe3:0xdfac64a2cf7fc7d6!8m2!3d41.2374586!4d20.5928577!16s%2Fg%2F11fsws79lg?coh=225992&entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКО КОМПАНИ 6', city: 'ВЕВЧАНИ', location: '', link: 'https://www.google.com/maps/place/Balko+Kompani+6/@41.2411973,20.592815,584m/data=!3m2!1e3!4b1!4m6!3m5!1s0x1350e32d4188e867:0xa834abd5fb874526!8m2!3d41.2411933!4d20.5953899!16s%2Fg%2F11vby0kvfc?coh=225992&entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D' },
    { name: 'БАЛКО КОМПАНИ 7', city: 'СТРУГА', location: 'Ул. ПРОЛЕТЕРСКИ БРИГАДИ Бр.1', link: 'https://www.google.com/maps/place/Balko+Kompani+7/@41.1812669,20.6762915,644m/data=!3m2!1e3!4b1!4m6!3m5!1s0x1350e7b88a3026c5:0x7fc4c0a14e545ee6!8m2!3d41.1812669!4d20.6762915!16s%2Fg%2F11w287s5nh?entry=ttu&g_ep=EgoyMDI1MDQyMi4wIKXMDSoASAFQAw%3D%3D' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private sanitizer: DomSanitizer) {}
  

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSwiper();
      // this.animateThirdContainerOnView(); 

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
      autoplay: {
        delay: 5000, // Adjust this value (in milliseconds) to change speed (e.g., 3000 = 3 seconds)
        disableOnInteraction: false, // Optional: Keeps autoplay running after user interaction
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
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

}
