# 🌐 WebCraft. — Student Web Development Club Portal

An interactive, responsive landing page for **WebCraft**, a beginner-friendly student web development club. Built from scratch with semantic HTML5, custom CSS3 layouts, and vanilla JavaScript DOM manipulation.

🔗 **Live Demo:** [https://webcraft-club.netlify.app/](https://webcraft-club.netlify.app/)

---

## ✨ Key Features

- **Interactive 3-Stage Hero Mockup:** Click the hero browser wireframe to cycle from raw wireframe → HTML tag structure → live styled mini-website preview, complete with 3D mouse-tilt physics.
- **Typewriter Hero Animation:** Dynamic letter-by-letter headline animation with a blinking cursor and a live scroll-progress indicator integrated into the fixed navbar.
- **Interactive Project Preview Modal:** Clicking any project card (*Personal Portfolio*, *Recipe Blog Page*, *Event Landing Page*, *Responsive Menu*) launches a modal displaying project details and starter HTML/CSS code snippets.
- **Persistent Club Roster (`localStorage`):** Registration form validates user input, triggers a confetti celebration burst, and saves new members to `localStorage` so the live club roster persists across page reloads.
- **Persistent Dark / Light Mode:** Floating theme switcher that dynamically updates styles across all sections and remembers user preference via `localStorage`.
- **Responsive Design:** Adapts cleanly across desktop, tablet, and mobile viewports using CSS media queries.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic structure, accessible `<details>/<summary>` FAQ accordions, schedule tables, and form controls.
- **CSS3:** Flexbox card grids, fixed navigation with scroll-offset anchoring, custom hover transitions, and responsive `@media` breakpoints.
- **Vanilla JavaScript (ES6+):** `IntersectionObserver` scroll-reveal animations, `localStorage` state persistence, dynamic DOM injection, and event handling.

---

## 🚀 Run Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/ariesshadow/webcraft-club.git](https://github.com/ariesshadow/webcraft-club.git)
