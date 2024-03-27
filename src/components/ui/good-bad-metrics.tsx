export function GoodBadMetrics({
  goodPercentage,
  badPercentage,
}: {
  goodPercentage: number;
  badPercentage: number;
}) {
  return (
    <div>
      Good bad metrics: {goodPercentage} {badPercentage}
    </div>
  );
}
