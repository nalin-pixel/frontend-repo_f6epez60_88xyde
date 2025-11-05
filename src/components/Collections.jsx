import React from 'react';
import { motion } from 'framer-motion';

const items = [
  {
    title: 'Monochrome Minimal',
    image:
      'https://images.unsplash.com/photo-1520975960241-b44ac01c3a88?q=80&w=1500&auto=format&fit=crop',
    tag: 'Essentials',
  },
  {
    title: 'Street Luxe',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1500&auto=format&fit=crop',
    tag: 'Urban',
  },
  {
    title: 'Soft Power Suiting',
    image:
      'https://images.unsplash.com/photo-1548883354-7622d3f024f2?q=80&w=1500&auto=format&fit=crop',
    tag: 'Tailoring',
  },
  {
    title: 'Weekend Off-Duty',
    image:
      'https://images.unsplash.com/photo-1520975922203-b114b5a9778e?q=80&w=1500&auto=format&fit=crop',
    tag: 'Casual',
  },
];

export default function Collections() {
  return (
    <section id="collections" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Curated Collections</h2>
            <p className="text-neutral-600 dark:text-neutral-300 mt-2">Explore our favorite edits for the season.</p>
          </div>
          <a href="#" className="hidden sm:inline text-sm font-semibold underline-offset-4 hover:underline">View all</a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white text-lg font-semibold drop-shadow">{item.title}</h3>
                  <span className="text-white/80 text-xs">{item.tag}</span>
                </div>
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-black font-bold group-hover:translate-x-1 transition-transform"
                >
                  →
                </motion.span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
