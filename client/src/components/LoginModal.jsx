export default function LoginModal({ onClose }) {
  const handleEnter = () => {
    const name = document.getElementById("username").value.trim();
    if (!name) return alert("Enter your name!");
    onClose();
    alert(`Welcome, ${name}!`);
  };

  return (
    <div className="login-modal" style={{ display: "flex" }}>
      <div className="login-content glass neon-border">
        <h3>Login to RecollectAI</h3>
        <input type="text" id="username" placeholder="Enter your name" />
        <input type="password" id="password" placeholder="Enter password" />
        <button onClick={handleEnter}>Enter</button>
      </div>
    </div>
  );
}
