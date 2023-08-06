import TechnicalFunctions from "../../technicalFunctions/TechnicalFunctions";
import IMask from 'imask'

class FormEnter{
    constructor() {
        this.checker = document.querySelector('.registration__checker');
        this.mask = '';
    }
    sendForm() {
        const form = document.querySelector('.form-send');
        const container = document.querySelector('.container-send')
        form.addEventListener('submit', async (event) => {
            console.log(this.mask)
            event.preventDefault();

            let error = formValidate();

            let formData = new FormData(form);

            if(error == 0) {
                container.classList.add('_sending');
                
                setTimeout(() => {
                    let response = fetch('sendmail.php', { // адрес сервера для отправки запроса
                        method: 'POST',
                        body: formData,
                    });
                    if(response.ok) {
                        let result = response.json(); // await
                        let formReq = document.querySelectorAll('._form__req');
                        formReq.forEach((input) => {
                            if(input.classList.contains('modal__input_name')) {
                                input.placeholder = 'Логин'
                                if(this.checker) {
                                    if(this.checker.getAttribute('checked')) {
                                        localStorage.setItem('login', input.value)
                                    } 
                                }
                            } else if(input.classList.contains('modal__input_password')) {
                                input.placeholder = 'Пароль'
                            } else if(input.classList.contains('modal__input_phone')) {
                                input.placeholder = '+7 (___)-___-__-__'
                            } else if(input.classList.contains('modal__input_email')) {
                                input.placeholder = 'example@mail.ru'
                            }
                        })
                        alert(result.message);
                        form.reset();
                        container.classList.remove('_sending');
                    } else {
                        let formReq = document.querySelectorAll('._form__req');
                        formReq.forEach((input) => {
                            if(input.classList.contains('modal__input_name')) {
                                input.placeholder = 'Логин'
                                if(this.checker) {
                                    if(this.checker.getAttribute('checked')) {
                                        localStorage.setItem('login', input.value)
                                    } 
                                }
                            } else if(input.classList.contains('modal__input_password')) {
                                input.placeholder = 'Пароль'
                            } else if(input.classList.contains('modal__input_phone')) {
                                input.placeholder = '+7 (___)-___-__-__'
                            } else if(input.classList.contains('modal__input_email')) {
                                input.placeholder = 'example@mail.ru'
                            }
                        })
                        alert('Ошибка отправки данных на сервер')
                        container.classList.remove('_sending')
                        
                    };
                    form.reset();
                },1000);
                
            } else {
                alert('Заполните обязательные поля');
            };
        });

        

        let formValidate = () => {
            let error = 0;
            let formReq = document.querySelectorAll('._form__req');
            for(let i = 0; i< formReq.length; i++) {
                let input = formReq[i];
                TechnicalFunctions.formRemoveError(input);
                if(input.value == '') {
                    formAddError(input);
                    error++;
                }
                 else if(input.classList.contains('modal__input_name') && input.value.length < 8) {
                    formAddError(input);
                    error++;
                    input.value = ''
                    input.placeholder = 'Логин должен содержать более 8 символов'
                }
                else if(input.classList.contains('modal__input_password') && input.value.length < 8) {
                    formAddError(input);
                    error++;
                    input.value = ''
                    input.placeholder = 'Пароль должен содержать более 8 символов'
                }
                else if(input.classList.contains('modal__input_phone') && !this.mask.masked.isComplete) {
                    formAddError(input);
                    error++;
                    input.value = ''
                    input.placeholder = 'Введите номер телефона'
                }
            };
            return error;
        };
            
        function formAddError(input) {
            input.classList.add('_error');
            if(input.placeholder == 'Логин') {
                input.placeholder = 'Введите логин';
            } else if(input.placeholder == 'Пароль') {
                input.placeholder = 'Введите пароль'
            } else if(input.placeholder == '+7 (___)-___-__-__') {
                input.placeholder = 'Введите номер телефона'
            } else if(input.placeholder == 'example@mail.ru') {
                input.placeholder = 'Введите почту'
            }
        };

        TechnicalFunctions.addListenerForDataInput();
    };

    chekerListener() {
        if(this.checker) {
            this.checker.addEventListener('click', () => {
                if(this.checker.getAttribute('checked')) {
                    this.checker.removeAttribute('checked')
                } else {
                    this.checker.setAttribute('checked', 'true')
                }
            })
        }
    }

    autoFillLogin() {
        let input = document.querySelector('.modal__input_name')
        if(localStorage.getItem('login') && !input.classList.contains('_register')) {
            let inputValue = localStorage.getItem('login')
            input.value = inputValue
            this.checker.checked = 'true'
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
};

let callThisFunc = new FormEnter;
callThisFunc.maskForPhone()
callThisFunc.sendForm()
callThisFunc.chekerListener()
callThisFunc.autoFillLogin()
