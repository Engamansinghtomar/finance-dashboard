import { motion, AnimatePresence } from 'framer-motion';
import { CategoryBreakdown } from '@/lib/mock-data';
import { TrendingDown } from 'lucide-react';

const COLORS = [
  '#0066FF', // Vibrant Blue
  '#00B366', // Vibrant Green
  '#FF3333', // Vibrant Red
  '#FFB300', // Vibrant Orange
  '#9D33FF', // Vibrant Purple
  '#00D9FF', // Vibrant Cyan
  '#FF6633', // Vibrant Orange-Red
  '#FFD700', // Vibrant Gold
];

interface CategoryDetailPopoverProps {
  category: CategoryBreakdown | null;
  position: { x: number; y: number };
  isVisible: boolean;
}

export const CategoryDetailPopover = ({
  category,
  position,
  isVisible,
}: CategoryDetailPopoverProps) => {
  if (!category) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
          className="pointer-events-none fixed z-50"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -100%)',
            marginTop: '-8px',
          }}
        >
          <div className="rounded-lg border border-border bg-card p-4 shadow-lg backdrop-blur-sm">
            {/* Arrow */}
            <div className="absolute left-1/2 bottom-0 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform border-r border-b border-border bg-card" />

            <div className="space-y-2">
              {/* Category Name */}
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: category.value > 2000 ? 'hsl(var(--primary))' : 
                                   category.value > 1500 ? 'hsl(142 71.8% 29.2%)' :
                                   category.value > 1000 ? 'hsl(0 84.2% 60.2%)' :
                                   'hsl(38 92.1% 50.2%)',
                  }}
                />
                <h4 className="font-semibold text-foreground text-sm">
                  {category.name}
                </h4>
              </div>

              {/* Amount */}
              <div className="ml-5">
                <p className="text-2xl font-bold text-foreground">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0,
                  }).format(category.value)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.percentage}% of total spending
                </p>
              </div>

              {/* Rank Info */}
              <div className="mt-3 flex items-center gap-2 rounded bg-muted/50 px-2 py-1.5">
                <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Spending category
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
