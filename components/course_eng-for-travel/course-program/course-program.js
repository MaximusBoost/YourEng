'use strict'

class DropDownSlowly {

    addListenner() {
        let heads = document.querySelectorAll('.course-program__list-item-heading');
        let contents = document.querySelectorAll('.course-program__big-number');
        let checkMarks = document.querySelectorAll('.course-program__img-check');

        for(let i = 0; i < heads.length; i++) {
            heads[i].addEventListener('click', function () {
            
                contents[i].classList.toggle('animation-for-drop-down');
                checkMarks[i].classList.toggle('chekmark-rotate');
            });
        };
    };
};

export default new DropDownSlowly();
