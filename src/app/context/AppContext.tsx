import { createContext, useContext, useState, ReactNode } from "react";

interface Budget {
  total: number;
  spent: number;
  percentage: number;
  status: "healthy" | "warning" | "alert";
}

interface Member {
  id: string;
  name: string;
  active: boolean;
  avatar?: string;
}

interface Category {
  name: string;
  spent: number;
  percentage: number;
  color: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  prices: {
    d1?: number;
    ara?: number;
    exito?: number;
    carulla?: number;
    jumbo?: number;
    olimpica?: number;
  };
}

interface AppState {
  budget: Budget;
  members: Member[];
  categories: Category[];
  products: Product[];
  selectedOccasion: string | null;
  lukasState: "neutral" | "scanner" | "success" | "alert";
}

interface AppContextType {
  state: AppState;
  updateBudget: (spent: number) => void;
  addExpense: (category: string, amount: number) => void;
  toggleMemberActive: (memberId: string) => void;
  setSelectedOccasion: (occasion: string | null) => void;
  setLukasState: (state: "neutral" | "scanner" | "success" | "alert") => void;
  addProduct: (product: Product) => void;
  getLowestPrice: (productId: string) => { store: string; price: number } | null;
  getTotalSavings: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  budget: {
    total: 8000,
    spent: 4250,
    percentage: 53,
    status: "healthy",
  },
  members: [
    { id: "1", name: "Alex", active: true },
    { id: "2", name: "Elena", active: false },
    { id: "3", name: "Marc", active: true },
    { id: "4", name: "Sofia", active: false },
  ],
  categories: [
    { name: "Alimentación", spent: 1420, percentage: 65, color: "#FB923C" },
    { name: "Ocio y Cine", spent: 840, percentage: 40, color: "#258CF4" },
    { name: "Servicios", spent: 1490, percentage: 85, color: "#2ECC71" },
  ],
  products: [
    {
      id: "1",
      name: "Leche Entera 1L",
      category: "Lácteos",
      prices: { d1: 3200, ara: 2950, exito: 4100 },
    },
    {
      id: "2",
      name: "Café Molido 500g",
      category: "Despensa",
      prices: { d1: 12500, ara: 13200, exito: 14800 },
    },
    {
      id: "3",
      name: "Huevos x12",
      category: "Lácteos",
      prices: { d1: 8900, ara: 8500, exito: 9200 },
    },
  ],
  selectedOccasion: null,
  lukasState: "neutral",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const updateBudget = (spent: number) => {
    setState(prev => {
      const percentage = Math.round((spent / prev.budget.total) * 100);
      let status: "healthy" | "warning" | "alert" = "healthy";
      
      if (percentage >= 90) status = "alert";
      else if (percentage >= 75) status = "warning";

      return {
        ...prev,
        budget: {
          ...prev.budget,
          spent,
          percentage,
          status,
        },
      };
    });
  };

  const addExpense = (categoryName: string, amount: number) => {
    setState(prev => {
      const newSpent = prev.budget.spent + amount;
      const categories = prev.categories.map(cat => {
        if (cat.name === categoryName) {
          return {
            ...cat,
            spent: cat.spent + amount,
            percentage: Math.round(((cat.spent + amount) / prev.budget.total) * 100),
          };
        }
        return cat;
      });

      const percentage = Math.round((newSpent / prev.budget.total) * 100);
      let status: "healthy" | "warning" | "alert" = "healthy";
      
      if (percentage >= 90) status = "alert";
      else if (percentage >= 75) status = "warning";

      return {
        ...prev,
        budget: {
          ...prev.budget,
          spent: newSpent,
          percentage,
          status,
        },
        categories,
      };
    });
  };

  const toggleMemberActive = (memberId: string) => {
    setState(prev => ({
      ...prev,
      members: prev.members.map(member =>
        member.id === memberId ? { ...member, active: !member.active } : member
      ),
    }));
  };

  const setSelectedOccasion = (occasion: string | null) => {
    setState(prev => ({ ...prev, selectedOccasion: occasion }));
  };

  const setLukasState = (lukasState: "neutral" | "scanner" | "success" | "alert") => {
    setState(prev => ({ ...prev, lukasState }));
  };

  const addProduct = (product: Product) => {
    setState(prev => ({
      ...prev,
      products: [...prev.products, product],
    }));
  };

  const getLowestPrice = (productId: string) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return null;

    const prices = Object.entries(product.prices)
      .filter(([_, price]) => price !== undefined)
      .map(([store, price]) => ({ store, price: price as number }));

    if (prices.length === 0) return null;

    return prices.reduce((lowest, current) =>
      current.price < lowest.price ? current : lowest
    );
  };

  const getTotalSavings = () => {
    return state.products.reduce((total, product) => {
      const prices = Object.values(product.prices).filter(p => p !== undefined) as number[];
      if (prices.length < 2) return total;

      const lowest = Math.min(...prices);
      const highest = Math.max(...prices);
      return total + (highest - lowest);
    }, 0);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        updateBudget,
        addExpense,
        toggleMemberActive,
        setSelectedOccasion,
        setLukasState,
        addProduct,
        getLowestPrice,
        getTotalSavings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
