module.exports = function(content) {
  console.log('b');
  return content;
}

module.exports.pitch = function(remainingRequest, precedingRequest) {
  console.log('b pitch');

  // 阻断
  return `module.exports = { foo: 'hello pitch' }`
}
