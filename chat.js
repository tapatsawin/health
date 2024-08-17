document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const aiResponseDiv = document.getElementById('ai-response');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const userInput = document.querySelector('input[name="user_input"]').value;
        
        // ส่งข้อความไปยังเซิร์ฟเวอร์
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `user_input=${encodeURIComponent(userInput)}`
        })
        .then(response => response.text())
        .then(html => {
            // อัปเดตส่วนที่แสดงผล AI Response
            aiResponseDiv.innerHTML = html;
        })
        .catch(error => console.error('Error:', error));
        
        // ล้าง input หลังจากส่งข้อความ
        document.querySelector('input[name="user_input"]').value = '';
    });
});
