import { foo, log } from './foo.js';
import { square } from './math.js';

log(foo);
log(square(3));

if (module.hot) {
  module.hot.accept('./foo.js', () => {
    log(foo); // 不会执行
  });

  module.hot.accept('./math.js', () => {
    log(square(3));
  })
}
