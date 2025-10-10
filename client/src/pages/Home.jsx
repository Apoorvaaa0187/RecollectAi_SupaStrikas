import React, { useState } from 'react'
import LoginModal from '../components/LoginModal'
import { useNavigate } from 'react-router-dom'
import HowItWorks from './HowItWorks'


export default function Home({ setUser }) {
const [showLogin, setShowLogin] = useState(false)
const navigate = useNavigate()


function handleLogin(name) {
setUser(name)
navigate('/dashboard')
}


return (
<>
<section className="landing" id="landing">
<h2>Welcome to <span>RecollectAI</span></h2>
<p>The next-generation AI platform that remembers everything for you. Seamlessly search, summarize, and rediscover your digital world.</p>
<button id="loginBtn" onClick={() => setShowLogin(true)}>Login to Continue</button>
</section>


<LoginModal visible={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} />


<HowItWorks />
</>
)
}