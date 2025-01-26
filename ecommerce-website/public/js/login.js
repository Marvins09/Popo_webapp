document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simulate a login process
  const users = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'client', password: 'client123', role: 'client' }
  ];

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'admin') {
          window.location.href = 'admin.html';
      } else {
          window.location.href = 'index.html';
      }
  } else {
      document.getElementById('login-error').textContent = 'Invalid username or password';
  }
});