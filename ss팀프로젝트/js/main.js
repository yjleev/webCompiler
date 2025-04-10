function toggleLogin() {
    const loginContainer = document.getElementById('loginContainer');
    loginContainer.classList.toggle('active');
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    this.style.display = 'none';
    
    document.getElementById('loadingMessage').style.display = 'block';
});