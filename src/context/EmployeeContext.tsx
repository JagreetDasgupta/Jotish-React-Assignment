import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Employee } from '../types/employee';
import { fetchEmployees } from '../services/employeeService';

type EmployeeContextValue = {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const EmployeeContext = createContext<EmployeeContextValue | undefined>(undefined);

type EmployeeProviderProps = {
  children: ReactNode;
};

export function EmployeeProvider({ children }: EmployeeProviderProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchEmployees();
      setEmployees(data);
      setHasFetched(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load employees.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasFetched) {
      void loadEmployees();
    }
  }, [hasFetched, loadEmployees]);

  const value = useMemo<EmployeeContextValue>(
    () => ({
      employees,
      loading,
      error,
      refresh: loadEmployees,
    }),
    [employees, loading, error, loadEmployees],
  );

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
}

export function useEmployees(): EmployeeContextValue {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }

  return context;
}

