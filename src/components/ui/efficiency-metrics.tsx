import { Card, CardContent, CardHeader, CardTitle } from './card';

export function EfficiencyMetrics({
  relative,
  absolute,
  className,
}: {
  relative: number;
  absolute: number;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Эффективность</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">
          <b>Абсолютная: </b>
          {absolute}
        </p>
        <p className="text-lg">
          <b>Относительная: </b>
          {relative}
        </p>
      </CardContent>
    </Card>
  );
}
