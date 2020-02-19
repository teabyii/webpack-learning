export const foo = 'hello world';

export function log(message) {
  console.log(message);
}

if (module.hot) {
  module.hot.dispose((data) => {
    data.action = 'updated';
  });

  log(module.hot.data ? module.hot.data.action : 'execed');

  module.hot.accept((err) => {
    console.log(err);
  });
}
