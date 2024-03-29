'use client';

import dayjs from 'dayjs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TaskItem } from '@/components/entities/task/task-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EfficiencyMetrics } from '@/components/ui/efficiency-metrics';
import { AccountId, TaskEntity, TaskType } from '@/domain/types';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { AccountPicker } from '@/components/entities/accounts/account-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GoodBadMetrics } from '@/components/ui/good-bad-metrics';

const incidents: TaskEntity[] = Array.from({ length: 50 }).map((_, i, a) => ({
  taskId: i.toString(),
  accountId: 'r',
  assignerId: 't',
  taskableType: 'incident',
  deadlineAt: dayjs(),
}));

const regulars: TaskEntity[] = Array.from({ length: 50 }).map((_, i, a) => ({
  taskId: i.toString(),
  accountId: 'r',
  assignerId: 't',
  taskableType: 'regular',
  deadlineAt: dayjs(),
}));

export default function ObjectProfilePage() {
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
              <CardTitle>Тип объекта</CardTitle>
              <CardDescription>км 4+700 а/д А-149 Адлер-Красная поляна</CardDescription>
              <CardDescription>
                <b>Обслуживающая компания</b>: ФКУ Упрдор "Черноморье"
              </CardDescription>
            </CardHeader>
          </div>
          <CardContent className="pt-6">
            <p className='text-3xl mb-3'>Обслуживание</p>
            <p className="text-lg">
              <b>Дата последнего обслуживания: </b>
              2024-03-03
            </p>
            <p className="text-lg">
              <b>Количество инцидентов с последнего обслуживания: </b>
              10
            </p>
            <p className="text-lg">
              <b>Интервал плановых работ: </b> <br />
              Каждые 30 дней в течении 10 дней
            </p>
            <p className='text-3xl my-3'>Эффективность</p>
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
      <Tabs defaultValue="tasks" className="w-[100%]">
        <TabsList>
          <TabsTrigger value="tasks">Все задачи</TabsTrigger>
          <TabsTrigger value="incidents">Инциденты</TabsTrigger>
          <TabsTrigger value="regular">Плановые</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          {regulars.map((t) => (
            <TaskItem
              taskId={t.taskId}
              accountId={t.accountId}
              assignerId={t.assignerId}
              taskableType={t.taskableType}
              deadlineAt={t.deadlineAt}
              key={t.accountId}
              className="mb-5"
            />
          ))}
        </TabsContent>
        <TabsContent value="incidents">
          {incidents.map((t) => (
            <TaskItem
              taskId={t.taskId}
              accountId={t.accountId}
              assignerId={t.assignerId}
              taskableType={t.taskableType}
              deadlineAt={t.deadlineAt}
              key={t.accountId}
              className="mb-5"
            />
          ))}
        </TabsContent>
        <TabsContent value="regular">
          {regulars.map((t) => (
            <TaskItem
              taskId={t.taskId}
              accountId={t.accountId}
              assignerId={t.assignerId}
              taskableType={t.taskableType}
              deadlineAt={t.deadlineAt}
              key={t.accountId}
              className="mb-5"
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
