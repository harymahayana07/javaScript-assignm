function createWishElement(wish, solution) {
  const wish_el = document.createElement("div");
  wish_el.classList.add("wish");

  const wish_content_el = document.createElement("div");
  wish_content_el.classList.add("content");

  wish_el.appendChild(wish_content_el);

  const wish_input_el = createInputElement("text", wish, true);
  const solution_input_el = createInputElement("text", solution, true);

  wish_content_el.appendChild(wish_input_el);
  wish_content_el.appendChild(solution_input_el);

  const wish_actions_el = document.createElement("div");
  wish_actions_el.classList.add("actions");

  const wish_edit_el = createButtonElement("Edit", () => {
    toggleEditMode(wish_edit_el, wish_input_el, solution_input_el);
  });

  const wish_delete_el = createButtonElement("Delete", () => {
    deleteWishElement(wish_el);
  });

  wish_actions_el.appendChild(wish_edit_el);
  wish_actions_el.appendChild(wish_delete_el);

  wish_el.appendChild(wish_actions_el);

  return wish_el;
}

function createInputElement(type, value, readOnly) {
  const input_el = document.createElement("input");
  input_el.classList.add("text");
  input_el.type = type;
  input_el.value = value;
  input_el.setAttribute("readonly", readOnly);

  return input_el;
}

function createButtonElement(text, onClick) {
  const button_el = document.createElement("button");
  button_el.classList.add("edit");
  button_el.innerText = text;
  button_el.addEventListener("click", onClick);

  return button_el;
}

function toggleEditMode(button_el, wish_input_el, solution_input_el) {
  if (button_el.innerText.toLowerCase() === "edit") {
    button_el.innerText = "Save";
    wish_input_el.removeAttribute("readonly");
    solution_input_el.removeAttribute("readonly");
    wish_input_el.focus();
  } else {
    button_el.innerText = "Edit";
    wish_input_el.setAttribute("readonly", "readonly");
    solution_input_el.setAttribute("readonly", "readonly");
  }
}

function deleteWishElement(wish_el) {
  wish_el.parentNode.removeChild(wish_el);
}

function addWishElementToDOM(wish_el) {
  const list_el = document.querySelector("#wishs");
  list_el.appendChild(wish_el);
}

function initNewWishForm() {
  const form = document.querySelector("#new-wish-form");
  const inputWish = document.querySelector("#new-wish-input");
  const inputWishSolution = document.querySelector("#new-solution-input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const wish = inputWish.value;
    const solution = inputWishSolution.value;

    const wish_el = createWishElement(wish, solution);

    addWishElementToDOM(wish_el);

    inputWish.value = "";
    inputWishSolution.value = "";
  });
}

window.onload = () => {
  initNewWishForm();
};
