const form = document.querySelector(".form");
const dataButton = document.getElementById("data");
const result = document.querySelector(".result");
const formAlert = document.querySelector(".form-alert");
const tokenDisplay = document.querySelector(".token");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector(".username-input").value;
  const password = document.querySelector(".password-input").value;

  try {
    const response = await axios.post("http://localhost:3000/api/v1/login", {
      username,
      password,
    });

    formAlert.textContent = response.data.msg;
    tokenDisplay.textContent = `Token: ${response.data.token}`;

    
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    formAlert.textContent = error.response.data.msg;
  }
});

dataButton.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("http://localhost:3000/api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    result.textContent = response.data.secret;
  } catch (error) {
    result.textContent = error.response.data.msg;
  }
});
