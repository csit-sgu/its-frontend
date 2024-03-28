'use client';

import { getTasks } from '@/api/endpoints';
import { AccountPicker } from '@/components/entities/accounts/account-picker';
import { TaskItem } from '@/components/entities/task/task-item';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { EfficiencyMetrics } from '@/components/ui/efficiency-metrics';
import { GoodBadMetrics } from '@/components/ui/good-bad-metrics';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { AccountId, TaskType } from '@/domain/types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

function processTaskTypesParam(param: string | null): TaskType[] {
  return (
    (param?.split(',').filter((t) => ['incident', 'regular'].includes(t)) as TaskType[]) ?? [
      'incident',
      'regular',
    ]
  );
}

export default function RegionProfile({ params }: { params: { regionId: string } }) {
  const searchParams = useSearchParams();
  const [accountId, setAccountId] = useState<AccountId>('ALL');
  // TODO: Соотнести с названиями для типов параметров на беке, когда будет готово API
  const [taskTypes, setTaskTypes] = useState<TaskType[]>(['incident', 'regular']);

  const page = parseInt(searchParams.get('page') ?? '0');

  const tasksQuery = useQuery({
    queryKey: ['tasks', page],
    queryFn: () =>
      getTasks({
        page,
        size: 10,
        region_id: parseInt(params.regionId),
        task_types: taskTypes.join(','),
        account_id: accountId === 'ALL' ? undefined : parseInt(accountId),
      }),
  });

  const toggleTaskType = (taskType: TaskType) => {
    if (taskTypes.includes(taskType)) {
      setTaskTypes((v) => v.filter((t) => t !== taskType));
    } else {
      setTaskTypes((v) => [...v, taskType]);
    }
  };

  return (
    <div className="container">
      <h2 className="font-bold text-2xl text-center mb-3 md:text-4xl lg:mb-0">Саратовская область</h2>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="lg:w-[70%] lg:pr-4 w-[100%] pr-0 mb-3">
          {tasksQuery.isLoading && (
            <div>
              <Skeleton className="h-[250px] w-[100%] mb-5" />
              <Skeleton className="h-[250px] w-[100%]" />
            </div>
          )}
          {tasksQuery.isFetched && (
            <ScrollArea className="w-[100%] rounded-md border p-4">
              {tasksQuery.data?.data.map((t) => (
                <TaskItem
                  key={t.task_id}
                  taskId={t.task_id.toString()}
                  taskableType={t.task_type}
                  deadlineAt={dayjs(t.deadline)}
                  className="mb-5"
                  createdBy={'Иванов Иван Иванович'}
                  accountName={'ООО "Мясо и рыба"'}
                />
              ))}
              <Separator />
              <div className="mt-5 flex">
                {page !== 0 && (
                  <Link
                    href={`/regions/${params.regionId}?page=${page - 1}`}
                    className={buttonVariants({ variant: 'default' }) + ' mr-2'}
                  >
                    Предыдущая страница
                  </Link>
                )}
                <Button disabled={true} className="mr-2">
                  {page + 1} / {(tasksQuery.data?.total_pages ?? 0) + 1}
                </Button>
                {page < (tasksQuery.data?.total_pages ?? 0) - 1 && (
                  <Link
                    href={`/regions/${params.regionId}?page=${page + 1}`}
                    className={buttonVariants({ variant: 'default' })}
                  >
                    Следующая страница
                  </Link>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
        <div className="flex flex-col w-[100%] mb-3 lg:w-[30%] lg:h-screen lg:sticky lg:top-5">
          <Card className="mb-3">
            <CardHeader>
              <CardTitle>Фильтры</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Организация:</Label>
                <AccountPicker value={accountId ?? 'ALL'} onChange={(v) => setAccountId(v)} />
              </div>
              <div className="mt-1">
                <Label>Типы задач:</Label>
                <div className="flex items-center space-x-2 mb-1">
                  <Checkbox
                    id="regular-task-type"
                    checked={taskTypes.includes('regular')}
                    onClick={() => toggleTaskType('regular')}
                  />
                  <label
                    htmlFor="regular-task-type"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Регулярные
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="incident-task-type"
                    checked={taskTypes.includes('incident')}
                    onClick={() => toggleTaskType('incident')}
                  />
                  <label
                    htmlFor="incident-task-type"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Инциденты
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col md:flex-row lg:flex-col">
            <EfficiencyMetrics
              relative={666}
              absolute={999}
              className="mb-3 lg:mb-3 lg:w-full md:mb-0 md:w-[50%] md:mr-3 md:h-auto"
            />
            <GoodBadMetrics
              goodPercentage={70}
              badPercentage={30}
              size={300}
              className="w-full lg:w-full md:w-[50%] md:h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
