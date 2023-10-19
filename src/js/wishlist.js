window.addEventListener("load", () => {
  const form = document.querySelector("#new-wish-form");
  const inputWish = document.querySelector("#new-wish-input");
  const inputWishSolution = document.querySelector("#new-solution-input");
  const list_el = document.querySelector("#wishs");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const wish = inputWish.value;
    const solution = inputWishSolution.value;

    const wish_el = document.createElement("div");
    wish_el.classList.add("wish");

    const wish_content_el = document.createElement("div");
    wish_content_el.classList.add("content");

    wish_el.appendChild(wish_content_el);

    const wish_input_el = document.createElement("input");
    wish_input_el.classList.add("text");
    wish_input_el.type = "text";
    wish_input_el.value = wish;
    wish_input_el.setAttribute("readonly", "readonly");

    const solution_input_el = document.createElement("input");
    solution_input_el.classList.add("text");
    solution_input_el.type = "text";
    solution_input_el.value = solution;
    solution_input_el.setAttribute("readonly", "readonly");

    wish_content_el.appendChild(wish_input_el);
    wish_content_el.appendChild(solution_input_el);

    const wish_actions_el = document.createElement("div");
    wish_actions_el.classList.add("actions");

    const wish_edit_el = document.createElement("button");
    wish_edit_el.classList.add("edit");
    wish_edit_el.innerText = "Edit";

    const wish_delete_el = document.createElement("button");
    wish_delete_el.classList.add("delete");
    wish_delete_el.innerText = "Delete";

    wish_actions_el.appendChild(wish_edit_el);
    wish_actions_el.appendChild(wish_delete_el);

    wish_el.appendChild(wish_actions_el);

    list_el.appendChild(wish_el);

    inputWish.value = "";
    inputWishSolution.value = "";

    wish_edit_el.addEventListener("click", (e) => {
      if (wish_edit_el.innerText.toLowerCase() == "edit") {
        wish_edit_el.innerText = "Save";
        wish_input_el.removeAttribute("readonly");
        solution_input_el.removeAttribute("readonly");
        wish_input_el.focus();
      } else {
        wish_edit_el.innerText = "Edit";
        wish_input_el.setAttribute("readonly", "readonly");
        solution_input_el.setAttribute("readonly", "readonly");
      }
    });

    wish_delete_el.addEventListener("click", (e) => {
      list_el.removeChild(wish_el);
    });
  });
});
