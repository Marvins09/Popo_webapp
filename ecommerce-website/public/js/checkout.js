document.getElementById('checkout-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const amount = document.getElementById('amount').value;
  try {
      const response = await fetch('/process-payment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, amount })
      });
      const result = await response.json();
      if (result.success) {
          alert('Payment successful!');
      } else {
          alert('Payment failed. Please try again.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
  }
});