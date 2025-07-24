'use client';

import { useEffect, useState, ReactNode } from 'react';

interface RechartsComponents {
  BarChart: any;
  Bar: any;
  XAxis: any;
  YAxis: any;
  CartesianGrid: any;
  Tooltip: any;
  Legend: any;
  ResponsiveContainer: any;
  PieChart: any;
  Pie: any;
  Cell: any;
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
