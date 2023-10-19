document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registrationForm = document.getElementById("registration-form");
  const loginStatus = document.getElementById("login-status");
  const loggedInUser = localStorage.getItem("loggedInUser");
  var usernameInput = document.getElementById("register-username");
  var passwordInput = document.getElementById("register-password");

  if (loggedInUser) {
    // Parse informasi pengguna dari local storage
    const user = JSON.parse(loggedInUser);
    // Periksa peran pengguna dan arahkan ke halaman yang sesuai
    if (user.status_login == "on") {
      if (user.role === "admin") {
        window.location.href = "admin.html";
      } else if (user.role === "user") {
        window.location.href = "home.html";
      }
    }
  }

  // Fungsi untuk login
  async function loginUser(username, password) {
    let loginStatus = document.getElementById("login-status"); // Definisi loginStatus di sini

    try {
      const apiUrl =
        "https://652e1354f9afa8ef4b2804b8.mockapi.io/api/v1/js-assignm/users";
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Gagal mengambil data pengguna");
      }

      const users = await response.json();
      const user = users.find(
        (u) => u.name === username && u.password === password
      );

      if (user) {
        user.status_login = "on";
        // Using method PUT or PATCH for send API
        const updateResponse = await fetch(`${apiUrl}/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (updateResponse.ok) {
          // Simpan informasi login pengguna di local storage
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          loginStatus.textContent = "Sedang Login";

          // Memindahkan pengalihan halaman ke sini
          if (user.role === "admin") {
            window.location.href = "admin.html";
          } else if (user.role === "user") {
            window.location.href = "home.html";
          }
        } else {
          loginStatus.textContent =
            "Gagal memperbarui status login pengguna di API.";
          loginStatus.classList.remove("error");
          loginStatus.style.display = "block";
        }
      } else {
        loginStatus.textContent =
          "Login gagal. Periksa kembali username dan password.";
        loginStatus.classList.remove("error");
        loginStatus.style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
      loginStatus.textContent =
        "Gagal melakukan login. Check your Connection or username dan password yang benar.";
      loginStatus.classList.remove("error");
      loginStatus.style.display = "block";
    }
  }

  // Fungsi untuk registrasi/signup
  async function registerUser(username, password) {
    try {
      const apiUrl =
        "https://652e1354f9afa8ef4b2804b8.mockapi.io/api/v1/js-assignm/users";
      const user = {
        name: username,
        password: password,
        img_avatar: "https://cdn-icons-png.flaticon.com/512/5177/5177014.png",
        role: "user",
        status_login: "off",
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        var registrationStatus = document.getElementById("registrationStatus");
        registrationStatus.textContent = "Registrasi berhasil.";
        registrationStatus.classList.remove("error");
        registrationStatus.style.display = "block";
        // Set Ulang
        usernameInput.value = "";
        passwordInput.value = "";
      } else {
        var registrationStatus = document.getElementById("registrationStatus");
        registrationStatus.textContent = "Registrasi gagal.";
        registrationStatus.classList.add("error");
        registrationStatus.style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Handle Signin ketika formulir login disubmit
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    loginUser(username, password);
  });

  // Handle Signup ketika formulir registrasi disubmit
  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    registerUser(username, password);
  });
});
