import React from 'react';
import { Player } from '../../types/game';

interface BatsmanStatsProps {
  player: Player;
  label: string;
  isDark: boolean;
}

export function BatsmanStats({ player, label, isDark }: BatsmanStatsProps) {
  return (
    <div className={`p-4 rounded-lg ${
      isDark ? 'bg-gray-800' : 'bg-white shadow-md'
    }`}>
      <h3 className="font-semibold mb-2">{label}: {player.name}</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Runs: {player.runs}</div>
        <div>Balls: {player.balls}</div>
        <div>4s: {player.fours}</div>
        <div>6s: {player.sixes}</div>
        <div>SR: {player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(1) : 0}</div>
      </div>
    </div>
  );
}