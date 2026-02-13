import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type SortingState,
    type OnChangeFn,
} from "@tanstack/react-table";

import cn from "classnames";
import { ArrowUpIcon, ArrowsDownUpIcon } from "@phosphor-icons/react";

import type { Product } from "@/entities/product/model/types";
import { columns } from "@/features/products-table/model/columns";

import styles from "./ProductsTable.module.css";

interface ProductsTableProps {
    data: Product[];
    sorting: SortingState;
    onSortingChange: OnChangeFn<SortingState>;
}

export const ProductsTable = ({ data, sorting, onSortingChange }: ProductsTableProps) => {
    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange,
        manualSorting: true,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={styles.th}
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getCanSort() && (
                                        <span className={styles.sortIcon}>
                                            {header.column.getIsSorted() === "asc" && (
                                                <ArrowUpIcon size={14} />
                                            )}
                                            {header.column.getIsSorted() === "desc" && (
                                                <ArrowUpIcon size={14} className={styles.sortDesc} />
                                            )}
                                            {!header.column.getIsSorted() && (
                                                <ArrowsDownUpIcon size={14} />
                                            )}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className={cn(styles.tr, { [styles.selected]: row.getIsSelected() })}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className={styles.td}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
