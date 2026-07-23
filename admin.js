// 🛠️ لوحة تحكم الإدارة السرية وتعديل الموقع

// 1. حماية المحتوى (تعطيل الزر الأيمن والفحص)
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if(e.keyCode == 123) return false; // F12
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};

// 2. إضافة تأثيرات بصرية لعناصر التحكم عند التفعيل
const adminStyle = document.createElement('style');
adminStyle.innerHTML = `
    .admin-editing-text {
        border: 2px dashed #22c55e !important;
        padding: 2px 5px !important;
        background-color: #f0fdf4 !important;
    }
    .admin-editing-image {
        border: 3px dashed #3b82f6 !important;
        opacity: 0.8;
        cursor: pointer;
    }
`;
document.head.appendChild(adminStyle);

// 3. كلمة المرور السرية للنظام
const ADMIN_PASSWORD = "dz_secure_2026";

// 4. الاستماع لاختصار لوحة المفاتيح (Alt + E) لفتح الإدارة
document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key.toLowerCase() === 'e') {
        const password = prompt("🔒 نظام الإدارة السري:\nأدخل كلمة المرور لتعديل الأسعار والصور:");
        if (password === ADMIN_PASSWORD) {
            activateAdminEditing();
        } else if (password !== null) {
            alert("❌ كلمة مرور خاطئة!");
        }
    }
});

// 5. تفعيل وظائف التعديل المباشر
function activateAdminEditing() {
    alert("✅ تم تفعيل وضع التعديل!\n\n1. اضغط على أي سعر مباشرة لتعديل قيمته.\n2. اضغط مرتين (Double Click) على أي صورة لتغيير رابطها.");

    // تفعيل تعديل النصوص والأسعار
    document.querySelectorAll('.editable').forEach(element => {
        element.contentEditable = "true";
        element.classList.add('admin-editing-text');
        // حفظ التعديل عند الخروج من العنصر
        element.addEventListener('blur', function() {
            localStorage.setItem(element.id, element.innerText);
        });
    });

    // تفعيل تعديل الصور
    document.querySelectorAll('.editable-img').forEach(img => {
        img.classList.add('admin-editing-image');
        img.addEventListener('dblclick', function() {
            const newUrl = prompt("أدخل رابط الصورة الجديد (URL):", img.src);
            if (newUrl && newUrl.trim() !== "") {
                img.src = newUrl;
                localStorage.setItem(img.id, newUrl);
            }
        });
    });
}

// 6. استعادة البيانات المعدلة تلقائياً عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.editable').forEach(element => {
        const savedText = localStorage.getItem(element.id);
        if (savedText) element.innerText = savedText;
    });

    document.querySelectorAll('.editable-img').forEach(img => {
        const savedSrc = localStorage.getItem(img.id);
        if (savedSrc) img.src = savedSrc;
    });
});
