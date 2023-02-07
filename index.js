import Questions from "./components/questions/questions.js";
import Form from "./components/form/Form.js";
import Teachers from "./components/teachers/Teachers.js";
import FreeLesson from "./components/modal/freeLesson/FreeLesson.js";

Questions.addListener() // добавление обработчика на открытие скрытого списка
Form.sendForm() // обработка формы и отправка на сервер
Teachers.openSubTitle() // открытие описания деятельности учителей

let record = document.getElementById('full-screen-record')
record.addEventListener('click', function() { // запись на бесплатное занятие через главную страницу
    FreeLesson.open() // открытие модального окна
    FreeLesson.sendForm()
})

function addListeners() {
    document.addEventListener('click', function(event) {
        let target = event.target;
            if(target.dataset.close) {
                FreeLesson.close()
            };
    })
}
addListeners()



