$(document).ready(function() {
    
    // عند تغيير خيار نوع المستخدم (عميل / خبير)
    $('input[name="userType"]').on('change', function() {
        const selectedType = $(this).val();
        const $expertFields = $('#expertFields');
        const $expertTypeSelect = $('#expertType');
        const $licenseInput = $('#license');

        if (selectedType === 'expert') {
            // إذا تم اختيار "خبير"
            $expertFields.slideDown(300); // إظهار الحقول ببطء
            $expertTypeSelect.prop('disabled', false).prop('required', true);
            $licenseInput.prop('disabled', false).prop('required', true);
        } else {
            // إذا تم اختيار "عميل"
            $expertFields.slideUp(300); // إخفاء الحقول ببطء
            $expertTypeSelect.prop('disabled', true).prop('required', false).val('');
            $licenseInput.prop('disabled', true).prop('required', false).val('');
        }
    });

    // تهيئة: إظهار الحقول بشكل صحيح عند تحميل الصفحة
    // بما أن العميل هو الخيار الافتراضي، نخفي حقول الخبير
    if ($('#typeExpert').is(':checked')) {
        $('#expertFields').show();
        $('#expertType, #license').prop('disabled', false);
    } else {
        $('#expertFields').hide();
        $('#expertType, #license').prop('disabled', true);
    }
});
// بيانات الخبراء كما تم تحديدها سابقًا
const EXPERTS_DATA = [
    { id: 1, name: "أحمد الفهد", specialty: "خبير تسويق رقمي", category: "تسويق", isAvailable: true, image: 'images/expert1.jpg', backgroundColor: "#F0F8FF" },
    { id: 2, name: "سارة عبد الله", specialty: "مستشارة UX/UI", category: "تصميم", isAvailable: false, image: 'images/expert2.jpg', backgroundColor: "#FFF0F5" },
    // ... الخبراء الآخرون (يجب أن يكونوا 4)
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. توليد بطاقات الخبراء
    renderExperts('all');

    // 2. تفعيل فلاتر التصنيف
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            document.querySelector('.category-btn.active').classList.remove('active');
            e.target.classList.add('active');
            renderExperts(category);
        });
    });
});

// وظيفة رسم الخبراء في الشاشة
function renderExperts(filterCategory) {
    const container = document.getElementById('experts-container');
    container.innerHTML = ''; // تفريغ الحاوية

    const filtered = EXPERTS_DATA.filter(expert => 
        filterCategory === 'all' || expert.category === filterCategory
    );

    filtered.forEach(expert => {
        const card = document.createElement('div');
        card.className = 'expert-card';
        card.dataset.expertId = expert.id;
        card.style.setProperty('--bg-color', expert.backgroundColor); // تحديد الخلفية الخاصة

        // إنشاء محتوى البطاقة
        card.innerHTML = `
            <div class="profile-image" style="background-image: url('${expert.image}');"></div>
            <h3>${expert.name}</h3>
            <p>${expert.specialty}</p>
            <div class="action-section">
                <button class="booking-btn" data-available="${expert.isAvailable}">${expert.isAvailable ? 'حجز موعد' : 'غير متاح للحجز'}</button>
                <button class="chat-btn" onclick="navigateToChat(${expert.id}, '${expert.name}')">بدء المحادثة</button>
            </div>
        `;

        // إضافة منطق تأثير الارتفاع (Elevation Effect)
        card.addEventListener('mouseenter', () => card.classList.add('elevated'));
        card.addEventListener('mouseleave', () => card.classList.remove('elevated'));

        container.appendChild(card);
    });
}

// وظيفة الانتقال إلى شاشة الشات
function navigateToChat(expertId, expertName) {
    // نستخدم LocalStorage أو Query Parameters لتمرير بيانات الخبير
    localStorage.setItem('currentExpertId', expertId);
    window.location.href = `chat.html?expertId=${expertId}`;
}
