'use client';

import dayjs from 'dayjs';
import { TaskItem } from '@/components/entities/task/task-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TaskEntity } from '@/domain/types';

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
  return (
    <div className="container">
      <div className="flex pt-5 pb-5 justify-center">
        <h2 className="font-bold text-4xl">Название объекта</h2>
      </div>
      <div className="flex">
        <div className="w-[50%] p-4">
          <p className="text-2xl mb-5 font-bold hover:font-bold">Список инцидентов</p>
          <ScrollArea className="flex flex-col h-[85vh]">
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
          </ScrollArea>
        </div>
        <div className="w-[50%] p-4">
          <p className="text-2xl mb-5 font-bold hover:font-bold">Список регулярных задач</p>
          <ScrollArea className="flex flex-col h-[85vh]">
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
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
