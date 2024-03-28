import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Account, AccountId } from '@/domain/types';
import { useEffect, useState } from 'react';

// TODO: Привязать к бекенду

export function AccountPicker({
  value,
  onChange,
}: {
  value: AccountId;
  onChange: (value: AccountId) => void;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<Account[]>([
    { accountId: '1', name: 'ООО "Организация"' },
    { accountId: '2', name: 'ООО "Ещё одна Организация"' },
    { accountId: '3', name: 'ООО "Какая-то Организация"' },
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Skeleton className="w-full h-[40px]" />;
  }

  return (
    <Select value={value} onValueChange={(v) => onChange(v)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выберите организацию" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ALL">Любая организация</SelectItem>
          {accounts.map((a) => (
            <SelectItem key={a.accountId} value={a.accountId}>
              {a.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
