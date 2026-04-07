const page = document.body.dataset.page;
const feedback = document.getElementById('auth-feedback');

function setFeedback(payload, isError = false) {
  if (!feedback) {
    return;
  }

  feedback.textContent = JSON.stringify(payload, null, 2);
  feedback.classList.toggle('error', isError);
}

function goToDashboard() {
  window.location.href = '/dashboard';
}

function goToLogin() {
  window.location.href = '/login';
}

async function submitAuth(endpoint, body) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw payload;
  }

  return payload;
}

async function hasSession() {
  try {
    const response = await fetch('/api/me');
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function handleSessionRedirect() {
  const authenticated = await hasSession();

  if (authenticated && (page === 'login' || page === 'register')) {
    goToDashboard();
  }

  if (!authenticated && page === 'dashboard') {
    goToLogin();
  }
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(loginForm).entries());

    setFeedback({ message: 'Validando credenciais...' });

    try {
      const payload = await submitAuth('/api/login', body);
      setFeedback(payload);
      goToDashboard();
    } catch (error) {
      setFeedback(error, true);
    }
  });
}

const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(registerForm).entries());

    setFeedback({ message: 'Criando conta...' });

    try {
      const payload = await submitAuth('/api/register', body);
      setFeedback(payload);
      goToDashboard();
    } catch (error) {
      setFeedback(error, true);
    }
  });
}

handleSessionRedirect();
