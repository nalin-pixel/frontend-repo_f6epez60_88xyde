import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function CartDrawer({ open, onClose, items, onUpdateQty, onRemove, onClear }) {
  const total = items.reduce((sum, it) => sum + (it.product?.price || 0) * (it.quantity || 1), 0);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[90] bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.25 }} className="fixed right-0 top-0 bottom-0 z-[100] w-full max-w-md bg-white dark:bg-neutral-950 border-l border-black/10 dark:border-white/10 flex flex-col">
            <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
              <h3 className="font-semibold">Shopping Cart</h3>
              <button onClick={onClose} className="text-sm opacity-70 hover:opacity-100">Close</button>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {items.length === 0 && <p className="text-sm opacity-70">Your cart is empty.</p>}
              {items.map((it) => (
                <div key={`${it.product_id}-${it.size || ''}-${it.color || ''}`} className="flex gap-3 border-b pb-3">
                  <img src={(it.product?.images && it.product.images[0]) || `https://source.unsplash.com/random/160x160?fashion,${encodeURIComponent(it.product?.title || '')}`} alt="" className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{it.product?.title || 'Product'}</p>
                      <span className="font-semibold">${((it.product?.price || 0) * (it.quantity || 1)).toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-neutral-500">{[it.size, it.color].filter(Boolean).join(' • ')}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button className="h-8 w-8 rounded border" onClick={()=>onUpdateQty(it, Math.max(1, (it.quantity||1)-1))}>-</button>
                      <span className="w-8 text-center">{it.quantity || 1}</span>
                      <button className="h-8 w-8 rounded border" onClick={()=>onUpdateQty(it, (it.quantity||1)+1)}>+</button>
                      <button className="ml-auto text-sm underline" onClick={()=>onRemove(it)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 py-2" onClick={onClear}>Clear</button>
                <button className="flex-1 rounded-xl bg-black text-white dark:bg-white dark:text-black py-2 font-semibold">Checkout</button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
