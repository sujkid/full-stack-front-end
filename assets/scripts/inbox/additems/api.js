'use strict';

const config = require('../../config');
const store = require('../../store');

const addItem = (data) =>
  $.ajax({
    url: config.host + '/add-user-item',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  }
);

module.exports = {
  addItem,
};
