'use strict';

const store = require('../store');

const success = (/*data*/) => {
};

const signInSuccess = data => {
  store.user = data.user;
  $('#user-id-form').val(store.user.id);
  $('#search-user-id-form').val(store.user.id);
  $('#requested-user-id1').val(store.user.id);
  success(data);
  console.log(data);
  $('#change-pw').show();
  $('#sign-out').show();
  $('#sign-in').hide();
  $('#sign-up').hide();
  $('#sign-in-error').hide();
  $('.inbox').show();
};

const signOutSuccess = (/*data*/) => {
  store.user = null;
  store.game = null;
  $('#change-pw').hide();
  $('#sign-out').hide();
  $('#sign-in').show();
  $('#sign-up').show();
  $('.inbox').hide();
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
  success,
  signInSuccess,
  signOutSuccess,
  onSignUpFailure,
  onSignInFailure,
  onUpdatePasswordFailure,
};
