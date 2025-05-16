// fund-wallet-modal.tsx
import React, { useState } from 'react'
import { useWalletStore } from './wallet-store'

interface FundWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({ isOpen, onClose }) => {
  const fundWallet = useWalletStore((state) => state.fundWallet)

  const [amount, setAmount] = useState<number>(0)
  const [method, setMethod] = useState<'bank' | 'card'>('bank')
  const [bankConfirmed, setBankConfirmed] = useState(false)

  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const handleBankConfirm = () => {
    if (amount > 0) {
      setBankConfirmed(true)
      fundWallet(amount, 'bank')
      onClose()
    }
  }

  const handleCardPayment = () => {
    if (amount > 0 && cardNumber && expiry && cvv) {
      fundWallet(amount, 'card')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
        <h2 className="text-xl font-semibold">Fund Wallet</h2>

        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Funding Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as 'bank' | 'card')}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            <option value="bank">Bank Transfer</option>
            <option value="card">Bank Card</option>
          </select>
        </div>

        {method === 'bank' && (
          <div className="space-y-2 border p-3 rounded bg-gray-50">
            <p className="text-sm font-medium text-gray-700">Transfer to:</p>
            <p className="text-sm">Bank: Zenith Bank</p>
            <p className="text-sm">Account Number: <strong>1234567890</strong></p>
            <p className="text-sm">Account Name: Student Wallet</p>

            <button
              onClick={handleBankConfirm}
              className="mt-2 w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
            >
              I’ve Transferred - Confirm
            </button>
          </div>
        )}

        {method === 'card' && (
          <div className="space-y-2 border p-3 rounded bg-gray-50">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-1/2 border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-1/2 border px-3 py-2 rounded"
              />
            </div>
            <button
              onClick={handleCardPayment}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
            >
              Pay with Card
            </button>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default FundWalletModal
