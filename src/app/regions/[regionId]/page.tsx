'use client';

import { TaskItem } from '@/components/entities/task/task-item';
import { Button, buttonVariants } from '@/components/ui/button';
import { EfficiencyMetrics } from '@/components/ui/efficiency-metrics';
import { GoodBadMetrics } from '@/components/ui/good-bad-metrics';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TaskType } from '@/domain/types';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
  const accountId = searchParams.get('account-id');
  // TODO: Соотнести с названиями для типов параметров на беке, когда будет готово API
  const taskTypes: TaskType[] = processTaskTypesParam(searchParams.get('task-types'));

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
          <EfficiencyMetrics relative={666} absolute={999} />
          <GoodBadMetrics goodPercentage={70} badPercentage={30} size={300} />
        </div>
      </div>
    </div>
  );
}
