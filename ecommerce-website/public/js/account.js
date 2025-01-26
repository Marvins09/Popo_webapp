document.addEventListener('DOMContentLoaded', () => {
  fetchAccountDetails();
  fetchOrderHistory();

  document.getElementById('account-settings-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('username-input').value;
      const email = document.getElementById('email-input').value;
      const password = document.getElementById('password-input').value;

      try {
          const response = await fetch('/update-account', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, email, password })
          });

          if (response.ok) {
              alert('Account updated successfully');
              fetchAccountDetails();
          } else {
              alert('Error updating account');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
});

async function fetchAccountDetails() {
  try {
      const response = await fetch('/account-details');
      const data = await response.json();
      document.getElementById('username').innerText = data.username;
      document.getElementById('email').innerText = data.email;
      document.getElementById('username-input').value = data.username;
      document.getElementById('email-input').value = data.email;
  } catch (error) {
      console.error('Error:', error);
  }
}

async function fetchOrderHistory() {
  try {
      const response = await fetch('/order-history');
      const data = await response.json();
      const orderHistory = document.getElementById('order-history');
      orderHistory.innerHTML = '';
      data.orders.forEach(order => {
          const li = document.createElement('li');
          li.textContent = `Order #${order.id} - Status: ${order.status}`;
          orderHistory.appendChild(li);
      });
  } catch (error) {
      console.error('Error:', error);
  }
}