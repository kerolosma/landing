/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

// Define Global Variables
const sections = document.querySelectorAll("section");
const navList = document.querySelector("#navbar__list");

// Helper Functions

// Get the position of the section relative to the viewport
const getPosition = (section) => {
  return section.getBoundingClientRect().top;
};

// Add class 'active' to section when near top of viewport
const handleActiveClass = (section) => {
  const position = getPosition(section);

  if (position <= 150 && position >= -150) {
    section.classList.add("your-active-class");
  } else {
    section.classList.remove("your-active-class");
  }
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = (sectionId) => {
  const section = document.querySelector(`#${sectionId}`);
  section.scrollIntoView({ behavior: "smooth" });
};

// Build menu
const buildNav = () => {
  let navItems = "";

  sections.forEach((section) => {
    const sectionId = section.id;
    const sectionDataNav = section.dataset.nav;

    navItems += `<li><a class="menu__link" href="#${sectionId}">${sectionDataNav}</a></li>`;
  });

  navList.innerHTML = navItems;
};

// Main Functions

// Build the navigation
buildNav();

// Scroll to section on link click
navList.addEventListener("click", (e) => {
  const target = e.target;
  const link = target.textContent;

  if (target.tagName === "A") {
    sections.forEach((section) => {
      if (section.dataset.nav === link) {
        scrollToSection(section.id);
      }
    });
  }
});

// Add class 'active' to section when near top of viewport
function setActive() {
  sections.forEach((section) => {
    const position = section.getBoundingClientRect();

    if (
      position.top <= window.innerHeight / 2 &&
      position.bottom >= window.innerHeight / 2
    ) {
      section.classList.add("your-active-class");
      const navLink = document.querySelector(`a[href="#${section.id}"]`);
      navLink.classList.add("active");
    } else {
      section.classList.remove("your-active-class");
      const navLink = document.querySelector(`a[href="#${section.id}"]`);
      navLink.classList.remove("active");
    }
  });
}

// Set sections as active
document.addEventListener("scroll", setActive);

// Smooth scroll to section when clicked
const navLinks = document.querySelectorAll(".menu__link");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
