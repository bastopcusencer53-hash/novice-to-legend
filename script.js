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
    if (timerEl) timerEl.textContent = String(timer);
    if (bar) bar.style.width = "100%";

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        if (timerEl) timerEl.textContent = String(timer);
        if (bar) bar.style.width = `${(timer / 15) * 100}%`;

        if (timer <= 0) {
            if (timerInterval) clearInterval(timerInterval);
            playWrongSound();
            loseLife();
            revealCorrectAnswer();
        }
    }, 1000);
}

function handleAnswer(selectedIdx) {
    if (timerInterval) clearInterval(timerInterval);
    const optButtons = document.querySelectorAll("#quiz-options-wrapper .quiz-opt-btn");
    optButtons.forEach(btn => btn.setAttribute("disabled", "true"));

    if (currentQuestion && selectedIdx === currentQuestion.a) {
        playCorrectVictorySound();
        if (optButtons[selectedIdx]) optButtons[selectedIdx].classList.add("correct");
        score += 10;
        correctCountInRun++;
        const scoreEl = document.getElementById("display-score");
        if (scoreEl) scoreEl.textContent = String(score);

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("ntl_highscore", String(highScore));
            const hsEl = document.getElementById("display-highscore");
            if (hsEl) hsEl.textContent = String(highScore);
        }

        if (currentCategoryObj) {
            categoryProgress[currentCategoryObj.name] = (categoryProgress[currentCategoryObj.name] || 0) + 1;
            localStorage.setItem("ntl_cat_prog", JSON.stringify(categoryProgress));
        }
        checkTitleUnlocks();
        updatePickerButtonUI();

        const nextBtn = document.getElementById("quiz-next-button");
        if (nextBtn) nextBtn.style.display = "block";
    } else {
        playWrongSound();
        if (optButtons[selectedIdx]) optButtons[selectedIdx].classList.add("wrong");
        revealCorrectAnswer();
        loseLife();
    }
}

function revealCorrectAnswer() {
    const optButtons = document.querySelectorAll("#quiz-options-wrapper .quiz-opt-btn");
    if (currentQuestion && optButtons[currentQuestion.a]) {
        optButtons[currentQuestion.a].classList.add("correct");
    }
    optButtons.forEach(btn => btn.setAttribute("disabled", "true"));
    if (lives > 0) {
        const nextBtn = document.getElementById("quiz-next-button");
        if (nextBtn) nextBtn.style.display = "block";
    }
}

function loseLife() {
    lives--;
    updateLivesUI();
    if (lives <= 0) {
        setTimeout(showGameOver, 1200);
    }
}

function goToNextQuestion() {
    const quizScreen = document.getElementById("screen-quiz");
    const wheelScreen = document.getElementById("screen-wheel");
    if (quizScreen) quizScreen.style.display = "none";
    if (wheelScreen) wheelScreen.style.display = "flex";
}

function useFiftyFifty() {
    if (!hasFiftyFifty || !currentQuestion) return;
    hasFiftyFifty = false;
    const btn = document.getElementById("lifeline-fifty");
    if (btn) btn.classList.add("used");

    const wrongIndexes = [];
    currentQuestion.o.forEach((_, idx) => {
        if (idx !== currentQuestion.a) wrongIndexes.push(idx);
    });

    wrongIndexes.sort(() => Math.random() - 0.5);
    const optButtons = document.querySelectorAll("#quiz-options-wrapper .quiz-opt-btn");
    if (optButtons[wrongIndexes[0]]) optButtons[wrongIndexes[0]].style.visibility = "hidden";
    if (optButtons[wrongIndexes[1]]) optButtons[wrongIndexes[1]].style.visibility = "hidden";
}

function useExtraTime() {
    if (!hasExtraTime) return;
    hasExtraTime = false;
    const btn = document.getElementById("lifeline-time");
    if (btn) btn.classList.add("used");

    timer += 10;
    const timerEl = document.getElementById("quiz-timer");
    const bar = document.getElementById("quiz-progress-bar");
    if (timerEl) timerEl.textContent = String(timer);
    if (bar) bar.style.width = "100%";
}

function showGameOver() {
    const quizScreen = document.getElementById("screen-quiz");
    const wheelScreen = document.getElementById("screen-wheel");
    const gameoverScreen = document.getElementById("screen-gameover");
    if (quizScreen) quizScreen.style.display = "none";
    if (wheelScreen) wheelScreen.style.display = "none";
    if (gameoverScreen) gameoverScreen.style.display = "flex";

    const goScore = document.getElementById("go-score");
    const goHs = document.getElementById("go-highscore");
    if (goScore) goScore.textContent = String(score);
    if (goHs) goHs.textContent = String(highScore);
}

function restartGame() {
    score = 0;
    correctCountInRun = 0;
    lives = 3;
    hasFiftyFifty = true;
    hasExtraTime = true;
    hasPickCategoryUsed = false;

    const scoreEl = document.getElementById("display-score");
    if (scoreEl) scoreEl.textContent = "0";
    updateLivesUI();
    updatePickerButtonUI();

    const fiftyBtn = document.getElementById("lifeline-fifty");
    const timeBtn = document.getElementById("lifeline-time");
    if (fiftyBtn) fiftyBtn.classList.remove("used");
    if (timeBtn) timeBtn.classList.remove("used");

    const gameoverScreen = document.getElementById("screen-gameover");
    const wheelScreen = document.getElementById("screen-wheel");
    if (gameoverScreen) gameoverScreen.style.display = "none";
    if (wheelScreen) wheelScreen.style.display = "flex";
}

function checkTitleUnlocks() {
    const totalCorrect = Object.values(categoryProgress).reduce((a, b) => a + b, 0);

    titlesData.forEach(t => {
        if (!unlockedTitles.includes(t.id)) {
            if (t.cat === "all" && totalCorrect >= t.req) {
                unlockedTitles.push(t.id);
            } else if (t.cat && (categoryProgress[t.cat] || 0) >= t.req) {
                unlockedTitles.push(t.id);
            }
        }
    });
    localStorage.setItem("ntl_unlocked_titles", JSON.stringify(unlockedTitles));
}

function openTitlesModal() {
    const list = document.getElementById("titles-container");
    if (!list) return;
    list.innerHTML = "";

    titlesData.forEach(t => {
        const isUnlocked = unlockedTitles.includes(t.id);
        const isEquipped = equippedTitle === t.name;

        const card = document.createElement("div");
        card.className = `title-item-card ${isUnlocked ? '' : 'locked'}`;
        card.innerHTML = `
            <div>
                <strong style="color:${isUnlocked ? '#00d2d3' : '#888'}">${t.name}</strong>
                <div style="font-size:10px; color:#8b8f9e;">${t.desc}</div>
            </div>
            <div>
                ${isUnlocked 
                    ? `<button class="title-use-btn" data-title="${t.name}">${isEquipped ? 'Kuşanıldı' : 'Kuşan'}</button>`
                    : `<span style="font-size:11px; color:#777;">🔒 Kilitli</span>`
                }
            </div>
        `;
        list.appendChild(card);
    });

    list.querySelectorAll(".title-use-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const titleName = btn.getAttribute("data-title");
            if (titleName) equipTitle(titleName);
        });
    });

    openModal("modal-titles");
}

function equipTitle(titleName) {
    equippedTitle = titleName;
    localStorage.setItem("ntl_equipped_title", titleName);
    updateBadgeUI();
    openTitlesModal();
}

function openSettingsModal() {
    const input = document.getElementById("settings-name-input");
    const authType = document.getElementById("settings-auth-type");
    if (input) input.value = userName;
    if (authType) authType.textContent = userAuth || "Misafir";
    openModal("modal-settings");
}

function switchAuth(provider) {
    userAuth = provider;
    localStorage.setItem("ntl_user_auth", provider);
    const authType = document.getElementById("settings-auth-type");
    if (authType) authType.textContent = provider;
    alert(`Hesabınız başarıyla ${provider} ile eşlendi!`);
}

function saveSettings() {
    const input = document.getElementById("settings-name-input");
    if (input) {
        const val = input.value.trim();
        if (val.length > 0) {
            userName = val;
            localStorage.setItem("ntl_user_name", userName);
            const unEl = document.getElementById("user-name");
            if (unEl) unEl.textContent = userName;
        }
    }
    closeModal("modal-settings");
}

// ==========================================
// BUTON TIKLAMALARI VE AÇILIŞ KAPATMA
// ==========================================

window.addEventListener("DOMContentLoaded", () => {
    const hsEl = document.getElementById("display-highscore");
    const unEl = document.getElementById("user-name");
    if (hsEl) hsEl.textContent = String(highScore);
    if (unEl) unEl.textContent = userName;
    updateBadgeUI();

    document.querySelectorAll("#age-modal .choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const age = btn.getAttribute("data-age");
            if (age) {
                userAge = age;
                localStorage.setItem("ntl_user_age", age);
                closeModal("age-modal");
                if (!userAuth) openModal("auth-modal");
                else showMainGame();
            }
        });
    });

    document.querySelectorAll("#auth-modal .auth-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const auth = btn.getAttribute("data-auth");
            if (auth) {
                userAuth = auth;
                localStorage.setItem("ntl_user_auth", auth);
                closeModal("auth-modal");
                showMainGame();
            }
        });
    });

    const pillSettings = document.getElementById("btn-open-settings-pill");
    const iconSettings = document.getElementById("btn-open-settings-icon");
    const badgeTitle = document.getElementById("current-title-badge");
    const spinBtn = document.getElementById("spin-button");
    const pickCatBtn = document.getElementById("pick-category-button");
    const nextBtn = document.getElementById("quiz-next-button");
    const fiftyBtn = document.getElementById("lifeline-fifty");
    const timeBtn = document.getElementById("lifeline-time");
    const restartBtn = document.getElementById("btn-restart-game");

    if (pillSettings) pillSettings.addEventListener("click", openSettingsModal);
    if (iconSettings) iconSettings.addEventListener("click", openSettingsModal);
    if (badgeTitle) badgeTitle.addEventListener("click", openTitlesModal);
    if (spinBtn) spinBtn.addEventListener("click", startSpin);
    if (pickCatBtn) pickCatBtn.addEventListener("click", openCategoryPicker);
    if (nextBtn) nextBtn.addEventListener("click", goToNextQuestion);
    if (fiftyBtn) fiftyBtn.addEventListener("click", useFiftyFifty);
    if (timeBtn) timeBtn.addEventListener("click", useExtraTime);
    if (restartBtn) restartBtn.addEventListener("click", restartGame);

    document.querySelectorAll("#quiz-options-wrapper .quiz-opt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const idxStr = btn.getAttribute("data-idx");
            if (idxStr !== null) {
                handleAnswer(parseInt(idxStr, 10));
            }
        });
    });

    document.querySelectorAll("#modal-category-picker .cat-choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const cat = btn.getAttribute("data-cat");
            if (cat) spinToCategory(cat);
        });
    });

    const closeCatModal = document.getElementById("btn-close-cat-modal");
    if (closeCatModal) closeCatModal.addEventListener("click", () => closeModal("modal-category-picker"));

    const closeTitlesModal = document.getElementById("btn-close-titles-modal");
    if (closeTitlesModal) closeTitlesModal.addEventListener("click", () => closeModal("modal-titles"));

    const saveSettingsBtn = document.getElementById("btn-save-settings");
    if (saveSettingsBtn) saveSettingsBtn.addEventListener("click", saveSettings);

    document.querySelectorAll(".settings-auth-actions .auth-btn-mini").forEach(btn => {
        btn.addEventListener("click", () => {
            const prov = btn.getAttribute("data-switch");
            if (prov) switchAuth(prov);
        });
    });

    // Açılış ekranını 1.5 saniye sonra kapat
    setTimeout(() => {
        const splash = document.getElementById("splash-screen");
        if (splash) {
            splash.style.opacity = "0";
            setTimeout(() => {
                splash.style.display = "none";
                checkOnboarding();
            }, 500);
        } else {
            showMainGame();
        }
    }, 1500);
});