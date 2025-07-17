import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ShineButton } from "@/components/ui/shine-button";

export interface AppDrawerButton {
  image: string;
  onClick: () => void;
}

interface AppDrawerProps {
  buttons: AppDrawerButton[];
  onClose: () => void;
  show: boolean;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({ buttons, onClose, show }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Use width/height ratio to determine columns, min 2, max 6
      const ratio = width / height;
      const cols = Math.max(2, Math.min(6, Math.round(ratio * 2.5)));
      setColumns(cols);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Close when clicking outside the content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-500 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="w-full h-full max-w-6xl max-h-[90vh] bg-white/60 backdrop-blur-md rounded-[2vh] shadow-2xl flex flex-col items-center justify-center p-8 border border-white/30 relative"
        onMouseDown={e => e.stopPropagation()}
      >
        <div
          className="w-full flex-1 grid gap-8 items-center justify-center"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            justifyItems: 'center',
          }}
        >
          {buttons.map((btn, i) => (
            <ShineButton
              key={i}
              backgroundImage={btn.image}
              className="flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 text-center"
              onClick={btn.onClick}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="absolute left-1/2 bottom-6 -translate-x-1/2 bg-gray-700 text-white rounded-full p-3 shadow-lg hover:bg-gray-600 transition-colors z-10 flex items-center justify-center"
          aria-label="Close"
        >
          <X size={28} />
        </button>
      </div>
    </div>
  );
}; 