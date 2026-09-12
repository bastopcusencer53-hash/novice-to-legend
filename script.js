// ==========================================
// 1. OYUN VERİTABANI & DEĞİŞKENLER
// ==========================================

const categories = [
    { name: "Sanat", color: "#ff6b6b" },
    { name: "Coğrafya", color: "#ff9f43" },
    { name: "Tarih", color: "#feca57" },
    { name: "Bilim", color: "#1dd1a1" },
    { name: "Spor", color: "#48dbfb" },
    { name: "Genel Kültür", color: "#9b59b6" }
];

const questionBank = {
    "Sanat": [
        { q: "Mona Lisa tablosu hangi ünlü ressama aittir?", o: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Salvador Dalí"], a: 0 },
        { q: "Düşünen Adam heykeli hangi heykeltıraşa aittir?", o: ["Michelangelo", "Auguste Rodin", "Donatello", "Bernini"], a: 1 },
        { q: "Yıldızlı Gece tablosunu kim yapmıştır?", o: ["Claude Monet", "Vincent van Gogh", "Rembrandt", "Edvard Munch"], a: 1 },
        { q: "Kaplumbağa Terbiyecisi tablosu kime aittir?", o: ["Osman Hamdi Bey", "Şeker Ahmet Paşa", "İbrahim Çallı", "Abidin Dino"], a: 0 },
        { q: "9. Senfoni'yi besteleyen ünlü besteci kimdir?", o: ["Beethoven", "Mozart", "Chopin", "Vivaldi"], a: 0 }
    ],
    "Coğrafya": [
        { q: "Dünyanın en derin noktası neresidir?", o: ["Bermuda Çukuru", "Mariana Çukuru", "Baykal Gölü", "Cebelitarık"], a: 1 },
        { q: "Türkiye'nin en büyük gölü hangisidir?", o: ["Tuz Gölü", "Beyşehir Gölü", "Van Gölü", "İznik Gölü"], a: 2 },
        { q: "Dünyanın en uzun nehri hangisidir?", o: ["Amazon", "Nil", "Tuna", "Fırat"], a: 1 },
        { q: "Japonya'nın başkenti neresidir?", o: ["Kyoto", "Osaka", "Tokyo", "Hiroşima"], a: 2 },
        { q: "Yüzölçümü bakımından dünyanın en büyük ülkesi hangisidir?", o: ["Kanada", "Çin", "ABD", "Rusya"], a: 3 }
    ],
    "Tarih": [
        { q: "Türkiye Cumhuriyeti hangi yılda ilan edilmiştir?", o: ["1920", "1923", "1924", "1938"], a: 1 },
        { q: "İstanbul'un fethi hangi yıl gerçekleşmiştir?", o: ["1071", "1299", "1453", "1517"], a: 2 },
        { q: "İlk Türk alfabesi hangisidir?", o: ["Uygur", "Göktürk (Orhun)", "Arap", "Latin"], a: 1 },
        { q: "Osmanlı Devleti'nin kurucusu kimdir?", o: ["Orhan Gazi", "Osman Gazi", "Ertuğrul Gazi", "I. Murad"], a: 1 },
        { q: "Fransız İhtilali hangi yılda başlamıştır?", o: ["1776", "1789", "1804", "1815"], a: 1 }
    ],
    "Bilim": [
        { q: "Güneş Sistemi'ndeki en büyük gezegen hangisidir?", o: ["Mars", "Satürn", "Jüpiter", "Neptün"], a: 2 },
        { q: "Suyun kimyasal formülü nedir?", o: ["CO2", "H2O", "O2", "NaCl"], a: 1 },
        { q: "Işık hızı saniyede yaklaşık kaç kilometredir?", o: ["150.000 km", "300.000 km", "500.000 km", "1.000.000 km"], a: 1 },
        { q: "Periyodik tabloda 'Au' simgesi hangi elementi temsil eder?", o: ["Gümüş", "Bakır", "Altın", "Demir"], a: 2 },
        { q: "İnsan vücudundaki en büyük organ hangisidir?", o: ["Karaciğer", "Deri", "Beyin", "Akciğer"], a: 1 }
    ],
    "Spor": [
        { q: "Olimpiyat halkalarında kaç farklı renk halka bulunur?", o: ["4", "5", "6", "7"], a: 1 },
        { q: "Futbolda standart bir maç kaç dakika oynanır?", o: ["80", "90", "100", "120"], a: 1 },
        { q: "Grand Slam terimi hangi spor dalı ile ilgilidir?", o: ["Golf", "Tenis", "Voleybol", "Hentbol"], a: 1 },
        { q: "Maraton koşusunun standart mesafesi kaç kilometredir?", o: ["21 km", "30 km", "42 km", "50 km"], a: 2 },
        { q: "Voleybolda sahada bir takımdan kaç oyuncu bulunur?", o: ["5", "6", "7", "8"], a: 1 }
    ],
    "Genel Kültür": [
        { q: "Pusulada 'N' harfi hangi yönü gösterir?", o: ["Güney", "Doğu", "Batı", "Kuzey"], a: 3 },
        { q: "Bir üçgenin iç açıları toplamı kaç derecedir?", o: ["90°", "180°", "270°", "360°"], a: 1 },
        { q: "Satranç tahtasında toplam kaç kare bulunur?", o: ["32", "64", "100", "128"], a: 1 },
        { q: "Gökkuşağında kaç renk bulunur?", o: ["5", "6", "7", "8"], a: 2 },
        { q: "Dünyanın en yüksek binası Burj Khalifa hangi şehirdedir?", o: ["Doha", "Riyad", "Dubai", "Abu Dabi"], a: 2 }
    ]
};

const titlesData = [
    { id: "t0", name: "[Çaylak]", req: 0, desc: "Maceraya ilk adım" },
    { id: "t1", name: "[Tarih Meraklısı]", req: 3, cat: "Tarih", desc: "3 Tarih sorusu bil" },
    { id: "t2", name: "[Bilim Dahisi]", req: 3, cat: "Bilim", desc: "3 Bilim sorusu bil" },
    { id: "t3", name: "[Gezgin Kaşif]", req: 3, cat: "Coğrafya", desc: "3 Coğrafya sorusu bil" },
    { id: "t4", name: "[Sanat Sever]", req: 3, cat: "Sanat", desc: "3 Sanat sorusu bil" },
    { id: "t5", name: "[Efsane Kaptan]", req: 3, cat: "Spor", desc: "3 Spor sorusu bil" },
    { id: "t6", name: "[Bilge Üstat]", req: 10, cat: "all", desc: "Toplam 10 doğruya ulaş" }
];

let score = 0;
let correctCountInRun = 0;
let lives = 3;
let highScore = localStorage.getItem("ntl_highscore") || 0;
let userAge = localStorage.getItem("ntl_user_age") || null;
let userAuth = localStorage.getItem("ntl_user_auth") || null;
let userName = localStorage.getItem("ntl_user_name") || "Maceracı";
let equippedTitle = localStorage.getItem("ntl_equipped_title") || "[Çaylak]";
let unlockedTitles = JSON.parse(localStorage.getItem("ntl_unlocked_titles") || '["t0"]');
let categoryProgress = JSON.parse(localStorage.getItem("ntl_cat_prog") || '{"Sanat":0,"Coğrafya":0,"Tarih":0,"Bilim":0,"Spor":0,"Genel Kültür":0}');

let currentRotation = 0;
let isSpinning = false;
let currentQuestion = null;
let currentCategoryObj = null;
let timer = 15;
let timerInterval = null;

let hasFiftyFifty = true;
let hasExtraTime = true;
let hasPickCategoryUsed = false;

// ==========================================
// SES MOTORU (TRIVIA CRACK AKORLARI)
// ==========================================
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function playWheelClickSound() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
    } catch(e) {}
}

function playCorrectVictorySound() {
    try {
        const ctx = getAudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.value = freq;
            const startTime = ctx.currentTime + idx * 0.09;
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.35);
        });
    } catch(e) {}
}

function playWrongSound() {
    try {
        const ctx = getAudioContext();
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(329.63, ctx.currentTime);
        gain1.gain.setValueAtTime(0.18, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 0.16);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(246.94, ctx.currentTime + 0.16);
        gain2.gain.setValueAtTime(0.20, ctx.currentTime + 0.16);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime + 0.16);
        osc2.stop(ctx.currentTime + 0.42);
    } catch(e) {}
}

// ==========================================
// 2. MODAL VE ARAYÜZ YARDIMCILARI
// ==========================================

function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "flex";
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
}

function updateBadgeUI() {
    const badgeTextEl = document.getElementById("badge-text");
    if (badgeTextEl) badgeTextEl.textContent = equippedTitle;
}

function updateLivesUI() {
    const hearts = document.querySelectorAll("#lives-display .heart-icon");
    hearts.forEach((h, idx) => {
        if (idx >= lives) h.classList.add("lost");
        else h.classList.remove("lost");
    });
}

function updatePickerButtonUI() {
    const btn = document.getElementById("pick-category-button");
    if (!btn) return;
    if (hasPickCategoryUsed) {
        btn.className = "btn-picker used";
        btn.textContent = "🎯 Kategori Seç (Kullanıldı)";
    } else if (correctCountInRun >= 3) {
        btn.className = "btn-picker unlocked";
        btn.textContent = "🎯 Kategori Seç (AÇIK)";
    } else {
        btn.className = "btn-picker locked";
        btn.textContent = `🔒 Kategori Seç (${correctCountInRun}/3 Doğru)`;
    }
}

function showMainGame() {
    const mainGame = document.getElementById("main-game");
    if (mainGame) mainGame.style.display = "flex";
    updatePickerButtonUI();
}

function checkOnboarding() {
    if (!userAge) {
        openModal("age-modal");
    } else if (!userAuth) {
        openModal("auth-modal");
    } else {
        showMainGame();
    }
}

// ==========================================
// 3. ÇARK MEKANİZMASI
// ==========================================

function startSpin() {
    if (isSpinning) return;
    const randomIndex = Math.floor(Math.random() * categories.length);
    spinToTargetIndex(randomIndex);
}

function openCategoryPicker() {
    if (isSpinning || hasPickCategoryUsed || correctCountInRun < 3) return;
    openModal("modal-category-picker");
}

function spinToCategory(catName) {
    closeModal("modal-category-picker");
    if (isSpinning || hasPickCategoryUsed) return;

    hasPickCategoryUsed = true;
    updatePickerButtonUI();

    const targetIdx = categories.findIndex(c => c.name === catName);
    spinToTargetIndex(targetIdx);
}

function spinToTargetIndex(index) {
    isSpinning = true;
    const spinBtn = document.getElementById("spin-button");
    const pickBtn = document.getElementById("pick-category-button");
    if (spinBtn) spinBtn.disabled = true;
    if (pickBtn) pickBtn.disabled = true;

    currentCategoryObj = categories[index];
    const segmentDeg = 360 / categories.length;
    const targetDegree = 360 - (index * segmentDeg + (segmentDeg / 2));
    const extraTurns = 360 * 5;

    currentRotation += extraTurns + ((targetDegree - (currentRotation % 360) + 360) % 360);
    const wheel = document.getElementById("wheel");
    if (wheel) wheel.style.transform = `rotate(${currentRotation}deg)`;

    const totalSpinTime = 3400;
    const clickDelays = [];
    let elapsed = 0;
    let currentInterval = 70;

    while (elapsed < totalSpinTime) {
        clickDelays.push(elapsed);
        const progress = elapsed / totalSpinTime;
        currentInterval = 70 + Math.pow(progress, 3) * 350;
        elapsed += currentInterval;
    }

    clickDelays.forEach(delay => {
        setTimeout(() => {
            playWheelClickSound();
        }, delay);
    });

    setTimeout(() => {
        isSpinning = false;
        if (spinBtn) spinBtn.disabled = false;
        if (pickBtn) pickBtn.disabled = false;
        openQuizScreen();
    }, 3600);
}

// ==========================================
// 4. SORU EKRANI
// ==========================================

function openQuizScreen() {
    const wheelScreen = document.getElementById("screen-wheel");
    const quizScreen = document.getElementById("screen-quiz");
    if (wheelScreen) wheelScreen.style.display = "none";
    if (quizScreen) quizScreen.style.display = "flex";

    const catTag = document.getElementById("quiz-category-tag");
    if (catTag) {
        catTag.textContent = currentCategoryObj.name;
        catTag.style.backgroundColor = currentCategoryObj.color;
    }

    const list = questionBank[currentCategoryObj.name];
    currentQuestion = list[Math.floor(Math.random() * list.length)];

    const qText = document.getElementById("quiz-question-text");
    if (qText) qText.textContent = currentQuestion.q;

    const optButtons = document.querySelectorAll("#quiz-options-wrapper .quiz-opt-btn");
    optButtons.forEach((btn, idx) => {
        btn.textContent = currentQuestion.o[idx];
        btn.classList.remove("correct", "wrong");
        btn.style.visibility = "visible";
        btn.disabled = false;
    });

    const nextBtn = document.getElementById("quiz-next-button");
    if (nextBtn) nextBtn.style.display = "none";
    startQuestionTimer();
}

function startQuestionTimer() {
    timer = 15;
    const timerEl = document.getElementById("quiz-timer");
    const bar = document.getElementById("quiz-progress-bar");
    if (timerEl) timerEl.textContent = timer;
    if (bar) bar.style.width = "100%";

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        if (timerEl) timerEl.textContent = timer;
        if (bar) bar.style.width = `${(timer / 15) * 100}%`;

        if (timer <= 0) {
            clearInterval(timerInterval);
            playWrongSound();
            loseLife();
            revealCorrectAnswer();
        }
    }, 1000);
}