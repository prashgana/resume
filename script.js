/**
 * Resume site interactivity
 * - Highlights the active nav link as the user scrolls through sections
 * - Uses IntersectionObserver for efficient scroll tracking
 */

(function () {
  'use strict';

  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  if (!navLinks.length || !sections.length) return;

  // Map section id -> nav link element
  const linkMap = new Map();
  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    linkMap.set(id, link);
  });

  // Track which section is currently most visible
  const visibleSections = new Set();

  function updateActiveLink() {
    // Find the topmost visible section
    let activeId = null;
    sections.forEach(section => {
      if (visibleSections.has(section.id)) {
        if (!activeId) activeId = section.id;
      }
    });

    navLinks.forEach(link => link.classList.remove('active'));
    if (activeId && linkMap.has(activeId)) {
      linkMap.get(activeId).classList.add('active');
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });
      updateActiveLink();
    },
    {
      rootMargin: '-64px 0px -40% 0px', // account for sticky header height
      threshold: 0
    }
  );

  sections.forEach(section => observer.observe(section));

})();
