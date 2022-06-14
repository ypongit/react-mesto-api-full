import React from "react";
import api from "../../utils/Api";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  buttonTitle,
  onSubmit
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        {/* закрытие попапов. пропс onClose */}
        <button type="button" className="popup__close" onClick={onClose}></button>
        <h2 className="popup__heading">{title}</h2>
        <form
          className="popup__main-container"
          name={name}
          noValidate
          onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit" >{buttonTitle}</button>
        </form>

      </div>
    </div>


  );
}

export default PopupWithForm;
