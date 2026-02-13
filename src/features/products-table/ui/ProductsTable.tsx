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
                <colgroup>
                    <col style={{ width: "4%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "16%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "12%" }} />
                    <col style={{ width: "14%" }} />
                </colgroup>
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
                                        <span
                                            className={cn(styles.sortIcon, {
                                                [styles.sortActive]: header.column.getIsSorted(),
                                            })}
                                        >
                                            {header.column.getIsSorted() === "asc" && (
                                                <ArrowUpIcon size={18} />
                                            )}
                                            {header.column.getIsSorted() === "desc" && (
                                                <ArrowUpIcon size={18} className={styles.sortDesc} />
                                            )}
                                            {!header.column.getIsSorted() && (
                                                <ArrowsDownUpIcon size={18} />
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
