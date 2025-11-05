import React, { useState } from 'react';

export default function AdminPanel({ apiBase, token, onProductCreated, onDelete, products }) {
  const [form, setForm] = useState({ title: '', price: '', category: '', description: '', image: '' });
  const [loading, setLoading] = useState(false);
  const create = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          category: form.category || 'General',
          description: form.description,
          images: form.image ? [form.image] : [],
          tags: [],
          in_stock: true,
          colors: [],
          sizes: [],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to create');
      onProductCreated(data);
      setForm({ title: '', price: '', category: '', description: '', image: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10">
      <div className="rounded-2xl border p-4">
        <h3 className="font-semibold mb-4">Admin • Manage Products</h3>
        <form onSubmit={create} className="grid md:grid-cols-5 gap-3">
          <input required placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border" />
          <input required type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border" />
          <input placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border" />
          <input placeholder="Image URL" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border" />
          <button disabled={loading} className="rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold">{loading? 'Adding...' : 'Add Product'}</button>
          <textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="md:col-span-5 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border" />
        </form>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p)=> (
            <div key={p.id} className="rounded-xl border p-3 flex gap-3">
              <img src={(p.images && p.images[0]) || `https://source.unsplash.com/random/120x120?fashion,${encodeURIComponent(p.title)}`} alt="" className="h-16 w-16 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium">{p.title}</p>
                <p className="text-sm opacity-70">${Number(p.price).toFixed(2)} • {p.category}</p>
              </div>
              <button onClick={()=>onDelete(p)} className="text-sm underline">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
