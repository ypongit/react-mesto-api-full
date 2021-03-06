import { BASE_URL } from './utils/constants';
const checkResponse = (response) => {
  if (response.ok){
    return response.json();
  }

  return response.json()
    .then((res) => {
      throw res.message;
  })
}
// Создание пользователя
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    try {
      if (response.status === 200){
        return response.json();
      }
    } catch (e) {
      return (e)
    }
  })
  .then(res => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })

  .then(checkResponse)
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`,
    }
  })
  .then(res => res.json())
}
