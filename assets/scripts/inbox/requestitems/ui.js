'use strict';

const onRequestItemSuccess = function() {
  $('.request-item').text('Requested');
};

const failure = function() {
  console.log("fail");
};

module.exports = {
  onRequestItemSuccess,
  failure,
};
