import FreeLesson from "../components/modal/freeLesson/FreeLesson";
class TechnicalFunctions {

    // formValidate(className,emailName) {
    //     let error = 0;
    //     let formReq = document.querySelectorAll(`.${className}`);
    //     for(let i = 0; i< formReq.length; i++) {
    //         let input = formReq[i];
    //         this.formRemoveError(input);

    //         if(input.classList.contains(emailName)) {
    //              if(!this.emailTest(input)){
    //                 this.formAddError(input);
    //                 error++;
    //              };
    //         } else {
    //             if(input.value == '') {
    //                 this.formAddError(input);
    //                 error++;
    //             };
    //         };
    //     };
    //     return error;
    // };

    // formAddError(input) {
    //     input.classList.add('_error');
    //     if(input.placeholder == 'example@mail.ru' || input.placeholder == 'Введите почтовый адрес') {
    //         input.placeholder = 'Введите почтовый адрес';
    //     } 
    // }
    
    formRemoveError(input) {
        input.classList.remove('_error');
    }
    emailTest(input) {
        return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input.value);
    }

    addListenerForDataInput() {
        document.addEventListener('click', function(event) {
            let target = event.target;
            if(!target.hasAttribute('data-input')) return;
            target.classList.remove('_error');
        });
    };

    addListenerDataClose() {
        document.addEventListener('click', function(event) {
            let target = event.target;
            if(target.dataset.close) {
                FreeLesson.close();
            };
        });
    };

    addListenerForFreeLesson() {
        
        let records = document.querySelectorAll('._full-screen-record');
        records.forEach( record => {
            record.addEventListener('click', function() { // запись на бесплатное занятие через главную страницу
                FreeLesson.open(); // открытие модального окна
                FreeLesson.sendForm();
                document.addEventListener('keydown', function(event) {
                    if(event.code == 'Escape') {
                        FreeLesson.close();
                    };
                });
            });
        });
    };
};

export default new TechnicalFunctions()