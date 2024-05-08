import _ from 'lodash';
import './style.css'
import Pastizzi from './assets/images/pastizzi.jpg'

function component() {
  const element = document.createElement('div');

  // Lodash, imported via scrpit
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const myIcon = new Image();
  myIcon.src = Pastizzi;

  element.appendChild(myIcon);
  return element;
}

document.body.appendChild(component());
