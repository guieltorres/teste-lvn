export const toggleModal = (modalId: string) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    } else {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  }
};
