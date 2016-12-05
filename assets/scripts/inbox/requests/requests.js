'use strict';

const api = require('./api');
const ui = require('./ui');

const onRequestLink = function() {
  $('.inbox-div').show();
  $('.add-books-div').hide();
  $('.delete-books-div').hide();
  $('.search-books-div').hide();
  $('.search-form').hide();
  api.requestInbox()
    .then(ui.onRequestInboxSuccess)
    .catch(ui.failure);
};

const addHandlers = function() {
  $('.inboxb').on('click', onRequestLink);
};

module.exports = {
  addHandlers,
};
