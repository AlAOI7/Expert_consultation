const EXPERTS_DATA = [
    { id: 1, name: "أحمد الفهد", specialty: "خبير تسويق رقمي", image: 'images/expert1.jpg' },
    { id: 2, name: "سارة عبد الله", specialty: "مستشارة UX/UI", image: 'images/expert2.jpg' },
    // ... الخبراء الآخرون
];

const BOT_RESPONSES = {
    initial: "شكرًا لتواصلك معنا!\nيسعدنا مساعدتك، الرجاء اختيار رقم السؤال الذي يناسب استفسارك\n\n١-كيف أحجز جلسة؟\n٢-هل الخدمة مجانية أم مدفوعة؟\n٣-كيف أتواصل مع خبير؟\n٤-ما هي أوقات الدعم؟\n٥-أواجه مشكلة في التسجيل",
    1: "للحجز، يرجى النقر على زر 'حجز موعد' في الصفحة السابقة واختيار الوقت المتاح في نظامنا.",
    2: "خدماتنا مدفوعة. تختلف الرسوم حسب الخبير ونوع الجلسة التي تختارها.",
    // ... تكملة الردود
    followUp: "يسعدنا نساعدك أكثر 🤍\nمن فضلك وضّح مشكلتك أو سؤالك، وسيتواصل معك أحد ممثلينا في أقرب وقت"
};

let currentExpert = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديد الخبير الحالي وعرض بياناته
    const urlParams = new URLSearchParams(window.location.search);
    const expertId = parseInt(urlParams.get('expertId'));
    currentExpert = EXPERTS_DATA.find(e => e.id === expertId);

    if (currentExpert) {
        renderExpertHeader(currentExpert);
        displayBotMessage(BOT_RESPONSES.initial); // عرض الرسالة الافتتاحية
    } else {
        alert("لم يتم تحديد الخبير!");
        window.location.href = 'client_browse.html';
    }

    // 2. تفعيل زر الإرسال
    document.getElementById('send-btn').addEventListener('click', handleSendMessage);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
});

// وظيفة رسم كارد الخبير في الأعلى
function renderExpertHeader(expert) {
    const header = document.getElementById('expert-header');
    header.innerHTML = `
        <button onclick="window.location.href='client_browse.html'">←</button>
        <img src="${expert.image}" alt="${expert.name}" class="header-profile-img">
        <div>
            <h3>${expert.name}</h3>
            <p>${expert.specialty}</p>
        </div>
    `;
}

// وظيفة عرض رسالة في منطقة المحادثة
function displayMessage(text, sender) {
    const container = document.getElementById('messages-container');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender.toLowerCase()}`;
    msgDiv.textContent = text;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight; // التمرير إلى الأسفل
}

// وظيفة عرض رسالة البوت
function displayBotMessage(text) {
    displayMessage(text, 'Bot');
}

// 3. منطق معالجة الرسالة المرسلة
function handleSendMessage() {
    const inputField = document.getElementById('chat-input');
    const userText = inputField.value.trim();
    if (userText === '') return;

    displayMessage(userText, 'User');
    inputField.value = '';

    // منطق الرد التلقائي من البوت
    let botReply = '';
    const questionNumber = userText.match(/^[١-٥]|[1-5]/)?.[0]; // مطابقة الأرقام العربية أو الإنجليزية

    if (questionNumber) {
        // إذا اختار المستخدم رقم سؤال
        const num = (questionNumber === '١') ? '1' : (questionNumber === '٢') ? '2' : // ... تحويل الأرقام العربية
                    (questionNumber === '٣') ? '3' : (questionNumber === '٤') ? '4' : 
                    (questionNumber === '٥') ? '5' : questionNumber;
        
        if (BOT_RESPONSES[num]) {
            botReply = `${BOT_RESPONSES[num]}\n\n${BOT_RESPONSES.followUp}`;
        }
    } else {
        // إذا أرسل المستخدم رسالة عادية
        botReply = BOT_RESPONSES.followUp;
    }

    setTimeout(() => {
        displayBotMessage(botReply);
    }, 800);
}
