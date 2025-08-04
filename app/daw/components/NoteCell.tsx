interface NoteCellProps {
  x: number;
  y: number;
  hasNote: boolean;
  isSelected: boolean;
  isCursor: boolean;
  onClick: (x: number, y: number) => void;
}

export default function NoteCell({ x, y, hasNote, isSelected, isCursor, onClick }: NoteCellProps) {
  const baseClasses = "w-4 h-4 border border-gray-700 cursor-pointer";
  
  let bgClasses = "bg-gray-800";
  if (hasNote) bgClasses = "bg-blue-500";
  if (isSelected) bgClasses = "bg-yellow-500";
  if (isCursor) bgClasses = "bg-green-500";

  return (
    <div
      className={`${baseClasses} ${bgClasses}`}
      onClick={() => onClick(x, y)}
    />
  );
}