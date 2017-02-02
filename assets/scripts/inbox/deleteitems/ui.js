'use strict';

const api = require('./api');
const getFormFields = require(`../../../../lib/get-form-fields`);

const failure = function () {

  // console.log('fixxit');
};

const deleteTable = function () {

  // debugger;
  let table = document.getElementById("del-table");
  let rowCount = table.rows.length;
  for (let i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }
};

const onViewItemsSuccess = function (data) {
  deleteTable();

  //debugger;
  // console.log(data);
  if (data) {
    let len = data.user_items.length;
    let txt = '';
    // debugger;
    if (len > 0) {
      for ( let i = 0;i < len;i++) {
        if (data.user_items[i].name) {

            // txt += "<tr><td>"+data.user_items[i].name+"</td><td>"+data.user_items[i].description+"</td><td><a href='#' class='del-items' id="+data.user_items[i].id+">Edit</a></td></tr>";
            // txt += "<tr class='tabr'><td class='tabd'>" + data.user_items[i].name + "</td><td class='tabd'>"+data.user_items[i].description + "</td><td class='tabd'>"+data.user_items[i].status + "</td><td class='tabd'><a href='#' class='edit-items' id=Edit" + data.user_items[i].id + "'>Edit</a></td><td class='tabd'><a href='#' class='del-items' id=" + data.user_items[i].id + ">Delete</a></td></tr>";
            txt += "<tr class='tabr'><td class='tabd'>" + data.user_items[i].name + "</td><td class='tabd'>"+data.user_items[i].description + "</td><td class='tabd'>"+data.user_items[i].status + "<input type='hidden' id=status" +data.user_items[i].id+" value=" +data.user_items[i].status+"></td><td class='tabd'><a href='#' class='edit-items' id=Edit" + data.user_items[i].id + ">Edit</a></td><td class='tabd'><a href='#' class='del-items' id=" + data.user_items[i].id + ">Delete</a></td></tr>";
        }
      }
      if (txt !== '') {
        $('.deltable').append(txt).removeClass('hidden');
      }
    }
  }

  addHandlers();
};

const onDeleteItemsSuccess = function (/*data*/) {

  // debugger;
  // console.log(data);
  api.viewItems()
  .then(onViewItemsSuccess)
  .catch(failure);
};

const onDeleteItems = function (event) {
  event.preventDefault();

  // let data = $(event.target).data('id');
  let data = this.id;
  let status = document.getElementById('status'+data).value;
  if(status !== 'Available') {
    $('#error-on-edit').modal('show');
    return;
  }
  api.deleteItems(data)
    .then(onDeleteItemsSuccess)
    .catch(failure);
};

const onUpdateItemsSuccess = function (/*data*/) {
  // console.log(data);
  api.viewItems()
  .then(onViewItemsSuccess)
  .catch(failure);
};

const onUpdateItems = function (event) {
  event.preventDefault();

  // debugger;
  // let edit = $(event.target).data('id');
  let data = getFormFields(this);

  // console.log(data);
  api.updateItem(data)
    .then(onUpdateItemsSuccess)
    .catch(failure);
};

const onEditClick = function (event) {
  event.preventDefault();
  let id = this.id;
  let len = this.id.length;
  let editId = id.substring(4, len);
  let status = document.getElementById('status'+editId).value;
  if(status !== 'Available') {
    $('#error-on-edit').modal('show');
    return;
  }
  $('#edit-item-modal').modal('show');
  $('#edit-item-modal #edit_id').val(editId);
};

const addHandlers = function () {
  $('.del-items').on('click', onDeleteItems);
  $('.edit-items').on('click', onEditClick);
  $('.edit-item-form').on('submit', onUpdateItems);
};

module.exports = {
  onViewItemsSuccess,
  onDeleteItemsSuccess,
  failure,
};
