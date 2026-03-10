import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { ShineButton } from "@/components/ui/shine-button";

export interface AppDrawerButton {
  image: string;
  label: string;
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

  // Close when clicking outside the content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-[opacity,transform] duration-300 ease-in-out ${show ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`}
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="w-full h-full max-w-6xl max-h-[90vh] bg-white/60 backdrop-blur-md rounded-[2vh] shadow-2xl flex flex-col items-center justify-center p-8 border border-white/30 relative"
        onMouseDown={e => e.stopPropagation()}
      >
        <div
          className="w-full flex-1 grid grid-cols-6 gap-6 items-center justify-center"
          style={{ justifyItems: 'center', alignContent: 'center' }}
        >
          {buttons.map((btn, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <ShineButton
                backgroundImage={btn.image}
                className="w-16 h-16 md:w-20 md:h-20 aspect-square"
                onClick={btn.onClick}
              />
              <span className="text-xs font-medium text-gray-800 text-center leading-tight select-none">
                {btn.label}
              </span>
            </div>
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
