import { z } from 'zod';



export const PinCodeValidationSchema=z.string().regex(/^\d{6}$/);

export const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

