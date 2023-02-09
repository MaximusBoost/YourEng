'use strict'

class DropDownList{
    addListener() {
        document.addEventListener('click', function(event) {
            let list = this.querySelector('.choose-course__list-methods');
            let dropElem = this.querySelector('.drop-list');

            

            if( event.target.classList.value.includes('choose-course__list-img') &&
            dropElem == null) {

                console.log(dropElem, '+')

                let elem = document.createElement('div');
                elem.innerHTML = `
                    <div class="drop-list">
                        <span>дате</span>
                        <span>цене</span>
                        <span>длительности</span>
                    </div>
                `;
                list.append(elem);

            } else {
                dropElem.remove();

            };

        });
    };
};

let callThisFunc = new DropDownList;
callThisFunc.addListener();

export default new DropDownList();