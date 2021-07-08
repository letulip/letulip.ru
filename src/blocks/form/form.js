const POPUP_VISIBLE = `popup--visible`;

const formSubmit = document.querySelector(`.form__submit`);
const popup = document.querySelector(`.popup`);

const popupCloseOnClick = (evt) => {
  evt.preventDefault();
  popup.classList.toggle(POPUP_VISIBLE);
};

const formSubmitOnClick = (evt) => {
  evt.preventDefault();
  popup.classList.toggle(POPUP_VISIBLE);
};

if (popup) {
  const popupClose = popup.querySelector(`.popup__close`);
  popupClose.addEventListener(`click`, popupCloseOnClick);
}

formSubmit.addEventListener(`click`, formSubmitOnClick);