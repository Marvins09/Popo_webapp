document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Simulate a registration process
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const existingUser = users.find(user => user.username === username || user.email === email);

  if (existingUser) {
      document.getElementById('register-error').textContent = 'Username or email already exists';
  } else {
      const newUser = { username, email, password, role: 'client' };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(newUser));
      window.location.href = 'index.html';
  }
});