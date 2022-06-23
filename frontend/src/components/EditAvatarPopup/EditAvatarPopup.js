import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isSending
}) {
  const inputRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value, /* Значение инпута, полученное с помощью рефа */
    }
    );
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar_update"
      title="Обновить аватар"
      buttonTitle={isSending ? "Сохранение..." : "Сохранить"}
      >

      <label htmlFor="image-link-input" className="popup__field-wrapper">
        <input
          ref={inputRef}
          type="url"
          name="link"
          id="avatar-link-input"
          className="popup__field popup__field_card_link"
          placeholder="Ссылка аватар"
          required
        />
        <span className="popup__field-error avatar-link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
