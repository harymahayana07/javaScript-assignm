document.addEventListener("DOMContentLoaded", function () {
  // check login
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    const userNameElement = document.getElementById("user-name");
    const loginStatusElement = document.getElementById("login-status");
    userNameElement.textContent = `${user.name}`;
    loginStatusElement.textContent = `Status Login: ${user.status_login}line`;
  } else {
    window.location.href = "index.html";
  }
  // logout
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", function () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    // update status_login menjadi "off"
    loggedInUser.status_login = "off";
    // send PUT untuk memperbarui status_login
    const apiUrl =
      "https://652e1354f9afa8ef4b2804b8.mockapi.io/api/v1/js-assignm/users";
    const updateUrl = `${apiUrl}/${loggedInUser.id}`;

    fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loggedInUser),
    })
      .then((response) => response.json())
      .then((data) => {
        // Hapus informasi login dari local storage
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
      })
      .catch((error) => console.error("Error:", error));
  });
});
