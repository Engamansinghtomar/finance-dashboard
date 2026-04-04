import { motion } from 'framer-motion';
import { CategoryBreakdown } from '@/lib/mock-data';

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

interface CategoryLegendProps {
  data: CategoryBreakdown[];
  hoveredCategory: CategoryBreakdown | null;
  onHover: (category: CategoryBreakdown | null) => void;
}

export const CategoryLegend = ({
  data,
  hoveredCategory,
  onHover,
}: CategoryLegendProps) => {
  return (
    <motion.div
      className="mt-6 flex flex-wrap gap-3 justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      {data.map((category, index) => {
        const color = COLORS[index % COLORS.length];
        const isHovered = hoveredCategory === null || hoveredCategory.name === category.name;

        return (
          <motion.div
            key={category.name}
            onMouseEnter={() => onHover(category)}
            onMouseLeave={() => onHover(null)}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border cursor-pointer group transition-all duration-300"
            style={{
              backgroundColor: isHovered ? `${color}15` : 'transparent',
              borderColor: isHovered ? color : 'hsl(var(--border))',
              opacity: isHovered ? 1 : 0.7,
            }}
          >
            <motion.div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
              animate={{
                boxShadow: isHovered
                  ? `0 0 12px ${color}, 0 0 24px ${color}80`
                  : `0 0 4px ${color}80`,
              }}
              transition={{ duration: 0.3 }}
            />
            <div className="text-sm font-medium text-foreground">
              {category.name}
              <span className="ml-1.5 text-xs font-bold" style={{ color }}>
                {category.percentage}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
              }).format(category.value)}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
