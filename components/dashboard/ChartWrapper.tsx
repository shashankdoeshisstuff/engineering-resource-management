'use client';

import { useEffect, useState, ReactNode } from 'react';
import * as Recharts from 'recharts';

interface RechartsComponents {
  BarChart: typeof Recharts.BarChart;
  Bar: typeof Recharts.Bar;
  XAxis: typeof Recharts.XAxis;
  YAxis: typeof Recharts.YAxis;
  CartesianGrid: typeof Recharts.CartesianGrid;
  Tooltip: typeof Recharts.Tooltip;
  Legend: typeof Recharts.Legend;
  ResponsiveContainer: typeof Recharts.ResponsiveContainer;
  PieChart: typeof Recharts.PieChart;
  Pie: typeof Recharts.Pie;
  Cell: typeof Recharts.Cell;
}

interface ChartWrapperProps {
  children: (recharts: RechartsComponents) => ReactNode;
}

export default function ChartWrapper({ children }: ChartWrapperProps) {
  const [recharts, setRecharts] = useState<RechartsComponents | null>(null);

  useEffect(() => {
    async function loadRecharts() {
      const mod = await import('recharts');
      setRecharts({
        BarChart: mod.BarChart,
        Bar: mod.Bar,
        XAxis: mod.XAxis,
        YAxis: mod.YAxis,
        CartesianGrid: mod.CartesianGrid,
        Tooltip: mod.Tooltip,
        Legend: mod.Legend,
        ResponsiveContainer: mod.ResponsiveContainer,
        PieChart: mod.PieChart,
        Pie: mod.Pie,
        Cell: mod.Cell,
      });
    }

    loadRecharts();
  }, []);

  if (!recharts) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    );
  }

  return <>{children(recharts)}</>;
}
