import React from 'react';
import { motion } from 'framer-motion';

export default function ProductGrid({ products, onAddToCart }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p, idx) => (
        <motion.article key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: idx * 0.05 }} className="group rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-950">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={(p.images && p.images[0]) || `https://source.unsplash.com/random/800x1000?fashion,${encodeURIComponent(p.title)}`} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold">{p.title}</h3>
              <span className="font-semibold">${Number(p.price).toFixed(2)}</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1">{p.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10">{p.category}</span>
              <button onClick={() => onAddToCart(p)} className="rounded-lg bg-black text-white dark:bg-white dark:text-black px-3 py-2 text-sm font-semibold">Add to cart</button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
