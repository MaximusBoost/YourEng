import Swiper from 'swiper';

class MySwiper {
   
    addInitialization() {
        this.swiper = new Swiper('.swiper-container', {
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                480: {
                    slidesPerView: 2,
                },
                680: {
                    slidesPerView: 2.5,
                },
                768: {
                    slidesPerView: 3,
                }
            },
            speed: 600,
        }); 

        this.programSwiper = new Swiper('.program-swiper-container', {
            loop: true,
            breakpoints: {
                480: {
                    slidesPerView: 1,
                },
                580: {
                    slidesPerView: 2,
                },
            },
            speed: 600,
        });
    };
};

export default new MySwiper();