function scrollToSection(event, sectionId) {
    event.preventDefault(); // Prevent default anchor link behavior

    const element = document.getElementById(sectionId);
    const offset = -50; // Adjust this offset as needed (e.g., for fixed header)

    // Calculate the scroll position with offset
    const y = element.getBoundingClientRect().top + window.scrollY + offset;

    // Smoothly scroll to the calculated position
    window.scrollTo({ top: y, behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
  }
  