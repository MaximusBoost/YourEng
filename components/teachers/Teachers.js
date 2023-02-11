class Teachers {
    openSubTitle() {
        let teachers = document.querySelectorAll('.teachers__our-teacher');
        document.addEventListener('click', function(event) {
            let vector = event.target;
            if(!vector.hasAttribute('data-teacher')) return;

            if(vector.style.transform != 'rotate(-180deg)') { 
                for(let teacher of teachers) {
                    teacher.nextElementSibling.classList.add('hidden');
                    teacher.lastElementChild.style.transform = 'rotate(0deg)';
                }
            }

            if(vector.id != 'vector4') {
                let target = vector.parentNode.nextElementSibling;
                target.classList.toggle('hidden');

                if(target.classList.contains('hidden')) {
                    vector.style.transform = 'rotate(0deg)';

                    if(teachers[0].classList.contains('unvisible__alex')) {
                        teachers[0].classList.remove('unvisible__alex');
                        teachers[0].classList.add('visible__alex');
                    } else {
                        teachers[teachers.length - 1].classList.remove('unvisible');
                        teachers[teachers.length - 1].classList.add('visible');
                    };
                        
                } else {
                    vector.style.transform = 'rotate(-180deg)';
                    if(!teachers[0].classList.contains('unvisible__alex')) {
                        teachers[teachers.length - 1].classList.add('unvisible');
                        teachers[teachers.length - 1].classList.remove('visible');
                    };
                                
                };
            } else {
                let target = vector.parentNode.nextElementSibling;
                target.classList.toggle('hidden');

                if(target.classList.contains('hidden')) {
                    vector.style.transform = 'rotate(0deg)';
                    teachers[0].classList.remove('unvisible__alex');
                    teachers[0].classList.add('visible__alex');
                        
                        
                } else {
                    vector.style.transform = 'rotate(-180deg)';
                    teachers[0].classList.add('unvisible__alex');
                    teachers[0].classList.remove('visible__alex');
                        
                };
            };
        });
    };
};

export default new Teachers();