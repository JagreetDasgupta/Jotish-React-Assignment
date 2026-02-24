import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useEmployees } from '../context/EmployeeContext';
import { Skeleton } from '../components/Skeleton';

type ChartDatum = {
  name: string;
  salary: number;
};

function buildChartData(
  employees: ReturnType<typeof useEmployees>['employees'],
  limit: number,
): ChartDatum[] {
  const base = employees.slice(0, limit);

  return base
    .filter((employee) => Number.isFinite(employee.salary))
    .map((employee) => {
      const trimmedName =
        employee.name.length > 12 ? `${employee.name.slice(0, 11).trimEnd()}…` : employee.name;

      return {
        name: trimmedName || 'Unknown',
        salary: employee.salary,
      };
    });
}

export function BarChart() {
  const { employees, loading, error, refresh } = useEmployees();
  const navigate = useNavigate();

  const data = useMemo<ChartDatum[]>(
    () => buildChartData(employees, 10),
    [employees],
  );

  const handleBack = () => {
    navigate('/list');
  };

  const [animateBars, setAnimateBars] = useState<boolean>(true);

  useEffect(() => {
    if (data.length > 0) {
      const timeoutId = window.setTimeout(() => setAnimateBars(false), 1200);
      return () => window.clearTimeout(timeoutId);
    }
    return undefined;
  }, [data.length]);

  return (
    <section className="chart-page">
      <div className="chart-header">
        <div>
          <h1 className="chart-title">Salary Analysis</h1>
          <p className="chart-subtitle">Top 10 employees by salary</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleBack}>
          Back to List
        </button>
      </div>

      {loading && (
        <div className="chart-container">
          <Skeleton height="100%" borderRadius={16} />
        </div>
      )}

      {error && (
        <div className="error">
          <div>{error}</div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={refresh}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <div className="empty-state-title">No data available</div>
          <div className="empty-state-description">Unable to load salary data</div>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <RechartsBarChart data={data} margin={{ top: 24, right: 24, left: 24, bottom: 24 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="var(--border)"
                opacity={0.5}
              />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--border)' }}
              />
              <YAxis 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--border)' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value) =>
                  typeof value === 'number' ? `₹${value.toLocaleString('en-IN')}` : value
                }
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: `1px solid var(--border)`,
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)'
                }}
                labelStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
              />
              <Bar
                dataKey="salary"
                fill="var(--accent)"
                radius={[8, 8, 0, 0]}
                isAnimationActive={animateBars}
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

