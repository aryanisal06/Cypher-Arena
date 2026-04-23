import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function InfoModal({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  showButton = true,
  buttonText = "Got it",
  onButtonClick
}: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-4 right-4 top-1/2 -translate-y-1/2 bg-[#1a1a1a] rounded-3xl p-6 z-[70] shadow-2xl border border-white/10 max-w-md mx-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <button 
                onClick={onClose}
                className="size-10 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="text-slate-300 leading-relaxed text-sm">
              {content}
            </div>
            
            {showButton && (
              <button
                onClick={onButtonClick || onClose}
                className="w-full mt-6 py-3 bg-primary text-slate-950 font-bold rounded-xl hover:bg-primary/90 transition-colors"
              >
                {buttonText}
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
