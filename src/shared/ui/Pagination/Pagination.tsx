import cn from "classnames";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import styles from "./Pagination.module.css";

interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    onChange: (page: number) => void;
}

export const Pagination = ({ page, total, limit, onChange }: PaginationProps) => {
    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1) return null;

    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);

    const getPages = (): (number | "...")[] => {
        const pages: (number | "...")[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (page > 3) pages.push("...");

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);
            for (let i = start; i <= end; i++) pages.push(i);

            if (page < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className={styles.wrapper}>
            <span className={styles.info}>
                Показано {from}-{to} из {total}
            </span>
            <div className={styles.buttons}>
                <button
                    className={styles.arrow}
                    disabled={page === 1}
                    onClick={() => onChange(page - 1)}
                >
                    <CaretLeftIcon size={20} />
                </button>
                {getPages().map((p, i) =>
                    p === "..." ? (
                        <span key={`dots-${i}`} className={styles.dots}>
                            ...
                        </span>
                    ) : (
                        <button
                            key={p}
                            className={cn(styles.page, { [styles.active]: p === page })}
                            onClick={() => onChange(p)}
                        >
                            {p}
                        </button>
                    ),
                )}
                <button
                    className={styles.arrow}
                    disabled={page === totalPages}
                    onClick={() => onChange(page + 1)}
                >
                    <CaretRightIcon size={20} />
                </button>
            </div>
        </div>
    );
};
