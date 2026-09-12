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

// Oyun Durum Değişkenleri
let score = 0;
let lives = 3;
let highScore = localStorage.getItem("ntl_highscore") || 0;
let userAge = localStorage.getItem("ntl_user_age") || null;
let userAuth = localStorage.getItem("ntl_user_auth") || null;
let userName = localStorage.getItem("ntl_user_name") || "Maceracı";
let equippedTitle = localStorage.getItem("ntl_equipped_title") || "[Çaylak]";
let unlockedTitles = JSON.parse(localStorage.getItem("ntl_unlocked_titles")) || ["t0"];
let categoryProgress = JSON.parse(localStorage.getItem("ntl_cat_prog")) || { "Sanat":0, "Coğrafya":0, "Tarih":0, "Bilim":0, "Spor":0, "Genel Kültür":0 };

let currentRotation = 0;
let isSpinning = false;
let currentQuestion = null;
let currentCategoryObj = null;
let timer = 15;
let timerInterval = null;

let hasFiftyFifty = true;
let hasExtraTime = true;
let hasPickCategory = true;

// Ses Motoru (Web Audio API)
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
function playBeep(freq = 440, duration = 0.1) {
    try {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch(e) {}
}

// ==========================================
// 2. AÇILIŞ VE İLK KURULUM YÖNETİMİ
// ==========================================

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("display-highscore").textContent = highScore;
    document.getElementById("user-name").textContent = userName;
    document.getElementById("current-title-badge").textContent = equippedTitle;

    setTimeout(() => {
        const splash = document.getElementById("splash-screen");
        splash.style.opacity = "0";
        setTimeout(() => {
            splash.style.display = "none";
            checkOnboarding();
        }, 500);
    }, 1800);
});

function checkOnboarding() {
    if (!userAge) {
        openModal("age-modal");
    } else if (!userAuth) {
        openModal("auth-modal");
    } else {
        showMainGame();
    }
}

function setAgeGroup(age) {
    userAge = age;
    localStorage.setItem("ntl_user_age", age);
    closeModal("age-modal");
    if (!userAuth) {
        openModal("auth-modal");
    } else {
        showMainGame();
    }
}

function finishAuth(provider) {
    userAuth = provider;
    localStorage.setItem("ntl_user_auth", provider);
    closeModal("auth-modal");
    showMainGame();
}

function showMainGame() {
    document.getElementById("main-game").style.display = "flex";
}

// ==========================================
// 3. ÇARK DÖNDÜRME MEKANİZMASI
// ==========================================

function startSpin() {
    if (isSpinning) return;
    playBeep(300, 0.05);
    const randomIndex = Math.floor(Math.random() * categories.length);
    spinToTargetIndex(randomIndex);
}

function openCategoryPicker() {
    if (!hasPickCategory || isSpinning) return;
    openModal("modal-category-picker");
}

function spinToCategory(catName) {
    closeModal("modal-category-picker");
    if (!hasPickCategory || isSpinning) return;

    hasPickCategory = false;
    const btn = document.getElementById("pick-category-button");
    btn.classList.add("used");
    btn.textContent = "🎯 Kategori Seç (Kullanıldı)";

    const targetIdx = categories.findIndex(c => c.name === catName);
    spinToTargetIndex(targetIdx);
}

function spinToTargetIndex(index) {
    isSpinning = true;
    document.getElementById("spin-button").disabled = true;
    document.getElementById("pick-category-button").disabled = true;

    currentCategoryObj = categories[index];
    const segmentDeg = 360 / categories.length; // 60 derece
    const targetDegree = 360 - (index * segmentDeg + (segmentDeg / 2));
    const extraTurns = 360 * 5;

    currentRotation += extraTurns + ((targetDegree - (currentRotation % 360) + 360) % 360);
    const wheel = document.getElementById("wheel");
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // Çark sesi efekti
    let tickCount = 0;
    const tickInterval = setInterval(() => {
        playBeep(400 + tickCount * 15, 0.03);
        tickCount++;
        if (tickCount > 18) clearInterval(tickInterval);
    }, 150);

    setTimeout(() => {
        isSpinning = false;
        document.getElementById("spin-button").disabled = false;
        document.getElementById("pick-category-button").disabled = false;
        openQuizScreen();
    }, 3500);
}

// ==========================================
// 4. SORU VE CAN YÖNETİMİ
// ==========================================

function openQuizScreen() {
    document.getElementById("screen-wheel").style.display = "none";
    document.getElementById("screen-quiz").style.display = "flex";

    const catTag = document.getElementById("quiz-category-tag");
    catTag.textContent = currentCategoryObj.name;
    catTag.style.backgroundColor = currentCategoryObj.color;

    // Soru seç
    const list = questionBank[currentCategoryObj.name];
    currentQuestion = list[Math.floor(Math.random() * list.length)];

    document.getElementById("quiz-question-text").textContent = currentQuestion.q;

    const optButtons = document.querySelectorAll("#quiz-options-wrapper .quiz-opt-btn");
    optButtons.forEach((btn, idx) => {
        btn.textContent = currentQuestion.o[idx];
        btn.classList.remove("correct", "wrong");
        btn.style.visibility = "visible";
        btn.disabled = false;
    });

    document.getElementById("quiz-next-button").style.display = "none";
    startQuestionTimer();
}

function startQuestionTimer() {
    timer = 15;
    document.getElementById("quiz-timer").textContent = timer;
    const bar = document.getElementById("quiz-progress-bar");
    bar.style.width = "100%";

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("quiz-timer").textContent = timer;
        bar.style.width = `${(timer / 15) * 100}%`;

        if (timer <= 0) {
            clearInterval(timerInterval);
            loseLife();
            revealCorrectAnswer();
        }
    }, 1000);
}

function handleAnswer(selectedIdx) {
    clearInterval(timerInterval);
    const optButtons = document.querySelectorAll("#quiz-options-wrapper .quiz-opt-btn");
    optButtons.forEach(btn => btn.disabled = true);

    if (selectedIdx === currentQuestion.a) {
        // DOĞRU CEVAP
        playBeep(650, 0.2);
        optButtons[selectedIdx].classList.add("correct");
        score += 10;
        document.getElementById("display-score").textContent = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("ntl_highscore", highScore);
            document.getElementById("display-highscore").textContent = highScore;
        }

        // İlerleme & Unvan Kontrolü
        categoryProgress[currentCategoryObj.name] = (categoryProgress[currentCategoryObj.name] || 0) + 1;
        localStorage.setItem("ntl_cat_prog", JSON.stringify(categoryProgress));
        checkTitleUnlocks();

        document.getElementById("quiz-next-button").style.display = "block";
    } else {
        // YANLIŞ CEVAP
        playBeep(180, 0.3);
        optButtons[selectedIdx].classList.add("wrong");
        revealCorrectAnswer();
        loseLife();
    }
}

function revealCorrectAnswer() {
    const optButtons = document.querySelectorAll("#quiz-options-wrapper .quiz-opt-btn");
    optButtons[currentQuestion.a].classList.add("correct");
    optButtons.forEach(btn => btn.disabled = true);
    if (lives > 0) {
        document.getElementById("quiz-next-button").style.display = "block";
    }
}

function loseLife() {
    lives--;
    updateLivesUI();
    if (lives <= 0) {
        setTimeout(showGameOver, 1200);
    }
}

function updateLivesUI() {
    const hearts = document.querySelectorAll("#lives-display .heart-icon");
    hearts.forEach((h, idx) => {
        if (idx >= lives) {
            h.classList.add("lost");
        } else {
            h.classList.remove("lost");
        }
    });
}

function goToNextQuestion() {
    document.getElementById("screen-quiz").style.display = "none";
    document.getElementById("screen-wheel").style.display = "flex";
}

// ==========================================
// 5. JOKERLER
// ==========================================

function useFiftyFifty() {
    if (!hasFiftyFifty) return;
    hasFiftyFifty = false;
    const btn = document.getElementById("lifeline-fifty");
    btn.classList.add("used");
    playBeep(500, 0.1);

    const wrongIndexes = [];
    currentQuestion.o.forEach((_, idx) => {
        if (idx !== currentQuestion.a) wrongIndexes.push(idx);
    });

    wrongIndexes.sort(() => Math.random() - 0.5);
    const optButtons = document.querySelectorAll("#quiz-options-wrapper .quiz-opt-btn");
    optButtons[wrongIndexes[0]].style.visibility = "hidden";
    optButtons[wrongIndexes[1]].style.visibility = "hidden";
}

function useExtraTime() {
    if (!hasExtraTime) return;
    hasExtraTime = false;
    const btn = document.getElementById("lifeline-time");
    btn.classList.add("used");
    playBeep(500, 0.1);

    timer += 10;
    document.getElementById("quiz-timer").textContent = timer;
    document.getElementById("quiz-progress-bar").style.width = "100%";
}

// ==========================================
// 6. OYUN BİTTİ VE YENİDEN BAŞLATMA
// ==========================================

function showGameOver() {
    document.getElementById("screen-quiz").style.display = "none";
    document.getElementById("screen-wheel").style.display = "none";
    document.getElementById("screen-gameover").style.display = "flex";

    document.getElementById("go-score").textContent = score;
    document.getElementById("go-highscore").textContent = highScore;
}

function restartGame() {
    score = 0;
    lives = 3;
    hasFiftyFifty = true;
    hasExtraTime = true;
    hasPickCategory = true;

    document.getElementById("display-score").textContent = "0";
    updateLivesUI();

    document.getElementById("lifeline-fifty").classList.remove("used");
    document.getElementById("lifeline-time").classList.remove("used");
    const pickBtn = document.getElementById("pick-category-button");
    pickBtn.classList.remove("used");
    pickBtn.textContent = "🎯 Kategori Seç";

    document.getElementById("screen-gameover").style.display = "none";
    document.getElementById("screen-wheel").style.display = "flex";
}

// ==========================================
// 7. UNVANLAR VE AYARLAR
// ==========================================

function checkTitleUnlocks() {
    let totalCorrect = Object.values(categoryProgress).reduce((a, b) => a + b, 0);

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
            ${isUnlocked 
                ? `<button class="title-use-btn" onclick="equipTitle('${t.name}')">${isEquipped ? 'Kuşanıldı' : 'Kuşan'}</button>`
                : `<span style="font-size:11px; color:#777;">🔒 Kilitli</span>`
            }
        `;
        list.appendChild(card);
    });
    openModal("modal-titles");
}

function equipTitle(titleName) {
    equippedTitle = titleName;
    localStorage.setItem("ntl_equipped_title", titleName);
    document.getElementById("current-title-badge").textContent = titleName;
    openTitlesModal();
}

function openSettingsModal() {
    document.getElementById("settings-name-input").value = userName;
    document.getElementById("settings-auth-type").textContent = userAuth || 'Misafir';
    openModal("modal-settings");
}

function switchAuth(provider) {
    userAuth = provider;
    localStorage.setItem("ntl_user_auth", provider);
    document.getElementById("settings-auth-type").textContent = provider;
    alert(`Hesabınız başarıyla ${provider} ile eşlendi!`);
}

function saveSettings() {
    const val = document.getElementById("settings-name-input").value.trim();
    if (val.length > 0) {
        userName = val;
        localStorage.setItem("ntl_user_name", userName);
        document.getElementById("user-name").textContent = userName;
    }
    closeModal("modal-settings");
}

// Modal Yardımcıları
function openModal(id) { document.getElementById(id).style.display = "flex"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }