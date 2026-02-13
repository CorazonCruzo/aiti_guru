import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";

import { getProducts } from "@/entities/product/api/productApi";
import { ProductsTable } from "@/features/products-table/ui/ProductsTable";
import { ProgressBar } from "@/shared/ui/ProgressBar/ProgressBar";

import styles from "./ProductsPage.module.css";

export const ProductsPage = () => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const sortBy = sorting[0]?.id ?? undefined;
    const order = sorting[0] ? (sorting[0].desc ? "desc" : "asc") : undefined;

    const { data, isLoading } = useQuery({
        queryKey: ["products", { sortBy, order }],
        queryFn: () => getProducts({ sortBy, order }),
    });

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Товары</h1>
            </div>
            {isLoading && <ProgressBar />}
            <ProductsTable
                data={data?.products ?? []}
                sorting={sorting}
                onSortingChange={setSorting}
            />
        </div>
    );
};
