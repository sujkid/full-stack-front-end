'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const api = require('./api');
const ui = require('./ui');

const onSignUp = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.onSignUpFailure);
};

const onSignIn = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.onSignInFailure);
};

const onUpdatePassword = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.updatePassword(data)
    .then(ui.updatePasswordSuccess)
    .catch(ui.onUpdatePasswordFailure);
};

const onSignOut = function (event) {
  event.preventDefault();
  api.signOut()
   .then(ui.signOutSuccess)
   .catch(ui.failure);
};

const onSignInButton = function() {
  $('.sign-in-input').val('');
};

const onSignUpButton = function() {
  $('.sign-up-input').val('');
};

const addHandlers = () => {
  $('.sign-up-form').on('submit', onSignUp);
  $('.sign-in-form').on('submit', onSignIn);
  $('.change-pw-form').on('submit', onUpdatePassword);
  $('#sign-out').on('click', onSignOut);
  $('#sign-in').on('click', onSignInButton);
  $('#sign-up').on('click', onSignUpButton);
};

module.exports = {
  addHandlers,
};
