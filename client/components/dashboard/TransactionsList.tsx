import { useState, useMemo } from 'react';
import { Search, TrendingDown, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Transaction, getCategories } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface TransactionsListProps {
  transactions: Transaction[];
  canEdit?: boolean;
  onEdit?: (transaction: Transaction) => void; // ✅ FIX
  onDelete?: (id: string) => void;
}

export const TransactionsList = ({
  transactions,
  canEdit = false,
  onEdit, // ✅ FIX (IMPORTANT)
  onDelete,
}: TransactionsListProps) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const categories = getCategories();

  const filteredAndSorted = useMemo(() => {
    let filtered = transactions.filter((t) => {
      const matchesSearch =
        (t.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || t.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

    return filtered;
  }, [transactions, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">

      {/* HEADER */}
      <div className="border-b border-border p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Transactions
        </h3>

        {/* SEARCH */}
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground"
          />
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'date' | 'amount')
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {/* LIST */}
      <motion.div
        className="divide-y divide-border"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {filteredAndSorted.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          filteredAndSorted.map((transaction) => (
            <motion.div
              key={transaction.id}
              variants={staggerItem}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'rounded-full p-2',
                    transaction.type === 'income'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  )}
                >
                  {transaction.type === 'income' ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>

                <div>
                  <p className="font-medium">{transaction.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-1">
                <p
                  className={cn(
                    'text-lg font-semibold',
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {transaction.type === 'income' ? '+' : '-'}₹
                  {transaction.amount}
                </p>

                {/* ✅ EDIT + DELETE */}
                {canEdit && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit?.(transaction)}
                      className="text-blue-500 text-xs hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete?.(transaction.id)}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};