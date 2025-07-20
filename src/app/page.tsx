'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HelpCircle, Grid3X3 } from 'lucide-react';
import Image from 'next/image';
import { CarouselPanel } from '@/components/carousel-panel';
import { ThreeCard } from '@/components/three-card';
import { AppDrawer, AppDrawerButton } from '@/components/app-drawer';
import { ShineButton } from "@/components/ui/shine-button";

interface CarouselPanelData {
  id: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

const carouselPanels: CarouselPanelData[] = [
  {
    id: 'idcard',
    children: (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ThreeCard frontTexture="/assets/img/BusinessCardFront.png" backTexture="/assets/img/BusinessCardBack.png" rotationSpeed={0.01} />
      </div>
    ),
    containerClassName: 'bg-transparent',
  },
  {
    id: 'loan',
    title: 'How Much Student Debt Are You In?',
    subtitle: 'click the money bag to find out!',
    backgroundImage: '/assets/img/vista1.png'
  },
  {
    id: 'audiovis',
    title: 'Check out the new Audio Visualiser for Windows!',
    subtitle: 'With spotify support and loads of options, click the spectrum icon',
    backgroundImage: '/assets/img/vista2.png'
  }
];

const appDrawerButtons: AppDrawerButton[] = [
  {
    image: '/assets/img/bird.png',
    onClick: () => window.location.href = '/flockingsimulation',
  },
  {
    image: '/assets/img/earth.png',
    onClick: () => window.location.href = '/spaceflight',
  },
  {
    image: '/assets/img/joker.png',
    onClick: () => window.location.href = '/cardgame',
  },
];

export default function HomePage() {
  // All hooks at the top
  const [showAbout, setShowAbout] = useState(false);
  const [showAppDrawer, setShowAppDrawer] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const aboutTimeout = useRef<NodeJS.Timeout | null>(null);

  // All useEffects at the top
  useEffect(() => {
    if (showAbout) {
      setAboutVisible(true);
    } else if (aboutVisible) {
      if (aboutTimeout.current) clearTimeout(aboutTimeout.current);
      aboutTimeout.current = setTimeout(() => {
        setAboutVisible(false);
      }, 500); // match transition duration
    }
    return () => {
      if (aboutTimeout.current) clearTimeout(aboutTimeout.current);
    };
  }, [showAbout, aboutVisible]);

  useEffect(() => {
    let i = 0;
    const appbarButtons = document.querySelectorAll('.shine-button.hidden-visibility');
    i = 0;
    appbarButtons.forEach(button => {
      setTimeout(() => {
        button.classList.remove('hidden-visibility');
        button.classList.add('animate__animated', 'animate__bounceInDown');
      }, 500 + i);
      i += 500;
    });
  }, []);

  useEffect(() => {
    const setParallax = (xPos: number, yPos: number) => {
      const xOffset = (-200 * xPos) + 'px';
      const yOffset = (-50 * yPos) + 'px';
      const zoom = 120;
      const mainContainer = document.querySelector('.main-container') as HTMLElement;
      if (mainContainer) {
        mainContainer.style.backgroundPosition = `calc(50% + ${xOffset}) calc(50% + ${yOffset})`;
        mainContainer.style.backgroundSize = `auto ${zoom}%`;
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      setParallax(mouseX, mouseY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touchX = e.touches[0].clientX / window.innerWidth - 0.5;
        const touchY = e.touches[0].clientY / window.innerHeight - 0.5;
        setParallax(touchX, touchY);
      }
    };
    setParallax(0, 0);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Toggle about panel
  const handleAboutToggle = () => {
    setShowAbout((prev) => !prev);
  };

  return (
    <div className="main-container flex flex-col h-full w-full bg-cover bg-center bg-no-repeat p-2 sm:p-4 md:p-8" style={{ backgroundImage: 'url(/assets/img/background.gif)', backgroundColor: '#210f0c' }}>
      {/* Fade group for all background elements */}
      <div className={`flex flex-col flex-1 justify-between gap-y-4 transition-opacity duration-500 ${showAppDrawer ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
        {/* Top Navigation Bar */}
        <nav className="flex items-center justify-between h-16 px-4 shrink-0 rounded-[2vh] shadow-lg bg-white/20 backdrop-blur-md border border-white/30 animate__animated animate__fadeInDown animate__fast">
          <div style={{ width: 40, height: 40 }} aria-hidden="true" />
          <div className="logo cursor-pointer" onClick={() => window.location.href = 'https://github.com/skjapps'}>
            <Image priority={true} src="/assets/img/logo.png" alt="skjapps" width={40} height={20} className="h-10 w-auto" />
          </div>
          <Button size="sm" onClick={handleAboutToggle}>
            <HelpCircle />
          </Button>
        </nav>
        {/* Main Content Area */}
        <main className="flex-1 min-h-0 flex items-center justify-center relative">
          <div className="w-full h-full transition-opacity duration-500 opacity-100 pointer-events-auto">
            <CarouselPanel panels={carouselPanels} />
          </div>
          <Dialog open={showAbout} onOpenChange={setShowAbout}>
            <DialogContent className="max-w-2xl bg-white/60 backdrop-blur-md rounded-[2vh] p-8 shadow-lg border border-white/30">
              <DialogHeader>
                <DialogTitle>Sri&apos;s Calling Card</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-600 mb-4">it&apos;s not really that cool, but its kinda like a business card.</p>
              <a href='mailto:wastemanchicken@hotmail.com' className="text-sm text-blue-600 hover:text-blue-800 mb-2 block">send all spam mail here i promise i will never read it</a>
              <a href='https://lennsan.tumblr.com/' className="text-sm text-blue-600 hover:text-blue-800 mb-4 block">backgrounds by Lennsan on tumblr</a>
              <div className="flex justify-center space-x-6 mb-4">
                <a href='https://www.instagram.com/skjlmao/' className="text-4xl hover:scale-110 transition-transform">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href='https://github.com/skjapps' target="_blank" rel="noopener noreferrer" className="text-4xl hover:scale-110 transition-transform">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
              <p className="text-center text-sm text-gray-600 mb-4">@skjlmao</p>
            </DialogContent>
          </Dialog>
        </main>
        {/* Bottom App Bar */}
        <div className="flex flex-row items-center justify-evenly h-20 shrink-0 pb-[env(safe-area-inset-bottom)] rounded-[2vh] shadow-lg bg-black/20 backdrop-blur-md border border-black/30 space-x-4 animate__animated animate__fadeInUp animate__fast">
          <ShineButton
            backgroundImage="/assets/img/loan.png"
            className="w-16 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12 max-w-[60px] max-h-[60px] aspect-square"
            onClick={() => window.location.href = '/loan'}
          />
          <ShineButton
            backgroundImage="/assets/img/audiovisualiser.png"
            className="w-16 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12 max-w-[60px] max-h-[60px] aspect-square"
            onClick={() => window.location.href = '/audiovisualiser'}
          />
          <ShineButton
            backgroundImage="/assets/img/music.png"
            className="w-16 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12 max-w-[60px] max-h-[60px] aspect-square"
            onClick={() => window.location.href = '/music'}
          />
          <ShineButton
            className="w-16 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12 max-w-[60px] max-h-[60px] aspect-square"
            onClick={() => setShowAppDrawer(!showAppDrawer)}>
            <Grid3X3 size={50} className='size-10' />
          </ShineButton>
        </div>
      </div>
      {/* App Drawer Overlay */}
      <AppDrawer buttons={appDrawerButtons} onClose={() => setShowAppDrawer(false)} show={showAppDrawer} />
    </div>
  );
}
