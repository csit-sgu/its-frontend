'use client';

import Rusmap from '@/components/map/map';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SearchInput } from '@/components/ui/search-input';
import { Region } from '@/domain/types';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegionPickerPage() {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [regions, setRegions] = useState<Region[]>([
    { regionId: '1', name: 'Саратовская область' },
    { regionId: '2', name: 'Пермский край' },
    { regionId: '3', name: 'Донецкая народная республика' },
  ]);
  const [chosenReg, setChosenReg] = useState<Region | null>(null);
  const router = useRouter();

  const filteredRegions =
    prompt.trim() === ''
      ? regions
      : regions.filter((r) => r.name.trim().toLowerCase().startsWith(prompt.toLowerCase()));

  return (
    <div className="container">
      <div className="flex pt-5 pb-5 justify-center">
        <h2 className="font-bold text-4xl">
          {chosenReg === null ? 'Выберите регион' : chosenReg.name}
        </h2>
      </div>
      <Rusmap
        setChosen={setChosenReg}
        className="hidden md:block"
        onClick={() => router.push(`/regions/${chosenReg?.regionId}`)}
      />
      <SearchInput
        placeholder="Поиск региона"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-col mt-3">
        {filteredRegions.map((r) => (
          <Link href={`/regions/${r.regionId}`} className={buttonVariants({ variant: 'ghost' })}>
            {r.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
