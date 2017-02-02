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
  event.preventDefault();
  $('#user-item-status').val('Available');
  let data = getFormFields(this);
  if (!data.item.name || !data.item.description) {
    $('#add-item-error-modal').modal('show');
    return;
  }
  api.addItem(data)
    .then(ui.onAddItemSuccess)
    .catch(ui.failure);
};

const onAddBookCancel = function() {
  $('.bookname').val('');
  $('.bookdesc').val('');
};

const addHandlers = () => {
  $('.addb').on('click', onAddItemLink);
  $('.add-books-form').on('submit', onAddItem);
  $('#add-book-cancel').on('click', onAddBookCancel);
};

module.exports = {
  addHandlers,
};
