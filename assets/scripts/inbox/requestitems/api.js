'use strict';

const config = require('../../config');
const store = require('../../store');

const requestItem = (data) =>
  $.ajax({
    url: config.host + '/request-item',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  }
);

module.exports = {
  requestItem,
};
