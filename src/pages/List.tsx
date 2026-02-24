import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import { Skeleton } from '../components/Skeleton';
import { getItem, setItem, removeItem } from '../utils/storage';

function formatSalary(value: number): string {
  if (!Number.isFinite(value)) {
    return '₹0';
  }

  return `₹${value.toLocaleString('en-IN')}`;
}

function escapeCsvValue(value: string): string {
  if (value.includes('"') || value.includes(',') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function handleExportCsv(employees: ReturnType<typeof useEmployees>['employees']) {
  if (!employees.length) {
    return;
  }

  const header = ['ID', 'Name', 'Salary', 'City', 'Age'];
  const rows = employees.map((employee) => [
    String(employee.id ?? ''),
    employee.name ?? '',
    Number.isFinite(employee.salary) ? String(employee.salary) : '',
    employee.city ?? '',
    typeof employee.age === 'number' && !Number.isNaN(employee.age)
      ? String(employee.age)
      : '',
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => escapeCsvValue(cell)).join(','))
    .join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'employees.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function ListSkeleton() {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <Skeleton width={40} height={12} />
            </th>
            <th>
              <Skeleton width={80} height={12} />
            </th>
            <th>
              <Skeleton width={60} height={12} />
            </th>
            <th>
              <Skeleton width={60} height={12} />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td>
                <Skeleton width={40} height={12} />
              </td>
              <td>
                <Skeleton width={120} height={12} />
              </td>
              <td>
                <Skeleton width={80} height={12} />
              </td>
              <td>
                <Skeleton width={80} height={12} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function List() {
  const { employees, loading, error, refresh } = useEmployees();
  const [searchInput, setSearchInput] = useState<string>(() => getItem('employee_search_query') ?? '');
  const [searchQuery, setSearchQuery] = useState<string>(searchInput);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setSearchQuery(searchInput);

      const trimmed = searchInput.trim();
      if (trimmed) {
        setItem('employee_search_query', trimmed);
      } else {
        removeItem('employee_search_query');
      }
    }, 250);

    return () => window.clearTimeout(handle);
  }, [searchInput]);

  useEffect(() => {
    if (!loading && !error && employees.length > 0) {
      setLastUpdated(new Date().toLocaleString());
    }
  }, [loading, error, employees.length]);

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) {
      return employees;
    }

    const q = searchQuery.trim().toLowerCase();

    return employees.filter((employee) => {
      const nameMatch = employee.name.toLowerCase().includes(q);
      const cityMatch = employee.city.toLowerCase().includes(q);
      return nameMatch || cityMatch;
    });
  }, [employees, searchQuery]);

  const handleRowClick = (employeeId: string) => {
    navigate(`/details/${employeeId}`);
  };

  const handleGoToChart = () => {
    navigate('/chart');
  };

  const handleGoToMap = () => {
    navigate('/map');
  };

  return (
    <section className="list-page">
      <div className="list-header">
        <div>
          <h1 className="list-title">
            Employee List
            {filteredEmployees.length > 0 && ` (${filteredEmployees.length})`}
          </h1>
          {lastUpdated && <div className="text-sm text-muted mt-sm">Last updated: {lastUpdated}</div>}
        </div>
        <div className="list-controls">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or city"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleExportCsv(employees)}
            disabled={employees.length === 0}
          >
            Export CSV
          </button>
          <button type="button" className="btn btn-primary" onClick={handleGoToChart}>
            View Chart
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleGoToMap}>
            View Map
          </button>
        </div>
      </div>

      {loading && <ListSkeleton />}

      {error && (
        <div className="error">
          <div>{error}</div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={refresh}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && filteredEmployees.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-title">No employees found</div>
          <div className="empty-state-description">Try adjusting your search criteria</div>
        </div>
      )}

      {!loading && !error && filteredEmployees.length > 0 && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Salary</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  onClick={() => handleRowClick(employee.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{formatSalary(employee.salary)}</td>
                  <td><span className="badge">{employee.city}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
