import { TaskPageScheme } from '@/api/schemes';
import { z } from 'zod';
import { TaskEntity } from './types';
import dayjs from 'dayjs';

export function mapTaskPageSchemeToEntities(scheme: z.infer<typeof TaskPageScheme>): TaskEntity[] {
  return scheme.data.map((t) => ({
    taskId: t.task_id.toString(),
    accountId: 'mockaboba',
    assignerId: 'mockaboba',
    deadlineAt: dayjs(t.deadline_at),
    taskableType: t.task_type,
  }));
}
