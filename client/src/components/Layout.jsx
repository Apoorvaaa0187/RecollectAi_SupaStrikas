import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'


export default function Layout({ user, setUser }) {
return (
<>
<Header user={user} setUser={setUser} />
<Outlet />
<footer style={{ textAlign: 'center', padding: 20, color: '#777', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
© 2025 RecollectAI — Designed for the Future.
</footer>
</>
)
}