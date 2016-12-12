'use strict';

const config = require('../../config');
const store = require('../../store');

const viewItems = function () {
  return $.ajax({
    url: config.host + '/retrieve_user_items/' + store.user.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

const deleteItems = (data) =>
  $.ajax({
    url: config.host + '/delete-user-item/' + data,
    method: 'DELETE',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  }
);

const updateItem = (data) =>
  $.ajax({
    url: config.host + '/edit-user-item/' + data.edit.id,
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  }
);

module.exports = {
  viewItems,
  deleteItems,
  updateItem,
};
