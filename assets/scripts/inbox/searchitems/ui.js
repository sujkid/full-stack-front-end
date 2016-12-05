'use strict';

const api = require('./api');
// const requestItems = require('./../requestitems/requestitems');

const deleteTable = function() {
  // debugger;
  let table = document.getElementById('search-table');
  let rowCount = table.rows.length;
  for (let i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }
};

const failure = function() {
  // console.log('fail');
};

const onRequestClick = function(event) {
  event.preventDefault();
  // debugger;
  $('#request-item-modal').modal('show');
  let id = this.id;
  $('#request-item-modal #requested-user_item_id').val(id);
};

const addHandlers = function() {
  $('.request-items').on('click', onRequestClick);
};

// const onRequestItemSuccess = function(data) {
//   console.log(data);
// };

// const onRequestItem = function(event) {
//     event.preventDefault();
//     debugger;
//     $('.request-item').text('Requested');
//     let data = this.id;
//     api.requestItem(data)
//       .then(onRequestItemSuccess)
//       .catch(failure);
// };

// const addHandlers = function() {
//   $('.request-item').on('click', onRequestItem);
// };

const onSearchItemSuccess = function(data) {
  deleteTable();
  // console.log(data);
  // debugger;
  if (data) {
    let len = data.user_items.length;
    let txt = '';
    if (len > 0) {
      for(let i = 0; i < len; i++) {
        if (data.user_items[i].user_name) {
          // txt += "<tr><td>"+data.user_items[i].name+"</td><td>"+data.user_items[i].description+"</td><td>"+data.user_items[i].user_name+"</td><td><a href='#' class='request-item' id="+data.user_items[i].id+">Request</a></td></tr>";
          txt += "<tr><td>"+data.user_items[i].name+"</td><td>"+data.user_items[i].description+"</td><td>"+data.user_items[i].user_name+"</td><td>"+data.user_items[i].status+"</td><td><a href='#' class='request-items' id="+data.user_items[i].id+">Select</a></td></tr>";
          // $('#request-id').val(data.user_items[i].id);
          // $('#requested-user-id2').val(data.user_items[i].user_name);
        }
      }
      if (txt !== '') {
          $('.searchtable').append(txt).removeClass('hidden');
      }
    }
  }
  addHandlers();
};

module.exports = {
  onSearchItemSuccess,
  failure,
};
