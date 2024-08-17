// Function to handle logout
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '../login/login.html'; // Change 'login.html' to your actual login page path
});


document.getElementById('Chat').addEventListener("click",function(event)
{
    event.preventDefault();
    window.location.href = '../my_flask_app/chat.html';
});

