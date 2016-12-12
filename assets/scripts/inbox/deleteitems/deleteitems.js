'use strict';

// const getFormFields = require(`../../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');

const onViewItemLink = function (event) {

  // debugger;
  event.preventDefault();
  $('.add-books-div').hide();
  $('.search-books-div').hide();
  $('.delete-books-div').show();
  $('.search-form').hide();
  $('.inbox-div').hide();
  api.viewItems()
    .then(ui.onViewItemsSuccess)
    .catch(ui.failure);
};

const addHandlers = () => {
  $('.delb').on('click', onViewItemLink);
};

module.exports = {
  addHandlers,
};
