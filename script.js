function scrollToSection(event, sectionId) {
    event.preventDefault(); // Prevent default anchor link behavior

    const element = document.getElementById(sectionId);
    const offset = -50; // Adjust this offset as needed (e.g., for fixed header)

    // Calculate the scroll position with offset
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;

    // Smoothly scroll to the calculated position
    window.scrollTo({ top: y, behavior: 'smooth' });
}