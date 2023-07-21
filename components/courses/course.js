'use strict'
import ChooseCourse from "./components/ChooseCourse";
import Header from "../1header/header";
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
    dinamicSearch() {
        
        let button = document.querySelector('.choose-course__btn')
        let input = document.querySelector('.choose-course__input')
        let data = []
        
        button.addEventListener('click', () => {
            let cards = document.querySelectorAll('.course-list__size-lesson')
            let cardTitles = document.querySelectorAll('.course-list__title')
            let cardTexts = document.querySelectorAll("[data-description]")
            for(let i = 0; i < cardTitles.length; i++) {
                data.push([cardTitles[i].textContent, cardTexts[i].textContent, i])
            }
            let standardString = input.value
            for(let card of cards) {
                card.classList.remove('hide')
            }
            data.forEach( elemArr => {
                const isVisible = elemArr[0].toLowerCase().includes(standardString) || elemArr[1].toLowerCase().includes(standardString)
                if(!isVisible) {
                    cards[elemArr[2]].classList.add('hide')
                }
            })
        })
    }
};

let callThisFunc = new DropDownList;
callThisFunc.addEventListennerFilter();
callThisFunc.addEventListenner();
callThisFunc.dinamicSearch();
ChooseCourse.addListenerForChangePage();
Header.menuBurger();

export default new DropDownList();