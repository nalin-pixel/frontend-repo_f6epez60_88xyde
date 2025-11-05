import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { name: 'New In' },
  { name: 'Women' },
  { name: 'Men' },
  { name: 'Collections' },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/50 dark:bg-neutral-900/40 border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          className="flex items-center gap-2 font-semibold tracking-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="text-lg">VogueWave</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link, idx) => (
            <motion.a
              key={link.name}
              href={`#${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black dark:bg-white transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium shadow-sm"
        >
          <Star className="h-4 w-4 fill-current" />
          Join VIP
        </motion.button>
      </div>
    </header>
  );
}
