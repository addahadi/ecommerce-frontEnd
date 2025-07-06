const form = document.getElementById("form");
const registerBtn = document.getElementById("register-button");
const textSwitch = document.getElementById("switch");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const roleInput = document.getElementById("role");

const sellerSection = document.getElementById("seller-section");
const storeName = document.getElementById("store-name");
const storeLogo = document.getElementById("store-logo");
const phoneInput = document.getElementById("phone");

let isSignUp = true;

// Toggle Sign Up / Log In Mode
textSwitch.addEventListener("click", () => {
  isSignUp = !isSignUp;

  if (isSignUp) {
    textSwitch.innerText = "you have an account";
    registerBtn.innerText = "Sign Up";

    nameInput.classList.remove("hidden");
    roleInput.classList.remove("hidden");

    if (roleInput.value === "seller") {
      sellerSection.classList.add("active");
    }
  } else {
    textSwitch.innerText = "you don't have an account";
    registerBtn.innerText = "Log In";

    nameInput.classList.add("hidden");
    roleInput.classList.add("hidden");
    sellerSection.classList.remove("active");
  }
});

// Show seller fields if role is "seller"
roleInput.addEventListener("change", () => {
  sellerSection.classList.toggle("active", roleInput.value === "seller");
});

// Form Submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (isSignUp) {
    const username = nameInput.value.trim();
    const role = roleInput.value.trim();

    if (!window.validateSignUpForm(username, email, password, role)) return;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    if (role === "seller") {
      const storeNameVal = storeName.value.trim();
      const phoneVal = phoneInput.value.trim();

      if (phoneVal.length < 6) {
        alert("Phone number must be at least 6 digits long.");
        return;
      }

      formData.append("store_name", storeNameVal);
      formData.append("store_logo", storeLogo.files[0]);
      formData.append("phone", phoneVal);
    }

    try {
      const response = await fetch("http://localhost:8090/auth/signup", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Account created. Please log in.");
        isSignUp = false;
        textSwitch.click(); // switch to login mode
      } else {
        const error = await response.text();
        alert("Signup failed: " + error);
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  } else {
    if (!window.validateLoginForm(email, password)) return;

    try {
      const response = await fetch("http://localhost:8090/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "/main";
      } else {
        alert("Login failed: " + (data?.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  }
});
