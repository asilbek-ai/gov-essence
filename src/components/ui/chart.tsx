// Minimal pass-through wrapper. We use recharts directly in src/components/charts.
import * as React from "react";

export const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => <div ref={ref} {...props}>{children}</div>
);
ChartContainer.displayName = "ChartContainer";

export const ChartTooltip: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const ChartTooltipContent: React.FC<Record<string, unknown>> = () => null;
export const ChartLegend: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const ChartLegendContent: React.FC<Record<string, unknown>> = () => null;
export const ChartStyle: React.FC<Record<string, unknown>> = () => null;
