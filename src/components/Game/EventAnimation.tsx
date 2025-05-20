import React from 'react';

interface EventAnimationProps {
  event: 'none' | 'four' | 'six' | 'out';
}

export function EventAnimation({ event }: EventAnimationProps) {
  if (event === 'none') return null;

  const styles = {
    four: 'text-blue-500 bg-blue-100 border-blue-200',
    six: 'text-green-500 bg-green-100 border-green-200',
    out: 'text-red-500 bg-red-100 border-red-200'
  };

  const animations = {
    four: 'animate-bounce',
    six: 'animate-bounce',
    out: 'animate-ping'
  };

  const texts = {
    four: '🏏 FOUR!',
    six: '💥 SIX!',
    out: '💀 OUT!'
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className={`
        px-6 py-3 rounded-lg border-2 font-bold text-3xl
        ${styles[event]} ${animations[event]}
      `}>
        {texts[event]}
      </div>
    </div>
  );
}