// URL MockAPI untuk data pengguna/user
const apiUrl =
  "https://652e1354f9afa8ef4b2804b8.mockapi.io/api/v1/js-assignm/users";

// Fungsi untuk mengambil data pengguna dari API dan menampilkan semua pengguna serta yang sedang "on"
async function fetchAndDisplayUsers() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Gagal mengambil data pengguna");
    }

    const users = await response.json();

    // Menampilkan semua pengguna di halaman
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.name;
      userList.appendChild(li);
    });

    // Menampilkan hanya pengguna dengan status login "on" di halaman
    const onlineUserList = document.getElementById("onlineUserList");
    onlineUserList.innerHTML = "";

    const onlineUsers = users.filter((user) => user.status_login === "on");

    onlineUsers.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.name;
      onlineUserList.appendChild(li);
    });
  } catch (error) {
    console.error("Kesalahan:", error);
  }
}

// Panggil fungsi fetchAndDisplayUsers saat dokumen dimuat
fetchAndDisplayUsers();
