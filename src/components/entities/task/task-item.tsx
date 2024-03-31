import { TaskEntity, TaskType } from '@/domain/types';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { TaskStages } from './task-stages';
import { TaskStageTimeline } from './task-stage-timeline';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

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
  objectId,
  stages,
  showObjectButton,
}: TaskEntity & { className?: string; showObjectButton: boolean }) {
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
          <b>Создано:</b> {createdBy}
        </p>
        <p>
          <b>Ожидаемая дата сдачи:</b> {formatDate(deadlineAt)}
        </p>
        <TaskStages className="mt-3" taskId={taskId} />
      </CardContent>
      <CardFooter>
        <div className="w-[100%]">
          {showObjectButton && (
            <Link href={`/objects/${objectId}`} className={buttonVariants('default') + ' w-full mb-3'}>Открыть страницу объекта</Link>
          )}
          {historyButton}
          {historyIsOpen && <TaskStageTimeline taskId={taskId} className="mt-3" />}
        </div>
      </CardFooter>
    </Card>
  );
}
