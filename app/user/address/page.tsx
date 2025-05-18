'use client'

import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'

interface Address {
    id: string
    name: string
    phone: string
    address: string
}

export default function AddressPage() {
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: '1',
            name: 'John Doe',
            phone: '08123456789',
            address: '123 Student Road, Campus City, Nigeria',
        },
    ])
    const [form, setForm] = useState({ name: '', phone: '', address: '' })
    const [editingId, setEditingId] = useState<string | null>(null)

    const handleAddOrEdit = () => {
        if (editingId) {
            setAddresses((prev) =>
                prev.map((a) => (a.id === editingId ? { ...a, ...form } : a))
            )
        } else {
            setAddresses((prev) => [
                ...prev,
                { ...form, id: Date.now().toString() },
            ])
        }
        setForm({ name: '', phone: '', address: '' })
        setEditingId(null)
    }

    const handleDelete = (id: string) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id))
    }

    const handleEdit = (addr: Address) => {
        setForm(addr)
        setEditingId(addr.id)
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Addresses</h1>

            <div className="bg-white p-4 rounded shadow space-y-4 mb-6">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                />
                <textarea
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                ></textarea>
                <button
                    onClick={handleAddOrEdit}
                    className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
                >
                    {editingId ? 'Update Address' : 'Add Address'}
                </button>
            </div>

            <div className="grid gap-4">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className="bg-white border p-4 rounded shadow flex justify-between items-start"
                    >
                        <div>
                            <p className="font-semibold">{addr.name}</p>
                            <p className="text-sm text-gray-600">{addr.phone}</p>
                            <p className="text-sm">{addr.address}</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleEdit(addr)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(addr.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
