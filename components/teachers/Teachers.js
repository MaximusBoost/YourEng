class Teachers {
    constructor() {
        this.counter = 0;
    }
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

            

            
            
            // if(vector.id == 'vector4') {
            //     let target = vector.parentNode.nextElementSibling;
            //     target.classList.toggle('hidden');
            //     if(target.classList.contains('hidden')) {
            //         vector.style.transform = 'rotate(0deg)';
            //         this.counter++
            //         // teachers[0].classList.remove('unvisible-alex');
            //         // teachers[0].classList.add('visible-alex');
            //     } else {
            //         vector.style.transform = 'rotate(-180deg)'
            //         this.counter++
            //         // teachers[0].classList.remove('visible-alex');
            //         // teachers[0].classList.add('unvisible-alex');
            //     };
            // } else {
                let target = vector.parentNode.nextElementSibling;
                target.classList.toggle('hidden');
                if(target.classList.contains('hidden')) {
                    this.counter++
                    vector.style.transform = 'rotate(0deg)';
                    teachers[teachers.length - 1].classList.remove('unvisible');
                    teachers[teachers.length - 1].classList.add('visible');
                    
                } else {
                    this.counter++
                    vector.style.transform = 'rotate(-180deg)'
                    teachers[teachers.length - 1].classList.remove('visible');
                    teachers[teachers.length - 1].classList.add('unvisible');
                };
            // };
        });
    };
};

export default new Teachers();