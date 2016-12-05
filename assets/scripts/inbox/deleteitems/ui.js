'use strict';

const api = require('./api');
const getFormFields = require(`../../../../lib/get-form-fields`);

const failure = function() {
  // console.log('fixxit');
};

const deleteTable = function() {
  // debugger;
  let table = document.getElementById("del-table");
  let rowCount = table.rows.length;
  for (let i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }
};

const onViewItemsSuccess = function(data) {
  deleteTable();
  //debugger;
  // console.log(data);
  if (data) {
    let len = data.user_items.length;
    let txt = '';
    // debugger;
    if (len > 0) {
      for ( let i = 0;i < len;i++) {
        if (data.user_items[i].name && data.user_items[i].description) {
            // txt += "<tr><td>"+data.user_items[i].name+"</td><td>"+data.user_items[i].description+"</td><td><a href='#' class='del-items' id="+data.user_items[i].id+">Edit</a></td></tr>";
            txt += "<tr><td>"+data.user_items[i].name+"</td><td>"+data.user_items[i].description+"</td><td><a href='#' class='edit-items' id='Edit"+data.user_items[i].id+"'>Edit</a></td><td><a href='#' class='del-items' id="+data.user_items[i].id+">Delete</a></td></tr>";
        }
      }
      if (txt !== '') {
          $('.deltable').append(txt).removeClass('hidden');
      }
    }
  }
  addHandlers();
};

const onDeleteItemsSuccess = function(data) {
  // debugger;
  // console.log(data);
  api.viewItems()
  .then(onViewItemsSuccess)
  .catch(failure);
};

const onDeleteItems = function(event) {
  // debugger;
  event.preventDefault();
  // let data = $(event.target).data('id');
  let data = this.id;
  api.deleteItems(data)
    .then(onDeleteItemsSuccess)
    .catch(failure);
};

const onUpdateItemsSuccess = function(data) {
  // console.log(data);
  api.viewItems()
  .then(onViewItemsSuccess)
  .catch(failure);
};

const onUpdateItems = function(event) {
  event.preventDefault();
  // debugger;
  // let edit = $(event.target).data('id');
  let data = getFormFields(this);
  // console.log(data);
  api.updateItem(data)
    .then(onUpdateItemsSuccess)
    .catch(failure);
};

const onEditClick = function(event) {
  event.preventDefault();
  // debugger;
  $('#edit-item-modal').modal('show');
  let id = this.id;
  let len = this.id.length;
  let editId = id.substring(4, len);
  $('#edit-item-modal #edit_id').val(editId);
};

const addHandlers = function() {
  $('.del-items').on('click', onDeleteItems);
  $('.edit-items').on('click', onEditClick);
  $('.edit-item-form').on('submit', onUpdateItems);
};

module.exports = {
  onViewItemsSuccess,
  onDeleteItemsSuccess,
  failure,
};
