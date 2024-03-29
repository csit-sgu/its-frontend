import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export function TaskStages({
  stages,
  className,
}: {
  stages: string[];
  className: string;
}) {
  return (
    <div className={className}>
      <Breadcrumb>
        <BreadcrumbList>
          {stages.map((t, i) => (
            <>
              <StageItem active={false}>{t}</StageItem>
              { i !== stages.length - 1 && (
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
