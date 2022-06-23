import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isSending
}) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("Жак Ив Кусто");
  const [description, setDescription] = React.useState("Исследователь океана");
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="profile_edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTitle={isSending ? "Сохранение..." : "Сохранить"}
      >
      <label htmlFor="el-name-input" className="popup__field-wrapper">
        <input type="text"
          name="name"
          id="el-name-input"
          className="popup__field popup__field_el_name"
          placeholder="Имя"
          required minLength="2" maxLength="40"
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="el-name-input-error popup__field-error"></span>
      </label>
      <label htmlFor="el-description-input" className="popup__field-wrapper">
        <input
          type="text"
          name="description"
          id="el-description-input"
          className="popup__field popup__field_el_description"
          placeholder="О себе"
          required minLength="2" maxLength="200"
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="el-description-input-error popup__field-error"> </span>
      </label>
    </PopupWithForm>
  )
}
export default EditProfilePopup;
