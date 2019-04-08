import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';
import './css/styles.css';

const view = new View();
const model = new Model();

const controller = new Controller(model, view);
controller.loadPage();
