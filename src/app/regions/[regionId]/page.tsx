'use client';

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
    <div>
      <div>Region profile: {params.regionId}</div>
      <div>AccountID: {accountId ?? 'не указано'}</div>
      <div>Task types: {taskTypes.join(' ')}</div>
    </div>
  );
}
