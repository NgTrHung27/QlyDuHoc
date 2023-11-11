"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formEditPriceSchema } from "../../../../../../../../constaints-edit/constants-program";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Program } from "@prisma/client";

interface nameFormProps {
    program: Program;
}

const PriceForm = ({ program }: nameFormProps) => {
    const router = useRouter();

    const [isEditting, setIsEditting] = useState(false);

    const toggleEdit = () => {
        setIsEditting((current) => !current);
    };

    const form = useForm<z.infer<typeof formEditPriceSchema>>({
        resolver: zodResolver(formEditPriceSchema),
        defaultValues: {
            price: 0,
        },
    });


    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formEditPriceSchema>) => {
        try {
            await axios.patch(`/api/schools/${program.id}`, values);
            toast.success("Cập nhật price thành công");
            toggleEdit();
        } catch (error) {
            toast.error("Cập nhật price thất bại");
        } finally {
            router.refresh();
            form.reset();
        }
    };

    return (
        <>

            <div className="mt-6 border bg-white rounded-md p-4">
                <div className="font-medium flex items-center justify-between">
                    Price
                    <Button onClick={toggleEdit} variant={"ghost"}>
                        {isEditting ? (
                            <>Hủy</>
                        ) : (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Chỉnh sửa
                            </>
                        )}
                    </Button>
                </div>

                {!isEditting ? (
                    <p className="text-sm mt-2">{program.Price}</p>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="Nhập đầy đủ mô tả 2"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">
                                <Button disabled={isSubmitting || !isValid} type="submit">
                                    Lưu thay đổi
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>

        </>
    );
};

export default PriceForm;
