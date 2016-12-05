'use strict';

const config = require('../../config');
const store = require('../../store');

const requestInbox = function() {
  return $.ajax({
    url: config.host + '/inbox_items/' + store.user.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

const acceptRequest = (data) =>
  $.ajax({
    url: config.host + '/accept-request/' + data,
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    }
  }
);

const rejectRequest = (data) =>
  $.ajax({
    url: config.host + '/reject-request/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token,
    }
  }
);

module.exports = {
  requestInbox,
  acceptRequest,
  rejectRequest,
};
