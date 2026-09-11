// 1. Ses Motoru (Web Audio API)
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

const soundFX = {
    tick: () => {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
    },
    correct: (comboLevel = 1) => {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        const baseFreq = 523.25 + (comboLevel - 1) * 80;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.setValueAtTime(baseFreq * 1.25, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    },
    wrong: () => {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.setValueAtTime(180, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
    },
    levelUp: () => {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1);
        osc.frequency.setValueAtTime(659.25, now + 0.2);
        osc.frequency.setValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
    },
    lifeline: () => {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
    }
};

// 2. Konfeti
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function triggerConfetti() {
    particles = [];
    const colors = ['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#ff9f43', '#00d2d3'];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2 + 50,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 1) * 12 - 3,
            size: Math.random() * 7 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10
        });
    }
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.alpha -= 0.02;
        p.rotation += p.rotSpeed;

        if (p.alpha > 0) {
            active = true;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        }
    });

    if (active) {
        requestAnimationFrame(animateConfetti);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// 3. Kullanıcı Profili & Onboarding Yönetimi
let userAge = localStorage.getItem("ntl_user_age") || null;
let userAuth = localStorage.getItem("ntl_user_auth") || null;
let userName = localStorage.getItem("ntl_user_name") || "Bilge";
let userAvatar = localStorage.getItem("ntl_user_avatar") || "🧙‍♂️";

let tempSetupAvatar = "🧙‍♂️";
let tempSettingsAvatar = userAvatar;

function initOnboarding() {
    setTimeout(() => {
        const splash = document.getElementById("splash-screen");
        if (!userAge) {
            splash.style.opacity = "0";
            setTimeout(() => { splash.style.display = "none"; }, 500);
            document.getElementById("age-modal").style.display = "flex";
        } else if (!userAuth) {
            splash.style.opacity = "0";
            setTimeout(() => { splash.style.display = "none"; }, 500);
            document.getElementById("auth-modal").style.display = "flex";
        } else if (!localStorage.getItem("ntl_profile_ready")) {
            splash.style.opacity = "0";
            setTimeout(() => { splash.style.display = "none"; }, 500);
            document.getElementById("profile-setup-modal").style.display = "flex";
        } else {
            splash.style.opacity = "0";
            setTimeout(() => { splash.style.display = "none"; }, 500);
        }
    }, 2100);
}

function saveAge(ageRange) {
    userAge = ageRange;
    localStorage.setItem("ntl_user_age", ageRange);
    document.getElementById("age-modal").style.display = "none";
    document.getElementById("auth-modal").style.display = "flex";
}

function selectAuthMethod(method) {
    userAuth = method;
    localStorage.setItem("ntl_user_auth", method);
    document.getElementById("auth-modal").style.display = "none";
    document.getElementById("profile-setup-modal").style.display = "flex";
}

function pickSetupAvatar(avatar, el) {
    tempSetupAvatar = avatar;
    document.getElementById("setup-avatar-preview").textContent = avatar;
    document.querySelectorAll("#profile-setup-modal .avatar-item").forEach(item => item.classList.remove("active"));
    el.classList.add("active");
}

function finishProfileSetup() {
    const input = document.getElementById("setup-username-input");
    const nameVal = input.value.trim();
    userName = nameVal.length > 0 ? nameVal : "Bilge";
    userAvatar = tempSetupAvatar;

    localStorage.setItem("ntl_user_name", userName);
    localStorage.setItem("ntl_user_avatar", userAvatar);
    localStorage.setItem("ntl_profile_ready", "true");

    document.getElementById("profile-setup-modal").style.display = "none";
    updateProfileUI();
}

function updateProfileUI() {
    document.getElementById("lobby-username").textContent = userName;
    document.getElementById("lobby-avatar").textContent = userAvatar;
    document.getElementById("settings-username-input").value = userName;
    document.getElementById("settings-avatar-display").textContent = userAvatar;
    document.getElementById("settings-auth-status").textContent = `Bağlantı: ${userAuth || 'Misafir'}`;
    const finalUserEl = document.getElementById("final-username-display");
    if (finalUserEl) finalUserEl.textContent = `${userAvatar} ${userName}`;
}

function toggleSettingsModal(show) {
    document.getElementById("settings-modal").style.display = show ? "flex" : "none";
    if (show) {
        tempSettingsAvatar = userAvatar;
        updateProfileUI();
    }
}

function changeSettingsAvatar(avatar, el) {
    tempSettingsAvatar = avatar;
    document.getElementById("settings-avatar-display").textContent = avatar;
    document.querySelectorAll("#settings-modal .avatar-item").forEach(item => item.classList.remove("active"));
    el.classList.add("active");
}

function linkAccount(provider) {
    userAuth = provider;
    localStorage.setItem("ntl_user_auth", provider);
    updateProfileUI();
    alert(`Hesabınız başarıyla ${provider} ile bağlandı!`);
}

function saveSettingsChanges() {
    const input = document.getElementById("settings-username-input");
    if (input.value.trim().length > 0) {
        userName = input.value.trim();
        localStorage.setItem("ntl_user_name", userName);
    }
    userAvatar = tempSettingsAvatar;
    localStorage.setItem("ntl_user_avatar", userAvatar);
    
    updateProfileUI();
    toggleSettingsModal(false);
}

// 4. Unvan Kütüphanesi
const allTitles = [
    { id: "default", name: "[Çaylak]", cat: "Genel", req: 0, tagClass: "title-tag-default", color: "#00d2d3", desc: "Yolun henüz başındaki maceracı." },
    // Tarih
    { id: "tar_1", name: "[Tarih Meraklısı]", cat: "Tarih", req: 2, tagClass: "title-tag-tarih", color: "#feca57", desc: "2 Tarih sorusunu doğru bil." },
    { id: "tar_2", name: "[Kronoloji Ustası]", cat: "Tarih", req: 5, tagClass: "title-tag-tarih", color: "#feca57", desc: "5 Tarih sorusunu doğru bil." },
    { id: "tar_3", name: "[Tarih Fatihi]", cat: "Tarih", req: 8, tagClass: "title-tag-tarih", color: "#feca57", desc: "8 Tarih sorusunu doğru bil." },
    // Coğrafya
    { id: "cog_1", name: "[Gezgin]", cat: "Coğrafya", req: 2, tagClass: "title-tag-cografya", color: "#ff9f43", desc: "2 Coğrafya sorusunu doğru bil." },
    { id: "cog_2", name: "[Kaşif]", cat: "Coğrafya", req: 5, tagClass: "title-tag-cografya", color: "#ff9f43", desc: "5 Coğrafya sorusunu doğru bil." },
    { id: "cog_3", name: "[Dünya Fatihi]", cat: "Coğrafya", req: 8, tagClass: "title-tag-cografya", color: "#ff9f43", desc: "8 Coğrafya sorusunu doğru bil." },
    // Bilim
    { id: "bil_1", name: "[Çırak Mucit]", cat: "Bilim", req: 2, tagClass: "title-tag-bilim", color: "#1dd1a1", desc: "2 Bilim sorusunu doğru bil." },
    { id: "bil_2", name: "[Laboratuvar Kurdu]", cat: "Bilim", req: 5, tagClass: "title-tag-bilim", color: "#1dd1a1", desc: "5 Bilim sorusunu doğru bil." },
    { id: "bil_3", name: "[Bilim Dahisi]", cat: "Bilim", req: 8, tagClass: "title-tag-bilim", color: "#1dd1a1", desc: "8 Bilim sorusunu doğru bil." },
    // Spor
    { id: "spo_1", name: "[Çaylak Sporcu]", cat: "Spor", req: 2, tagClass: "title-tag-spor", color: "#48dbfb", desc: "2 Spor sorusunu doğru bil." },
    { id: "spo_2", name: "[Yıldız Oyuncu]", cat: "Spor", req: 5, tagClass: "title-tag-spor", color: "#48dbfb", desc: "5 Spor sorusunu doğru bil." },
    { id: "spo_3", name: "[Efsane Kaptan]", cat: "Spor", req: 8, tagClass: "title-tag-spor", color: "#48dbfb", desc: "8 Spor sorusunu doğru bil." },
    // Sanat
    { id: "san_1", name: "[Sanat Sever]", cat: "Sanat", req: 2, tagClass: "title-tag-sanat", color: "#ff6b6b", desc: "2 Sanat sorusunu doğru bil." },
    { id: "san_2", name: "[Rönesans Ruhu]", cat: "Sanat", req: 5, tagClass: "title-tag-sanat", color: "#ff6b6b", desc: "5 Sanat sorusunu doğru bil." },
    { id: "san_3", name: "[Büyük Sanatkâr]", cat: "Sanat", req: 8, tagClass: "title-tag-sanat", color: "#ff6b6b", desc: "8 Sanat sorusunu doğru bil." },
    // Genel Kültür
    { id: "gen_1", name: "[Bilgi Avcısı]", cat: "Genel Kültür", req: 2, tagClass: "title-tag-genel", color: "#9b59b6", desc: "2 Genel Kültür sorusunu doğru bil." },
    { id: "gen_2", name: "[Canlı Ansiklopedi]", cat: "Genel Kültür", req: 5, tagClass: "title-tag-genel", color: "#9b59b6", desc: "5 Genel Kültür sorusunu doğru bil." },
    { id: "gen_3", name: "[Bilge Üstat]", cat: "Genel Kültür", req: 8, tagClass: "title-tag-genel", color: "#9b59b6", desc: "8 Genel Kültür sorusunu doğru bil." }
];

let userProgress = JSON.parse(localStorage.getItem("trivia_cat_progress")) || {
    "Tarih": 0, "Coğrafya": 0, "Bilim": 0, "Spor": 0, "Sanat": 0, "Genel Kültür": 0
};
let unlockedTitles = JSON.parse(localStorage.getItem("trivia_unlocked_titles")) || ["default"];
let equippedTitle = localStorage.getItem("trivia_equipped_title") || "[Çaylak]";

let pendingTitleObj = null;

function saveProgress() {
    localStorage.setItem("trivia_cat_progress", JSON.stringify(userProgress));
    localStorage.setItem("trivia_unlocked_titles", JSON.stringify(unlockedTitles));
    localStorage.setItem("trivia_equipped_title", equippedTitle);
}

function updateTitleDisplay() {
    const el = document.getElementById("player-active-title");
    const finalTitleDisplay = document.getElementById("final-title-display");
    const currentObj = allTitles.find(t => t.name === equippedTitle) || allTitles[0];

    if (el) {
        el.textContent = currentObj.name;
        el.className = "active-title-tag " + currentObj.tagClass;
    }

    if (finalTitleDisplay) {
        finalTitleDisplay.textContent = currentObj.name;
        finalTitleDisplay.style.color = currentObj.color;
    }
}

function checkTitleUnlocks(catName) {
    const currentCatCount = userProgress[catName];
    allTitles.forEach(t => {
        if (t.cat === catName && currentCatCount >= t.req && !unlockedTitles.includes(t.id)) {
            unlockedTitles.push(t.id);
            saveProgress();
            showTitleUnlockModal(t);
        }
    });
}

function showTitleUnlockModal(titleObj) {
    soundFX.levelUp();
    triggerConfetti();
    pendingTitleObj = titleObj;

    const modalTitleName = document.getElementById("modal-title-name");
    modalTitleName.textContent = titleObj.name;
    modalTitleName.className = "unlocked-title-text " + titleObj.tagClass;

    document.getElementById("modal-title-desc").textContent = `${titleObj.cat} kategorisinde ${titleObj.desc}`;
    document.getElementById("title-unlock-modal").style.display = "flex";
}

function closeTitleModal(equip) {
    if (equip && pendingTitleObj) {
        equippedTitle = pendingTitleObj.name;
        saveProgress();
        updateTitleDisplay();
    }
    document.getElementById("title-unlock-modal").style.display = "none";
}

function toggleTitlesMenu(show) {
    const modal = document.getElementById("titles-menu-modal");
    if (show) {
        renderTitlesList();
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

function renderTitlesList() {
    const container = document.getElementById("titles-list-container");
    container.innerHTML = "";

    allTitles.forEach(t => {
        const isUnlocked = unlockedTitles.includes(t.id);
        const isEquipped = equippedTitle === t.name;
        const currentCount = t.cat === "Genel" ? "-" : (userProgress[t.cat] || 0);

        const card = document.createElement("div");
        card.className = `title-card ${isUnlocked ? '' : 'locked'}`;

        card.innerHTML = `
            <div class="title-card-info">
                <span class="title-card-name" style="color: ${t.color}">${t.name}</span>
                <span class="title-card-desc">${t.desc} (${isUnlocked ? 'Açıldı' : `${currentCount}/${t.req}`})</span>
            </div>
            <div>
                ${isUnlocked 
                    ? `<button class="title-action-btn ${isEquipped ? 'active-equip' : ''}" onclick="equipTitle('${t.name}')">${isEquipped ? 'Kuşanıldı' : 'Kuşan'}</button>` 
                    : `<span style="font-size: 11px; color: #8b8f9e;">🔒 Kilitli</span>`
                }
            </div>
        `;
        container.appendChild(card);
    });
}

function equipTitle(titleName) {
    equippedTitle = titleName;
    saveProgress();
    updateTitleDisplay();
    renderTitlesList();
}

// 5. Genişletilmiş ve Zengin Soru Havuzu
const questionBank = {
    "Sanat": [
        { q: "Mona Lisa tablosu hangi ünlü ressama aittir?", o: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Salvador Dalí"], a: 0 },
        { q: "Düşünen Adam heykeli hangi heykeltıraşa aittir?", o: ["Michelangelo", "Auguste Rodin", "Donatello", "Bernini"], a: 1 },
        { q: "Yıldızlı Gece (Starry Night) tablosunu kim yapmıştır?", o: ["Claude Monet", "Vincent van Gogh", "Rembrandt", "Edvard Munch"], a: 1 },
        { q: "Çığlık (The Scream) tablosunun ressamı kimdir?", o: ["Edvard Munch", "Pablo Picasso", "Gustav Klimt", "Andy Warhol"], a: 0 },
        { q: "Kuğu Gölü balesinin bestecisi kimdir?", o: ["Mozart", "Beethoven", "Çaykovski", "Bach"], a: 2 },
        { q: "Son Akşam Yemeği freski kime aittir?", o: ["Raphael", "Michelangelo", "Leonardo da Vinci", "Caravaggio"], a: 2 },
        { q: "Kubizm akımının en bilinen öncüsü ressam kimdir?", o: ["Pablo Picasso", "Salvador Dalí", "Henri Matisse", "Paul Cézanne"], a: 0 },
        { q: "Kaplumbağa Terbiyecisi tablosu kime aittir?", o: ["Osman Hamdi Bey", "Şeker Ahmet Paşa", "İbrahim Çallı", "Abidin Dino"], a: 0 },
        { q: "9. Senfoni'yi besteleyen ünlü besteci kimdir?", o: ["Beethoven", "Mozart", "Chopin", "Vivaldi"], a: 0 },
        { q: "Guernica tablosu hangi savaşı konu alır?", o: ["İspanya İç Savaşı", "I. Dünya Savaşı", "Fransız İhtilali", "Truva Savaşı"], a: 0 },
        { q: "Dört Mevsim keman konçertosu hangi besteciye aittir?", o: ["Vivaldi", "Bach", "Handel", "Brahms"], a: 0 },
        { q: "Eriyen Saatler tablosunun sürrealist ressamı kimdir?", o: ["Salvador Dalí", "René Magritte", "Max Ernst", "Joan Miró"], a: 0 }
    ],
    "Coğrafya": [
        { q: "Dünyanın en derin noktası neresidir?", o: ["Bermuda Çukuru", "Mariana Çukuru", "Baykal Gölü", "Cebelitarık"], a: 1 },
        { q: "Afrika kıtasının en yüksek dağı hangisidir?", o: ["Kilimanjaro", "Everest", "Mont Blanc", "Atlas Dağı"], a: 0 },
        { q: "Türkiye'nin en büyük gölü hangisidir?", o: ["Tuz Gölü", "Beyşehir Gölü", "Van Gölü", "İznik Gölü"], a: 2 },
        { q: "Dünyanın en uzun nehri hangisidir?", o: ["Amazon", "Nil", "Tuna", "Fırat"], a: 1 },
        { q: "Japonya'nın başkenti neresidir?", o: ["Kyoto", "Osaka", "Tokyo", "Hiroşima"], a: 2 },
        { q: "Yüzölçümü bakımından dünyanın en büyük ülkesi hangisidir?", o: ["Kanada", "Çin", "ABD", "Rusya"], a: 3 },
        { q: "Ekvator çizgisinin geçtiği kıtalardan biri hangisidir?", o: ["Avrupa", "Güney Amerika", "Kuzey Amerika", "Antarktika"], a: 1 },
        { q: "Dünyanın en büyük çölü hangisidir?", o: ["Gobi", "Kalahari", "Büyük Sahra", "Antarktika Çölü"], a: 3 },
        { q: "Avustralya'nın başkenti neresidir?", o: ["Sidney", "Melbourne", "Canberra", "Brisbane"], a: 2 },
        { q: "İtalya yarımadası hangi denize uzanır?", o: ["Akdeniz", "Baltık Denizi", "Kızıldeniz", "Karadeniz"], a: 0 },
        { q: "Türkiye'nin en uzun kıyı şeridine sahip denizi hangisidir?", o: ["Karadeniz", "Ege Denizi", "Akdeniz", "Marmara Denizi"], a: 1 },
        { q: "Kanada'nın başkenti neresidir?", o: ["Toronto", "Montreal", "Ottawa", "Vancouver"], a: 2 }
    ],
    "Tarih": [
        { q: "Türkiye Cumhuriyeti hangi yılda ilan edilmiştir?", o: ["1920", "1923", "1924", "1938"], a: 1 },
        { q: "İstanbul'un fethi hangi yıl gerçekleşmiştir?", o: ["1071", "1299", "1453", "1517"], a: 2 },
        { q: "İlk Türk alfabesi hangisidir?", o: ["Uygur", "Göktürk (Orhun)", "Arap", "Latin"], a: 1 },
        { q: "Kurtuluş Savaşı'nı başlatan olay hangisidir?", o: ["Amasya Genelgesi", "Atatürk'ün Samsun'a Çıkışı", "Erzurum Kongresi", "Sivas Kongresi"], a: 1 },
        { q: "Osmanlı Devleti'nin kurucusu kimdir?", o: ["Orhan Gazi", "Osman Gazi", "Ertuğrul Gazi", "I. Murad"], a: 1 },
        { q: "Malazgirt Meydan Muharebesi hangi yıl yapılmıştır?", o: ["1071", "1176", "1243", "1402"], a: 0 },
        { q: "Piramitleri ile ünlü antik medeniyet hangisidir?", o: ["Roma", "Yunan", "Mısır", "Mezopotamya"], a: 2 },
        { q: "Magna Carta hangi ülkede imzalanmıştır?", o: ["Fransa", "İngiltere", "Almanya", "İtalya"], a: 1 },
        { q: "Fransız İhtilali hangi yılda başlamıştır?", o: ["1776", "1789", "1804", "1815"], a: 1 },
        { q: "Lozan Barış Antlaşması hangi yılda imzalanmıştır?", o: ["1921", "1922", "1923", "1924"], a: 2 },
        { q: "Roma İmparatorluğu'nun ilk imparatoru kimdir?", o: ["Julius Caesar", "Augustus", "Nero", "Trajan"], a: 1 },
        { q: "Çanakkale Zaferi hangi gün anılır?", o: ["18 Mart", "23 Nisan", "19 Mayıs", "29 Ekim"], a: 0 }
    ],
    "Bilim": [
        { q: "Güneş Sistemi'ndeki en büyük gezegen hangisidir?", o: ["Mars", "Satürn", "Jüpiter", "Neptün"], a: 2 },
        { q: "Suyun kimyasal formülü nedir?", o: ["CO2", "H2O", "O2", "NaCl"], a: 1 },
        { q: "Işık hızı yaklaşık saniyede kaç kilometredir?", o: ["150.000 km", "300.000 km", "500.000 km", "1.000.000 km"], a: 1 },
        { q: "Periyodik tabloda 'Au' simgesi hangi elementi temsil eder?", o: ["Gümüş", "Bakır", "Altın", "Demir"], a: 2 },
        { q: "İnsan vücudundaki en büyük organ hangisidir?", o: ["Karaciğer", "Deri", "Beyin", "Akciğer"], a: 1 },
        { q: "Yerçekimi kanununu formüle eden bilim insanı kimdir?", o: ["Albert Einstein", "Isaac Newton", "Galileo", "Nikola Tesla"], a: 1 },
        { q: "Bitkilerin güneş ışığıyla besin üretmesine ne ad verilir?", o: ["Solunum", "Fotosentez", "Mayalanma", "Fermantasyon"], a: 1 },
        { q: "Kırmızı Gezegen olarak bilinen gök cismi hangisidir?", o: ["Venüs", "Mars", "Merkür", "Plüton"], a: 1 },
        { q: "Kandaki oksijeni taşıyan protein hangisidir?", o: ["İnsülin", "Hemoglobin", "Keratin", "Kollajen"], a: 1 },
        { q: "Güneş Sistemi'nde güneşe en yakın gezegen hangisidir?", o: ["Merkür", "Venüs", "Dünya", "Mars"], a: 0 },
        { q: "DNA'nın çift sarmal modelini kimler keşfetmiştir?", o: ["Watson ve Crick", "Pasteur ve Koch", "Curie Çifti", "Bohr ve Planck"], a: 0 },
        { q: "Atomun çekirdeğinde proton ile birlikte ne bulunur?", o: ["Elektron", "Nötron", "Foton", "Pozitron"], a: 1 }
    ],
    "Spor": [
        { q: "Olimpiyat halkalarında kaç farklı renk halka bulunur?", o: ["4", "5", "6", "7"], a: 1 },
        { q: "Futbolda standart bir maç kaç dakika oynanır?", o: ["80", "90", "100", "120"], a: 1 },
        { q: "Basketbolda serbest atış çizgisi kaç puan kazandırır?", o: ["1", "2", "3", "4"], a: 0 },
        { q: "Grand Slam terimi hangi spor dalı ile ilgilidir?", o: ["Golf", "Tenis", "Voleybol", "Hentbol"], a: 1 },
        { q: "Maraton koşusunun standart mesafesi yaklaşık kaç kilometredir?", o: ["21 km", "30 km", "42 km", "50 km"], a: 2 },
        { q: "Voleybolda sahada bir takımdan kaç oyuncu bulunur?", o: ["5", "6", "7", "8"], a: 1 },
        { q: "FIFA Dünya Kupası kaç yılda bir düzenlenir?", o: ["2", "3", "4", "5"], a: 2 },
        { q: "Formula 1 yarışlarında birincilik kazanan pilota verilen bayrak ne renktir?", o: ["Kırmızı-Beyaz", "Siyah-Beyaz Damalı", "Sarı-Siyah", "Mavi-Beyaz"], a: 1 },
        { q: "Hentbolda bir takım sahada kaç oyuncuyla mücadele eder?", o: ["5", "6", "7", "8"], a: 2 },
        { q: "Wimbledon tenis turnuvası hangi zemin türünde oynanır?", o: ["Toprak", "Çim", "Sert Kort", "Halı"], a: 1 },
        { q: "Basketbolda bir takımın hücum süresi kaç saniyedir?", o: ["14 sn", "20 sn", "24 sn", "30 sn"], a: 2 },
        { q: "Futbolda ofsayt kuralını işaret eden hakem hangisidir?", o: ["Orta Hakem", "Yan Hakem", "4. Hakem", "VAR Hakemi"], a: 1 }
    ],
    "Genel Kültür": [
        { q: "Pusulada 'N' harfi hangi yönü gösterir?", o: ["Güney", "Doğu", "Batı", "Kuzey"], a: 3 },
        { q: "Bir üçgenin iç açıları toplamı kaç derecedir?", o: ["90°", "180°", "270°", "360°"], a: 1 },
        { q: "Türk Lirası simgesi (₺) hangi yılda kabul edilmiştir?", o: ["2005", "2010", "2012", "2015"], a: 2 },
        { q: "Satranç tahtasında toplam kaç kare bulunur?", o: ["32", "64", "100", "128"], a: 1 },
        { q: "Nobel Ödülleri hangi ülkede dağıtılmaya başlanmıştır?", o: ["Norveç - İsveç", "İsviçre", "Almanya", "Fransa"], a: 0 },
        { q: "Hangi hayvan süt verebilen bir memelidir?", o: ["Penguen", "Yunus", "Timsah", "Kurbağa"], a: 1 },
        { q: "Bir yılda kaç hafta vardır?", o: ["48", "50", "52", "54"], a: 2 },
        { q: "Gökkuşağında kaç renk bulunur?", o: ["5", "6", "7", "8"], a: 2 },
        { q: "Dünyanın en yüksek binası Burj Khalifa hangi şehirdedir?", o: ["Doha", "Riyad", "Dubai", "Abu Dabi"], a: 2 },
        { q: "Mona Lisa tablosu şu an hangi müzede sergilenmektedir?", o: ["Louvre", "Prado", "British Museum", "Metropolitan"], a: 0 },
        { q: "Periyodik tablonun ilk elementi hangisidir?", o: ["Helyum", "Hidrojen", "Lityum", "Oksijen"], a: 1 },
        { q: "Sinemada en çok Oscar kazanan yönetmenlerden biri kimdir?", o: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Quentin Tarantino"], a: 1 }
    ]
};

// Çark Sıralaması ve Renk/Logo Eşleşmesi
const categories = [
    { name: "Sanat", icon: "🎨", color: "#ff6b6b" },
    { name: "Coğrafya", icon: "🌍", color: "#ff9f43" },
    { name: "Tarih", icon: "📜", color: "#feca57" },
    { name: "Bilim", icon: "🔬", color: "#1dd1a1" },
    { name: "Spor", icon: "⚽", color: "#48dbfb" },
    { name: "Genel Kültür", icon: "💡", color: "#9b59b6" }
];

// Değişkenler
let score = 0;
let streak = 0;
let maxStreak = 0;
let highScore = localStorage.getItem("trivia_highscore") || 0;
let currentRotation = 0;
let isSpinning = false;
let currentCategory = null;
let currentQuestion = null;
let timeLeft = 15;
let timerInterval = null;

let unlockedBadges = new Set();
let hasFiftyFifty = true;
let hasExtraTime = true;
let hasPickCategory = true;

// HTML Elemanları
const wheelScreen = document.getElementById("wheel-screen");
const quizScreen = document.getElementById("quiz-screen");
const gameoverScreen = document.getElementById("gameover-screen");
const categorySelectModal = document.getElementById("category-select-modal");

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const pickCatBtn = document.getElementById("pick-cat-btn");
const lobbyScore = document.getElementById("lobby-score");
const highScoreEl = document.getElementById("high-score");

const lobbyCombo = document.getElementById("lobby-combo");
const lobbyComboText = document.getElementById("lobby-combo-text");
const quizCombo = document.getElementById("quiz-combo");
const quizComboText = document.getElementById("quiz-combo-text");
const floatingScore = document.getElementById("floating-score");

const categoryBadge = document.getElementById("category");
const questionText = document.getElementById("question-text");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const nextButton = document.getElementById("next-btn");

const fiftyBtn = document.getElementById("fifty-btn");
const timeBtn = document.getElementById("time-btn");

const finalScoreEl = document.getElementById("final-score");
const finalHighScoreEl = document.getElementById("final-highscore");
const finalMaxComboEl = document.getElementById("final-max-combo");
const finalBadgesEl = document.getElementById("final-badges");

highScoreEl.textContent = highScore;
updateTitleDisplay();
updateProfileUI();
initOnboarding();

function updateComboUI() {
    if (streak >= 2) {
        const text = `${streak}x COMBO`;
        lobbyComboText.textContent = text;
        quizComboText.textContent = text;
        lobbyCombo.style.display = "inline-flex";
        quizCombo.style.display = "inline-flex";
    } else {
        lobbyCombo.style.display = "none";
        quizCombo.style.display = "none";
    }
}

function openCategoryPicker() {
    if (!hasPickCategory || isSpinning) return;
    initAudio();
    soundFX.lifeline();
    categorySelectModal.style.display = "flex";
}

function toggleCategoryModal(show) {
    categorySelectModal.style.display = show ? "flex" : "none";
}

function selectCategoryDirectly(catName) {
    toggleCategoryModal(false);
    if (!hasPickCategory || isSpinning) return;

    hasPickCategory = false;
    pickCatBtn.classList.add("used");
    pickCatBtn.textContent = "🎯 Kategori Seç (Kullanıldı)";

    const targetIndex = categories.findIndex(c => c.name === catName);
    spinToTargetCategory(targetIndex);
}

function spinToTargetCategory(targetIndex) {
    isSpinning = true;
    spinBtn.disabled = true;
    pickCatBtn.disabled = true;

    currentCategory = categories[targetIndex];

    const segmentDegree = 360 / categories.length;
    const targetOffset = 360 - (targetIndex * segmentDegree + (segmentDegree / 2));
    const extraSpins = 360 * 5;

    currentRotation += extraSpins + ((targetOffset - (currentRotation % 360) + 360) % 360);
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    const totalDuration = 3300;
    const startTime = Date.now();

    function playProgressiveTick() {
        const elapsed = Date.now() - startTime;
        if (elapsed < totalDuration) {
            soundFX.tick();
            const progress = elapsed / totalDuration;
            const delay = 70 + Math.pow(progress, 3.2) * 420;
            setTimeout(playProgressiveTick, delay);
        }
    }

    playProgressiveTick();

    setTimeout(() => {
        isSpinning = false;
        spinBtn.disabled = false;
        pickCatBtn.disabled = false;
        openQuiz(currentCategory);
    }, 3600);
}

function spinWheel() {
    if (isSpinning) return;
    initAudio();
    const randomIndex = Math.floor(Math.random() * categories.length);
    spinToTargetCategory(randomIndex);
}

function openQuiz(cat) {
    wheelScreen.style.display = "none";
    quizScreen.style.display = "flex";

    categoryBadge.textContent = `${cat.icon} ${cat.name}`;
    categoryBadge.style.backgroundColor = cat.color;
    updateComboUI();

    const catQuestions = questionBank[cat.name];
    currentQuestion = catQuestions[Math.floor(Math.random() * catQuestions.length)];

    questionText.textContent = currentQuestion.q;

    // Şık butonlarını seçip metinleri dolduruyoruz
    const optionButtons = document.querySelectorAll("#quiz-options-wrapper .chunky-option-btn");
    optionButtons.forEach((btn, idx) => {
        btn.textContent = currentQuestion.o[idx];
        btn.classList.remove("correct", "wrong");
        btn.style.visibility = "visible";
        btn.disabled = false;
    });

    nextButton.style.display = "none";
    startTimer();
}

function startTimer() {
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    progressBar.style.width = "100%";
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        progressBar.style.width = `${Math.min(100, (timeLeft / 15) * 100)}%`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleMistake();
        }
    }, 1000);
}

function useFiftyFifty() {
    if (!hasFiftyFifty) return;
    hasFiftyFifty = false;
    fiftyBtn.classList.add("used");
    soundFX.lifeline();

    const wrongIndices = [];
    currentQuestion.o.forEach((_, idx) => {
        if (idx !== currentQuestion.a) wrongIndices.push(idx);
    });

    wrongIndices.sort(() => Math.random() - 0.5);
    const optionButtons = document.querySelectorAll("#quiz-options-wrapper .chunky-option-btn");
    optionButtons[wrongIndices[0]].style.visibility = "hidden";
    optionButtons[wrongIndices[1]].style.visibility = "hidden";
}

function useExtraTime() {
    if (!hasExtraTime) return;
    hasExtraTime = false;
    timeBtn.classList.add("used");
    soundFX.lifeline();

    timeLeft += 10;
    timerElement.textContent = timeLeft;
    progressBar.style.width = "100%";
}

function handleMistake() {
    soundFX.wrong();
    streak = 0;
    updateComboUI();

    const optionButtons = document.querySelectorAll("#quiz-options-wrapper .chunky-option-btn");
    optionButtons[currentQuestion.a].classList.add("correct");
    optionButtons.forEach(btn => btn.disabled = true);
    nextButton.style.display = "block";
}

function checkAnswer(index) {
    clearInterval(timerInterval);
    const isCorrect = index === currentQuestion.a;
    const optionButtons = document.querySelectorAll("#quiz-options-wrapper .chunky-option-btn");

    if (isCorrect) {
        streak++;
        if (streak > maxStreak) maxStreak = streak;

        const multiplier = Math.min(streak, 4);
        const earnedPoints = 10 * multiplier;
        score += earnedPoints;

        soundFX.correct(multiplier);
        triggerConfetti();

        floatingScore.textContent = `+${earnedPoints}${multiplier > 1 ? ` (${multiplier}x)` : ''}`;
        floatingScore.classList.add("animate");
        setTimeout(() => floatingScore.classList.remove("animate"), 700);

        optionButtons[index].classList.add("correct");
        scoreElement.textContent = score;
        lobbyScore.textContent = score;
        updateComboUI();

        unlockedBadges.add(currentCategory.name);
        const badgeEl = document.getElementById(`badge-${currentCategory.name}`);
        if (badgeEl) badgeEl.classList.add("unlocked");

        userProgress[currentCategory.name] = (userProgress[currentCategory.name] || 0) + 1;
        saveProgress();
        checkTitleUnlocks(currentCategory.name);

        optionButtons.forEach(btn => btn.disabled = true);
        nextButton.style.display = "block";
    } else {
        optionButtons[index].classList.add("wrong");
        handleMistake();
    }
}

nextButton.addEventListener("click", () => {
    quizScreen.style.display = "none";
    wheelScreen.style.display = "flex";
    updateComboUI();
});

function gameOver() {
    quizScreen.style.display = "none";
    wheelScreen.style.display = "none";
    gameoverScreen.style.display = "flex";

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("trivia_highscore", highScore);
    }

    finalScoreEl.textContent = score;
    finalHighScoreEl.textContent = highScore;
    if (finalMaxComboEl) finalMaxComboEl.textContent = `${maxStreak}x`;
    highScoreEl.textContent = highScore;
    updateTitleDisplay();
    updateProfileUI();

    if (unlockedBadges.size > 0) {
        let badgeIcons = "";
        categories.forEach(c => {
            if (unlockedBadges.has(c.name)) badgeIcons += `${c.icon} `;
        });
        finalBadgesEl.textContent = badgeIcons;
    } else {
        finalBadgesEl.textContent = "Hiç rozet kazanılamadı";
    }
}

function restartGame() {
    score = 0;
    streak = 0;
    maxStreak = 0;
    scoreElement.textContent = "0";
    lobbyScore.textContent = "0";
    updateComboUI();

    unlockedBadges.clear();
    categories.forEach(c => {
        const badgeEl = document.getElementById(`badge-${c.name}`);
        if (badgeEl) badgeEl.classList.remove("unlocked");
    });

    hasFiftyFifty = true;
    hasExtraTime = true;
    hasPickCategory = true;
    fiftyBtn.classList.remove("used");
    timeBtn.classList.remove("used");
    pickCatBtn.classList.remove("used");
    pickCatBtn.textContent = "🎯 Kategori Seç";

    gameoverScreen.style.display = "none";
    wheelScreen.style.display = "flex";
}