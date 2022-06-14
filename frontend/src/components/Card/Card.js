import React from "react";
import api from "../../utils/Api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({
  card,
  name,
  likes,
  owner,
  onCardClick,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUser._id;
  // console.log('isOwn -> ', isOwn)
// Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : ''}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = likes.some(i => i._id === currentUser._id);
// console.log('isLiked -> ', isLiked);
// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : '' } `;
  function handleClick() {
    onCardClick(card);
  }
function handleLikeClick(){
  // console.log('handleLikeClick ->', card)
  onCardLike(card);
}
function handleDeleteClick(){
  onCardDelete(card);
}
  return (
    <article className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img
        src={card.link}
        alt={card.name}
        className='element__image'
        onClick={handleClick}
      />
      <div className="element__heading">
        <h2 className="element__heading-text">{name}</h2>
        <div className="element__like-wrap">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__like-count">{likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
