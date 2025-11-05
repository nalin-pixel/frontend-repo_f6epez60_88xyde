import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter } from 'lucide-react';

const photos = [
  'https://images.unsplash.com/photo-1520975940469-c221a79b0a42?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
];

export default function Lookbook() {
  return (
    <section id="lookbook" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Lookbook</h2>
            <p className="text-neutral-600 dark:text-neutral-300 mt-2">Runway energy meets street-level ease.</p>
          </div>
          <div className="flex items-center gap-3">
            <a aria-label="Instagram" href="#" className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"><Instagram className="h-5 w-5" /></a>
            <a aria-label="Twitter" href="#" className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"><Twitter className="h-5 w-5" /></a>
            <a aria-label="YouTube" href="#" className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {photos.map((src, idx) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: idx * 0.06 }}
              className="rounded-3xl overflow-hidden group"
            >
              <img src={src} alt={`Look ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Get first access to drops</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">Subscribe for invites, styling tips, and private sales.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="w-full sm:w-auto flex items-center gap-3">
            <input type="email" required placeholder="Your email" className="w-full sm:w-72 px-4 py-3 rounded-xl bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20" />
            <button type="submit" className="px-5 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black text-sm font-semibold">Subscribe</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
