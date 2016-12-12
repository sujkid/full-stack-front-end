'use strict';

const getFormFields = require(`../../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');
const edit = require('../../edit');

const onSearchItemLink = function (event) {

  // debugger;
  event.preventDefault();
  $('.add-books-div').hide();
  $('.delete-books-div').hide();
  $('.search-form').show();
  $('.search-books-div').hide();
  $('.inbox-div').hide();
};

const onSearchItems = function (event) {

  // debugger;
  $('.search-form').hide();
  let data = getFormFields(this);
  edit.item = data.item;

  // console.log(data);
  event.preventDefault();
  $('.search-form').hide();
  $('.search-div').show();
  $('.search-books-div').show();

  // debugger;
  api.searchItem(data)
    .then(ui.onSearchItemSuccess)
    .catch(ui.failure);
};

const addHandlers = () => {
  $('.searchb').on('click', onSearchItemLink);
  $('.search-form').on('submit', onSearchItems);
};

module.exports = {
  addHandlers,
};
