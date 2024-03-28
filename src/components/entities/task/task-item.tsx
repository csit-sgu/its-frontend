import { TaskEntity, TaskTransition } from '@/domain/types';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskStage } from './task-stage';
import { TaskStageTimeline } from './task-stage-timeline';

// TODO: Подгружать с бека информацию об подрядчике и создателе задачи
// TODO: Спросить, откуда берётся title

export function TaskItem({
  taskId,
  accountId,
  assignerId,
  taskableType,
  deadlineAt,
  ...props
}: TaskEntity | Record<string, string>) {
  const [historyIsOpen, setHistoryIsOpen] = useState<boolean>(false);

  const historyButton = (
    <Button
      variant={historyIsOpen ? 'outline' : 'default'}
      onClick={() => setHistoryIsOpen((v) => !v)}
      className="w-[100%]"
    >
      {historyIsOpen ? 'Свернуть' : 'История изменений статуса'}
    </Button>
  );

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Задача 1</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <b>Подрядчик:</b> ООО "Абоба"
        </p>
        <p>
          <b>Создано:</b> Иванов Иван Иванович
        </p>
        <TaskStage className="mt-3" taskId="aboba" />
      </CardContent>
      <CardFooter>
        <div className="w-[100%]">
          {historyButton}
          {historyIsOpen && <TaskStageTimeline taskId={taskId} className="mt-3" />}
        </div>
      </CardFooter>
    </Card>
  );
}
