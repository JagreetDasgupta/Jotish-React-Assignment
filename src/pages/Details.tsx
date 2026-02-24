import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import { Skeleton } from '../components/Skeleton';
import { getItem, setItem } from '../utils/storage';

type RouteParams = {
  id: string;
};

function formatSalary(value: number): string {
  if (!Number.isFinite(value)) {
    return '₹0';
  }

  return `₹${value.toLocaleString('en-IN')}`;
}

export function Details() {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const { employees, loading, error, refresh } = useEmployees();

  const effectiveId = id ?? getItem('last_viewed_employee_id') ?? undefined;

  const employee = useMemo(
    () => employees.find((item) => String(item.id) === String(effectiveId ?? '')),
    [employees, effectiveId],
  );

  useEffect(() => {
    if (employee) {
      setItem('last_viewed_employee_id', String(employee.id));
    }
  }, [employee]);

  const handleBack = () => {
    navigate('/list');
  };

  const handleCapturePhoto = () => {
    if (!id) {
      navigate('/photo');
      return;
    }

    navigate('/photo', { state: { employeeId: id } });
  };

  return (
    <section className="details-page">
      <div className="details-header">
        <div>
          <h1 className="details-title">Employee Details</h1>
          {employee && <p className="details-subtitle">Viewing information for {employee.name}</p>}
        </div>
        <div className="details-actions">
          <button type="button" className="btn btn-primary" onClick={handleCapturePhoto}>
            Capture Photo
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleBack}>
            Back to List
          </button>
        </div>
      </div>

      {loading && (
        <div className="card">
          <div className="details-grid">
            <div className="details-item">
              <Skeleton height={12} width="60%" />
              <Skeleton height={20} width="80%" className="mt-sm" />
            </div>
            <div className="details-item">
              <Skeleton height={12} width="50%" />
              <Skeleton height={20} width="70%" className="mt-sm" />
            </div>
            <div className="details-item">
              <Skeleton height={12} width="40%" />
              <Skeleton height={20} width="60%" className="mt-sm" />
            </div>
            <div className="details-item">
              <Skeleton height={12} width="45%" />
              <Skeleton height={20} width="65%" className="mt-sm" />
            </div>
          </div>
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

      {!loading && !error && !employee && (
        <div className="empty-state">
          <div className="empty-state-icon">👤</div>
          <div className="empty-state-title">Employee not found</div>
          <div className="empty-state-description">The employee you're looking for doesn't exist</div>
        </div>
      )}

      {!loading && !error && employee && (
        <div className="card">
          <div className="details-grid">
            <div className="details-item">
              <div className="details-label">Employee ID</div>
              <div className="details-value">{employee.id}</div>
            </div>
            <div className="details-item">
              <div className="details-label">Full Name</div>
              <div className="details-value">{employee.name}</div>
            </div>
            <div className="details-item">
              <div className="details-label">Salary</div>
              <div className="details-value">{formatSalary(employee.salary)}</div>
            </div>
            <div className="details-item">
              <div className="details-label">City</div>
              <div className="details-value"><span className="badge">{employee.city}</span></div>
            </div>
            {typeof employee.age === 'number' && !Number.isNaN(employee.age) && (
              <div className="details-item">
                <div className="details-label">Age</div>
                <div className="details-value">{employee.age} years</div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

