class Header {

    menuBurger() {

        const widthWindow = document.body.clientWidth;
        const header = document.querySelector('.header');
        
        
        header.innerHTML += `
        <div class="header__cross">
            <div class="header__cross-line"></div>
        </div>
        `;
        
        const cross = document.querySelector('.header__cross');

        if(widthWindow > 768) {
            cross.classList.add('hidden-abs');
        }

        window.addEventListener('resize', e => {
                let currentWwidth = e.target.outerWidth;
    
                if( currentWwidth <= 768 && cross.classList.contains('hidden-abs') ) {
                   cross.classList.remove('hidden-abs'); 
                } else if (currentWwidth > 768 && !cross.classList.contains('hidden-abs')) {
                    cross.classList.add('hidden-abs');
                }

        });

        function clickElement () {
            const localCross = document.querySelector('.header__cross');
            const lineCross = document.querySelector('.header__cross-line');
            const menu = document.querySelector('.header__menu-burger');
            const main = document.querySelector('.main');
            const filterFon = document.querySelector('.header__backdropfilter');
            const body = document.querySelector('body');
            
            if(localCross) {
                
                localCross.addEventListener('click', (e) => {
                    
                    menu.classList.toggle('opacity-see');
                    localCross.classList.toggle('header__cross-click');
                    lineCross.classList.toggle('header__cross-line-click');
                    console.log(menu);
                    filterFon.classList.toggle('blur-fon');
                    body.classList.toggle('scroll-none');

                });
            };
        };

        clickElement();
    }
}

export default new Header();