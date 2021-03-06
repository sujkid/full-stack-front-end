'use strict';

const api = require('./api');
const ui = require('./ui');
const getFormFields = require(`../../../../lib/get-form-fields`);

const onRequestItem = function (event) {
    let data = getFormFields(this);
    event.preventDefault();

    // $('#request-name').val(data.)
    // debugger;
    // let data = this.id;
    // console.log(data);
    if(!data.request.mailing_address || !data.request.return_date) {
      $('#request-item-error-modal').modal('show');
      return;
    }
    api.requestItem(data)
      .then(ui.onRequestItemSuccess)
      .catch(ui.failure);
};

const onRequestCancel = function () {

};

const addHandlers = function () {
  $('.request-item-form').on('submit', onRequestItem);
  $('.request-cancel').on('click', onRequestCancel);
};

module.exports = {
  addHandlers,
};
