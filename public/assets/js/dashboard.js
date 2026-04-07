const logoutButton = document.getElementById('logout-button');
const welcomeTitle = document.getElementById('welcome-title');
const welcomeSubtitle = document.getElementById('welcome-subtitle');
const authStatus = document.getElementById('auth-status');
const authUser = document.getElementById('auth-user');
const authEmail = document.getElementById('auth-email');
const profileResponse = document.getElementById('profile-response');

function setProfileResponse(payload, isError = false) {
  profileResponse.textContent = JSON.stringify(payload, null, 2);
  profileResponse.classList.toggle('error', isError);
}

function goToLogin() {
  window.location.href = '/login';
}

async function logout() {
  try {
    await fetch('/api/logout', { method: 'POST' });
  } finally {
    goToLogin();
  }
}

async function loadProfile() {
  const response = await fetch('/api/me');
  const payload = await response.json();

  if (!response.ok) {
    authStatus.textContent = 'Sessao invalida';
    setProfileResponse(payload, true);
    goToLogin();
    return;
  }

  const { user } = payload;
  welcomeTitle.textContent = `Bem-vindo, ${user.name}`;
  welcomeSubtitle.textContent = 'Seu acesso esta autenticado via JWT em cookie HTTP-only.';
  authStatus.textContent = 'Autenticado';
  authUser.textContent = user.name;
  authEmail.textContent = user.email;
  setProfileResponse(payload);
}

logoutButton.addEventListener('click', logout);
loadProfile().catch((error) => {
  setProfileResponse({ message: error.message }, true);
  authStatus.textContent = 'Erro';
});
