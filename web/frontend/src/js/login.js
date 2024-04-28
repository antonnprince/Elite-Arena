// Get the "Sign In" button element
const signInBtn = document.querySelector('.sign-in-btn');

// Add a click event listener to the "Sign In" button
signInBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  // Redirect to index.html
  window.location.href = 'index.html';
});