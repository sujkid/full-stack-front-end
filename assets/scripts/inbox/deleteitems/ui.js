'use strict';

const api = require('./api');

const failure = function() {

};

const onDeleteItemsSuccess = function(data) {
  // debugger;
  console.log(data);
  api.viewItems()
  .then(onViewItemsSuccess)
  .catch(failure);
};

const onDeleteItems = function(event) {
  debugger;
  let data = this.id;
  event.preventDefault();
  api.deleteItems(data)
    .then(onDeleteItemsSuccess)
    .catch(failure);
};

const addHandlers = function() {
  $('.del-items').on('click', onDeleteItems);
};

const delete_table = function() {
  // debugger;
  let table = document.getElementById("del-table");
  let rowCount = table.rows.length;
  for (let i=1; i < rowCount; i++) {
    table.deleteRow(1);
  }
};

const onViewItemsSuccess = function(data) {
  delete_table();
  debugger;
  console.log(data);
  if (data) {
    let len = data.user_items.length;
    let txt = '';
    // debugger;
    if (len > 0) {
      for(let i=0;i<len;i++) {
        if (data.user_items[i].name && data.user_items[i].description) {
            txt += "<tr><td>"+data.user_items[i].name+"</td><td>"+data.user_items[i].description+"</td><td><a href='#' class='del-items' id="+data.user_items[i].id+" >Delete</a></td></tr>";
            // console.log(data.user_items[i].id);
        }
      }
      if (txt !== '') {
          $('.deltable').append(txt).removeClass('hidden');
      }
    }
  }
  addHandlers();
};

module.exports = {
  onViewItemsSuccess,
  onDeleteItemsSuccess,
  failure
};
