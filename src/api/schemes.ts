import { z } from 'zod';

export const TransitionsInTaskPage = z.array(
  z.object({
    status: z.string(),
    timestamp: z.string().datetime({ offset: true }),
    stage_info: z.object({
      is_start: z.boolean(),
      is_fulfilled: z.boolean(),
      is_closed: z.boolean(),
      is_cancelled: z.boolean(),
    }),
  }),
);

export const TaskPageScheme = z.object({
  total_pages: z.number(),
  data: z.array(
    z.object({
      task_id: z.number(),
      task_type: z.union([z.literal('incident'), z.literal('regular')]),
      transitions: TransitionsInTaskPage,
      object: z.object({
        object_id: z.number(),
        object_place_id: z.number(),
        location: z.object({
          lat: z.number(),
          lon: z.number(),
        }),
        region_id: z.number(),
        region_title: z.string(),
      }),
      deadline: z.string().datetime({ offset: true }),
    }),
  ),
});

export const TaskTransitions = z.array(
  z.object({
    id: z.number(),
    task_id: z.number(),
    transitioned_by: z.string(),
    transitioned_at: z.string().datetime({ offset: true }),
    stage_title: z.string(),
  }),
);
