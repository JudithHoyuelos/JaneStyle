import { envs } from "./constants";


async function validateAccound(token) {
  const form = new FormData();
  form.append('token', token);

  const url = `${envs.DOMAIN_URL}/users/validate/`;
  const response = await fetch(url, {
    method: 'POST',
    body: form,
  }).then(res => {
    return res.ok
  }).catch(() => {
    return false;
  });

  return response;
}


async function resetPassword(password, token) {
  const form = new FormData();
  form.append('token', token);
  form.append('password', password);

  const url = `${envs.DOMAIN_URL}/users/reset-password/`;
  const response = await fetch(url, {
    method: 'POST',
    body: form,
  }).then(res => {
    return res.ok;
  }).catch(() => {
    return false;
  });

  return response;
}


export {
  validateAccound,
  resetPassword
}