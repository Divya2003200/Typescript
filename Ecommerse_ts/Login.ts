const login = document.getElementById('loginForm') as HTMLFormElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;

login.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const username = usernameInput.value;   
    const password = passwordInput.value;  

    try {
       
        const response = await axios.get('https://fakestoreapi.com/users');
        const users = response.data;

         
        const user = users.find((user: { username: string }) => user.username === username);

        if (user && user.password === password) {   
            window.location.href = 'index.html';
        } else {
            
            alert('Invalid username or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
    }
});
