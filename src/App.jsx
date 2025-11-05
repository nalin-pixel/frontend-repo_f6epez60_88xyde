import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Lookbook from './components/Lookbook';

function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">© {new Date().getFullYear()} VogueWave. All rights reserved.</p>
        <div className="flex items-center gap-6 text-sm">
          <a href="#" className="hover:underline underline-offset-4">Privacy</a>
          <a href="#" className="hover:underline underline-offset-4">Terms</a>
          <a href="#" className="hover:underline underline-offset-4">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white font-inter">
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <Lookbook />
      </main>
      <Footer />
    </div>
  );
}
