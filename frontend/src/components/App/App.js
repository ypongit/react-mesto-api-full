
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory, withRouter } from "react-router-dom";
import Header from '../Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import * as mestoAuth from '../../mestoAuth'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import api from "../../utils/Api";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import regSuccess from '../../images/regSuccess.svg';
import regFail from '../../images/regFail.svg';
// Импортируем объект контекста
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function App() {
  // переменная содержит статус пользователя — вошёл он в систему или нет
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  const history = useHistory();

  // переменные состояния, отвечающие за видимость попапов:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  /* Значение переменной задаётся из обработчика handleCardClick
   и сбрасывается из обработчика closeAllPopups. */
  const [selectedCard, setSelectedCard] = React.useState(null);
  // Контекст текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
      return;
    }
    history.push("/signup")
  }, [loggedIn]);

  // запрос к API за данными карточек
  React.useEffect(() => {
    if (loggedIn) {
      // запрос к API за данными пользователя
      api
        .getProfile()
        .then(currentUserData => {
          setCurrentUser(currentUserData);
        })
      .catch((err) => console.log(err));

      api
        .getCards()
        .then(res => {
          const cardsData = res.cards.map(item => {
            return {
              name: item.name,
              link: item.link,
              _id: item._id,
              likes: item.likes,
              owner: item.owner
            }
          });
          // Сохраняем карточки в стейт cards
          setCards(cardsData);
      })}
  }, [loggedIn]);

  // добавление карточки
  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // установка- снятие лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // удаление карточки
  function handleCardDelete(card) {
    const isOwn = card.owner === currentUser._id;
    if (isOwn) {
      api.deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  // запрос к API за данными пользователя
  /* React.useEffect(() => {
    api.getProfile()
      .then(currentUserData => {
        setCurrentUser(currentUserData);
      })
      /* .catch((err) => { console.log(err); });
  }, []); */

  // обработчик редактирования профиля
  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then(currentUserData => {
        setCurrentUser(currentUserData);
        closeAllPopups();
      })
      .catch((err) => { console.log(err); });
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
      .then(currentUserData => {
        setCurrentUser(currentUserData);
        closeAllPopups();
      })
      .catch((err) => { console.log(err); });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  }

  const[InfoTooltipTitle, setInfoTooltipTitle] = useState({
    title: "Что-то пошло не так! Попробуйте ещё раз.",
    icon: regFail,
  });

  // обработчик пропса onClose компонента PopupWithForm
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // Обработчик формы регистрации
  const handleRegister = (email, password) => {
    return mestoAuth
      .register(email, password)
      .then((res) => {
        handleInfoTooltipClick();
      if(res){
        setInfoTooltipTitle({
          icon: regSuccess,
          title: "Вы успешно зарегистрировались!"
        })
      } else {
        setInfoTooltipTitle({
          icon: regFail,
          title: "Что-то пошло не так! Попробуйте ещё раз."
        })
      }
      history.push('/signin')
    })
    .catch((err) => {
      console.log(err);
      handleInfoTooltipClick();
    })
  }
  // Обработчик формы авторизации
  const handleLogin = (email, password) => {
    // console.log('handleLogin -> ');
    return mestoAuth
      .authorize(email, password)
      .then((data) => {
       // нужно проверить, есть ли у данных jwt
       if(!data.token){
         return;
      }
         localStorage.setItem('jwt', data.token);
        // сбросьте стейт, затем в колбэке установите
      setLoggedIn(true);
      setEmail(email);
  });
  }

  const checkToken = () => {
  // если у пользователя есть токен в localStorage,
  // эта функция проверит, действующий он или нет
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
       mestoAuth.getContent(jwt)
       .then((res) => {
         if (res){
           setEmail(res.email);
           setLoggedIn(true);
         }
       })
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    // «Внедряем» данные из currentUser с помощью провайдера контекста
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email = {email}
          onSignOut={handleSignOut}
          loggedIn={loggedIn}
        />

        <Switch>
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister}/>
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
          >
            <Main
            // Прокидываем пропсы в компонент Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>

          <Route>
            {loggedIn ? (
                <Redirect to='/' />
              ) : (
                <Redirect to='/signin/' />
              )}
          </Route>
        </Switch>

        <Footer />

        {/* Форма редактирования профиля («Редактировать профиль») */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Форма добавления карточки («Новое место»)*/}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* Форма удаления карточки («Вы уверены?»)*/}
        <PopupWithForm
          name="card_delete"
          title="Вы уверены?"
          buttonTitle="Да"
        />

        {/* Форма обновления аватара («Обновить аватар»)*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Значение selectedCard должно передаваться с помощью пропса card в компонент ImagePopup */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        {/* информирует пользователя об успешной (или не очень) регистрации. */}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={InfoTooltipTitle.title}
          icon={InfoTooltipTitle.icon}
          name="infotool"
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
