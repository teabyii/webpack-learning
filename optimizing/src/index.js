import { forEach, includes } from 'lodash-es'
import { foo, log } from './utils/log';
import { cube } from './utils/math';
import './index.css';

log(foo);
log(cube(3))

forEach([1, 2], (item) => {
  console.log(item)
})

console.log(includes([1, 2, 3], 1))


const div = document.createElement('div');
div.className = 'container';
div.innerHTML = '<div class="box">hello webpack</div><div class="tuts"></div>';
document.body.appendChild(div);
