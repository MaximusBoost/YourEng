import star from '../freeLesson/img/Vector.svg';
import close from '../freeLesson/img/Cancel.svg';
import TechnicalFunctions from '../../../technicalFunctions/TechnicalFunctions';
class FreeLesson{
    render() {
        let htmlContent = ` 
            <div class="modal" id="modal-container" data-close="true">
                <div class="modal__body _container" >
                    <img src=".${close}" alt="close" class="modal__close" data-close="true">
                    <div class="modal__container">
                        <h3 class="modal__title">Бесплатное пробное занятие</h3>
                        <form action="#" class="modal__form" id="form-free-lesson">
                            <input class="modal__input modal__input_name _modal-req" placeholder="Имя" data-input="true">
                            <img src="${star}" alt="star" class="modal__star1">
                            <input class="modal__input modal__input_birthday _modal-req" placeholder="Выберите дату рождения" data-input="true">
                            <img src="${star}" alt="star" class="modal__star2">
                            <input class="modal__input modal__input_phone" placeholder="+7 (___)-___-__-__" data-input="true">
                            <input class="modal__input modal__input_email _modal-req _modal-email" placeholder="example@mail.ru" data-input="true">
                            <img src="${star}" alt="star" class="modal__star3" data-input="true">
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
        this.render();
        document.querySelector('.modal__body').classList.add('open'); // анимации появления окна
        document.querySelector('.modal').classList.add('open');
    }

    close() {   
        let modal = document.querySelector('.modal');
    
        let modalWindow = document.querySelector('.modal__body');
        if(modal) {
            modalWindow.classList.remove('open');
            modalWindow.parentElement.classList.remove('open');
            modalWindow.classList.add('disappearance');
            modalWindow.parentElement.classList.add('disappearance');
            setTimeout(() => {
                modalWindow.classList.remove('disappearance');
                modalWindow.parentElement.classList.remove('disappearance');
                ROOT_MODAL.innerHTML = ''
            },300);
        };
    }; 


    sendForm() {
        
            let form = document.getElementById('form-free-lesson');
            let container = document.getElementById('modal-container')

            form.addEventListener('submit', formSend);

            function formSend (event){  // async
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
                                    ROOT_MODAL.innerHTML = ''
                                },300);
                            }; // дублирование кода

                        }
                    },1000)
                } else {
                    alert('Заполните обязательные поля')
                }
            }

            function formValidate() {
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
                    } else {
                        if(input.value == '') {
                            formAddError(input);
                            error++;
                        }
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
                } else{
                    input.placeholder = 'Введите дату рождения'
                }
            }
    }
}
export default new FreeLesson()