import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function InfoTooltip({
  isOpen,
  onClose,
  title,
  name,
  icon
}) {

  return (

      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        {/* закрытие попапов. пропс onClose */}
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img src={icon} alt="знак удачи" className="popup__union-image" />
        <h2 className="popup__heading">{title}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
