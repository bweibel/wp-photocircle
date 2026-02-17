(function () {
  // Function to toggle the "is-scrolling" class on the body
  function toggleBodyClassOnScroll() {
    // Add or remove the class based on scroll position
    if (window.pageYOffset > 0) {
      document.body.classList.add('is-scrolling');
    } else {
      document.body.classList.remove('is-scrolling');
    }
  }

  // Listen for the scroll event
  window.addEventListener('scroll', toggleBodyClassOnScroll);

  // Also check on initial page load, in case the page opens at a non-zero scroll position
  document.addEventListener('DOMContentLoaded', toggleBodyClassOnScroll);
})();