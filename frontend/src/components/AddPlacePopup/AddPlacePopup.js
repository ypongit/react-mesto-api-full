import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isSending
}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen, onClose]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link })
    // setName('');
    // setLink('');
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="card_add"
      title="Новое место"
      buttonTitle={isSending ? "Создание..." : "Создать"}
      >
      <label htmlFor="card-name-input" className="popup__field-wrapper">
        <input type="text"
          name="name"
          id="card-name-input"
          className="popup__field popup__field_card_name"
          placeholder="Название" required minLength="2"
          maxLength="30"
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__field-error card-name-input-error"></span>
      </label>
      <label htmlFor="image-link-input" className="popup__field-wrapper">
        <input type="url"
          name="link"
          id="image-link-input"
          className="popup__field popup__field_card_link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__field-error image-link-input-error"></span>
      </label>
    </PopupWithForm>
  )

}

export default AddPlacePopup;
