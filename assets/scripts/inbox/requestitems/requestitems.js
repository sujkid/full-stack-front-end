'use strict';

const api = require('./api');
const ui = require('./ui');
const getFormFields = require(`../../../../lib/get-form-fields`);

const onRequestItem = function(event) {
    let data = getFormFields(this);
    event.preventDefault();
    // $('#request-name').val(data.)
    // debugger;
    // let data = this.id;
    // console.log(data);
    api.requestItem(data)
      .then(ui.onRequestItemSuccess)
      .catch(ui.failure);
};

const addHandlers = function () {
  $('.request-item-form').on('submit', onRequestItem);
};

module.exports = {
  addHandlers,
};
