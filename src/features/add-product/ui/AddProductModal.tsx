import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { addProduct } from "@/entities/product/api/productApi";
import type { Product } from "@/entities/product/model/types";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { showToast } from "@/shared/lib/showToast";

import styles from "./AddProductModal.module.css";

const schema = z.object({
    title: z.string().min(1, "Введите наименование"),
    brand: z.string().min(1, "Введите бренд"),
    sku: z.string().min(1, "Введите артикул"),
    price: z.string().min(1, "Введите цену").refine((v) => Number(v) > 0, "Цена должна быть больше 0"),
});

type FormValues = z.infer<typeof schema>;

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: (product: Product) => void;
}

export const AddProductModal = ({ open, onClose, onSuccess }: AddProductModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { title: "", brand: "", sku: "", price: "" },
    });

    const titleValue = watch("title");
    const brandValue = watch("brand");
    const skuValue = watch("sku");
    const priceValue = watch("price");

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            const product = await addProduct({
                title: data.title,
                brand: data.brand,
                sku: data.sku,
                price: Number(data.price),
            });
            showToast("success", "Товар добавлен");
            onSuccess(product);
            handleClose();
        } catch {
            showToast("error", "Не удалось добавить товар");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} title="Новый товар">
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.field}>
                    <label className={styles.label}>Наименование</label>
                    <Input
                        {...register("title")}
                        value={titleValue}
                        onClear={() => setValue("title", "")}
                        error={errors.title?.message}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Бренд</label>
                    <Input
                        {...register("brand")}
                        value={brandValue}
                        onClear={() => setValue("brand", "")}
                        error={errors.brand?.message}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Артикул</label>
                    <Input
                        {...register("sku")}
                        value={skuValue}
                        onClear={() => setValue("sku", "")}
                        error={errors.sku?.message}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Цена, ₽</label>
                    <Input
                        {...register("price")}
                        type="number"
                        value={priceValue}
                        onClear={() => setValue("price", "")}
                        error={errors.price?.message}
                    />
                </div>

                <Button
                    variant="primary"
                    fullWidth
                    type="submit"
                    loading={isSubmitting}
                >
                    Добавить
                </Button>
            </form>
        </Modal>
    );
};
