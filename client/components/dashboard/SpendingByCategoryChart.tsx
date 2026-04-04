import { useState, useRef } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { CategoryBreakdown } from '@/lib/mock-data';
import { CategoryDetailPopover } from './CategoryDetailPopover';
import { CategoryLegend } from './CategoryLegend';

interface SpendingByCategoryChartProps {
  data: CategoryBreakdown[];
}

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

export const SpendingByCategoryChart = ({
  data,
}: SpendingByCategoryChartProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryBreakdown | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePieEnter = (entry: CategoryBreakdown, index: number, event: any) => {
    setHoveredCategory(entry);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Position popover at center of pie chart
      setPopoverPosition({
        x: rect.width / 2 + rect.left,
        y: rect.top + 100, // Position above the pie center
      });
    }
  };

  const handlePieLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <motion.div
      className="rounded-lg border border-border bg-card p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
      ref={containerRef}
    >
      <motion.h3
        className="mb-6 text-lg font-semibold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Spending by Category
      </motion.h3>

      <CategoryDetailPopover
        category={hoveredCategory}
        position={popoverPosition}
        isVisible={hoveredCategory !== null}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={handlePieEnter}
              onMouseLeave={handlePieLeave}
            >
              {data.map((entry, index) => {
                const color = COLORS[index % COLORS.length];
                const isHovered = hoveredCategory === null || hoveredCategory.name === entry.name;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={color}
                    opacity={isHovered ? 1 : 0.25}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      filter: isHovered
                        ? `drop-shadow(0 0 20px ${color}) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25))`
                        : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                    }}
                  />
                );
              })}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number) =>
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(value)
              }
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Custom Category Legend */}
      <CategoryLegend
        data={data}
        hoveredCategory={hoveredCategory}
        onHover={(category) => {
          if (category) {
            handlePieEnter(category, 0, null);
          } else {
            handlePieLeave();
          }
        }}
      />

      {/* Info Text */}
      <motion.p
        className="mt-4 text-xs text-muted-foreground text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Hover over segments or legend items for details
      </motion.p>
    </motion.div>
  );
};
