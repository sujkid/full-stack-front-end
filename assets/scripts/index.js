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
const requests = require('./inbox/requests/requests');
// const deleteItems = require('./inbox/deleteitems/deleteitems');

$(() => {
  authEvents.addHandlers();
  addItems.addHandlers();
  delItems.addHandlers();
  searchItems.addHandlers();
  requestItems.addHandlers();
  requests.addHandlers();
  // deleteItems.addHandlers();
  $('#change-pw').hide();
  $('#sign-out').hide();
  $('.inbox').hide();
  $('.add-books-div').hide();
  $('.delete-books-div').hide();
  // $('.search-div').hide();
  $('.search-books-div').hide();
  $('.search-form').hide();
  $('.inbox-div').hide();
  $('.error-on-edit').hide();
  $('.desc').text('Swap Jungle is a place for all book lovers to exchange your books with fellow book lovers! By joining Swap Jungle, you will become part of a community of other book lovers. Avid readers horde books like a squirrel hordes nuts, but even the most relentless pack rats can run out of space. Swap Jungle provides a free way for people to exchange books, find out about new books and obtain a new book to read without having to pay. Get your old books new readers! Sign up/Sign in to add your books, search for books and start reading!!!' );
  $('#d-picker').datepicker({
    format: 'yyyy-mm-dd'
  });
});
