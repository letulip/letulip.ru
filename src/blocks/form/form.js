const POPUP_VISIBLE = `popup--visible`;

const params = (new URL(document.location)).searchParams;
const formSubmit = document.querySelector(`.form__submit`);
const popup = document.querySelector(`.popup`);

const popupCloseOnClick = (evt) => {
  evt.preventDefault();
  popup.classList.toggle(POPUP_VISIBLE);
};

const formSubmitOnClick = () => {
  popup.classList.toggle(POPUP_VISIBLE);
};

if (popup) {
  const popupClose = popup.querySelector(`.popup__close`);
  popupClose.addEventListener(`click`, popupCloseOnClick);
}

if (params.get(`submited`)) {
  formSubmitOnClick();
}