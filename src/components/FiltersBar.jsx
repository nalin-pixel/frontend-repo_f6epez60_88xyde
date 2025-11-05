import React from 'react';

export default function FiltersBar({ filters, onChange, onSearch }) {
  const set = (k, v) => onChange({ ...filters, [k]: v });
  return (
    <div className="sticky top-16 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid gap-3 md:grid-cols-12">
        <input value={filters.q} onChange={(e)=>set('q', e.target.value)} placeholder="Search products" className="md:col-span-4 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/10" />
        <input type="number" step="0.01" value={filters.min_price ?? ''} onChange={(e)=>set('min_price', e.target.value ? Number(e.target.value): undefined)} placeholder="Min price" className="md:col-span-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border" />
        <input type="number" step="0.01" value={filters.max_price ?? ''} onChange={(e)=>set('max_price', e.target.value ? Number(e.target.value): undefined)} placeholder="Max price" className="md:col-span-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border" />
        <select value={filters.sort} onChange={(e)=>set('sort', e.target.value)} className="md:col-span-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border">
          <option value="">Sort</option>
          <option value="new">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <button onClick={onSearch} className="md:col-span-2 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold">Apply</button>
      </div>
    </div>
  );
}
