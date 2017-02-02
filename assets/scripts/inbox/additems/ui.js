'use strict';

// const store = require('../../store');

const onAddItemSuccess = (/*data*/) => {
  $('.bookname').val('');
  $('.bookdesc').val('');
};

const failure = (/*error*/) => {
};

module.exports = {
  failure,
  onAddItemSuccess,
};
