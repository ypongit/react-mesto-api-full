import { BASE_URL } from './constants';
class Api {
  constructor({ baseUrl, headers }) {
    // this._headers = headers;
    this._baseUrl = baseUrl;
    // тело конструктора
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
  }

// загрузка данных профиля
  getProfile(){
    return fetch(`${this._baseUrl}/users/me `, {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))

  }
// загрузка карточек
  getCards() {
    // ...
    return fetch(`${this._baseUrl}/cards `, {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }
  // изменение данных профиля на сервере
  setUserInfo({name, about}){
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  editProfile(name, about) {
    // ...
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }
// Добавление новой карточки
addCard({name, link}) {
  // ...
  return fetch(`${this._baseUrl}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
// удаление новой карточки
deleteCard(id) {
  // ...
  return fetch(`${this._baseUrl}/cards/${id} `, {
    method: "DELETE",
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
changeLikeCardStatus(id, isLiked){
  return fetch(`${this._baseUrl}/cards/${id}/likes `, {
    method:  isLiked ? "DELETE" :  "PUT",
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
// удаление лайка
deleteLike(id) {
  // ...
  return fetch(`${this._baseUrl}/cards/${id}/likes `, {
    method: "DELETE",
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
// добавление лайка
addLike(id) {
  // ...
  return fetch(`${this._baseUrl}/cards/${id}/likes `, {
    method: "PUT",
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
// установка аватара
setAvatar({avatar}) {
  // ...

  return fetch(`${this._baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
  // другие методы работы с API
}
// внутри api.js создайте экземпляр класса Api с нужными параметрами (включая ваш токен)


const api = new Api({
  // baseUrl: 'https://api.mestoyp.students.nomoredomains.xyz',
  baseUrl: BASE_URL,
  // authorization: '3e042cce-8939-40c2-9f95-48414868d982',
  headers: {
    // authorization: '3e042cce-8939-40c2-9f95-48414868d982',
    // authorization: `Bearer ${ localStorage.getItem('jwt') }`,
    'Content-Type': 'application/json'
  }
});

export default api;
