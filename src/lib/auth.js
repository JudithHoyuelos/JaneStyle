import { envs } from "./constants";

async function signIn(email, password) {
  if (!email || !password)
    throw new Error('No email or password.');
  
  const form = new FormData();
  form.append('email', email);
  form.append('password', password);

  const url = `${envs.DOMAIN_URL}/auth/login/`;
  const response = await fetch(url, {
    method: 'POST',
    body: form,
  }).then(res => res.json())
    .catch(() => ({}));

  return response.access_token;
}

/**
 * @param {String} uid
 * @param {String} token
 * @return {Promise<{ access_token: String, refresh_token: String }>}
 */
async function signInWithToken(uid, token) {
  if (!uid || !token)
    throw new Error('No uid or token.');
  
  const form = new FormData();
  form.append('uid', uid);
  form.append('token', token);

  const url = `${envs.DOMAIN_URL}/auth/token/`;
  const response = await fetch(url, {
    method: 'POST',
    body: form,
  }).then(res => {
    if (res.ok) return res.json();

    return null;
  }).catch(() => null);

  if (response == null)
    throw new Error('Bad credentials')

  return response;
}

function saveAccessToken(access_token) {
  if (!window.localStorage) return;

  window.localStorage.setItem('jwt', access_token);
}

function getAccessToken() {
  if (!window.localStorage) return '';

  return window.localStorage.getItem('jwt');
}

/////////////////////////////////////////////AÑADIDO////////////////////////////////////////////////
function logOut(){
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('jwt');

  window.location.href = '/';
}

export {
  signIn,
  logOut,
  signInWithToken,
  saveAccessToken,
  getAccessToken
}