import React, { useState } from 'react'

// Simple, clean AuthModal with link-based login/signup and inline validation.
export default function AuthModal({ show, onClose }) {
  const [mode, setMode] = useState('login')

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#0f1720]/95 rounded-xl p-6 max-w-2xl w-full text-white transform transition-all duration-200">
        <button aria-label="Close" className="absolute top-3 right-3 text-white/70 text-xl" onClick={onClose}>✕</button>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
          {mode === 'login' ? (
            <div className="text-sm text-teal-300">Don't have an account? <button type="button" className="underline ml-2" onClick={() => setMode('signup')}>Sign Up</button></div>
          ) : (
            <div className="text-sm text-teal-300">Already have an account? <button type="button" className="underline ml-2" onClick={() => setMode('login')}>Sign in</button></div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {mode === 'login' ? <LoginForm onSuccess={onClose} /> : <SignupForm onSuccess={onClose} />}
          </div>

          <div className="hidden lg:block px-4">
            <div className="p-4 rounded-md border border-white/6 bg-gradient-to-b from-[#083f3a]/10 to-transparent">
              <h4 className="text-teal-300 font-semibold mb-2">Why sign in?</h4>
              <ul className="text-sm text-teal-200 space-y-1">
                <li>• Save content automatically</li>
                <li>• Get AI summaries</li>
                <li>• Visual search across your history</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FieldError({ message }) {
  if (!message) return null
  return <div className="text-xs text-rose-400 mt-1">{message}</div>
}

function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const validate = (v) => {
    const e = {}
    if (!v.email) e.email = 'Email required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Invalid email'
    if (!v.password) e.password = 'Password required'
    else if (v.password.length < 8) e.password = 'Minimum 8 chars'
    return e
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length === 0) {
      // placeholder: call API here
      console.log('login', form)
      if (onSuccess) onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <label className="block">
        <span className="text-sm text-teal-200">Email</span>
        <input name="email" value={form.email} onChange={handleChange} type="email" className={`mt-2 block w-full rounded-md bg-[#081018] px-3 py-2 text-white placeholder:text-white/40 ${errors.email ? 'border-rose-400 border' : 'border-white/6 border'}`} placeholder="you@example.com" />
        <FieldError message={errors.email} />
      </label>

      <label className="block">
        <span className="text-sm text-teal-200">Password</span>
        <input name="password" value={form.password} onChange={handleChange} type="password" className={`mt-2 block w-full rounded-md bg-[#081018] px-3 py-2 text-white placeholder:text-white/40 ${errors.password ? 'border-rose-400 border' : 'border-white/6 border'}`} placeholder="••••••••" />
        <FieldError message={errors.password} />
      </label>

      <div className="flex items-center justify-between">
        <button type="submit" className="px-5 py-2 rounded-full bg-teal-400 text-teal-900 font-semibold">Sign in</button>
        <button type="button" className="text-sm text-teal-300">Forgot?</button>
      </div>
    </form>
  )
}

function SignupForm({ onSuccess }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  const validate = (v) => {
    const e = {}
    if (!v.username) e.username = 'Name required'
    if (!v.email) e.email = 'Email required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Invalid email'
    if (!v.password) e.password = 'Password required'
    else if (v.password.length < 8) e.password = 'Minimum 8 chars'
    return e
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length === 0) {
      // placeholder: call signup API
      console.log('signup', form)
      if (onSuccess) onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <label className="block">
        <span className="text-sm text-teal-200">Full name</span>
        <input name="username" value={form.username} onChange={handleChange} type="text" className={`mt-2 block w-full rounded-md bg-[#081018] px-3 py-2 text-white placeholder:text-white/40 ${errors.username ? 'border-rose-400 border' : 'border-white/6 border'}`} />
        <FieldError message={errors.username} />
      </label>

      <label className="block">
        <span className="text-sm text-teal-200">Email</span>
        <input name="email" value={form.email} onChange={handleChange} type="email" className={`mt-2 block w-full rounded-md bg-[#081018] px-3 py-2 text-white placeholder:text-white/40 ${errors.email ? 'border-rose-400 border' : 'border-white/6 border'}`} />
        <FieldError message={errors.email} />
      </label>

      <label className="block">
        <span className="text-sm text-teal-200">Password</span>
        <input name="password" value={form.password} onChange={handleChange} type="password" className={`mt-2 block w-full rounded-md bg-[#081018] px-3 py-2 text-white placeholder:text-white/40 ${errors.password ? 'border-rose-400 border' : 'border-white/6 border'}`} />
        <FieldError message={errors.password} />
      </label>

      <div className="flex justify-end">
        <button type="submit" className="px-5 py-2 rounded-full bg-teal-400 text-teal-900 font-semibold">Create account</button>
      </div>
    </form>
  )
}
