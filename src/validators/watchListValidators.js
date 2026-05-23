import { z } from 'zod';

export const addToWatchListSchema = z.object({
    movieId: z.string("You must enter a valid Movie ID").uuid("Move ID must be a valid UUID"),
    status: z.enum(['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED'], {
        error: "Status must be one of 'PLANNED', 'WATCHING', 'COMPLETED', or 'DROPPED'"
    }).optional(),
    rating: z.coerce
            .number()
            .int("Rating must be an integer")
            .min(1, "Rating must be at least 1")
            .max(10, "Rating must be at most 10")
            .optional(),
    notes: z.string().max(500, "Notes must be at most 500 characters").optional(),
});

