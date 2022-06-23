import React from "react";
import api from '../../utils/Api'
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {
  //переменные состояния отвечающие за данные пользователя
  const currentUser = React.useContext(CurrentUserContext);
  console.log('Main.currentUser', currentUser);
  console.log('Main.currentUser.name', currentUser.name);
  return (<main className="content">
    <section className="profile">
      <div className="profile__data">
        {currentUser.avatar && <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}  onClick={onEditAvatar}></div>}

        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={onEditProfile}></button>
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
      </div>
      <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
    </section>

    <section className="elements">
      {cards.map(card => (

        <Card
          key={card._id}
          onCardClick={onCardClick}
          card={card}
          name={card.name}
          likes={card.likes}
          owner={card.owner}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      ))}
    </section>

  </main>)
}

export default Main;
