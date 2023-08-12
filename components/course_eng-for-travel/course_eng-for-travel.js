import DropDownSlowly from './course-program/course-program.js';
import SlickSlider from './structure_lesson.js';
import Header from '../1header/header.js';
import TechnicalFunctions from '../../technicalFunctions/TechnicalFunctions.js';
import Footer from '../footer/Footer.js';
import FreeLesson from '../modal/freeLesson/FreeLesson.js';
Header.menuBurger();
DropDownSlowly.addListenner();
SlickSlider.addEventListenner();
TechnicalFunctions.addListenerForFreeLesson()
TechnicalFunctions.addListenerDataClose()
TechnicalFunctions.addListenerForDataInput()
FreeLesson.sendForm()
Footer.sendForm();