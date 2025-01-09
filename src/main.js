import { signUpUser, signInUser, signOutUser } from './auth.js';

document.addEventListener('DOMContentLoaded', function () {
  const signUpButton = document.getElementById('signup');
  const loginButton = document.getElementById('login');
  const logoutButton = document.getElementById('logout');

  const modal = document.getElementById('authModal');
  const closeModal = document.getElementById('closeModal');
  const authForm = document.getElementById('authForm');
  const modalTitle = document.getElementById('modalTitle');
  const authSubmit = document.getElementById('authSubmit');
  const confirmPasswordSection = document.getElementById('confirmPasswordSection');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  let isSignUp = false; // Tracks whether the modal is for Sign Up or Login

  document.getElementById('game1').addEventListener('click', async () => {
    const user = await ensureUserIsAuthenticated();
    if (user) {
      window.location.href = './src/game1/game.html';
    }
  });

  function updateButtonVisibility() {
    const user = localStorage.getItem('user');
    if (user) {
      signUpButton.style.display = 'none';
      loginButton.style.display = 'none';
      logoutButton.style.display = 'block';
    } else {
      signUpButton.style.display = 'block';
      loginButton.style.display = 'block';
      logoutButton.style.display = 'none';
    }
  }

  function openModal(forSignUp) {
    isSignUp = forSignUp;
    modalTitle.textContent = forSignUp ? 'Sign Up' : 'Login';
    authSubmit.textContent = forSignUp ? 'Sign Up' : 'Login';

    // Show or hide the confirm password field
    if (forSignUp) {
        confirmPasswordSection.style.display = 'block';
        confirmPasswordInput.setAttribute('required', 'required');
    } else {
        confirmPasswordSection.style.display = 'none';
        confirmPasswordInput.removeAttribute('required');
    }

    modal.style.display = 'flex';
}

function closeModalHandler() {
    modal.style.display = 'none';
    authForm.reset();
}


  updateButtonVisibility();

  signUpButton.addEventListener('click', () => openModal(true));
  loginButton.addEventListener('click', () => openModal(false));

  logoutButton.addEventListener('click', async () => {
    const error = await signOutUser();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      console.log('User logged out successfully');
    }
    updateButtonVisibility();
  });

  closeModal.addEventListener('click', closeModalHandler);

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModalHandler();
    }
  });

  authForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Clear previous error messages
    usernameError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    // Validate username and password lengths
    let hasError = false;

    if (username.length < 6) {
        usernameError.textContent = 'Username must be at least 6 characters long.';
        hasError = true;
    }

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        hasError = true;
    }

    if (isSignUp) {
        const confirmPassword = confirmPasswordInput.value;
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            hasError = true;
        }
    }

    if (hasError) {
        return;
    }

    if (isSignUp) {
        const { data, error } = await signUpUser(username, password);
        if (error) {
            console.error('Error signing up:', error.message);
            if (error.message.includes('username')) {
                usernameError.textContent = error.message;
            } else {
                passwordError.textContent = error.message;
            }
        } else {
            // Automatically log in the user after successful signup
            const { data: loginData, error: loginError } = await signInUser(username, password);
            if (loginError) {
                console.error('Error logging in:', loginError.message);
                passwordError.textContent = 'Something went wrong. Please try logging in manually.';
            } else {
                //alert('Sign up and login successful!');
                updateButtonVisibility();
                closeModalHandler();
            }
        }
    } else {
        const { data, error } = await signInUser(username, password);
        if (error) {
            console.error('Error signing in:', error.message);
            if (error.message.includes('username')) {
                usernameError.textContent = 'Invalid username.';
            } else {
                passwordError.textContent = 'Invalid username or password.';
            }
        } else {
            //alert('Login successful!');
            updateButtonVisibility();
            closeModalHandler();
        }
    }
});


});

async function ensureUserIsAuthenticated() {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    alert('You must sign in first!');
    return null;
  }

  console.log('Authenticated user:', JSON.parse(storedUser));
  return JSON.parse(storedUser);
}

