document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            reverseDirection: false
        },
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            768: {
                slidesPerView: 1
            },
            1024: {
                slidesPerView: 1
            }
        }
    });

    const courseSwiper = new Swiper('.course-swiper', {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            reverseDirection: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            640: {
                slidesPerView: 1
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 70
            }
        },
        effect: 'slide',
        grabCursor: true
    });

    if (swiper.controller && courseSwiper.controller) {
        swiper.controller.control = courseSwiper;
        courseSwiper.controller.control = swiper;
    }
});