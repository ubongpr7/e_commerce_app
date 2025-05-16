'use client'

import React, { useState } from 'react'
import { useWalletStore } from '@/components/wallet/wallet-store'
import FundWalletModal from '@/components/wallet/fund-wallet-modal'

const Wallet: React.FC = () => {
  const balance = useWalletStore((state) => state.balance)
  const transactions = useWalletStore((state) => state.transactions)
  const transfer = useWalletStore((state) => state.transfer)
  
  const [isModalOpen, setIsModalOpen] = useState(false)

  // New state for sending money
  const [recipient, setRecipient] = useState('')
  const [transferAmount, setTransferAmount] = useState(0)

  const handleTransfer = () => {
    if (recipient.trim() && transferAmount > 0) {
      transfer(transferAmount, recipient.trim())
      setRecipient('')
      setTransferAmount(0)
      alert(`Sent ₦${transferAmount.toLocaleString()} to ${recipient}`)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wallet</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p className="text-lg">
          Balance: <strong>₦{balance.toLocaleString()}</strong>
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
        >
          Fund Wallet
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No transactions yet.</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {transactions.map((tx) => (
              <li key={tx.id} className="border-b pb-2">
                <p className="text-sm">{tx.description}</p>
                <p className="text-xs text-gray-500">
                  {tx.type.toUpperCase()} • ₦{tx.amount.toLocaleString()} •{' '}
                  {new Date(tx.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Send/Transfer Money */}
      <div className="bg-white p-4 rounded shadow mt-6 max-w-md">
        <h2 className="text-lg font-semibold mb-2">Send / Transfer Money</h2>
        <input
          type="text"
          placeholder="Recipient Username or ID"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <button
          onClick={handleTransfer}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
        >
          Send
        </button>
      </div>

      <FundWalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default Wallet
