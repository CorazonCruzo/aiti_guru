import { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";
import { ArrowsClockwiseIcon, PlusCircleIcon } from "@phosphor-icons/react";

import { getProducts, searchProducts } from "@/entities/product/api/productApi";
import type { Product } from "@/entities/product/model/types";
import { ProductsTable } from "@/features/products-table/ui/ProductsTable";
import { ProductsSearch } from "@/features/products-search/ui/ProductsSearch";
import { AddProductModal } from "@/features/add-product/ui/AddProductModal";
import { Button } from "@/shared/ui/Button/Button";
import { ProgressBar } from "@/shared/ui/ProgressBar/ProgressBar";
import { Pagination } from "@/shared/ui/Pagination/Pagination";

import styles from "./ProductsPage.module.css";

const PRODUCTS_LIMIT = 20;

export const ProductsPage = () => {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [localProducts, setLocalProducts] = useState<Product[]>([]);

    const sortBy = searchParams.get("sortBy") ?? undefined;
    const order = searchParams.get("order") ?? undefined;

    const sorting: SortingState = useMemo(
        () => (sortBy ? [{ id: sortBy, desc: order === "desc" }] : []),
        [sortBy, order],
    );
    const skip = (page - 1) * PRODUCTS_LIMIT;

    const { data, isLoading } = useQuery({
        queryKey: ["products", { search, page, sortBy, order }],
        queryFn: () => {
            if (search) {
                return searchProducts(search, { limit: PRODUCTS_LIMIT, skip });
            }
            return getProducts({ limit: PRODUCTS_LIMIT, skip, sortBy, order });
        },
    });

    const products: Product[] = [...localProducts, ...(data?.products ?? [])];
    const total = (data?.total ?? 0) + localProducts.length;

    const sortedProducts =
        search && sortBy
            ? [...products].sort((a, b) => {
                  const aVal = a[sortBy as keyof Product];
                  const bVal = b[sortBy as keyof Product];
                  if (typeof aVal === "string" && typeof bVal === "string") {
                      return order === "desc" ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
                  }
                  if (typeof aVal === "number" && typeof bVal === "number") {
                      return order === "desc" ? bVal - aVal : aVal - bVal;
                  }
                  return 0;
              })
            : products;

    const handleSearch = useCallback((query: string) => {
        setSearch(query);
        setPage(1);
    }, []);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSortingChange = (updater: SortingState | ((old: SortingState) => SortingState)) => {
        const next = typeof updater === "function" ? updater(sorting) : updater;
        setSearchParams((prev) => {
            if (next.length > 0) {
                prev.set("sortBy", next[0].id);
                prev.set("order", next[0].desc ? "desc" : "asc");
            } else {
                prev.delete("sortBy");
                prev.delete("order");
            }
            return prev;
        });
        setPage(1);
    };

    const handleRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
    };

    const handleProductAdded = (product: Product) => {
        setLocalProducts((prev) => [product, ...prev]);
    };

    return (
        <div className={styles.page}>
            <div className={styles.topCard}>
                <h1 className={styles.title}>Товары</h1>
                <div className={styles.searchWrapper}>
                    <ProductsSearch onSearch={handleSearch} />
                </div>
            </div>

            <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.subtitle}>Все позиции</h2>
                    <div className={styles.toolbar}>
                        <Button variant="outline" shape="rect" size="s" iconOnly onClick={handleRefresh}>
                            <ArrowsClockwiseIcon size={20} />
                        </Button>
                        <Button
                            variant="primary"
                            shape="rect"
                            size="s"
                            leftIcon={<PlusCircleIcon size={20} />}
                            onClick={() => setAddModalOpen(true)}
                        >
                            Добавить
                        </Button>
                    </div>
                </div>

                {isLoading && <ProgressBar />}

                <ProductsTable
                    data={sortedProducts}
                    sorting={sorting}
                    onSortingChange={handleSortingChange}
                />

                <Pagination
                    page={page}
                    total={total}
                    limit={PRODUCTS_LIMIT}
                    onChange={handlePageChange}
                />
            </div>

            <AddProductModal
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSuccess={handleProductAdded}
            />
        </div>
    );
};
