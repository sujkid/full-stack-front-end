'use strict';

const api = require('./api');

const failure = function () {

  // console.log('failure');
};

const onAcceptRequestSuccess = function (/*data*/) {

  // console.log('sucess');
  // console.log(data);
  api.requestInbox()
  .then(onRequestInboxSuccess)
  .catch(failure);
};

const onAccept = function (event) {
  event.preventDefault();

  // debugger;
  let id = this.id;
  let len = this.id.length;
  let acceptUserItemId = id.substring(6, len);
  api.acceptRequest(acceptUserItemId)
    .then(onAcceptRequestSuccess)
    .catch(failure);
};

const onRejectedRequestSuccess = function () {

  // console.log('sucess');
  api.requestInbox()
  .then(onRequestInboxSuccess)
  .catch(failure);
};

const onReject = function () {
  event.preventDefault();

  // debugger;
  api.rejectRequest(this.id)
    .then(onRejectedRequestSuccess)
    .catch(failure);
};

const addHandlers = function () {
  $('.accept-req').on('click', onAccept);
  $('.reject-req').on('click', onReject);
};

const deleteTable = function () {

  // debugger;
  let table = document.getElementById('inbox-table');
  let rowCount = table.rows.length;
  for (let i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }
};

const onRequestInboxSuccess = function (data) {
  deleteTable();

  // debugger;
  // console.log(data);
  if (data) {
    let len = data.requests.length;
    let txt = '';

    // debugger;
    if (len > 0) {
      for (let i = 0;i < len;i++) {
        if (data.requests[i].name) {

            // txt += "<tr><td>"+data.user_items[i].name+"</td><td>"+data.user_items[i].description+"</td><td><a href='#' class='del-items' id="+data.user_items[i].id+">Edit</a></td></tr>";
            txt += "<tr class='tabr'><td class='tabd'>" + data.requests[i].name +"</td><td class='tabd'>"+data.requests[i].description+"</td><td class='tabd'>"+data.requests[i].user_name+"</td><td class='tabd'>"+data.requests[i].mailing_address+"</td><td class='tabd'>"+data.requests[i].return_date+"</td><td class='tabd'><a href='#' class='accept-req' id='Accept"+data.requests[i].user_items_id+"'>Accept</a></td><td class='tabd'><a href='#' class='reject-req' id="+data.requests[i].user_items_id+">Reject</a></td></tr>";
        }
      }
      if (txt !== '') {
          $('.inboxtable').append(txt).removeClass('hidden');
      }
    }
  }
  addHandlers();
};

module.exports = {
  onRequestInboxSuccess,
};
