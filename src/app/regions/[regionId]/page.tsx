'use client';

import { AccountPicker } from '@/components/entities/accounts/account-picker';
import { TaskItem } from '@/components/entities/task/task-item';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { EfficiencyMetrics } from '@/components/ui/efficiency-metrics';
import { GoodBadMetrics } from '@/components/ui/good-bad-metrics';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
      <div className="flex flex-col md:flex-row">
        <Card className="flex flex-col m-3 mt-5 ml-0 w-full md:w-[60%]">
          <div className="flex flex-col md:flex-row">
            <img src="/img.png" alt="img" className="m-[30px] size-[100px]" />
            <CardHeader>
              <CardTitle className="text-4xl my-auto">Саратовская область</CardTitle>
            </CardHeader>
          </div>
          <CardContent className="pt-6">
            <p className="text-3xl mb-3">Обслуживание</p>
            <p className="text-lg">
              <b>Количество обслуживаемых объектов: </b>
              1000
            </p>
            <p className="text-lg">
              <b>Количество инцидентов в этом месяце: </b>
              150
            </p>
            <p className="text-3xl my-3">Эффективность</p>
            <p className="text-lg">
              <b>Абсолютная: </b> {123}
            </p>
            <p className="text-lg">
              <b>Относительная: </b> {456}
            </p>
          </CardContent>
        </Card>
        <div className="flex flex-col mt-0 mb-3 w-full md:mt-5 md:w-[40%]">
          <Card className="mb-3">
            <CardHeader>
              <CardTitle>Фильтры</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Организация:</Label>
                <AccountPicker value={accountId ?? 'ALL'} onChange={(v) => setAccountId(v)} />
              </div>
            </CardContent>
          </Card>
          <GoodBadMetrics
            goodPercentage={70}
            badPercentage={30}
            size={300}
            className="w-full md:h-auto"
          />
        </div>
      </div>
      <div className="w-[100%] pr-0 mb-3">
        <Tabs defaultValue="tasks" className="w-[100%]">
          <TabsList>
            <TabsTrigger value="tasks">Все задачи</TabsTrigger>
            <TabsTrigger value="incidents">Инциденты</TabsTrigger>
            <TabsTrigger value="regular">Плановые</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
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
          </TabsContent>
          <TabsContent value="incidents">
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
          </TabsContent>
          <TabsContent value="regular">
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
              taskableType={'regular'}
              deadlineAt={dayjs().add(1, 'day')}
              className="mb-5"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
