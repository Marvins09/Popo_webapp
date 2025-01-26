document.getElementById('search-button').addEventListener('click', () => {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const productItems = document.querySelectorAll('.product-item');

  productItems.forEach(item => {
      const productName = item.querySelector('.product-details h2').textContent.toLowerCase();
      if (productName.includes(searchTerm)) {
          item.style.display = 'block';
      } else {
          item.style.display = 'none';
      }
  });
});