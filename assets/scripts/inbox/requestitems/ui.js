'use strict';

const searchApi = require('./../searchitems/api');
const searchUi = require('./../searchitems/ui');
const edit = require('../../edit');

const onRequestItemSuccess = function () {

  // debugger;
  // let book_name = document.getElementById('book_name');
  let data = {};
  data.item = edit.item;

  $('.request-address').val('');
  $('.request-date').val('');
  $('#request-item-modal').modal('hide');

  // console.log(data.item);
  searchApi.searchItem(data)
    .then(searchUi.onSearchItemSuccess)
    .catch(searchUi.failure);
};

const failure = function () {

  // console.log("fail");
};

module.exports = {
  onRequestItemSuccess,
  failure,
};
