// wallet-store.ts
import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  date: string
  description: string
  method?: 'bank' | 'card' // new: optional funding method
}

interface WalletState {
  balance: number
  transactions: Transaction[]
  fundWallet: (amount: number, method: 'bank' | 'card') => void
  withdraw: (amount: number, description: string) => void
  transfer: (amount: number, recipient: string) => void
  addTransaction: (transaction: Transaction) => void
  clearWallet: () => void
  loadFromStorage: () => void
}

const STORAGE_KEY = 'student-wallet-data'

const saveToLocalStorage = (balance: number, transactions: Transaction[]) => {
  const data = JSON.stringify({ balance, transactions })
  localStorage.setItem(STORAGE_KEY, data)
}

const loadFromLocalStorage = () => {
  if (typeof window === 'undefined') return { balance: 0, transactions: [] }

  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return { balance: 0, transactions: [] }

  try {
    const parsed = JSON.parse(data)
    return {
      balance: parsed.balance || 0,
      transactions: parsed.transactions || [],
    }
  } catch (e) {
    console.error('Failed to parse wallet data from localStorage:', e)
    return { balance: 0, transactions: [] }
  }
}

export const useWalletStore = create<WalletState>((set, get) => {
  const initial = loadFromLocalStorage()

  return {
    balance: initial.balance,
    transactions: initial.transactions,

    fundWallet: (amount, method) => {
      const newTransaction: Transaction = {
        id: uuidv4(),
        type: 'credit',
        amount,
        date: new Date().toISOString(),
        description: `Wallet funded via ${method}`,
        method,
      }

      const updatedBalance = get().balance + amount
      const updatedTransactions = [newTransaction, ...get().transactions]

      set({
        balance: updatedBalance,
        transactions: updatedTransactions,
      })

      saveToLocalStorage(updatedBalance, updatedTransactions)

      // Backend-ready: call Django API here in the future
      // fetch('/api/fund-wallet', { method: 'POST', body: JSON.stringify({ amount, method }) })
    },

    withdraw: (amount, description) => {
      if (get().balance < amount) return

      const newTransaction: Transaction = {
        id: uuidv4(),
        type: 'debit',
        amount,
        date: new Date().toISOString(),
        description: description || 'Withdrawal',
      }

      const updatedBalance = get().balance - amount
      const updatedTransactions = [newTransaction, ...get().transactions]

      set({
        balance: updatedBalance,
        transactions: updatedTransactions,
      })

      saveToLocalStorage(updatedBalance, updatedTransactions)
    },

    transfer: (amount, recipient) => {
      if (get().balance < amount || !recipient) return

      const newTransaction: Transaction = {
        id: uuidv4(),
        type: 'debit',
        amount,
        date: new Date().toISOString(),
        description: `Transfer to ${recipient}`,
      }

      const updatedBalance = get().balance - amount
      const updatedTransactions = [newTransaction, ...get().transactions]

      set({
        balance: updatedBalance,
        transactions: updatedTransactions,
      })

      saveToLocalStorage(updatedBalance, updatedTransactions)
    },

    addTransaction: (transaction) => {
      const updatedTransactions = [transaction, ...get().transactions]
      set({ transactions: updatedTransactions })
      saveToLocalStorage(get().balance, updatedTransactions)
    },

    clearWallet: () => {
      set({ balance: 0, transactions: [] })
      saveToLocalStorage(0, [])
    },

    loadFromStorage: () => {
      const loaded = loadFromLocalStorage()
      set({
        balance: loaded.balance,
        transactions: loaded.transactions,
      })
    },
  }
})
