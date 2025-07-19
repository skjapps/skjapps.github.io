'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CarouselPanel {
  id: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
  backgroundClassName?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  boxShadow?: string;
  children?: React.ReactNode;
}

interface CarouselPanelProps {
  panels: CarouselPanel[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
}

export function CarouselPanel({ 
  panels, 
  autoRotate = true, 
  autoRotateInterval = 10000 
}: CarouselPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  // Handle carousel navigation
  const navigateCarousel = useCallback((direction: 'left' | 'right') => {
    setSlideDirection(direction);
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev - 1 + panels.length) % panels.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % panels.length);
    }
    setUserInteracted(true);
    
    // Reset slide direction after animation
    setTimeout(() => {
      setSlideDirection(null);
    }, 1000);
  }, [panels.length]);

  // Handle indicator click
  const goToPanel = useCallback((index: number) => {
    const direction = index > currentIndex ? 'right' : 'left';
    setSlideDirection(direction);
    setCurrentIndex(index);
    setUserInteracted(true);
    
    // Reset slide direction after animation
    setTimeout(() => {
      setSlideDirection(null);
    }, 1000);
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateCarousel('left');
      } else if (e.key === 'ArrowRight') {
        navigateCarousel('right');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigateCarousel]);

  // Handle touch/swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        navigateCarousel('left');
      } else {
        navigateCarousel('right');
      }
    }
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (!userInteracted && autoRotate) {
      const interval = setInterval(() => {
        setSlideDirection('right');
        setCurrentIndex((prev) => (prev + 1) % panels.length);
        
        // Reset slide direction after animation
        setTimeout(() => {
          setSlideDirection(null);
        }, 1000);
      }, autoRotateInterval);

      return () => clearInterval(interval);
    }
  }, [userInteracted, autoRotate, autoRotateInterval, panels.length]);

  // Reset user interaction after 5 seconds
  useEffect(() => {
    if (userInteracted) {
      const timeout = setTimeout(() => {
        setUserInteracted(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [userInteracted]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center align-middle">
      {/* Padded Carousel Container */}
      <div className="relative w-full h-full flex flex-col justify-center items-center px-12 pb-8">
        {/* Navigation Button Left */}
        <Button
          variant="ghost"
          size="icon"
          className="z-10 absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          onClick={() => navigateCarousel('left')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Carousel Content */}
        <div 
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {panels.map((panel, index) => {
            const isActive = index === currentIndex;
            let animationClass = 'animate__animated animate__faster';
            if (isActive && slideDirection) {
              if (slideDirection === 'left') {
                animationClass += ' animate__slideInLeft';
              } else {
                animationClass += ' animate__slideInRight';
              }
            }
            return (
              <div
                key={panel.id}
                className={cn(
                  animationClass,
                  isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
                  'absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center rounded-2xl shadow-2xl',
                  panel.containerClassName
                )}
                style={{
                  backgroundImage: panel.backgroundImage ? `url(${panel.backgroundImage})` : undefined,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: panel.width,
                  height: panel.height,
                  minWidth: panel.minWidth,
                  minHeight: panel.minHeight,
                  maxWidth: panel.maxWidth,
                  maxHeight: panel.maxHeight,
                  padding: panel.padding,
                  margin: panel.margin,
                  ...(panel.backgroundClassName && { backgroundSize: 'cover', backgroundRepeat: 'no-repeat' })
                }}
              >
                {panel.children ? (
                  panel.children
                ) : (
                  <>
                    {panel.title && (
                      <h1 className={panel.titleClassName || 'font-bold text-white text-2xl md:text-4xl'}>
                        {panel.title}
                      </h1>
                    )}
                    {panel.subtitle && (
                      <h2 className={panel.subtitleClassName || 'text-gray-200 text-xl md:text-2xl'}>
                        {panel.subtitle}
                      </h2>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Button Right */}
        <Button
          variant="ghost"
          size="icon"
          className="z-10 absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          onClick={() => navigateCarousel('right')}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
        {/* Carousel Indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center py-2">
          {panels.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPanel(index)}
              className={`w-[10px] h-[10px] rounded-full mx-[5px] transition-colors duration-300 cursor-pointer ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 