import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="new-in" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-violet-300/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-[36rem] rounded-full bg-emerald-300/30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 dark:bg-neutral-900/60 backdrop-blur px-3 py-1 text-xs border border-black/5 dark:border-white/10">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="tracking-wide">AW • 24 Capsule Collection</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            Elevate your style with pieces that move
            <span className="block bg-gradient-to-r from-black via-neutral-800 to-black dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent">as you do.</span>
          </h1>

          <p className="text-neutral-600 dark:text-neutral-300 max-w-xl text-base sm:text-lg">
            Crafted silhouettes, refined textures, and modern tailoring. Discover statement staples designed for everyday versatility and runway energy.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a
              href="#collections"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-3 text-sm font-semibold shadow-lg shadow-black/10"
            >
              Shop the drop
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#lookbook"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-neutral-900/70 backdrop-blur px-5 py-3 text-sm font-semibold border border-black/10 dark:border-white/10"
            >
              Explore lookbook
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://images.unsplash.com/photo-1520975922203-b114b5a9778e?q=80&w=1500&auto=format&fit=crop"
            alt="Editorial fashion model in motion"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 left-4 right-4 rounded-2xl backdrop-blur bg-white/50 dark:bg-neutral-900/50 p-4 border border-black/10 dark:border-white/10"
          >
            <p className="text-sm font-medium">Neo Tailored Trench</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">Limited — Matte Black | Sizes XS–XL</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
