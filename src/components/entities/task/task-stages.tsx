import { getTaskStages } from '@/api/endpoints';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { TaskId } from '@/domain/types';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export function TaskStages({
  taskId,
  className,
}: {
  taskId: TaskId;
  className: string;
}) {
  const stagesQuery = useQuery({
    queryKey: ['task-stages', taskId],
    queryFn: () => getTaskStages(parseInt(taskId)),
  })


  return (
    <div className={className}>
      <Breadcrumb>
        <BreadcrumbList>
          {stagesQuery.isLoading && (
            <Skeleton className="w-full h-[20px]" />
          )}
          {stagesQuery.isFetched && stagesQuery.data?.map((t, i) => (
            <>
              <StageItem active={false}>{t}</StageItem>
              { i !== stagesQuery.data?.length - 1 && (
                <BreadcrumbSeparator />
              ) }
            </>
          ))}
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
