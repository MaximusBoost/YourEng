import conversation from "./chooseCourse/img/conversation.png"
import bigBan from "./chooseCourse/img/big_ban.png"
import doMore from"./chooseCourse/img/do_more.png"
import klava from "./chooseCourse/img/klava.png"
import discussion from "./chooseCourse/img/discussion.png"
import oneMoreConversation from"./chooseCourse/img/oneMoreConversation.png"
class ChooseCourse {
    constructor() {
        this.container = document.querySelector('.course-list__cards')
        this.data = [conversation,bigBan,doMore,klava,discussion,oneMoreConversation]
    }
    render(img1, img2, img3, img4, img5, img6) {
        
        let htmlContent = ` 
                <div class="close-event__card card course-list__size-lesson" data-filter-data="12" data-filter-duration="90" data-filter-popular="8">
                    <div class="card__title">Бизнес-английский</div>
                    <img src=${img1} alt="classroom" class="card__img">
                    <p class="card__description">Развиваем языковые навыки делового общения: составление резюме, ведение переписки, участие в переговорах</p>
                    <div class="card__footer">
                        <div class="card__price course-list__price-lesson"><span>от&nbsp;</span> 10 000 руб.&nbsp;<span>за занятие</span></div>
                        <a href="../course_eng-for-travel/course_eng-for-travel.html" class="card__link _link-white">Подробнее</a>
                    </div>
                </div>
                <div class="close-event__card card course-list__size-lesson" data-filter-data="9" data-filter-duration="120" data-filter-popular="5">
                    <div class="card__title">Английский для путешествий</div>
                    <img src=${img2} alt="classroom" class="card__img">
                    <p class="card__description">Ничего лишнего! В программе делается 
                        упор, которые будут необходимы для посещения англоязычных стран</p>
                    <div class="card__footer">
                        <div class="card__price course-list__price-lesson"><span>от&nbsp;</span> 8 000 руб.&nbsp;<span>за занятие</span></div>
                        <a href="../course_eng-for-travel/course_eng-for-travel.html" class="card__link _link-white">Подробнее</a>
                    </div>
                </div>
                <div class="close-event__card card course-list__size-lesson" data-filter-data="9" data-filter-duration="70" data-filter-popular="10">
                    <div class="card__title">От Beginner до Elementary</div>
                    <img src=${img3} alt="classroom" class="card__img">
                    <p class="card__description">Сделайте первый рывок в изучении
                        английского языка и повысьте свой уровень до elementary.</p>
                    <div class="card__footer">
                        <div class="card__price course-list__price-lesson"><span>от&nbsp;</span> 5 000 руб.&nbsp;<span>за занятие</span></div>
                        <a href="../course_eng-for-travel/course_eng-for-travel.html" class="card__link _link-white">Подробнее</a>
                    </div>
                </div>
                <div class="close-event__card card course-list__size-lesson" data-filter-data="8" data-filter-duration="50" data-filter-popular="9">
                    <div class="card__title">IT-английский</div>
                    <img src=${img4} alt="classroom" class="card__img">
                    <p class="card__description">Техническую лексику из области программирования, тестирования, аналитики и других направлений IT </p>
                    <div class="card__footer">
                        <div class="card__price course-list__price-lesson"><span>от&nbsp;</span> 12 000 руб.&nbsp;<span>за занятие</span></div>
                        <a href="../course_eng-for-travel/course_eng-for-travel.html" class="card__link _link-white">Подробнее</a>
                    </div>
                </div>
                <div class="close-event__card card course-list__size-lesson" data-filter-data="11" data-filter-duration="150" data-filter-popular="5">
                    <div class="card__title">Общий разговорный курс</div>
                    <img src=${img5} alt="classroom" class="card__img">
                    <p class="card__description">Развитие разговорных навыков 
                        и преодоление языкового барьера.
                        Научитесь понимать носителей языка.</p>
                    <div class="card__footer">
                        <div class="card__price course-list__price-lesson"><span>от&nbsp;</span> 8 000 руб.&nbsp;<span>за занятие</span></div>
                        <a href="../course_eng-for-travel/course_eng-for-travel.html" class="card__link _link-white">Подробнее</a>
                    </div>
                </div>
                <div class="close-event__card card course-list__size-lesson" data-filter-data="10" data-filter-duration="60" data-filter-popular="6">
                    <div class="card__title">Английский для ЕГЭ</div>
                    <img src=${img6} alt="classroom" class="card__img">
                    <p class="card__description">Подготовка к ЕГЭ - не так страшно, 
                        как кажется на первый вгляд. И на второй взгляд тоже.</p>
                    <div class="card__footer">
                        <div class="card__price course-list__price-lesson"><span>от&nbsp;</span> 5 000 руб.&nbsp;<span>за занятие</span></div>
                        <a href="../course_eng-for-travel/course_eng-for-travel.html" class="card__link _link-white">Подробнее</a>
                    </div>
                </div>
            `;
                
        this.container.innerHTML = htmlContent;
    }
    open(img1, img2, img3, img4, img5, img6) {
        this.render(img1, img2, img3, img4, img5, img6)
        this.container.classList.add('_ul-open')
    }

    addListenerForChangePage() {
        let ulContainer = document.querySelector('.course-list__number-page')
        let children = ulContainer.children
        this.open(...this.data)
        for(let child of children) {
            child.addEventListener('click', () => {
                for(let child of children) {
                    child.classList.remove('_li-active')
                }
                child.classList.add('_li-active')
                this.data.reverse()
                this.open(...this.data)
            })
        }
    }
};

export default new ChooseCourse();