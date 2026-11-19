// ==========================================
// 1. SMOOTH SCROLLING & SCROLL PROGRESS BAR
// ==========================================
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const header = document.querySelector('#header');
header.style.zIndex = '1000';

const progressBar = document.createElement('div');
progressBar.style.position = 'absolute';
progressBar.style.bottom = '0';
progressBar.style.left = '0';
progressBar.style.height = '4px';
progressBar.style.width = '0%';
progressBar.style.backgroundColor = '#2563eb';
progressBar.style.transition = 'width 0.1s ease-out';
header.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ==========================================
// 2. CONFETTI ANIMATION KEYFRAMES
// ==========================================
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes confettiFall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);


// ==========================================
// 3. SCROLL-REVEAL & 3D HOVER TILT ON CARDS
// ==========================================
const boxes = document.querySelectorAll('.box');

boxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(35px)';
    box.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    box.dataset.delay = (index % 4) * 150;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const box = entry.target;
            setTimeout(() => {
                box.style.opacity = '1';
                box.style.transform = 'translateY(0)';
            }, box.dataset.delay);
            observer.unobserve(box);
        }
    });
}, { threshold: 0.15 });

boxes.forEach(box => {
    observer.observe(box);

    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / 18).toFixed(2);
        const rotateY = (x / 18).toFixed(2);

        box.style.transition = 'transform 0.1s ease-out';
        box.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    box.addEventListener('mouseleave', () => {
        box.style.transition = 'transform 0.4s ease-out';
        box.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});


// ==========================================
// 4. CLICKABLE PROJECT PREVIEW MODAL (#page4)
// ==========================================
const projectDetails = {
    project1: {
        title: "Personal Portfolio",
        tags: "HTML5 • CSS3 • Flexbox",
        summary: "Your digital business card on the web. You will build a clean hero section, round profile avatar, skills badges, and clickable social links.",
        snippet: `<header class="hero">\n  <img src="me.jpg" alt="Profile">\n  <h1>Hi, I'm a Web Developer</h1>\n</header>`
    },
    project2: {
        title: "Recipe Blog Page",
        tags: "Semantic HTML • Lists • Box Model",
        summary: "Learn how to structure readable articles using ordered steps, ingredient bullet lists, prep-time badges, and clean typography.",
        snippet: `<article class="recipe">\n  <h2>5-Minute Mug Cake</h2>\n  <ul><li>4 tbsp flour</li><li>2 tbsp cocoa</li></ul>\n</article>`
    },
    project3: {
        title: "Event Landing Page",
        tags: "CSS Grid • Forms • Sticky Nav",
        summary: "Just like this WebCraft website! Combine multi-column card grids, a weekly schedule table, and a working registration form.",
        snippet: `<section class="grid-3">\n  <div class="card">Day 1: HTML</div>\n  <div class="card">Day 2: CSS</div>\n</section>`
    },
    project4: {
        title: "Responsive Menu",
        tags: "Media Queries • Mobile-First CSS",
        summary: "Master how websites adapt from wide desktop monitors down to smartphone screens without overflowing or breaking.",
        snippet: `@media (max-width: 768px) {\n  .nav-links { flex-direction: column; }\n}`
    }
};

// Create modal overlay
const modalOverlay = document.createElement('div');
modalOverlay.style.cssText = `
    display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7);
    z-index: 2000; align-items: center; justify-content: center; backdrop-filter: blur(4px);
`;
modalOverlay.innerHTML = `
    <div id="modalBox" style="background: white; color: #1e293b; width: 90%; max-width: 480px; border-radius: 14px; padding: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); position: relative; font-family: inherit;">
        <button id="closeModal" style="position: absolute; top: 16px; right: 18px; background: none; border: none; font-size: 22px; cursor: pointer; color: #64748b;">&times;</button>
        <span id="modalTags" style="color: #2563eb; font-size: 13px; font-weight: bold; text-transform: uppercase;"></span>
        <h2 id="modalTitle" style="margin: 8px 0 12px; font-size: 24px;"></h2>
        <p id="modalSummary" style="color: #475569; line-height: 1.6; font-size: 15px; margin-bottom: 16px;"></p>
        <pre style="background: #0f172a; color: #38bdf8; padding: 14px; border-radius: 8px; font-size: 13px; overflow-x: auto;"><code id="modalCode"></code></pre>
    </div>
`;
document.body.appendChild(modalOverlay);

Object.keys(projectDetails).forEach(id => {
    const cardEl = document.getElementById(id);
    if (cardEl && cardEl.parentElement) {
        const wrapper = cardEl.parentElement;
        wrapper.style.cursor = 'pointer';
        wrapper.title = 'Click to preview project';
        wrapper.addEventListener('click', () => {
            const info = projectDetails[id];
            document.getElementById('modalTags').textContent = info.tags;
            document.getElementById('modalTitle').textContent = info.title;
            document.getElementById('modalSummary').textContent = info.summary;
            document.getElementById('modalCode').textContent = info.snippet;
            modalOverlay.style.display = 'flex';
        });
    }
});

document.getElementById('closeModal').addEventListener('click', () => modalOverlay.style.display = 'none');
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.style.display = 'none';
});

// ==========================================
// 5. PERSISTENT MEMBER SIGN-UPS & SCHEDULE
// ==========================================
function launchConfetti() {
    const colors = ['#2563eb', '#38bdf8', '#f59e0b', '#10b981', '#ec4899'];
    for (let i = 0; i < 65; i++) {
        const piece = document.createElement('div');
        piece.style.cssText = `
            position: fixed; top: 0; left: ${Math.random() * 100}vw;
            width: 10px; height: 10px; background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            z-index: 3000; pointer-events: none;
            animation: confettiFall ${1.8 + Math.random() * 1.5}s linear forwards;
        `;
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3500);
    }
}

// Load saved members from localStorage (with 3 starter members)
let clubMembers = JSON.parse(localStorage.getItem('webcraft-members')) || [
    { name: "Umme K.", degree: "BSCS" },
    { name: "Ahsan A.", degree: "BSSE" },
    { name: "Areeba M.", degree: "BSIT" }
];

// Inject live member roster badge under #firsthalf list
const firstHalf = document.querySelector('#firsthalf');
const memberBox = document.createElement('div');
memberBox.style.cssText = `
    margin-top: 24px; padding: 14px 18px; border-radius: 10px;
    background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.25);
    max-width: 420px;
`;
firstHalf.appendChild(memberBox);

function renderMembers() {
    const badges = clubMembers.map(m =>
        `<span style="display:inline-block; background:#2563eb; color:white; font-size:12px; padding:4px 10px; border-radius:14px; margin:4px 4px 0 0;">
            ${m.name} (${m.degree})
        </span>`
    ).join('');

    memberBox.innerHTML = `
        <div style="font-weight: bold; font-size: 14px; color: #2563eb; margin-bottom: 6px;">
            👥 Live Club Roster (${clubMembers.length} Members Joined)
        </div>
        <div>${badges}</div>
    `;
}
renderMembers();

const joinForm = document.querySelector('#page7 form');
const originalFormHTML = joinForm.innerHTML;

function attachFormHandler() {
    const activeForm = document.querySelector('#page7 form');
    activeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const fullName = activeForm.querySelector('input[type="text"]').value.trim();
        const email = activeForm.querySelector('input[type="email"]').value.trim();
        const degree = activeForm.querySelector('select').value;

        if (fullName === "" || email === "") {
            alert("Please enter both your full name and email address before joining!");
            return;
        }

        // Save new member to localStorage
        clubMembers.push({ name: fullName, degree: degree });
        localStorage.setItem('webcraft-members', JSON.stringify(clubMembers));
        renderMembers();
        launchConfetti();

        activeForm.innerHTML = `
            <div style="text-align: center; padding: 30px 10px;">
                <h2 style="color: #1e293b; margin-bottom: 12px;">Welcome to WebCraft, ${fullName}! 🎉</h2>
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin-bottom: 18px;">
                    Your spot for the <strong>${degree}</strong> track is saved.<br>
                    Confirmation sent to <strong>${email}</strong>.
                </p>
                <button type="button" id="addAnotherBtn" style="width: auto; padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    + Register Another Student
                </button>
            </div>
        `;

        document.getElementById('addAnotherBtn').addEventListener('click', () => {
            activeForm.innerHTML = originalFormHTML;
        });
    });
}
attachFormHandler();

const scheduleRows = document.querySelectorAll('.table tr');
scheduleRows.forEach((row, index) => {
    if (index === 0) return;
    row.style.cursor = 'pointer';
    row.style.transition = 'background-color 0.25s ease';
    row.addEventListener('click', function() {
        scheduleRows.forEach((r, i) => {
            if (i !== 0) r.style.backgroundColor = '';
        });
        this.style.backgroundColor = '#dbeafe';
    });
});

// ==========================================
// 6. FLOATING DARK MODE TOGGLE (WITH MEMORY)
// ==========================================
const themeBtn = document.createElement('button');
themeBtn.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 1500;
    padding: 12px 18px; border-radius: 30px; border: none;
    background: #1e293b; color: white; font-weight: bold; font-size: 14px;
    cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.25);
    transition: transform 0.2s ease, background 0.3s ease;
`;
document.body.appendChild(themeBtn);

let isDark = localStorage.getItem('webcraft-dark') === 'true';

function applyTheme() {
    const darkBg = '#0f172a';
    const altDarkBg = '#1e293b';
    const lightText = '#f8fafc';

    header.style.backgroundColor = isDark ? altDarkBg : 'white';
    header.style.color = isDark ? lightText : 'black';
    document.getElementById('webcraft').style.color = isDark ? lightText : 'black';

    ['#page1', '#sidecontent', '#page3', '#page5', '#page7'].forEach(sel => {
        const el = document.querySelector(sel);
        if (el) {
            el.style.backgroundColor = isDark ? altDarkBg : 'whitesmoke';
            el.style.color = isDark ? lightText : '#1e293b';
        }
    });

    ['#page2', '#page4', '#page6'].forEach(sel => {
        const el = document.querySelector(sel);
        if (el) {
            el.style.backgroundColor = isDark ? darkBg : 'white';
            el.style.color = isDark ? lightText : '#1e293b';
        }
    });

    document.querySelectorAll('#step1, #step2, #step3').forEach(el => {
        el.style.backgroundColor = isDark ? darkBg : 'white';
    });

    document.querySelectorAll('.card, .head, #firsthalf h1, .faq-container summary').forEach(el => {
        el.style.color = isDark ? lightText : '#1e293b';
    });

    document.querySelectorAll('.faq-container details').forEach(el => {
        el.style.backgroundColor = isDark ? altDarkBg : 'white';
        el.style.borderColor = isDark ? '#334155' : '#c6cdd6';
    });

    themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    themeBtn.style.backgroundColor = isDark ? '#f8fafc' : '#1e293b';
    themeBtn.style.color = isDark ? '#0f172a' : 'white';
}

themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('webcraft-dark', isDark);
    applyTheme();
});

applyTheme();

// ==========================================
// 7. INTERACTIVE HERO BROWSER MOCKUP (#image)
// ==========================================
const imageBox = document.querySelector('#image');
const originalImgHTML = imageBox.innerHTML;

// Add gentle floating keyframes
const floatStyle = document.createElement('style');
floatStyle.innerText = `
    @keyframes gentleFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    #image {
        animation: gentleFloat 4s ease-in-out infinite;
        transition: transform 0.2s ease-out, box-shadow 0.3s ease;
        cursor: pointer;
        position: relative;
        box-shadow: 0 15px 35px rgba(37, 99, 235, 0.12);
    }
`;
document.head.appendChild(floatStyle);

// Add a subtle floating badge hint on the wireframe
const clickHint = document.createElement('div');
clickHint.textContent = '✨ Click to build!';
clickHint.style.cssText = `
    position: absolute; bottom: 12px; right: 14px;
    background: #2563eb; color: white; font-size: 12px; font-weight: bold;
    padding: 5px 12px; border-radius: 20px; pointer-events: none;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
`;
imageBox.appendChild(clickHint);

// 3 interactive stages when clicked
let buildStage = 0;

const stages = [
    // Stage 0: Original wireframe image
    () => {
        imageBox.innerHTML = originalImgHTML;
        clickHint.textContent = '✨ Click to add HTML';
        imageBox.appendChild(clickHint);
    },
    // Stage 1: Raw HTML tags view
    () => {
        imageBox.innerHTML = `
            <div style="height: 100%; background: #0f172a; color: #e2e8f0; font-family: monospace; padding: 18px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="display: flex; gap: 6px;">
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444;"></span>
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></span>
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981;"></span>
                    <span style="margin-left: 8px; font-size: 11px; color: #94a3b8;">index.html</span>
                </div>
                <div style="font-size: 13px; line-height: 1.7;">
                    <span style="color: #38bdf8;">&lt;div</span> <span style="color: #a78bfa;">class</span>=<span style="color: #34d399;">"card"</span><span style="color: #38bdf8;">&gt;</span><br>
                    &nbsp;&nbsp;<span style="color: #38bdf8;">&lt;h2&gt;</span>Hello, WebCraft!<span style="color: #38bdf8;">&lt;/h2&gt;</span><br>
                    &nbsp;&nbsp;<span style="color: #38bdf8;">&lt;p&gt;</span>My very first webpage.<span style="color: #38bdf8;">&lt;/p&gt;</span><br>
                    &nbsp;&nbsp;<span style="color: #38bdf8;">&lt;button&gt;</span>Launch 🚀<span style="color: #38bdf8;">&lt;/button&gt;</span><br>
                    <span style="color: #38bdf8;">&lt;/div&gt;</span>
                </div>
                <div style="font-size: 11px; color: #38bdf8;">✓ Step 1: Structure complete!</div>
            </div>
        `;
        clickHint.textContent = '🎨 Click to add CSS';
        imageBox.appendChild(clickHint);
    },
    // Stage 2: Styled live mini-website preview
    () => {
        imageBox.innerHTML = `
            <div style="height: 100%; background: linear-gradient(135deg, #2563eb, #1e1b4b); color: white; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; font-family: 'Segoe UI', sans-serif;">
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.12); padding: 6px 12px; border-radius: 8px; font-size: 12px;">
                    <span>🔒 my-first-site.netlify.app</span>
                    <span style="background: #10b981; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: bold;">LIVE</span>
                </div>
                <div style="text-align: center; my-auto;">
                    <h2 style="font-size: 22px; margin-bottom: 6px;">Hello, WebCraft! 🎉</h2>
                    <p style="font-size: 13px; color: #cbd5e1; margin-bottom: 14px;">Styled with Flexbox, gradients & JS.</p>
                    <span style="background: white; color: #1e293b; padding: 7px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block;">Built in Week 1 🚀</span>
                </div>
                <div style="font-size: 11px; color: #93c5fd;">✓ Step 2: Styled & deployed!</div>
            </div>
        `;
        clickHint.textContent = '🔄 Click to reset';
        imageBox.appendChild(clickHint);
    }
];

imageBox.addEventListener('click', () => {
    buildStage = (buildStage + 1) % stages.length;
    stages[buildStage]();
});

// Subtle 3D tilt when hovering over the browser illustration
imageBox.addEventListener('mousemove', (e) => {
    imageBox.style.animation = 'none'; // Pause float while tilting
    const rect = imageBox.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    imageBox.style.transform = `perspective(700px) rotateX(${(-y / 20).toFixed(2)}deg) rotateY(${(x / 20).toFixed(2)}deg) scale(1.03)`;
});

imageBox.addEventListener('mouseleave', () => {
    imageBox.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    imageBox.style.animation = 'gentleFloat 4s ease-in-out infinite';
});