import { z } from "zod";
export const transactionSchema= z.object({
    title:z.string().min(3,'Title to short'),
    amount:z.number().min(1,'Amount too low'),
    type:z.string()
});
