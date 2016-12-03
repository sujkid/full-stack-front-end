'use strict';

const onRequestLink = function() {
  $('.requests-div').show();
  $('.add-books-div').hide();
  $('.delete-books-div').hide();
  $('.search-books-div').hide();
  $('.search-form').hide();
};

const addHandlers = function() {
  $('.requests-div').on('click', onRequestLink);
};

module.exports = {
  addHandlers,
};
