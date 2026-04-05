export type TransactionType = 'income' | 'expense';
export type UserRole = 'admin' | 'viewer';

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: string;
  type: TransactionType;
  title: string;
  description: string;
}

export interface BalanceTrendData {
  month: string;
  balance: number;
}

export interface CategoryBreakdown {
  name: string;
  value: number;
  percentage: number;
}

// Mock transactions data
const now = new Date();
const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Salary',
    date: new Date(now.getFullYear(), now.getMonth(), 15),
    amount: 5000,
    category: 'Salary',
    type: 'income',
    description: 'Monthly salary',
  },
  {
    id: '2',
    title: 'House Rent',
    date: new Date(now.getFullYear(), now.getMonth(), 14),
    amount: 1200,
    category: 'Rent',
    type: 'expense',
    description: 'Monthly rent payment',
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    date: new Date(now.getFullYear(), now.getMonth(), 13),
    amount: 250,
    category: 'Groceries',
    type: 'expense',
    description: 'Weekly grocery shopping',
  },
  {
    id: '4',
    title: 'Electric Bill',
    date: new Date(now.getFullYear(), now.getMonth(), 12),
    amount: 150,
    category: 'Utilities',
    type: 'expense',
    description: 'Electric bill',
  },
  {
    id: '5',
    title: 'Movie Night',
    date: new Date(now.getFullYear(), now.getMonth(), 11),
    amount: 300,
    category: 'Entertainment',
    type: 'expense',
    description: 'Movie tickets and dinner',
  },
  {
    id: '6',
    title: 'Travel',
    date: new Date(now.getFullYear(), now.getMonth(), 10),
    amount: 100,
    category: 'Transportation',
    type: 'expense',
    description: 'Uber rides',
  },
  {
    id: '7',
    title: 'Vegetables',
    date: new Date(now.getFullYear(), now.getMonth(), 9),
    amount: 80,
    category: 'Groceries',
    type: 'expense',
    description: 'Farmers market',
  },
  {
    id: '8',
    title: 'Freelance Work',
    date: new Date(now.getFullYear(), now.getMonth(), 8),
    amount: 1500,
    category: 'Freelance',
    type: 'income',
    description: 'Project payment',
  },
  {
    id: '9',
    title: 'Internet Bill',
    date: new Date(now.getFullYear(), now.getMonth(), 7),
    amount: 75,
    category: 'Utilities',
    type: 'expense',
    description: 'Internet bill',
  },
  {
    id: '10',
    title: 'Concert',
    date: new Date(now.getFullYear(), now.getMonth(), 6),
    amount: 200,
    category: 'Entertainment',
    type: 'expense',
    description: 'Concert tickets',
  },
  {
    id: '11',
    title: 'Doctor Visit',
    date: new Date(now.getFullYear(), now.getMonth(), 5),
    amount: 450,
    category: 'Healthcare',
    type: 'expense',
    description: 'Doctor appointment',
  },
  {
    id: '12',
    title: 'Bonus',
    date: new Date(now.getFullYear(), now.getMonth(), 4),
    amount: 2000,
    category: 'Bonus',
    type: 'income',
    description: 'Performance bonus',
  },
];

export const mockTransactions = transactions.sort(
  (a, b) => b.date.getTime() - a.date.getTime()
);

export const getCategories = (): string[] => {
  const categories = new Set(mockTransactions.map((t) => t.category));
  return Array.from(categories).sort();
};

export const getFinancialSummary = () => {
  const income = mockTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = mockTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return {
    totalBalance: balance,
    totalIncome: income,
    totalExpenses: expenses,
    transactionCount: mockTransactions.length,
  };
};

export const getBalanceTrend = (): BalanceTrendData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  let balance = 15000;
  return months.map((month) => {
    balance += Math.random() * 2000 - 500;
    return { month, balance: Math.round(balance) };
  });
};

export const getSpendingByCategory = (): CategoryBreakdown[] => {
  const categoryTotals = mockTransactions
    .filter((t) => t.type === 'expense')
    .reduce(
      (acc, t) => {
        const existing = acc.find((c) => c.name === t.category);
        if (existing) {
          existing.value += t.amount;
        } else {
          acc.push({ name: t.category, value: t.amount });
        }
        return acc;
      },
      [] as Omit<CategoryBreakdown, 'percentage'>[]
    );

  const total = categoryTotals.reduce((sum, c) => sum + c.value, 0);

  return categoryTotals
    .map((c) => ({
      ...c,
      percentage: Math.round((c.value / total) * 100),
    }))
    .sort((a, b) => b.value - a.value);
};

export const getInsights = () => {
  const spending = getSpendingByCategory();
  const summary = getFinancialSummary();
  const monthlyAverage = summary.totalExpenses / 6;

  return {
    highestSpendingCategory: spending[0],
    monthlyAverageExpense: monthlyAverage,
    savingsRate: Math.round(
      ((summary.totalIncome - summary.totalExpenses) /
        summary.totalIncome) *
        100
    ),
  };
};
