import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { TaskId, TaskStage } from '@/domain/types';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, forwardRef, useEffect, useState } from 'react';

export function TaskStage({ taskId, ...props }: { taskId: TaskId } | Record<string, string>) {
  // TODO: Использовать tanstack query, когда будет готов бек

  const [stage, setStage] = useState<TaskStage>('created');

  useEffect(() => {
    // Тут будет утекать пямять, но поскольку это для демонстрации, то пофиг)
    setTimeout(() => setStage('appointed_account'), 1000);
  }, []);

  return (
    <div {...props}>
      <Breadcrumb>
        <BreadcrumbList className="flex justify-between">
          <StageItem active={false}>Создан</StageItem>
          <BreadcrumbSeparator />
          <StageItem active={false}>Назначен подрядчик</StageItem>
          <BreadcrumbSeparator />
          <StageItem active={true}>Происходит работа</StageItem>
          <BreadcrumbSeparator />
          <StageItem active={false}>Работа завершена</StageItem>
          <BreadcrumbSeparator />
          <StageItem active={false}>
            <span>Инцидент закрыт</span>
          </StageItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

const StageItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'> & { active: boolean }>(
  ({ className, children, active, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props}>
      {active ? <BreadcrumbPage>{children}</BreadcrumbPage> : children}
    </li>
  ),
);
StageItem.displayName = 'StageItem';
