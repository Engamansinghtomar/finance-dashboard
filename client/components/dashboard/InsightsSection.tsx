import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoryBreakdown } from '@/lib/mock-data';
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations';

interface InsightsSectionProps {
  highestSpendingCategory: CategoryBreakdown;
  monthlyAverageExpense: number;
  savingsRate: number;
}

export const InsightsSection = ({
  highestSpendingCategory,
  monthlyAverageExpense,
  savingsRate,
}: InsightsSectionProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Insights</h3>
      </div>

      <motion.div
        className="space-y-4"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Highest Spending Category */}
        <motion.div
          className="rounded-lg border border-border/50 bg-muted/30 p-4"
          variants={staggerItem}
          whileHover={{ scale: 1.02, backgroundColor: 'hsl(var(--muted) / 0.5)' }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-sm font-medium text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Highest Spending Category
          </motion.p>
          <motion.p
            className="mt-2 text-2xl font-bold text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {highestSpendingCategory.name}
          </motion.p>
          <motion.p
            className="mt-1 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(highestSpendingCategory.value)} (
            {highestSpendingCategory.percentage}% of spending)
          </motion.p>
        </motion.div>

        {/* Monthly Average */}
        <motion.div
          className="rounded-lg border border-border/50 bg-muted/30 p-4"
          variants={staggerItem}
          whileHover={{ scale: 1.02, backgroundColor: 'hsl(var(--muted) / 0.5)' }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-sm font-medium text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Monthly Average Expense
          </motion.p>
          <motion.p
            className="mt-2 text-2xl font-bold text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(monthlyAverageExpense)}
          </motion.p>
          <motion.p
            className="mt-1 text-sm text-green-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Based on the last 6 months
          </motion.p>
        </motion.div>

        {/* Savings Rate */}
        <motion.div
          className="rounded-lg border border-border/50 bg-muted/30 p-4"
          variants={staggerItem}
          whileHover={{ scale: 1.02, backgroundColor: 'hsl(var(--muted) / 0.5)' }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-sm font-medium text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Savings Rate
          </motion.p>
          <div className="mt-2 flex items-baseline gap-2">
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              {savingsRate}%
            </motion.p>
          </div>
          <motion.p
            className="mt-1 text-sm text-green-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You&apos;re saving{' '}
            {savingsRate > 50
              ? 'very well!'
              : savingsRate > 20
                ? 'reasonably well'
                : 'some money'}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};
