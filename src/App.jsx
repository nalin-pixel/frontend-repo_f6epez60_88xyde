import React, { useEffect, useMemo, useState } from 'react';
import { ShoppingCart, LogIn, LogOut, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

import AuthModal from './components/AuthModal';
import FiltersBar from './components/FiltersBar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [filters, setFilters] = useState({ q: '', min_price: undefined, max_price: undefined, sort: '' });
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);
  const isAdmin = user?.role === 'admin';

  const headers = useMemo(() => token ? { Authorization: `Bearer ${token}` } : {}, [token]);

  const fetchProducts = async (pg = 1) => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.min_price !== undefined) params.set('min_price', String(filters.min_price));
    if (filters.max_price !== undefined) params.set('max_price', String(filters.max_price));
    if (filters.sort) params.set('sort', filters.sort);
    params.set('limit', '12');
    params.set('page', String(pg));
    const res = await fetch(`${API}/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data.items || []);
    setTotal(data.total || 0);
    setPage(data.page || 1);
  };

  const loadCart = async () => {
    if (!token) return setCart([]);
    const res = await fetch(`${API}/cart`, { headers });
    if (res.ok) {
      const data = await res.json();
      setCart(data.items || []);
    }
  };

  const addToCart = async (product) => {
    if (!token) { setAuthOpen(true); return; }
    await fetch(`${API}/cart`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify({ product_id: product.id, quantity: 1 }) });
    await loadCart();
    setCartOpen(true);
  };

  const updateCartQty = async (item, qty) => {
    await fetch(`${API}/cart`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify({ product_id: item.product_id, size: item.size, color: item.color, quantity: qty }) });
    await loadCart();
  };

  const removeFromCart = async (item) => {
    await fetch(`${API}/cart`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify({ product_id: item.product_id, size: item.size, color: item.color, remove: true }) });
    await loadCart();
  };

  const clearCart = async () => {
    await fetch(`${API}/cart`, { method: 'DELETE', headers });
    await loadCart();
  };

  const onAuth = (u, t) => {
    setUser(u); setToken(t);
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('token', t);
    loadCart();
  };

  const logout = () => {
    setUser(null); setToken(''); setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => { fetchProducts(1); }, []);
  useEffect(() => { if (token) loadCart(); }, [token]);

  const totalPages = Math.max(1, Math.ceil(total / 12));

  const deleteProduct = async (p) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`${API}/products/${p.id}`, { method: 'DELETE', headers });
    fetchProducts(page);
  };

  const onProductCreated = () => fetchProducts(page);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white font-inter">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.a href="#" className="font-extrabold tracking-tight text-lg" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>VogueWave</motion.a>
          <nav className="flex items-center gap-3">
            {isAdmin && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"><Shield className="h-3 w-3"/> Admin</span>
            )}
            <button onClick={()=>setCartOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-sm"><ShoppingCart className="h-4 w-4"/> Cart ({cart.length})</button>
            {user ? (
              <button onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-3 py-2 text-sm"><LogOut className="h-4 w-4"/> Logout</button>
            ) : (
              <button onClick={()=>setAuthOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-3 py-2 text-sm"><LogIn className="h-4 w-4"/> Sign in</button>
            )}
          </nav>
        </div>
      </header>

      <main className="pt-20 pb-20">
        <section className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl" />
            <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-violet-300/40 blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold">Discover your style</h1>
              <p className="text-neutral-600 dark:text-neutral-300">Shop curated looks, with smooth animations and powerful filters.</p>
            </div>
            <FiltersBar filters={filters} onChange={setFilters} onSearch={()=>fetchProducts(1)} />
            <div className="py-8">
              <ProductGrid products={products} onAddToCart={addToCart} />
              <div className="flex items-center justify-between mt-8">
                <button disabled={page<=1} onClick={()=>{const p = Math.max(1, page-1); setPage(p); fetchProducts(p);}} className="px-4 py-2 rounded-xl border disabled:opacity-50">Prev</button>
                <span className="text-sm">Page {page} / {totalPages}</span>
                <button disabled={page>=totalPages} onClick={()=>{const p = Math.min(totalPages, page+1); setPage(p); fetchProducts(p);}} className="px-4 py-2 rounded-xl border disabled:opacity-50">Next</button>
              </div>
            </div>

            {isAdmin && (
              <AdminPanel apiBase={API} token={token} onProductCreated={onProductCreated} onDelete={deleteProduct} products={products} />
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 dark:border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">© {new Date().getFullYear()} VogueWave</p>
          <p className="text-sm">Built with motion</p>
        </div>
      </footer>

      <AuthModal open={authOpen} onClose={()=>setAuthOpen(false)} onAuth={onAuth} apiBase={API} />
      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} items={cart} onUpdateQty={updateCartQty} onRemove={removeFromCart} onClear={clearCart} />
    </div>
  );
}
