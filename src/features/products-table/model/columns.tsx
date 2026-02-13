import { createColumnHelper } from "@tanstack/react-table";
import { PlusIcon, DotsThreeIcon, PackageIcon } from "@phosphor-icons/react";

import type { Product } from "@/entities/product/model/types";
import { Button } from "@/shared/ui/Button/Button";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { formatPrice } from "@/features/products-table/lib/formatPrice";

import styles from "../ui/ProductsTable.module.css";

const columnHelper = createColumnHelper<Product>();

export const columns = [
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                variant="table"
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                variant="table"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
        size: 48,
    }),

    columnHelper.accessor("title", {
        header: "Наименование",
        cell: ({ row }) => (
            <div className={styles.productCell}>
                {row.original.thumbnail ? (
                    <img
                        src={row.original.thumbnail}
                        alt={row.original.title}
                        className={styles.thumbnail}
                    />
                ) : (
                    <span className={styles.thumbnailPlaceholder}>
                        <PackageIcon size={24} />
                    </span>
                )}
                <div className={styles.productInfo}>
                    <div className={styles.productTitle}>{row.original.title}</div>
                    <div className={styles.productCategory}>{row.original.category}</div>
                </div>
            </div>
        ),
    }),

    columnHelper.accessor("brand", {
        header: "Вендор",
        cell: ({ getValue }) => <span className={styles.brandText}>{getValue()}</span>,
    }),

    columnHelper.accessor("sku", {
        header: "Артикул",
    }),

    columnHelper.accessor("rating", {
        header: "Оценка",
        cell: ({ getValue }) => {
            const rating = getValue();
            if (!rating) return "—";
            return (
                <span className={rating < 3 ? styles.ratingLow : undefined}>
                    {rating}/5
                </span>
            );
        },
    }),

    columnHelper.accessor("price", {
        header: "Цена, ₽",
        cell: ({ getValue }) => formatPrice(getValue()),
    }),

    columnHelper.display({
        id: "actions",
        header: "",
        cell: () => (
            <div className={styles.actions}>
                <Button variant="primary" shape="circle" size="s" iconOnly>
                    <PlusIcon size={18} />
                </Button>
                <Button variant="outline" shape="circle" size="s" iconOnly>
                    <DotsThreeIcon size={18} />
                </Button>
            </div>
        ),
        size: 120,
    }),
];
