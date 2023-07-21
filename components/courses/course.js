'use strict'
import ChooseCourse from "./components/ChooseCourse";
class DropDownList{
    addEventListennerFilter() {
        let clickElems = document.querySelectorAll('.course-list__item-solo-header');
        let dropDownElems = document.querySelectorAll('.course-list__items-checkbox');
        let degElem = document.querySelectorAll('.course-list__img');

        for(let i = 0; i < clickElems.length; i++) {
            clickElems[i].addEventListener('click', function () {
                dropDownElems[i].classList.toggle('animation-left-block');
                degElem[i].classList.toggle('animation-rotate');
            });
        }
    }

    addEventListenner() {
        let arrWithElem = [
            document.querySelector('.choose-course__choose-method'),
            document.querySelector('.choose-course__list-methods'),
            document.querySelector('.choose-course__list-img')
        ];
        let dropDownElem = document.querySelector('.sort-menu');
        let degElem = document.querySelector('.choose-course__list-img');

        for(let elem of arrWithElem) {
            elem.addEventListener('click', function() {
                degElem.classList.toggle('animation-rotate');
                dropDownElem.classList.toggle('super-animation');
            });
        };
    }
};

let callThisFunc = new DropDownList;
callThisFunc.addEventListennerFilter();
callThisFunc.addEventListenner();
ChooseCourse.addListenerForChangePage()

export default new DropDownList();