import { forEach, includes } from 'lodash-es'
import { log } from './utils/log';

log('hello, another page');

forEach([1, 2], (item) => {
  console.log(item);
});

console.log(includes([1, 2, 3], 1));

import(/* webpackChunkName: "jquery" */ 'jquery').then($ => {
  console.log($);
});
