import { foo, log } from './log.js';
import box from './box.html';
import $ from './jquery.min.js';
import './index.less';

log(foo);

$(document.body).append($(box));



