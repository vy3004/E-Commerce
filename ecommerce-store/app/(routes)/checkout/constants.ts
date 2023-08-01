import * as z from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  items: z
    .object({ id: z.string().min(1, { message: "Items is required" }) })
    .array(),
});
