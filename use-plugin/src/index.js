import { foo, log } from './foo.js';
import moment from 'moment';

log(foo);
log(moment().format());

if (module.hot) {
  module.hot.accept('./foo.js', function() {
    log(foo);
  })
}
