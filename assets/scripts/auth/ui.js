'use strict';

const store = require('../store');

const updatePasswordSuccess = (/*data*/) => {
  $('#change-pw-modal').modal('hide');
};

const signUpSuccess = () => {
  $('#sign-up-modal').modal('hide');
};

const signInSuccess = data => {
  store.user = data.user;
  $('#user-id-form').val(store.user.id);
  $('#search-user-id-form').val(store.user.id);
  $('#requesting-user-id').val(store.user.id);
  // success(data);
  // console.log(data);
  $('#change-pw').show();
  $('#sign-out').show();
  $('#sign-in').hide();
  $('#sign-up').hide();
  $('#sign-in-error').hide();
  $('.inbox').show();
  $('.inbox-div').hide();
  $('.add-books-div').hide();
  $('.delete-books-div').hide();
  $('.search-books-div').hide();
  $('.search-form').hide();
  $('.desc').hide();
  $('.landing-page').hide();
  $('#sign-in-modal').modal('hide');
};

const signOutSuccess = (/*data*/) => {
  store.user = null;
  store.game = null;
  $('#change-pw').hide();
  $('#sign-out').hide();
  $('#sign-in').show();
  $('#sign-up').show();
  $('.inbox').hide();
  $('.desc').show();
  $('.landing-page').show();
};

const failure = (/*error*/) => {
};

const onSignUpFailure = (/*error*/) => {

};

const onSignInFailure = (/*error*/) => {
  $('#sign-in-error').show();
  $('#sign-in-error').text("oops! something went wrong.. check the password");
};

const onUpdatePasswordFailure = function() {

};

module.exports = {
  failure,
  // success,
  updatePasswordSuccess,
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  onSignUpFailure,
  onSignInFailure,
  onUpdatePasswordFailure,
};
