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

  const toggleTaskType = (taskType: TaskType) => {
    if (taskTypes.includes(taskType)) {
      setTaskTypes((v) => v.filter((t) => t !== taskType));
    } else {
      setTaskTypes((v) => [...v, taskType]);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col pt-5 pb-5 justify-center md:flex-row">
        <h2 className="font-bold text-2xl text-center mb-3 md:text-4xl lg:mb-0">Саратовская область</h2>
      </div>
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="lg:w-[70%] lg:pr-4 w-[100%] pr-0 mb-3">
          <ScrollArea className="w-[100%] rounded-md border p-4">
            <TaskItem
              taskId={'aboba'}
              accountId={'aboba'}
              assignerId={'aboba'}
              taskableType={'regular'}
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
              taskableType={'regular'}
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
            <EfficiencyMetrics relative={666} absolute={999} className="mb-3 lg:mb-3 lg:w-full md:mb-0 md:w-[50%] md:mr-3 md:h-auto" />
            <GoodBadMetrics goodPercentage={70} badPercentage={30} size={300} className="w-full lg:w-full md:w-[50%] md:h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
