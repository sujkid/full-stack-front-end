'use strict';

// const getFormFields = require(`../../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');

const onViewItemLink = function(event) {
  event.preventDefault();
  $('.add-books-div').hide();
  $('.search-books-div').hide();
  $('.delete-books-div').show();
  $('.search-form').hide();
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
