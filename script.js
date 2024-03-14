const password = document.querySelector("#password");
const form = document.querySelector("form");
const eyeIcon = document.querySelector(".eye-icon");
const passwordField = document.getElementById("password");

// Function is responsible for toggling the visibility of the password field and changing the eye icon accordingly
function togglePasswordVisibility() {
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  // Change the eye icon based on password visibility
  eyeIcon.textContent = type === "password" ? "visibility" : "visibility_off";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (checkPassword() < 5) {
    return Toastify({
      text: "Error: Insecure password. Please choose a stronger password.",
      className: "warning",
    }).showToast();
  }

  return Toastify({
    text: "Thank you! The form has been sent.",
    className: "success",
  }).showToast();
  // Lastly, let's make each toast have it's own color (red/green)
});

// Function is responsible for updating the visual representation of a password strength meter based on the level of password complexity. The function takes a level parameter as input and adjusts the height, width, color, and text of various HTML elements to reflect the strength of the password
function updateInnerBar(level) {
  const passMeter = document.querySelector("#pass-meter");
  const meterOuter = document.querySelector("#meter-outer");
  const meterInner = document.querySelector("#meter-inner");
  const pwdDesc = document.querySelector("#pwd-desc");

  let weakHint = `At least 6 characters long.
                  At least one uppercase letter.
                  One lowercase letter.
                  One number.
                  One special character.`;

  if (level === 0) {
    meterOuter.style.height = "0";
    meterOuter.style.border = "none";
    passMeter.style.marginTop = "-0.9rem";
    pwdDesc.style.fontSize = "0";

    return;
  }

  passMeter.style.marginTop = "0";
  pwdDesc.style.fontSize = "0.9rem";
  meterOuter.style.height = "0.5rem";
  meterOuter.style.border = "1px solid #E0E2E9";
  meterInner.style.width = level + "%";

  if (level <= 40) {
    meterInner.style.backgroundColor = "#ff4757";
    pwdDesc.innerText = "Your password is weak";
    pwdDesc.title = weakHint;
  } else if (level > 40 && level <= 80) {
    meterInner.style.backgroundColor = "#fbc531";
    pwdDesc.innerText = "Your password is weak";
    pwdDesc.title = weakHint;
  } else {
    meterInner.style.backgroundColor = "#2ed573";
    pwdDesc.innerText = "Your password is strong";
    pwdDesc.title = "Nice!";
  }
}

// Function is responsible for validating a password input and updating a password strength meter based on the validation results
function checkPassword() {
  let value = password.value.trim();
  let level = hasMoreThan12Chars(value) + hasNumber(value) + hasSpecialChar(value) + hasUpperCase(value) + hasLowerCase(value);

  updateInnerBar(level * 20);
  return level;
}

password.addEventListener("keyup", checkPassword);

// Function checks if a given value has more than 12 characters
function hasMoreThan12Chars(value) {
  return value.length > 6;
}

// Function checks if a given string contains a numeric digit
function hasNumber(value) {
  return /\d/.test(value);
}

// Function checks if a given string contains at least one special character
function hasSpecialChar(value) {
  return /[!@#$&*()[\]/.,;:]/.test(value);
}

// Function checks if a given string contains an uppercase letter
function hasUpperCase(value) {
  return /[A-Z]/.test(value);
}

// Function checks if a given string contains at least one lowercase letter
function hasLowerCase(value) {
  return /[a-z]/.test(value);
}