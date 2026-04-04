import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
};

type AppContextType = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // 👇 localStorage se load (same tera existing logic)
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  });

  const [role, setRole] = useState("viewer");
  const [filters, setFilters] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  // 👇 localStorage save (same tera logic)
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        filters,
        setFilters,
        darkMode,
        setDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 👇 custom hook (easy use ke liye)
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};