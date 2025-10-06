$(document).ready(function() {
    
    // عند تغيير خيار نوع المستخدم (عميل / خبير)
    $('input[name="userType"]').on('change', function() {
        const selectedType = $(this).val();
        const $expertFields = $('#expertFields');
        const $expertInputs = $('#expertType, #license, #bio');

        if (selectedType === 'expert') {
            // إذا تم اختيار "خبير"
            $expertFields.slideDown(400); // إظهار الحقول ببطء
            $expertInputs.prop('disabled', false).prop('required', true); // تفعيل الحقول وجعلها مطلوبة
        } else {
            // إذا تم اختيار "عميل"
            $expertFields.slideUp(400); // إخفاء الحقول ببطء
            $expertInputs.prop('disabled', true).prop('required', false).val(''); // تعطيل الحقول ومسح محتواها
        }
    });

    // منطق التحقق الأساسي من كلمة المرور (jQuery)
    $('#registrationForm').on('submit', function(e) {
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        
        if (password !== confirmPassword) {
            e.preventDefault(); // منع الإرسال
            alert("كلمة المرور وتأكيد كلمة المرور غير متطابقين. يرجى التحقق.");
            // يمكن استبدال alert برسالة خطأ أجمل باستخدام Bootstrap
        }
        
        // هنا يمكن إضافة منطق إرسال البيانات (AJAX)
    });
});
