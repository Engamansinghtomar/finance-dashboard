import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { scaleIn } from '@/lib/animations';

interface SummaryCardProps {
  title: string;
  amount: number;
  trend?: number;
  variant?: 'default' | 'income' | 'expense';
  className?: string;
}

export const SummaryCard = ({
  title,
  amount,
  trend,
  variant = 'default',
  className,
}: SummaryCardProps) => {
  const Icon =
    variant === 'income' ? TrendingUp : variant === 'expense' ? TrendingDown : Wallet;
  const displayValue = useCounterAnimation(amount, 1200);

  const variantStyles = {
    default: 'border-l-4 border-l-primary',
    income: 'border-l-4 border-l-green-500',
    expense: 'border-l-4 border-l-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
      className={cn(
        'rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-medium text-muted-foreground"
          >
            {title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-3xl font-bold text-foreground"
          >
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(displayValue)}
          </motion.p>
          {trend !== undefined && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={cn(
                'mt-2 text-sm font-medium',
                trend >= 0 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend >= 0 ? '+' : ''}{trend}% from last month
            </motion.p>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={cn(
            'rounded-full p-3',
            variant === 'income'
              ? 'bg-green-100'
              : variant === 'expense'
                ? 'bg-red-100'
                : 'bg-blue-100'
          )}
        >
          <Icon
            className={cn(
              'h-6 w-6',
              variant === 'income'
                ? 'text-green-600'
                : variant === 'expense'
                  ? 'text-red-600'
                  : 'text-primary'
            )}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
