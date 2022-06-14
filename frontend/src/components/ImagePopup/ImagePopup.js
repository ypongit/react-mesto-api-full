
function ImagePopup(
  { card,
    onClose }) {
  return (
      <div className={`popup popup_type_image ${card && 'popup_opened'}`}>
      <figure className="popup__image-container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img
          className="popup__image" src={card?.link} alt={card?.name}
        />
        <figcaption className="popup__caption"></figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
