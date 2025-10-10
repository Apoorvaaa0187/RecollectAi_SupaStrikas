export default async function getAll() {
    const response = await fetch('http://localhost:3000/content/all', {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}