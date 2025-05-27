// lib/requests.ts
export const getServices = async (query: string) => {
    const res = await fetch(`/api/services?${query}`)
    if (!res.ok) throw new Error("Failed to fetch services")
    return res.json()
}
