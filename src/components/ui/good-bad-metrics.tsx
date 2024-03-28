import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function GoodBadMetrics({
  goodPercentage,
  badPercentage,
  size,
  className,
}: {
  goodPercentage: number;
  badPercentage: number;
  size: number,
  className?: string,
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Соотношение хорошо/плохо</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <svg
              className="PieChart"
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <Slice size={size} color="#D90429" start={0} amount={badPercentage} />
              <Slice
                size={size}
                color="#43AA8B"
                start={badPercentage}
                amount={goodPercentage}
              />
            </svg>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
function Slice({ size, color, start, amount }: {
  size: number,
  color: string,
  start: number,
  amount: number,
}) {
  const circumference = Math.round(Math.PI * (size / 2));
  return (
    <circle
      style={{ stroke: color }}
      r={size / 4}
      cy={size / 2}
      cx={size / 2}
      strokeWidth={size / 2 - 1}
      fill="none"
      strokeDasharray={`${(amount / 100) * circumference}, ${circumference}`}
      strokeDashoffset={-(start / 100) * circumference}
    />
  );
}
