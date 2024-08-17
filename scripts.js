document.getElementById('showSignUp').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('signUpFormContainer').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('signUpFormContainer').style.display = 'none';
});

let db;
const request = indexedDB.open('UserDatabase', 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore('users', { keyPath: 'username' });
    objectStore.createIndex('password', 'password', { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
};

request.onerror = function(event) {
    console.error('IndexedDB error:', event.target.errorCode);
};

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    console.log('Login attempt with username:', username, 'and password:', password);

    const transaction = db.transaction(['users'], 'readonly');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.get(username);

    request.onsuccess = function(event) {
        const user = event.target.result;
        console.log('User retrieved from DB:', user);
        if (user && user.password === password) {
            alert('Login successful!');
            window.location.href = '../index/index.html'; // เปลี่ยนเส้นทางไปยัง health.html
        } else {
            const errorMessage = document.getElementById('loginErrorMessage');
            errorMessage.textContent = 'Invalid username or password';
        }
    };

    request.onerror = function(event) {
        console.error('Error getting user:', event.target.errorCode);
    };
});

document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;

    if (username && password) {
        const transaction = db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');
        const request = objectStore.get(username);

        request.onsuccess = function(event) {
            if (event.target.result) {
                const errorMessage = document.getElementById('signUpErrorMessage');
                errorMessage.textContent = 'Username already exists. Please choose another one.';
            } else {
                const user = { username: username, password: password };
                const addUserRequest = objectStore.add(user);

                addUserRequest.onsuccess = function(event) {
                    alert('Sign Up successful! Please login.');
                    document.getElementById('loginFormContainer').style.display = 'block';
                    document.getElementById('signUpFormContainer').style.display = 'none';
                };

                addUserRequest.onerror = function(event) {
                    const errorMessage = document.getElementById('signUpErrorMessage');
                    errorMessage.textContent = 'Error creating user. Please try again.';
                    console.error('Error adding user:', event.target.errorCode);
                };
            }
        };

        request.onerror = function(event) {
            console.error('Error checking username:', event.target.errorCode);
        };
    } else {
        const errorMessage = document.getElementById('signUpErrorMessage');
        errorMessage.textContent = 'Please enter a username and password';
    }
});
