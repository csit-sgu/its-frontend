import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TaskId, TaskTransition } from '@/domain/types';
import { formatDate } from '@/lib/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTransitionsForTask } from '@/api/endpoints';

export function TaskStageTimeline({
  taskId,
  ...props
}: { taskId: TaskId } & Record<string, string>) {
  const transitionsQuery = useQuery({
    queryKey: ['transitions', taskId],
    queryFn: () => getTransitionsForTask(parseInt(taskId)),
  });

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
        {transitionsQuery.isLoading && (
          <div>
            <Skeleton className="h-[98px] w-[100%] mb-3" />
            <Skeleton className="h-[98px] w-[100%] mb-3" />
            <Skeleton className="h-[98px] w-[100%] mb-3" />
          </div>
        )}
        {transitionsQuery.isFetched &&
          transitionsQuery.data?.map((t) => (
            <Card className="mb-3">
              <CardHeader>
                <CardTitle>{t.stage_title}</CardTitle>
                <CardDescription>
                  <p>
                    <b>Дата перехода</b>: {formatDate(dayjs(t.transitioned_at))}
                  </p>
                  <p>
                    <b>Переведено</b>: {t.transitioned_by}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
      </CardContent>
    </Card>
  );
}
