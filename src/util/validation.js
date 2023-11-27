import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Please enter a correct email address." }),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, {
      message: " Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: " Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: " Password must contain at least one digit." }),
  date: z.number(),
});
