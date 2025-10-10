export default async function addUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const username = formData.get('username');
    const response = await fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username }),
        });
    const res = await response.json();
    if(res.status === "ok") {
        window.location.href = '/';
    }
    else {
        alert("Error occurred");
        window.location.href = '/signup';
    }
}