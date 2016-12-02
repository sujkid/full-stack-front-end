'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');
const authEvents = require('./auth/events');
const addItems = require('./inbox/additems/additems');
const delItems = require('./inbox/deleteitems/deleteitems');
const searchItems = require('./inbox/searchitems/searchitems');
const requestItems = require('./inbox/requestitems/requestitems');
// const deleteItems = require('./inbox/deleteitems/deleteitems');

$(() => {
  authEvents.addHandlers();
  addItems.addHandlers();
  delItems.addHandlers();
  searchItems.addHandlers();
  requestItems.addHandlers();
  // deleteItems.addHandlers();
  $('#change-pw').hide();
  $('#sign-out').hide();
  $('.inbox').hide();
  $('.add-books-div').hide();
  $('.delete-books-div').hide();
  $('.search-books-div').hide();
  $('.search-form').hide();
});
