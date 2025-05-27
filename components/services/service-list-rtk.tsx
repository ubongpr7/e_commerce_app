"use client";

import { useGetServicesQuery } from "@/redux/features/service/serviceAPISlice";
import ServiceCard from "@/components/services/service-card";
import { Button } from "@/components/ui/button";

export function ServiceListRTK() {
    const { data: services, isLoading, error, refetch } = useGetServicesQuery();

    if (isLoading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-[240px] animate-pulse rounded-lg bg-gray-100" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 p-8">
                <h3 className="mb-2 text-xl font-semibold">Error loading services</h3>
                <p className="mb-4 text-center text-gray-500">
                    {error instanceof Error ? error.message : "An unknown error occurred"}
                </p>
                <Button
                    onClick={() => refetch()}
                    className="bg-gray-900 text-white hover:bg-gray-800"
                >
                    Try Again
                </Button>
            </div>
        );
    }

    if (!services || services.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 p-8">
                <h3 className="mb-2 text-xl font-semibold">No Services Found</h3>
                <p className="text-center text-gray-500">There are no services available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
    );
}
