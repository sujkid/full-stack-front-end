'use strict';

const config = require('../../config');
const store = require('../../store');

const searchItem = function(data) {
  return $.ajax({
    url: config.host + '/search-items',
    method: 'GET',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token,
    },
  });
};

// const requestItem = function(data) {
//   return $.ajax({
//     url: config.host + '/request-item',
//     method: 'GET',
//     data,
//     headers: {
//       Authorization: 'Token token=' + store.user.token,
//     },
//   });
// };

module.exports = {
  searchItem,
  // requestItem,
};
