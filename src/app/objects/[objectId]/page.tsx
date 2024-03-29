'use client';

import dayjs from 'dayjs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TaskItem } from '@/components/entities/task/task-item';
import { AccountId, TaskEntity, TaskType } from '@/domain/types';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { AccountPicker } from '@/components/entities/accounts/account-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GoodBadMetrics } from '@/components/ui/good-bad-metrics';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/api/endpoints';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';

const incidents: TaskEntity[] = Array.from({ length: 50 }).map((_, i, a) => ({
  taskId: i.toString(),
  taskableType: 'incident',
  deadlineAt: dayjs(),
  createdBy: 'ООО "Компания"',
  accountName: 'Иванов Иван Иванович',
  objectId: '123',
  stages: ['Создано', 'Выполняется', 'Закрыто'],
}));

const regulars: TaskEntity[] = Array.from({ length: 50 }).map((_, i, a) => ({
  taskId: i.toString(),
  taskableType: 'regular',
  deadlineAt: dayjs(),
  createdBy: 'ООО "Компания"',
  accountName: 'Иванов Иван Иванович',
  stages: ['Создано', 'Выполняется', 'Закрыто'],
  objectId: '123',
}));

export default function ObjectProfilePage({ params }: { params: { objectId: string } }) {
  const searchParams = useSearchParams();
  const [accountId, setAccountId] = useState<AccountId>('ALL');
  const [taskType, setTaskType] = useState<TaskType | 'incident,regular'>('incident,regular');

  const page = parseInt(searchParams.get('page') ?? '0');

  const tasksQuery = useQuery({
    queryKey: ['tasks', page, taskType],
    queryFn: () =>
      getTasks({
        page,
        size: 10,
        task_types: taskType,
        object_ids: params.objectId,
        account_id: accountId === 'ALL' ? undefined : parseInt(accountId),
      }),
  });

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
            <p className="text-3xl mb-3">Обслуживание</p>
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
      <div className="w-[100%]">
        <Tabs
          value={taskType}
          onValueChange={(v) => setTaskType(v as TaskType | 'incident,regular')}
          className="w-[100%] mb-3"
        >
          <TabsList>
            <TabsTrigger value="incident,regular">Все задачи</TabsTrigger>
            <TabsTrigger value="incident">Инциденты</TabsTrigger>
            <TabsTrigger value="regular">Плановые</TabsTrigger>
          </TabsList>
        </Tabs>
        {tasksQuery.data?.data.map((t) => (
          <TaskItem
            key={t.task_id}
            taskId={t.task_id.toString()}
            taskableType={t.task_type}
            deadlineAt={dayjs(t.deadline)}
            className="mb-5"
            createdBy={'Иванов Иван Иванович'}
            accountName={'ООО "Мясо и рыба"'}
            objectId={t.object.object_id.toString()}
            stages={t.transitions.map((t) => t.status)} 
            showObjectButton={false}          />
        ))}
        <Separator />
        <div className="mt-5 flex">
          {page !== 0 && (
            <Link
              href={`/objects/${params.objectId}?page=${page - 1}`}
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
              href={`/objects/${params.objectId}?page=${page + 1}`}
              className={buttonVariants({ variant: 'default' })}
            >
              Следующая страница
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
