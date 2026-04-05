import { useState } from 'react';
import { Settings, LogOut } from 'lucide-react';
import { useAppContext } from "../../context/AppContext";
import { motion } from 'framer-motion';
import {
  getFinancialSummary,
  getBalanceTrend,
  getSpendingByCategory,
  getInsights,
  mockTransactions,
  Transaction,
} from '@/lib/mock-data';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { SummaryCard } from './SummaryCard';
import { BalanceTrendChart } from './BalanceTrendChart';
import { SpendingByCategoryChart } from './SpendingByCategoryChart';
import { TransactionsList } from './TransactionsList';
import { InsightsSection } from './InsightsSection';
import AddTransaction from './AddTransaction';

export const Dashboard = () => {

  const {
    transactions,
    setTransactions,
    role,
    setRole,
    darkMode,
    setDarkMode,
    filters,
    setFilters
  } = useAppContext();

  // LOCAL UI STATE
  const [showSettings, setShowSettings] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Transaction | null>(null);

  // 🔐 PASSWORD STATES
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');

  const baseTransactions =
    transactions.length > 0 ? transactions : mockTransactions;

  const finalTransactions: Transaction[] = baseTransactions.filter((t) => {
    if (filters && typeof filters === "object" && 'type' in filters) {
      if (filters.type && t.type !== filters.type) return false;
    }
    return true;
  });

  const summary = getFinancialSummary();
  const balanceTrend = getBalanceTrend();
  const spendingByCategory = getSpendingByCategory();
  const insights = getInsights();

  const isAdmin = role === 'admin';

  // ADMIN PASSWORD CHECK
  const handleAdminAccess = () => {
    if (password === 'admin123') {
      setRole('admin');
      setShowPasswordPrompt(false);
      setPassword('');
    } else {
      alert('Wrong password');
      setPassword('');
    }
  };

  // ADD / UPDATE
  const handleSaveTransaction = (data: any) => {
    if (editData) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editData.id
            ? { ...t, ...data, amount: Number(data.amount) }
            : t
        )
      );
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...data,
        amount: Number(data.amount),
        date: new Date(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    }

    setShowForm(false);
    setEditData(null);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (t: Transaction) => {
    setEditData(t);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Finance Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Here's your financial overview.
            </p>
          </div>

          <div className="flex items-center gap-4">

            {/* ROLE SWITCH */}
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted p-1">
              <button
                onClick={() => setRole('viewer')}
                className={`rounded px-3 py-1.5 text-sm font-medium ${
                  role === 'viewer'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Viewer
              </button>
              <button
                onClick={() => setShowPasswordPrompt(true)}
                className={`rounded px-3 py-1.5 text-sm font-medium ${
                  role === 'admin'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Admin
              </button>
            </div>

            {/* SETTINGS */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 border rounded-lg hover:bg-muted"
              >
                <Settings className="h-5 w-5 text-muted-foreground" />
              </button>

              {showSettings && (
                <div className="absolute right-0 mt-2 w-40 bg-card border rounded-lg shadow-md p-2">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
                  >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                </div>
              )}
            </div>

            <button className="p-2 border rounded-lg hover:bg-muted">
              <LogOut className="h-5 w-5 text-muted-foreground" />
            </button>

          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">

        {/* SUMMARY */}
        <motion.div
          className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={staggerItem}>
            <SummaryCard title="Total Balance" amount={summary.totalBalance} />
          </motion.div>
          <motion.div variants={staggerItem}>
            <SummaryCard title="Total Income" amount={summary.totalIncome} variant="income" />
          </motion.div>
          <motion.div variants={staggerItem}>
            <SummaryCard title="Total Expenses" amount={summary.totalExpenses} variant="expense" />
          </motion.div>
        </motion.div>

        {/* CHARTS */}
        <motion.div
          className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={staggerItem}>
            <BalanceTrendChart data={balanceTrend} />
          </motion.div>
          <motion.div variants={staggerItem}>
            <SpendingByCategoryChart data={spendingByCategory} />
          </motion.div>
        </motion.div>

        {/* MAIN */}
        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="lg:col-span-2" variants={staggerItem}>

            {/* FILTER */}
            <div className="mb-4 flex gap-2">
              <button onClick={() => setFilters({})} className={`px-4 py-2 border rounded-full ${!filters?.type ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                All
              </button>
              <button onClick={() => setFilters({ type: 'income' })} className={`px-4 py-2 border rounded-full ${filters?.type === 'income' ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                Income
              </button>
              <button onClick={() => setFilters({ type: 'expense' })} className={`px-4 py-2 border rounded-full ${filters?.type === 'expense' ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                Expense
              </button>
            </div>

            <TransactionsList
              transactions={finalTransactions}
              canEdit={isAdmin}
              onDelete={handleDeleteTransaction}
              onEdit={handleEdit}
            />

            {isAdmin && (
              <div className="mt-4 border-t border-border p-4 text-center">
                <button
                  onClick={() => {
                    setShowForm(!showForm);
                    setEditData(null);
                  }}
                  className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
                >
                  {showForm ? 'Close' : '+ Add Transaction'}
                </button>
              </div>
            )}

            {showForm && (
              <div className="mt-4">
                <AddTransaction onAdd={handleSaveTransaction} editData={editData} />
              </div>
            )}
          </motion.div>

          <motion.div variants={staggerItem}>
            <InsightsSection
              highestSpendingCategory={insights.highestSpendingCategory}
              monthlyAverageExpense={insights.monthlyAverageExpense}
              savingsRate={insights.savingsRate}
            />
          </motion.div>
        </motion.div>

        {isAdmin && (
          <div className="mt-8 border border-green-200 bg-green-50 p-4 rounded text-green-800">
            Admin Mode Active - You can add, edit and delete transactions.
          </div>
        )}
      </main>

      {/* PASSWORD POPUP */}
      {showPasswordPrompt && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0"
      onClick={() => setShowPasswordPrompt(false)}
    />

    <motion.div
      initial={{ opacity: 0, scale: 1.0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card p-6 rounded-lg shadow-lg w-80 z-10"
    >
      <h2 className="text-lg font-semibold mb-3">
        Enter Admin Password
      </h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded mb-3"
        placeholder="Enter password"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowPasswordPrompt(false)}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleAdminAccess}
          className="px-3 py-1 bg-primary text-white rounded"
        >
          Submit
        </button>
      </div>
    </motion.div>

  </div>
)}

    </div>
  );
};