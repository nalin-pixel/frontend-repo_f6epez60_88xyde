import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthModal({ open, onClose, onAuth, apiBase }) {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiBase}/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'login' ? { email: form.email, password: form.password } : form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed');
      onAuth(data.user, data.access_token);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-black/40 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-xl border border-black/10 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
              <button onClick={onClose} className="text-sm opacity-70 hover:opacity-100">Close</button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-sm mb-1">Name</label>
                  <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-black/10 dark:border-white/10" />
                </div>
              )}
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-black/10 dark:border-white/10" />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-black/10 dark:border-white/10" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button disabled={loading} className="w-full rounded-xl bg-black text-white dark:bg-white dark:text-black py-2 font-semibold">{loading ? 'Please wait...' : (mode === 'login' ? 'Sign in' : 'Create account')}</button>
            </form>
            <p className="mt-4 text-sm text-center">
              {mode === 'login' ? (
                <>No account? <button onClick={()=>setMode('register')} className="underline underline-offset-4">Register</button></>
              ) : (
                <>Already have an account? <button onClick={()=>setMode('login')} className="underline underline-offset-4">Login</button></>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
