class SlickSlider {

    addEventListenner() {
        let snake = document.querySelector('.structure-lesson__snake-slide-bar');
        let arrow = document.querySelector('.structure-lesson__arrow-right');
        let sliderSnake = document.querySelector('.structure-lesson__slider-line-snake');

        arrow.addEventListener('click', function() {

            if(snake.classList.value.includes('animation-img__3')) {
                snake.classList.remove('animation-img__3');
                snake.classList.add('animation-img__2');

                sliderSnake.classList.remove('animation-slider__1');
                sliderSnake.classList.add('animation-slider__2');
                return;
            };
            
            if(snake.classList.value.includes('animation-img__2')) {
                snake.classList.remove('animation-img__2');
                snake.classList.add('animation-img__1');

                sliderSnake.classList.remove('animation-slider__2');
                sliderSnake.classList.add('animation-slider__3');
                return;
            };

            if(snake.classList.value.includes('animation-img__1')) {
                snake.classList.remove('animation-img__1');
                snake.classList.add('animation-img__3');

                sliderSnake.classList.remove('animation-slider__3');
                sliderSnake.classList.add('animation-slider__1');
                return;
            };
            
        });
    };
};

export default new SlickSlider();