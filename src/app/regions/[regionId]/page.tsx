'use client';

import { AccountPicker } from '@/components/entities/accounts/account-picker';
import { TaskItem } from '@/components/entities/task/task-item';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { EfficiencyMetrics } from '@/components/ui/efficiency-metrics';
import { GoodBadMetrics } from '@/components/ui/good-bad-metrics';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AccountId, TaskType } from '@/domain/types';
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
  // const taskTypes: TaskType[] = processTaskTypesParam(searchParams.get('task-types'));
  const [taskTypes, setTaskTypes] = useState<TaskType[]>(['incident', 'regular']);

  const toggleTaskType = (taskType: TaskType) => {
    if (taskTypes.includes(taskType)) {
      setTaskTypes((v) => v.filter((t) => t !== taskType));
    } else {
      setTaskTypes((v) => [...v, taskType]);
    }
  };

  return (
    <div className="container">
      <div className="flex pt-5 pb-5 justify-center">
        <h2 className="font-bold text-4xl">Саратовская область</h2>
        <Link href="/regions" className={buttonVariants({ variant: 'outline' }) + ' ml-2'}>
          Сменить регион
        </Link>
      </div>
      <div className="flex">
        <div className="w-[70%] pr-4">
          <ScrollArea className="h-[70vh] w-[100%] rounded-md border p-4">
            <TaskItem
              taskId={'aboba'}
              accountId={'aboba'}
              assignerId={'aboba'}
              taskableType={'incident'}
              deadlineAt={dayjs().add(1, 'day')}
              className="mb-5"
            />
            <TaskItem
              taskId={'aboba'}
              accountId={'aboba'}
              assignerId={'aboba'}
              taskableType={'incident'}
              deadlineAt={dayjs().add(1, 'day')}
              className="mb-5"
            />
            <TaskItem
              taskId={'aboba'}
              accountId={'aboba'}
              assignerId={'aboba'}
              taskableType={'incident'}
              deadlineAt={dayjs().add(1, 'day')}
              className="mb-5"
            />
            <TaskItem
              taskId={'aboba'}
              accountId={'aboba'}
              assignerId={'aboba'}
              taskableType={'incident'}
              deadlineAt={dayjs().add(1, 'day')}
              className="mb-5"
            />
            <TaskItem
              taskId={'aboba'}
              accountId={'aboba'}
              assignerId={'aboba'}
              taskableType={'incident'}
              deadlineAt={dayjs().add(1, 'day')}
              className="mb-5"
            />
            <TaskItem
              taskId={'aboba'}
              accountId={'aboba'}
              assignerId={'aboba'}
              taskableType={'incident'}
              deadlineAt={dayjs().add(1, 'day')}
              className="mb-5"
            />
            <TaskItem
              taskId={'aboba'}
              accountId={'aboba'}
              assignerId={'aboba'}
              taskableType={'incident'}
              deadlineAt={dayjs().add(1, 'day')}
              className="mb-5"
            />
          </ScrollArea>
        </div>
        <div className="w-[30%]">
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
          <EfficiencyMetrics relative={666} absolute={999} className="mb-3" />
          <GoodBadMetrics goodPercentage={70} badPercentage={30} size={300} />
        </div>
      </div>
    </div>
  );
}
