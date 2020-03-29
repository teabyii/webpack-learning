module.exports = function(content) {
  console.log('a');
  console.log(`pitch data: ${this.data.value}`);
  return content;
}

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  console.log('a pitch');
  data.value = 'hello world';
}
