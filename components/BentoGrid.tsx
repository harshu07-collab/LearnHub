import React from 'react';

type GridProps = { children: React.ReactNode };
export default function BentoGrid({ children }: GridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 auto-rows-auto">
      {children}
    </div>
  );
}

type GridItemProps = { children: React.ReactNode; cols?: 1 | 2 | 3 | 4 | 6 | 12 };
export function GridItem({ children, cols = 2 }: GridItemProps) {
  const spanMap: Record<number, string> = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-1 lg:col-span-2',
    3: 'col-span-1 md:col-span-1 lg:col-span-2',
    4: 'col-span-1 md:col-span-2 lg:col-span-4',
    6: 'col-span-1 md:col-span-2 lg:col-span-4',
    12: 'col-span-1 md:col-span-2 lg:col-span-4',
  };

  return <div className={spanMap[cols]}>{children}</div>;
}
