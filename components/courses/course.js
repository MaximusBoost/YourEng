'use strict'
import ChooseCourse from "./components/ChooseCourse";
import Header from "../1header/header";
import TechnicalFunctions from "../../technicalFunctions/TechnicalFunctions";
import Footer from "../footer/Footer";
class DropDownList{
    constructor() {
        this.container = document.querySelector('.course-list__cards')
    }
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
        let sortMenu = document.querySelector('.choose-course__sort')
        let dropDownElem = document.querySelector('.sort-menu');
        let degElem = document.querySelector('.choose-course__list-img');

        sortMenu.addEventListener('click', () => {
            degElem.classList.toggle('animation-rotate');
            dropDownElem.classList.toggle('super-animation');
        });
    }
    dinamicSearch() {
        
        let button = document.querySelector('.choose-course__btn')
        let input = document.querySelector('.choose-course__input')
        let data = []
        
        button.addEventListener('click', () => {
            
            let cards = document.querySelectorAll('.course-list__size-lesson')
            let cardTitles = document.querySelectorAll('.card__title')
            let cardTexts = document.querySelectorAll('.card__description')
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

    changeClasesAndNames(target, sort, className) {
        let sortText = sort.textContent  // замена названия сортировки
        let targetText = target.textContent
        sort.innerHTML = targetText
        target.innerHTML = sortText

        target.classList.remove(target.classList[0]) // смена классов сортировки
        let tempClass = sort.classList[sort.classList.length - 1]
        target.classList.add(tempClass)
        sort.classList.remove(sort.classList[1])
        sort.classList.add(className)
    }

    sortAndAddData(dataArr) {
        dataArr = dataArr.sort(( a, b ) => b[0] - a[0] )
        this.container.innerHTML = ''

        dataArr.forEach( price => {
            this.container.appendChild(price[1])
        });
    }

    sortListener() {
        document.addEventListener('click', event => {
            let target = event.target
            if(target.closest('.sort-menu')) {
                if(target.classList.contains('_choose-course-price')) {
                    this.sortByPrice(target)
                } else
                if(target.classList.contains('_choose-course-data')) {
                    this.sortByData(target)
                } else 
                if(target.classList.contains('_choose-course-duration')) {
                    this.sortByDuration(target)
                } else
                if(target.classList.contains('_choose-course-popular')) {
                    this.sortByPopular(target)
                }
            }
        })
    }

    sortByPrice(target) {
        
        let prices = document.querySelectorAll('.course-list__price-lesson')
        let sortMethod = document.querySelector('.choose-course__list-methods')
        let dataPrices = []
        prices.forEach( (price) => {
            dataPrices.push([parseInt(price.textContent.replace(/[^\d]/g, '')), price.parentNode.parentNode])
        })
        this.sortAndAddData(dataPrices)
        this.changeClasesAndNames(target, sortMethod, '_choose-course-price')
    };
    sortByData(target) {
        let cards = document.querySelectorAll('.course-list__size-lesson')
        let sortMethod = document.querySelector('.choose-course__list-methods')
        let arrTimes = []
        cards.forEach( (card) => {
            arrTimes.push([card.getAttribute('data-filter-data'), card])
        })
        this.sortAndAddData(arrTimes)
        this.changeClasesAndNames(target, sortMethod, '_choose-course-data')

    };
    sortByDuration(target) {
        let cards = document.querySelectorAll('.course-list__size-lesson')
        let sortMethod = document.querySelector('.choose-course__list-methods')
        let arrDuration = []
        cards.forEach( (card) => {
            arrDuration.push([card.getAttribute('data-filter-duration'), card])
        })
        this.sortAndAddData(arrDuration)
        this.changeClasesAndNames(target, sortMethod, '_choose-course-duration')
    };
    sortByPopular(target) {
        let cards = document.querySelectorAll('.course-list__size-lesson')
        let sortMethod = document.querySelector('.choose-course__list-methods')
        let arrPopular = []
        cards.forEach( (card) => {
            arrPopular.push([card.getAttribute('data-filter-popular'), card])
        })
        this.sortAndAddData(arrPopular)
        this.changeClasesAndNames(target, sortMethod, '_choose-course-popular')
    };
};

let callThisFunc = new DropDownList;
callThisFunc.addEventListennerFilter();
callThisFunc.addEventListenner();
callThisFunc.dinamicSearch();
ChooseCourse.addListenerForChangePage();
callThisFunc.sortListener()
Header.menuBurger();
TechnicalFunctions.addListenerForFreeLesson()
TechnicalFunctions.addListenerDataClose()
Footer.sendForm();

export default new DropDownList();