import { foo, log } from './foo.js';
import './index.css';

log(foo);

const div = document.createElement('div');
div.className = 'container';
div.innerHTML = '<div class="box">hello webpack</div><div class="tuts"></div>';
document.body.appendChild(div);
