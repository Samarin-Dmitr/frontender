const fixBlocks = document.querySelectorAll(".fix-block");
const body = document.body;
let disableScroll = function () {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
  let pagePosition = window.scrollY;
  fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset;
  });
  body.style.paddingRight = paddingOffset;
  body.classList.add("disable-scroll");
  body.dataset.position = pagePosition;
  body.style.top = -pagePosition + "px";
};

let enableScroll = function () {
  let pagePosition = parseInt(document.body.dataset.position, 10);
  body.style.top = "auto";
  body.classList.remove("disable-scroll");
  fixBlocks.forEach((el) => {
    el.style.paddingRight = "0px";
  });
  body.style.paddingRight = "0px";
  window.scroll({ top: pagePosition, left: 0 });
  body.removeAttribute("data-position");
};

const modalController = () => {
  const modalBtn = document.querySelectorAll("[data-modal]");
  const modalClose = document.querySelectorAll(".modal-close");
  const modal = document.querySelectorAll(".modal");
  modalBtn.forEach((item) => {
    item.addEventListener("click", function (event) {
      let $this = event.currentTarget;
      let modalId = $this.getAttribute("data-modal");
      let modal = document.getElementById(modalId);
      let modalContent = modal.querySelector(".modal-content");
      modalContent.addEventListener("click", (event) => {
        event.stopPropagation();
      });
      modal.classList.add("open");
      disableScroll();
      setTimeout(function () {
        modalContent.style.transform = "none";
        modalContent.style.opacity = "1";
      }, 1);
    });
  });
  modalClose.forEach((item) => {
    item.addEventListener("click", function (event) {
      let currentModal = event.currentTarget.closest(".modal");
      closeModal(currentModal);
    });
  });
  modal.forEach((item) => {
    item.addEventListener("click", function (event) {
      let currentModal = event.currentTarget;
      closeModal(currentModal);
    });
  });

  function closeModal(currentModal) {
    let modalContent = currentModal.querySelector(".modal-content");
    modalContent.removeAttribute("style");
    currentModal.classList.remove("open");
    setTimeout(function () {
      currentModal.classList.remove("open");
      enableScroll();
    });
  }
};
modalController();
