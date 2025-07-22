
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Smile, Heart, Star } from 'lucide-react';

const VibeCritter: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [animation, setAnimation] = useState<'jump' | 'smile' | 'love' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const dragControls = useDragControls();

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
      const { innerWidth, innerHeight } = window;
      setPosition({
        x: Math.random() * (innerWidth - 100),
        y: Math.random() * (innerHeight - 100),
      });
    }, 3000); 

    return () => clearTimeout(showTimeout);
  }, []);

  const handleInteraction = (type: 'jump' | 'smile' | 'love') => {
    if (isInteracting) return;
    setIsInteracting(true);
    setAnimation(type);
    setTimeout(() => {
      setAnimation(null);
      setIsInteracting(false);
    }, 1000);
  };
  
  const handleRandomPop = () => {
    if (isInteracting) return;
    setIsVisible(false);
    setTimeout(() => {
        const { innerWidth, innerHeight } = window;
        setPosition({
            x: Math.random() * (innerWidth - 100),
            y: Math.random() * (innerHeight - 100),
        });
        setIsVisible(true);
    }, 500);
  }

  useEffect(() => {
    const interval = setInterval(handleRandomPop, 10000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInteracting]);


  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      drag
      dragControls={dragControls}
      dragListener={false}
      onPointerDown={(e) => dragControls.start(e)}
      onClick={() => handleInteraction('jump')}
      whileHover={{ scale: 1.1, y: -10 }}
      whileTap={{ scale: 0.9 }}
      className="fixed z-50 cursor-grab active:cursor-grabbing"
      style={{
        left: position.x,
        top: position.y,
        touchAction: 'none',
      }}
    >
      <motion.div
        animate={animation || {}}
        variants={{
          jump: { y: [0, -40, 0], transition: { duration: 0.5 } },
          smile: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] },
          love: { scale: [1, 1.3, 1] },
        }}
        className="relative w-24 h-24"
      >
        {/* Body */}
        <div className="w-full h-full bg-primary rounded-full shadow-lg flex items-center justify-center">
          {/* Eyes */}
          <div className="flex gap-3">
            <div className="w-5 h-5 bg-white rounded-full border-2 border-primary-foreground" />
            <div className="w-5 h-5 bg-white rounded-full border-2 border-primary-foreground" />
          </div>
          {/* Mouth */}
          <motion.div
            className="absolute bottom-6 w-10 h-5 border-b-4 border-primary-foreground rounded-b-full"
            animate={animation === 'smile' ? {
              scaleY: [1, 0.2, 1],
              y: [0, 5, 0]
            } : {}}
          />
        </div>
        
        {/* Interaction Icons */}
        {animation === 'smile' && <Smile className="absolute top-0 left-0 text-yellow-400" />}
        {animation === 'love' && <Heart className="absolute -top-2 -right-2 text-red-500 fill-current" />}
      </motion.div>
    </motion.div>
  );
};

export default VibeCritter;
