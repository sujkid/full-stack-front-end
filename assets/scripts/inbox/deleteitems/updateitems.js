'use strict';

const api = require('./api');
const ui = require('./ui');
const getFormFields = require(`../../../../lib/get-form-fields`);

const onUpdateItems = function(event) {
  event.preventDefault();
  debugger;
  let data = getFormFields(this);
  console.log(data);
  api.updateItem(data)
    .then(console.log('success'))
    .catch(ui.failure);
};

module.exports = {
  onUpdateItems,
};
