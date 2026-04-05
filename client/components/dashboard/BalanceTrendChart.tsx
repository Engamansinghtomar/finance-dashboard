import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { BalanceTrendData } from '@/lib/mock-data';

interface BalanceTrendChartProps {
  data: BalanceTrendData[];
}

export const BalanceTrendChart = ({ data }: BalanceTrendChartProps) => {
  return (
    <motion.div
      className="rounded-lg border border-border bg-card p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
    >
      <motion.h3
        className="mb-6 text-lg font-semibold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Balance Trend
      </motion.h3>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />

            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '0.875rem' }}
            />

            {/*  Y-AXIS */}
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '0.875rem' }}
              tickFormatter={(value) =>
                new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  notation: 'compact', // 👈 clean (₹10K, ₹1L)
                  maximumFractionDigits: 1,
                }).format(value)
              }
            />

            {/* TOOLTIP */}
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number) =>
                new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(value)
              }
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="hsl(var(--primary))"
              dot={{ fill: 'hsl(var(--primary))', r: 5 }}
              activeDot={{ r: 7 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};