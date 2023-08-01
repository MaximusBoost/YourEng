'use strict'
import ChooseCourse from "./components/ChooseCourse";
import Header from "../1header/header";
import TechnicalFunctions from "../../technicalFunctions/TechnicalFunctions";
import Footer from "../footer/Footer";
class DropDownList{
    constructor() {
        this.container = document.querySelector('.course-list__cards')
        this.filterButton = document.querySelector('#filter-btn')
        this.purpose = document.querySelector('.purpose-container')
        this.price = document.querySelector('.price-container')
        this.duration = document.querySelector('.duration-container')
        this.allInputs = document.querySelectorAll('input[type*="checkbox"]')
    }
    addEventListennersort() {
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

    // динамический поиск
    dinamicSearch() {
        
        let button = document.querySelector('.choose-course__btn')
        let input = document.querySelector('.choose-course__input')
        
        
        button.addEventListener('click', () => {
            
            let cards = document.querySelectorAll('.course-list__size-lesson')
            let cardTitles = document.querySelectorAll('.card__title')
            let cardTexts = document.querySelectorAll('.card__description')
            let data = []
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
            this.emptyContent()
        })
    }
    // сортировка
    // вспомогательные функции сортировки

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

    // основные функции сортировки
    

    sortByPrice(target) {
        
        let prices = document.querySelectorAll('.course-list__price-lesson')
        let sortMethod = document.querySelector('.choose-course__list-methods')
        let dataPrices = []
        prices.forEach( (price) => {
            dataPrices.push([parseInt(price.textContent.replace(/[^\d]/g, '')), price.parentNode.parentNode])
        })
        this.sortAndAddData(dataPrices)
        this.changeClasesAndNames(target, sortMethod, '_choose-course-price')
        this.emptyContent()
    };
    sortByData(target) {
        let cards = document.querySelectorAll('.course-list__size-lesson')
        let sortMethod = document.querySelector('.choose-course__list-methods')
        let arrTimes = []
        cards.forEach( (card) => {
            arrTimes.push([card.getAttribute('data-sort-data'), card])
        })
        this.sortAndAddData(arrTimes)
        this.changeClasesAndNames(target, sortMethod, '_choose-course-data')
        this.emptyContent()

    };
    sortByDuration(target) {
        let cards = document.querySelectorAll('.course-list__size-lesson')
        let sortMethod = document.querySelector('.choose-course__list-methods')
        let arrDuration = []
        cards.forEach( (card) => {
            arrDuration.push([card.getAttribute('data-sort-duration'), card])
        })
        this.sortAndAddData(arrDuration)
        this.changeClasesAndNames(target, sortMethod, '_choose-course-duration')
        this.emptyContent()
    };
    sortByPopular(target) {
        let cards = document.querySelectorAll('.course-list__size-lesson')
        let sortMethod = document.querySelector('.choose-course__list-methods')
        let arrPopular = []
        cards.forEach( (card) => {
            arrPopular.push([card.getAttribute('data-sort-popular'), card])
        })
        this.sortAndAddData(arrPopular)
        this.changeClasesAndNames(target, sortMethod, '_choose-course-popular')
        this.emptyContent()
    };
    
    

    

    // фильтры
    // вспомогательные функции фильтров
    contains(arr, attribute) {
        for(let i = 0; i < attribute.length; i++) {
            if(i % 2 == 0) {
                if(arr.includes(+attribute[i])) {
                    return true
                }
            }
        }
    }

    checkWorkFilters() {
        let counter = 0
        let filterFlag = false
        let cards = document.querySelectorAll('.course-list__size-lesson')
        this.allInputs.forEach( (input) => {
            if(!input.checked) {
                counter++
            }
        })
        if(counter == this.allInputs.length) {
            cards.forEach((card) => {
                card.classList.remove('hide')
            })
            this.purpose.removeAttribute('data-purpose')
            this.price.removeAttribute('data-price')
            filterFlag = true
        }
        return filterFlag
    }
    // проверка на отсутствие контента
    emptyContent() {
        let cards = document.querySelectorAll('.course-list__size-lesson')
        let counter = 0
        cards.forEach( (card) => {
            if(card.classList.contains('hide')) {
                counter++
            } else {
                return
            }
            
            
        })
        if(counter == cards.length) {
            let tempDiv = document.createElement('div')
            tempDiv.innerHTML = `К сожалению, по вашему запросу ничего не найденно. Попробуйте изменить условия поиска.`
            tempDiv.classList.add('tempDiv')
            this.container.appendChild(tempDiv)
        } else {
            if(document.querySelector('.tempDiv')) {
                document.querySelector('.tempDiv').remove()
            }
        }
    }

    checkActiveInputsContainer() {
        this.allInputs.forEach( (input) => {
            input.addEventListener('click', ()=> {
                let purposeInputs = this.purpose.querySelectorAll('input')
                let priceInputs = this.price.querySelectorAll('input')
                let durationInputs = this.duration.querySelectorAll('input')
                let counterPurpose = 0
                let counterPrice = 0
                let counterDuration = 0
                purposeInputs.forEach( (input) => {
                    if(!input.checked) {
                        counterPurpose++
                    }
                })
                priceInputs.forEach( (input) => {
                    if(!input.checked) {
                        counterPrice++
                    }
                })
                durationInputs.forEach( (input) => {
                    if(!input.checked) {
                        counterDuration++
                    }
                })
                if(counterPurpose == purposeInputs.length) {
                    this.purpose.removeAttribute('data-purpose')
                }
                if(counterPrice == priceInputs.length) {
                    this.price.removeAttribute('data-price')
                }
                if(counterDuration == durationInputs.length) {
                    this.duration.removeAttribute('data-duration')
                }
            })
        })
    }
    // основные функции фильтров  
    filterPurpose() {
        
        let checkboxes = document.querySelectorAll('._purpose')
        this.filterButton.addEventListener('click', () => {
            document.querySelector('.choose-course__input').value = ''
            if(this.checkWorkFilters()) {
                this.checkWorkFilters()
                return
            }
            let cards = document.querySelectorAll('.course-list__size-lesson')
            let arrPurpose = []
            for(let i = 0; i < checkboxes.length; i++) {
                if(checkboxes[i].checked) {
                    arrPurpose.push(i)
                }
            }
            
            cards.forEach( (card => {
                
                if(!card.getAttribute('data-filter-purpose')) {
                    return
                }

                card.setAttribute('data-active-purpose', 'true')
                
                if(card.getAttribute('data-filter-purpose')) {
                    let attribute = card.getAttribute('data-filter-purpose')
                    if(!this.contains(arrPurpose, attribute)) {
                        card.removeAttribute('data-active-purpose')
                    } else {
                        this.purpose.setAttribute('data-purpose', 'true')
                    }
                };
            }));
            if(!this.purpose.getAttribute('data-purpose')) return
            cards.forEach((card) => {
                if(this.duration.getAttribute('data-duration') && this.price.getAttribute('data-price')) {
                    if(!card.getAttribute('data-active-duration') || !card.getAttribute('data-active-purpose') || !card.getAttribute('data-active-price')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                } else 
                if(this.duration.getAttribute('data-duration')) {
                    if(!card.getAttribute('data-active-duration') || !card.getAttribute('data-active-purpose')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                } else 
                if(this.price.getAttribute('data-price')) {
                    if(!card.getAttribute('data-active-price') || !card.getAttribute('data-active-purpose')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                } else {
                    if(!card.getAttribute('data-active-purpose')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                }
            })
            this.emptyContent() 
        });
        
    };

    filterPrice() {
        let checkboxes = document.querySelectorAll('._price')
        this.filterButton.addEventListener('click', () => {
            if(this.checkWorkFilters()) {
                this.checkWorkFilters()
                return
            }
            let cards = document.querySelectorAll('.course-list__size-lesson')
            let arrPrice = []
            for(let i = 0; i < checkboxes.length; i++) {
                if(checkboxes[i].checked) {
                    arrPrice.push(i)
                }
            }
            cards.forEach( (card => {
                card.setAttribute('data-active-price', 'true')
                if(card.getAttribute('data-filter-price')) {
                    let attribute = card.getAttribute('data-filter-price')
                    if(!this.contains(arrPrice, attribute)) {
                        card.removeAttribute('data-active-price')
                    } else {
                        this.price.setAttribute('data-price', 'true')
                    }
                };
            }));
            if(!this.price.getAttribute('data-price')) return

            cards.forEach((card) => {
                if(this.duration.getAttribute('data-duration') && this.purpose.getAttribute('data-purpose')) {
                    if(!card.getAttribute('data-active-duration') || !card.getAttribute('data-active-purpose') || !card.getAttribute('data-active-price')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                } else 
                if(this.duration.getAttribute('data-duration')) {
                    if(!card.getAttribute('data-active-duration') || !card.getAttribute('data-active-price')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                } else 
                if(this.purpose.getAttribute('data-purpose')) {
                    if(!card.getAttribute('data-active-price') || !card.getAttribute('data-active-purpose')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                } else {
                    if(!card.getAttribute('data-active-price')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                }
               
            })
            this.emptyContent()
        });
    };

    filterDuration() {
        let checkboxes = document.querySelectorAll('._duration')
        this.filterButton.addEventListener('click', () => {
            if(this.checkWorkFilters()) {
                this.checkWorkFilters()
                return
            }
            let cards = document.querySelectorAll('.course-list__size-lesson')
            let arrDuration = []
            for(let i = 0; i < checkboxes.length; i++) {
                if(checkboxes[i].checked) {
                    arrDuration.push(i)
                }
            }
            cards.forEach( (card => {
                card.setAttribute('data-active-duration', 'true')
                if(card.getAttribute('data-filter-duration')) {
                    let attribute = card.getAttribute('data-filter-duration')
                    if(!this.contains(arrDuration, attribute)) {
                        card.removeAttribute('data-active-duration')
                    } else {
                        this.duration.setAttribute('data-duration', 'true')
                    }
                };
            }));
            if(!this.duration.getAttribute('data-duration')) return

            cards.forEach((card) => {
                if(this.purpose.getAttribute('data-purpose') && this.price.getAttribute('data-price')) {
                    if(!card.getAttribute('data-active-duration') || !card.getAttribute('data-active-purpose') || !card.getAttribute('data-active-price')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                } else 
                if(this.purpose.getAttribute('data-purpose')) {
                    if(!card.getAttribute('data-active-duration') || !card.getAttribute('data-active-purpose')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                } else 
                if(this.price.getAttribute('data-price')) {
                    if(!card.getAttribute('data-active-price') || !card.getAttribute('data-active-duration')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                } else {
                    if(!card.getAttribute('data-active-duration')) {
                        card.classList.add('hide')
                    } else {
                        card.classList.remove('hide')
                    }
                }
            })
            this.emptyContent()
        });
    };
    resetFilters() {
        let button = document.querySelector('.course-list__reset')
        button.addEventListener('click', () => {
            let cards = document.querySelectorAll('.course-list__size-lesson')
            this.allInputs.forEach( (input)=> {
                if(input.checked) {
                    input.checked = false
                }
            })
            cards.forEach((card)=> [
                card.classList.remove('hide')
            ])
        })
    }
};


let callThisFunc = new DropDownList;
callThisFunc.addEventListennersort();
callThisFunc.addEventListenner();
callThisFunc.filterPurpose()
callThisFunc.filterPrice()
callThisFunc.filterDuration()
callThisFunc.dinamicSearch();
callThisFunc.checkActiveInputsContainer()
callThisFunc.resetFilters()
ChooseCourse.addListenerForChangePage();
callThisFunc.sortListener()
Header.menuBurger();
TechnicalFunctions.addListenerForFreeLesson()
TechnicalFunctions.addListenerDataClose()
Footer.sendForm();

export default new DropDownList();