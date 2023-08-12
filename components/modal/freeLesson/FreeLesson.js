import star from '../freeLesson/img/Vector.svg';
import close from '../freeLesson/img/Cancel.svg';
import TechnicalFunctions from '../../../technicalFunctions/TechnicalFunctions';
import IMask from 'imask'
class FreeLesson{
    constructor() {
        this.mask = '';
    }
    render() {
        let htmlContent = ` 
            <div class="modal" id="modal-container" data-close="true">
                <div class="modal__body _container" >
                    <img src="${close}" alt="close" class="modal__close" data-close="true">
                    <div class="modal__container">
                        <h3 class="modal__title">Бесплатное пробное занятие</h3>
                        <form action="#" class="modal__form" id="form-free-lesson">
                            <div class="modal__input-container">
                                <input class="modal__input modal__input_name _modal-req" placeholder="Имя" data-input="true">
                                <img src="${star}" alt="star">
                            </div>
                            <div class="modal__input-container">
                                <input class="modal__input modal__input_birthday _modal-req" placeholder="Введите дату рождения" data-input="true">
                                <img src="${star}" alt="star">
                            </div>
                            <div class="modal__input-container">
                                <input class="modal__input modal__input_phone _modal-req" placeholder="+7 (___)-___-__-__" type="tel" data-input="true">
                                <img src="${star}" alt="star">
                            </div>
                            
                            <div class="modal__input-container">
                                <input class="modal__input modal__input_email _modal-req _modal-email" placeholder="example@mail.ru" type="email" data-input="true">
                                <img src="${star}" alt="star" data-input="true">
                            </div>


                            <textarea class="modal__input modal__input_textarea" placeholder="Сообщение" maxlength="140" data-input="true"></textarea>

                            
                            <p class="modal__paragraph"><img src="${star}" alt="star"> Поля, обязательные для заполнения</p>
                            <button class="modal__button _button-green">Записаться</button>
                        </form>
                    </div>
                </div>
            </div>
            `;
                const htmlWrapper = `
                <div class="modal__wrapper">
                    ${htmlContent}
                </div>
            `;
    
            ROOT_MODAL.innerHTML = htmlWrapper;
    }
    
    open() {
        // this.render();
        const modal = document.querySelector('.modal')
        const modalBody = document.querySelector('.modal__body')
        modal.classList.remove('hidden') // анимации появления окна
        modal.classList.add('open'); 
        modalBody.classList.remove('hidden')
        modalBody.classList.add('open');
    }

    close() {   
        let modal = document.querySelector('.modal');
        let form = document.getElementById('form-free-lesson');
        form.reset();
        modal.querySelectorAll('input').forEach((input)=> {
            input.classList.remove('_error')
        })
        let modalWindow = document.querySelector('.modal__body');
        if(modal) {
            modalWindow.classList.remove('open');
            modalWindow.parentElement.classList.remove('open');
            modalWindow.classList.add('disappearance');
            modalWindow.parentElement.classList.add('disappearance');
            setTimeout(() => {
                modalWindow.classList.remove('disappearance');
                modalWindow.parentElement.classList.remove('disappearance');
                modalWindow.classList.add('hidden');
                modalWindow.parentElement.classList.add('hidden');
                // ROOT_MODAL.innerHTML = ''
            },300);
        };
    }; 


    sendForm() {
        
        let form = document.getElementById('form-free-lesson');
        let container = document.getElementById('modal-container');
        this.maskForPhone()
        document.addEventListener('keydown', (event) => {
            if(event.code == 'Escape') {
                this.close();
            };
        });
        form.addEventListener('submit',(event) => {
            event.preventDefault();

            let error = formValidate(form)

            let formData = new FormData(form);

            if(error == 0) {
                container.classList.add('_sending');
                form.reset();

                setTimeout(() => {
                    let response = fetch('sendmail.php', { // await
                        method: 'POST',
                        body: formData
                    });
                    if(response.ok) {
                        let result = response.json(); // await
                        alert(result.message);
                        form.reset();
                        container.classList.remove('_sending')
                    } else {
                        alert('Ошибка отправки данных на сервер')
                        container.classList.remove('_sending');
                        
                        let modal = document.querySelector('.modal');  // дублирование кода
                        let modalWindow = document.querySelector('.modal__body');
                        if(modal) {
                            modalWindow.classList.remove('open');
                            modalWindow.parentElement.classList.remove('open');
                            modalWindow.classList.add('disappearance');
                            modalWindow.parentElement.classList.add('disappearance');
                            setTimeout(() => {
                                modalWindow.classList.remove('disappearance');
                                modalWindow.parentElement.classList.remove('disappearance');
                                modalWindow.classList.add('hidden');
                                modalWindow.parentElement.classList.add('hidden');
                                // ROOT_MODAL.innerHTML = ''
                            },300);
                        }; // дублирование кода

                    }
                },1000)
            } else {
               alert('Заполните обязательные поля')
            }
        });
        

        let formValidate = () =>{
            let error = 0;
            let formReq = document.querySelectorAll('._modal-req')
            for(let i = 0; i< formReq.length; i++) {
                let input = formReq[i];
                TechnicalFunctions.formRemoveError(input);

                if(input.classList.contains('_modal-email')) {
                    if(!TechnicalFunctions.emailTest(input)){
                        formAddError(input);
                        error++
                    }
                } else
                if(input.value == '') {
                    formAddError(input);
                    error++;
                } else
                if(input.classList.contains('modal__input_phone') && !this.mask.masked.isComplete) {
                    formAddError(input);
                    error++;
                    input.value = ''
                    input.placeholder = 'Введите номер телефона'
                }
            }
            return error;
        }
        function formAddError(input) {
            input.classList.add('_error')
            if(input.placeholder == 'Имя') {
                input.placeholder = 'Введите имя';
            } else if(input.placeholder == 'example@mail.ru' || input.placeholder == 'Введите почтовый адрес') {
                input.placeholder = 'Введите почтовый адрес'
            } else if(input.placeholder == '+7 (___)-___-__-__') {
                input.placeholder = 'Введите номер телефона'}
        }
    }

    maskForPhone() {
        const phoneInput = document.querySelector('.modal__input_phone')
        if(phoneInput) {
           this.mask = new IMask(phoneInput, {
                mask: "+{7}(000) 000-00-00"
            });
        };
    };
}
export default new FreeLesson()