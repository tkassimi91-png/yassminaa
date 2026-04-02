// Password protection check
document.addEventListener('DOMContentLoaded', function() {
    const accessGranted = localStorage.getItem('loveAccess');
    if (!accessGranted) {
        window.location.href = 'index.html';
    }
});

// ==================== BUTTON 1: FOR YOU ====================
const btnForYou = document.getElementById('btnForYou');
const forYouModal = document.getElementById('forYouModal');

if (btnForYou) {
    btnForYou.addEventListener('click', function() {
        forYouModal.style.display = 'block';
    });
}

// ==================== BUTTON 2: TEST (QUIZ) ====================
const quizQuestions = [
    {
        question: "kifach katkteb smiyti ??",
        options: ["Tarik ", "Tarek ", "Tariq"],
        correct: 0
    },
    {
        question: "imta l birthday dyali ana ?¿",
        options: ["07/06", "03/07", "03/06"],
        correct: 2
    },
    {
        question: "kifach katkteb smyet sahbi ?¿",
        options: ["lmkyef", "lmkief", "lmokayafo"],
        correct: 1
    },
    {
        question: "chkon nti ?¿",
        options: ["yassmine", "mrat sayed lni7ar wa lmo7itat", "yassmina "],
        correct: 1
    },
    {
        question: "chkon li katb4ih ktar?¿ w rekzi fhad so2al mzyan ",
        options: ["mamak", "babak", "ana li howa rejlk l3ziz sayed lbi7ar "],
        correct: 2
    }
];

let userAnswers = new Array(quizQuestions.length).fill(null);

function renderQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;
    
    let html = '';
    quizQuestions.forEach((q, index) => {
        html += `
            <div class="question">
                <h3>${index + 1}. ${q.question}</h3>
                ${q.options.map((opt, optIndex) => `
                    <div class="option ${userAnswers[index] === optIndex ? 'selected' : ''}" 
                         onclick="selectAnswer(${index}, ${optIndex})">
                        ${String.fromCharCode(65 + optIndex)}. ${opt}
                    </div>
                `).join('')}
            </div>
        `;
    });
    
    html += `<button class="submit-quiz" onclick="submitQuiz()">✨ شوفي نتيجتك ✨</button>`;
    quizContainer.innerHTML = html;
}

function selectAnswer(questionIndex, answerIndex) {
    userAnswers[questionIndex] = answerIndex;
    renderQuiz();
}

function submitQuiz() {
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
        if (answer !== null && answer === quizQuestions[index].correct) {
            correctCount++;
        }
    });
    
    const total = quizQuestions.length;
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (scoreDisplay) {
        scoreDisplay.innerHTML = `✅ الإجابات الصحيحة: ${correctCount} / ${total} ✅`;
    }
    
    let message = '';
    let imageUrl = '';
    
    if (correctCount === total) {
        message = 'raki naje7a tbarklah makayn maytsalk hhh';
        imageUrl = 'images/5_5.jpg';
    } else if (correctCount >= total - 1) {
        message = 'khaski traje3i chwiya layredi 3lik mathmlich 9raytek hhh';
        imageUrl = 'images/5_5.jpg';
    } else if (correctCount >= total - 2) {
        message = 'b9alki chwiya w tse9eti ';
        imageUrl = 'images/5_5.jpg';
    } else {
        message = 'ya wedi ya l9raya ya wedi ';
        imageUrl = 'images/5_5.jpg';
    }
    
    showResultModal(message, imageUrl, correctCount);
}

function showResultModal(message, imageUrl, score) {
    const testModal = document.getElementById('testModal');
    if (testModal) testModal.style.display = 'none';
    
    const resultModal = document.createElement('div');
    resultModal.className = 'modal';
    resultModal.id = 'resultModal';
    resultModal.innerHTML = `
        <div class="modal-content" style="text-align: center;">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2 style="color: #c92a6b;">📊 نتيجتك: ${score}/${quizQuestions.length} 📊</h2>
            <img src="${imageUrl}" alt="Result" style="width: 100%; max-width: 300px; border-radius: 15px; margin: 20px 0;" onerror="this.style.display='none'">
            <p style="font-size: 1.2rem; line-height: 1.6;">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #c92a6b; color: white; border: none; padding: 10px 30px; border-radius: 50px; margin-top: 20px; cursor: pointer;">
                ✨ غلق ✨
            </button>
        </div>
    `;
    document.body.appendChild(resultModal);
    resultModal.style.display = 'block';
}

const btnTest = document.getElementById('btnTest');
const testModal = document.getElementById('testModal');

if (btnTest && testModal) {
    btnTest.addEventListener('click', function() {
        userAnswers = new Array(quizQuestions.length).fill(null);
        renderQuiz();
        const scoreDisplay = document.getElementById('scoreDisplay');
        if (scoreDisplay) scoreDisplay.innerHTML = 'الإجابات الصحيحة: 0';
        testModal.style.display = 'block';
    });
}

// ==================== BUTTON 3: GALLERY ====================
const galleryItems = [
    { image: 'images/foto1.jpg', caption: '3refti 3lach 4tit wejhki ? ', detail: 'لماذا أراكٍ على كل شيءٍ كأنَّكِ في الأرض كل البشر' },
    { image: 'images/foto2.jpg', caption: 'had tswira jamila ', detail: ' كأنّكِ دربٌ بغير انتهاءٍ وأنّي خُلِقتُ لهذا السّفر' },
    { image: 'images/foto3.jpg', caption: 't3ni9at lmla7 ' , detail: 'إذا كنتُ أهربُ منكِ إليكِ فقولي بربّكِ أينَ المفر؟ ' },
    { image: 'images/foto4.jpg', caption: 'had t3ni9a wa3era ', detail: 'إنَّي لأَنْظُرُ فِي الوُجُودِ بِأَسْرِهِ لأَرَى الوُجُوهَ، فَلَا أَرَى إِلَّاكَ' },
    { image: 'images/foto9.jpg', caption: 'ta hadi wa3era', detail: 'قَالُوا: وَيَخْلُقُ أَرْبَعِينَ مُشَابِهًا مِن أَربَعِينَكَ، لَا أُرِيدُ سِوَاكَ' },
    { image: 'images/foto6.jpg', caption: 'hna 9oltili ....', detail: '3lach katle3 ydik lfo9 makat3refch tswer chof ldin mok tswira kif jat wa3era 🤌' },
    { image: 'images/foto7.png', caption: 'hna 3ene9i 7sit ....', detail: '3en9i 7sit bih t3awej hhhhh chof ydi kif mzayer khayef la ti7i hhhh' },
    { image: 'images/fot8.jpg', caption: 'اني عشقتك واتخذت قراري ', detail: 'اني عشقتك واتخذت قراري    فلمن أقدم يا ترى أعذاري<br> لا سلطة في الحب تعلو سلطتي الرأي رأيي والخيار خياري<br> هذي احاسيسي فلا تتدخلى أرجوك بين البحر والبحار' },
    { image: 'images/foto5.jpg', caption: 'hadchi li hna katbo ana ...', detail: 'lmohim hadchi anktebo ana wakha ana 3aref rasi na9es f ta3bir walakin .. <br> ana b4itki t3refi bli kandir mjhod bach tkoni fer7ana w hadi hiya lhaja li kan3ref ndir hiya nkteb l code <br> kan7awel n3ber bdikchi li kan3raf wli b4itki t3arefi howa ana kanb4iki bzaf mn nhar 3reftki w denya daheka f wejhi w kantmna lah yla9ina f we9t zwin w nkon ana wyaki dima dahkin w kantmena anaki tkoni mrta7a m3aya wakha had lmsafat kamlin walkin hadi 4ir we9t w kadoz w ana 3aref bli nti katwehchini bzaf w 7ta ana kantwahechek bzaf walkin li khasna n3refo b2 bli hadi 4ir we9ita w 4adi doz bhal kif ma dazo bzaf dyal l7wayj s3abin khasna nsbero m3a be3diyatna w nchalah nkono fchi mosta9bal ra2i3 ana wyaki ado d3winati <br> <br> kanb4iiiik ' }
];

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    let html = '';
    galleryItems.forEach((item, index) => {
        html += `
            <div class="gallery-item" onclick="showImageDetail(${index})">
                <img src="${item.image}" alt="Photo ${index + 1}" onerror="this.src='images/placeholder.jpg'">
                <div class="gallery-caption">${item.caption}</div>
            </div>
        `;
    });
    galleryGrid.innerHTML = html;
}

function showImageDetail(index) {
    const item = galleryItems[index];
    const imageDetailModal = document.getElementById('imageDetailModal');
    const detailImage = document.getElementById('detailImage');
    const detailMessage = document.getElementById('detailMessage');
    
    if (detailImage) detailImage.src = item.image;
    if (detailMessage) detailMessage.innerHTML = item.detail;
    if (imageDetailModal) imageDetailModal.style.display = 'block';
}

const btnGallery = document.getElementById('btnGallery');
const galleryModal = document.getElementById('galleryModal');

if (btnGallery && galleryModal) {
    btnGallery.addEventListener('click', function() {
        renderGallery();
        galleryModal.style.display = 'block';
    });
}

// ==================== BUTTON 4: SURPRISE ====================
const btnSurprise = document.getElementById('btnSurprise');
const surpriseModal = document.getElementById('surpriseModal');

if (btnSurprise && surpriseModal) {
    btnSurprise.addEventListener('click', function() {
        surpriseModal.style.display = 'block';
    });
}

// ==================== CLOSE MODALS ====================
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) modal.style.display = 'none';
    });
});

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

window.selectAnswer = selectAnswer;
window.submitQuiz = submitQuiz;
window.showImageDetail = showImageDetail;
