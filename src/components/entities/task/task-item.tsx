import { TaskEntity, TaskType } from '@/domain/types';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskStage } from './task-stage';
import { TaskStageTimeline } from './task-stage-timeline';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

// TODO: Подгружать с бека информацию об подрядчике и создателе задачи
// TODO: Спросить, откуда берётся title

const badgeVariant: Record<TaskType, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  incident: 'destructive',
  regular: 'secondary',
};

const badgeText: Record<TaskType, string> = {
  incident: 'Инцидент',
  regular: 'Регулярная',
};

export function TaskItem({
  taskId,
  taskableType,
  deadlineAt,
  accountName,
  createdBy,
  className,
}: TaskEntity & { className?: string }) {
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
    <Card className={className}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Задача</CardTitle>
        <Badge variant={badgeVariant[taskableType]}>{badgeText[taskableType]}</Badge>
      </CardHeader>
      <CardContent>
        <p>
          <b>Подрядчик:</b> {accountName}
        </p>
        <p>
          <b>Создано:</b> {createdBy} в {formatDate(deadlineAt)}
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
