
'use client';

import { useState, useEffect } from 'react';
import NoteCell from './components/NoteCell';

type Mode = 'NORMAL' | 'INSERT' | 'VISUAL';
type Note = { x: number; y: number; length: number };

export default function Page() {
  const [mode, setMode] = useState<Mode>('NORMAL');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

  const handleCellClick = (x: number, y: number) => {
    if (mode === 'INSERT') {
      const noteExists = notes.some(note => note.x === x && note.y === y);
      if (!noteExists) {
        setNotes([...notes, { x, y, length: 1 }]);
      }
    }
    setCursor({ x, y });
  };

  const hasNoteAt = (x: number, y: number) => {
    return notes.some(note => note.x === x && note.y === y);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (mode) {
        case 'NORMAL':
          if (e.key === 'i') {
            setMode('INSERT');
          } else if (e.key === 'v') {
            setMode('VISUAL');
          } else if (e.key === 'h' && cursor.x > 0) {
            setCursor({ ...cursor, x: cursor.x - 1 });
          } else if (e.key === 'l' && cursor.x < 31) {
            setCursor({ ...cursor, x: cursor.x + 1 });
          } else if (e.key === 'j' && cursor.y < 11) {
            setCursor({ ...cursor, y: cursor.y + 1 });
          } else if (e.key === 'k' && cursor.y > 0) {
            setCursor({ ...cursor, y: cursor.y - 1 });
          } else if (e.key === 'x') {
            setNotes(notes.filter(note => !(note.x === cursor.x && note.y === cursor.y)));
          }
          break;
        case 'INSERT':
          if (e.key === 'Escape') {
            setMode('NORMAL');
          } else if (e.key === ' ') {
            const noteExists = notes.some(note => note.x === cursor.x && note.y === cursor.y);
            if (!noteExists) {
              setNotes([...notes, { x: cursor.x, y: cursor.y, length: 1 }]);
            }
          }
          break;
        case 'VISUAL':
          if (e.key === 'Escape') {
            setMode('NORMAL');
            setSelectedCells(new Set());
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, cursor, notes]);

  return (
    <div className="h-screen bg-black text-white p-4">
      <h1 className="text-2xl mb-4">MIDI Editor</h1>

      {/* Piano Roll Grid */}
      <div className="flex-1 border border-gray-600 mb-4 p-4">
        <div className="text-sm mb-2">Piano Roll - Press &apos;i&apos; for INSERT mode, &apos;v&apos; for VISUAL, ESC for NORMAL</div>
        <div className="flex flex-col gap-px">
          {Array.from({ length: 12 }, (_, y) => (
            <div key={y} className="flex gap-px">
              {Array.from({ length: 32 }, (_, x) => (
                <NoteCell
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  hasNote={hasNoteAt(x, y)}
                  isSelected={selectedCells.has(`${x}-${y}`)}
                  isCursor={cursor.x === x && cursor.y === y}
                  onClick={handleCellClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 w-full text-xs p-2 bg-zinc-900 text-white border-t border-gray-600">
        <span className="font-bold text-green-400">-- {mode} --</span>
        <span className="ml-4">Cursor: {cursor.x},{cursor.y}</span>
      </div>
    </div>
  );
}
