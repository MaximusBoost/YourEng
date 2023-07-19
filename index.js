import Questions from "./components/questions/questions.js";
import Form from "./components/form/Form.js";
import Teachers from "./components/teachers/Teachers.js";
import Footer from "./components/footer/Footer.js";
import TechnicalFunctions from "./technicalFunctions/TechnicalFunctions.js";
import Header from "./components/1header/header.js";

document.addEventListener('DOMContentLoaded', function() {
    Questions.addListener() // добавление обработчика на открытие скрытого списка
    Form.sendForm() // обработка формы и отправка на сервер
    Teachers.openSubTitle() // открытие описания деятельности учителей
    Footer.sendForm()
    TechnicalFunctions.addListenerForFreeLesson()
    TechnicalFunctions.addListenerDataClose()
    Header.menuBurger();
})
