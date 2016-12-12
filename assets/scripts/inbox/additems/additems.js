'use strict';

const getFormFields = require(`../../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');

const onAddItemLink = function () {
  $('.add-books-div').show();
  $('.delete-books-div').hide();
  $('.search-books-div').hide();
  $('.search-form').hide();
  $('.inbox-div').hide();
};

const onAddItem = function (event) {
  $('#user-item-status').val('Available');
  let data = getFormFields(this);
  if (!data.item.name) {
    return;
  }

  event.preventDefault();
  api.addItem(data)
    .then(ui.onAddItemSuccess)
    .catch(ui.failure);
};

const addHandlers = () => {
  $('.addb').on('click', onAddItemLink);
  $('.add-books-form').on('submit', onAddItem);
};

module.exports = {
  addHandlers,
};
