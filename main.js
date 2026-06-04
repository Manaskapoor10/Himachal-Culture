// ====================== DISTRICT DATA ======================

// Enhanced Auto Hide Navbar
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling Down
        if (scrollTop > 120) {
            navbar.style.transform = 'translateY(-100%)';
        }
    } else {
        // Scrolling Up
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

// ====================== GALLERY IMAGES ======================
const galleryImages = [
    { src: "images/fort.jpg", alt: "Himalayan Valley" },
    { src: "images/dham.jpg", alt: "Nati Dance" },
    { src: "e", alt: "Kinnaur Village" },
    { src: "ra", alt: "Kullu Dussehra" },
    { src: "", alt: "Chamba Rumal" },
    { src: "", alt: "Kangra Painting" },
    { src: "", alt: "Spiti Monastery" },
    { src: "", alt: "Snowy Himalayas" }
];

// ====================== QUIZ QUESTIONS ======================
const quizQuestions = [{
        question: "Which art form is Kangra famous for?",
        options: ["Chamba Rumal", "Kangra Miniature Painting", "Thangka Art", "Wood Carving"],
        answer: 1
    },
    {
        question: "What is the famous festival of Kullu?",
        options: ["Minjar Mela", "Phulech", "Kullu Dussehra", "Losar"],
        answer: 2
    },
    {
        question: "Where is jakhu temple is located?",
        options: ["kangra", "Chamba", "Shimla", "Lahaul"],
        answer: 2
    },
    {
        question: "What is the traditional dance of Himachal?",
        options: ["Bhangra", "Nati", "Garba", "Kathak"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let currentAudio = null;

// ====================== RENDER DISTRICTS ======================
function renderDistricts(filteredDistricts = districts) {
    const container = document.getElementById('districtGrid');
    if (!container) return;
    container.innerHTML = '';

    filteredDistricts.forEach((district, index) => {
        const cardHTML = `
            <div onclick="showModal(${index})" class="district-card bg-white dark:bg-gray-700 rounded-3xl overflow-hidden shadow-lg cursor-pointer">
                <img src="${district.image}" class="w-full h-56 object-cover" alt="${district.name}">
                <div class="p-6">
                    <h3 class="text-2xl font-bold heading-font">${district.name}</h3>
                    <p class="text-emerald-700 dark:text-emerald-400 text-xl">${district.devnagari}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mt-3">${district.famous}</p>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

// ====================== DISTRICT MODAL ======================

function showModal(index) {
    const d = districts[index];
    document.getElementById('modalImage').src = d.image;
    document.getElementById('modalName').textContent = d.name;
    document.getElementById('modalDevnagari').textContent = d.devnagari;
    document.getElementById('modalDesc').textContent = d.desc;
    document.getElementById('districtModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('districtModal').classList.add('hidden');
}

// ====================== GALLERY ======================
function renderGallery() {
    const container = document.getElementById('galleryGrid');
    if (!container) return;
    container.innerHTML = '';

    galleryImages.forEach(img => {
        const html = `
            <div onclick="showImageModal('${img.src}')" class="cursor-pointer overflow-hidden rounded-2xl">
                <img src="${img.src}" class="w-full h-full object-cover hover:scale-110 transition duration-500" alt="${img.alt}">
            </div>
        `;
        container.innerHTML += html;
    });
}

function showImageModal(src) {
    document.getElementById('modalImageFull').src = src;
    document.getElementById('imageModal').classList.remove('hidden');
}

function closeImageModal() {
    document.getElementById('imageModal').classList.add('hidden');
}

// ====================== CULTURAL QUIZ ======================
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('nextBtn').classList.add('hidden');
    loadQuestion();
}

function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    document.getElementById('questionText').textContent = q.question;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl hover:bg-emerald-50 dark:hover:bg-gray-600 transition";
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const correct = quizQuestions[currentQuestion].answer;
    const buttons = document.querySelectorAll('#optionsContainer button');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) btn.classList.add('bg-emerald-100', 'dark:bg-emerald-700', 'border-emerald-500');
        if (i === selectedIndex && i !== correct) btn.classList.add('bg-red-100', 'dark:bg-red-700');
    });

    if (selectedIndex === correct) score++;
    document.getElementById('nextBtn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
        document.getElementById('nextBtn').classList.add('hidden');
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const container = document.getElementById('quizContainer');
    container.innerHTML = `
        <div class="text-center py-10">
            <h3 class="text-4xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">Quiz Completed!</h3>
            <p class="text-6xl font-bold text-emerald-600 mb-2">${percentage}%</p>
            <p class="text-xl mb-8">You got ${score} out of ${quizQuestions.length} correct</p>
            <button onclick="startQuiz()" class="btn-primary px-10 py-4 text-lg">Restart Quiz</button>
        </div>
    `;
}

// ====================== MUSIC PLAYER ======================
// ====================== MUSIC PLAYER ======================
// ← Only ONE declaration

const songUrls = [
    "videos/natti.mp3",
    "videos/SHIMLA.mp3",
    "videos/chamba.mp3",
    "videos/himachal.mp3"

];

function playSong(index) {
    console.log(`Playing song index: ${index} → ${songUrls[index]}`);

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(songUrls[index]);

    currentAudio.play()
        .then(() => console.log("✅ Music Started"))
        .catch(err => {
            console.error("Play Error:", err);
            alert("Cannot play song. Check console (F12) for details.");
        });
}

function stopMusic() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        console.log("⏹ Music Stopped");
    }
}

function stopMusic() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        console.log("⏹ Music stopped");
    }
}
// Optional: Add this to stop music when user leaves the page
window.addEventListener('beforeunload', () => {
    if (currentAudio) currentAudio.pause();
});

// ====================== DARK MODE ======================
const nav = document.querySelector(".nav-bar")

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');

    const icon = document.getElementById('darkIcon');
    if (icon) {
        if (document.documentElement.classList.contains('dark')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            nav.style.color = "black";
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// ====================== SNOW PARTICLE EFFECT ======================
function createSnowEffect() {
    const container = document.getElementById('snow-container');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 4 + 1.5;
            this.speed = Math.random() * 2 + 0.8;
        }
        update() {
            this.y += this.speed;
            if (this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#a5f3fc' : '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 140; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ====================== SCROLL FEATURES ======================
function handleScroll() {
    const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    const backToTop = document.getElementById('backToTop');
    if (backToTop) backToTop.style.display = window.scrollY > 600 ? 'flex' : 'none';
}

// ====================== LIVE SEARCH ======================
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const filtered = districts.filter(d =>
            d.name.toLowerCase().includes(term) ||
            d.famous.toLowerCase().includes(term)
        );
        renderDistricts(filtered);
    });
}

// ====================== INITIALIZE EVERYTHING ======================
function initializeWebsite() {
    renderDistricts();
    renderGallery();
    createSnowEffect();
    setupSearch();
    startQuiz(); // Start quiz automatically

    window.addEventListener('scroll', handleScroll);

    console.log('%c✅ Himachal Virasat Website Loaded Successfully!', 'color: #10b981; font-size: 18px; font-weight: bold');
}

// Load website
document.addEventListener('DOMContentLoaded', initializeWebsite);
// Get elements
const temples = [{
        title: "Churdhar Temple",
        video: "videos/chd.mp4", // ← Change this
        description: "Churdhar is one of the highest temples in Himachal Pradesh, dedicated to Lord Shiva. Located at 12,000 feet, it offers breathtaking panoramic views of the Himalayas."
    },
    {
        title: "Hadimba Temple",
        video: "videos/hd.mp4",
        description: "The ancient wooden temple of Goddess Hadimba, located in Manali. Known for its unique architecture and mythological importance from the Mahabharata."
    },
    {
        title: "Jwala Ji Temple",
        video: "videos/jw.mp4",
        description: "The eternal flame temple in Kangra where natural flames have been burning for centuries, considered one of the most powerful Shakti Peeths."
    },
    {
        title: "Jakhu Temple",
        video: "videos/jv.mp4",
        description: "Famous Hanuman Temple in Shimla situated at the highest point of the city."
    },
    {
        title: "Tara Devi Temple",
        video: "videos/tara.mp4",
        description: "One of the most revered Shakti Peeths in Shimla, dedicated to Goddess Tara."
    },
    {
        title: "Bankhandi Maa Baglamukhi",
        video: "videos/bagvid.mp4",
        description: "Dedicated to Goddess Baglamukhi, this temple is known for its immense spiritual power, victory, and protection from enemies."
    },
    {
        title: "manimahesh kailash ",
        video: "videos/kailash.mp4",
        description: "Believed to be the abode of lord shiva,"
    }
];

function openTempleModal(index) {
    const temple = temples[index];

    document.getElementById('modalTitle').textContent = temple.title;
    document.getElementById('modalDescription').textContent = temple.description;

    const video = document.getElementById('templeVideo');
    video.src = temple.video;
    video.play();

    const modal = document.getElementById('templeModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('templeModal');
    const video = document.getElementById('templeVideo');

    video.pause();
    video.src = '';
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Close modal when clicking outside
document.getElementById('templeModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});