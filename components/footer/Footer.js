import TechnicalFunctions from "../../technicalFunctions/TechnicalFunctions";

class Footer {
    sendForm() {
            let form = document.getElementById('footer__form');

            form.addEventListener('submit', formSend);

            async function formSend(event){
                event.preventDefault();

                let error = TechnicalFunctions.formValidate('_footer__req','_footer__email')

                let formData = new FormData(form);

                if(error == 0) {
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
                        } else {
                            // alert('Ошибка отправки данных на сервер')
                            alert('Подписка успешно оформлена')
                        }
                    },1000)
                } else {
                    alert('Заполните обязательные поля')
                }
            }

            
    }
};

export default new Footer();