'use client'

import { useState } from 'react'
import { Pencil, Save, Camera } from 'lucide-react'
import SchoolDropdown from '@/components/user/school-select'

const initialUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+2348123456789',
    school: 'University of Lagos',
    department: 'Computer Science',
    matric: 'CSC/2021/123',
    image: '/images/avatar-placeholder.png',
}

export default function ProfilePage() {
    const [user, setUser] = useState(initialUser)
    const [editing, setEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const toggleEdit = () => {
        setEditing((prev) => !prev)
    }

    const saveChanges = () => {
        // Hook up with Django API later
        setEditing(false)
        alert('Profile saved (mock)')
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setUser((prev) => ({ ...prev, image: imageUrl }))
        }
    }

    return (
        <div className="p-4 md:p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">User Profile</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-6 relative group">
                    <label className="cursor-pointer relative">
                        <img
                            src={user.image}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border"
                        />
                        {editing && (
                            <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm">
                                <Camera className="w-4 h-4 text-gray-600" />
                            </div>
                        )}
                        {editing && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        )}
                    </label>
                    <div>
                        <p className="font-bold text-lg">{user.name}</p>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Name"
                        name="name"
                        value={user.name}
                        disabled={!editing}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        value={user.email}
                        disabled={!editing}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Phone"
                        name="phone"
                        value={user.phone}
                        disabled={!editing}
                        onChange={handleChange}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">School</label>
                        <SchoolDropdown
                            value={user.school}
                            disabled={!editing}
                            onChange={(value: string) => setUser((prev) => ({ ...prev, school: value }))}
                        />
                    </div>
                    <InputField
                        label="Department"
                        name="department"
                        value={user.department}
                        disabled={!editing}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Matric Number"
                        name="matric"
                        value={user.matric}
                        disabled={!editing}
                        onChange={handleChange}
                    />
                </form>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={editing ? saveChanges : toggleEdit}
                        className={`flex items-center gap-2 px-4 py-2 rounded ${editing ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'
                            } text-white text-sm`}
                    >
                        {editing ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                        {editing ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </div>
    )
}

interface InputProps {
    label: string
    name: string
    value: string
    disabled: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputProps> = ({ label, name, value, disabled, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            disabled={disabled}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md text-sm ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
        />
    </div>
)
