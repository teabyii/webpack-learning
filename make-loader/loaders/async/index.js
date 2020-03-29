const less = require('less');

module.exports = function (content, map, meta) {
  const callback = this.async();

  less.render(content, { sourceMap: {} }, (error, output) => {
    if (error) callback(error);

    callback(null, output.css, output.map, meta);
  });
};
