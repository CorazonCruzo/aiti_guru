import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import { Input } from "@/shared/ui/Input/Input";

const DEBOUNCE_MS = 300;

interface ProductsSearchProps {
    onSearch: (query: string) => void;
}

export const ProductsSearch = ({ onSearch }: ProductsSearchProps) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(value.trim());
        }, DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [value, onSearch]);

    return (
        <Input
            variant="compact"
            leftIcon={<MagnifyingGlassIcon size={18} />}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClear={() => setValue("")}
            placeholder="Найти"
        />
    );
};
