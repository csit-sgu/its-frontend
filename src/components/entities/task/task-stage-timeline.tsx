import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TaskId, TaskTransition } from '@/domain/types';
import { formatDate } from '@/lib/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

// TODO: Сделать форматирование даты в стиле (3 минуты назад, 1 час назад...) dayjs-plugin-relative-time

export function TaskStageTimeline({
  taskId,
  ...props
}: { taskId: TaskId } & Record<string, string>) {
  const transitions: TaskTransition[] = [
    { taskId: '1', taskStageId: 'created', transitionedAt: dayjs() },
    { taskId: '2', taskStageId: 'appointed_account', transitionedAt: dayjs() },
    { taskId: '3', taskStageId: 'work', transitionedAt: dayjs() },
  ];

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>История изменений статуса</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>
            <Skeleton className="h-[98px] w-[100%] mb-3" />
            <Skeleton className="h-[98px] w-[100%] mb-3" />
            <Skeleton className="h-[98px] w-[100%] mb-3" />
          </div>
        ) : (
          transitions.map((t) => (
            <Card className="mb-3">
              <CardHeader>
                <CardTitle>Происходит абоба</CardTitle>
                <CardDescription>
                  <b>Сделано</b>: {formatDate(t.transitionedAt)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
}
