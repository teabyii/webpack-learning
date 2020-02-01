export const foo = 'hello world';

export function log(message) {
  console.log(message);
}

export default class Foo {
  echo() {
    log('hello foo');
  }
}
