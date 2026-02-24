import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEmployees } from '../context/EmployeeContext';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Skeleton } from '../components/Skeleton';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const CITY_COORDINATES: Record<string, [number, number]> = {
  London: [51.5074, -0.1278],
  Tokyo: [35.6762, 139.6503],
  Edinburgh: [55.9533, -3.1883],
  "New York": [40.7128, -74.006],
  "San Francisco": [37.7749, -122.4194],
  Singapore: [1.3521, 103.8198],
  Sidney: [-33.8688, 151.2093],
};

type CityMarker = {
  city: string;
  count: number;
  lat: number;
  lng: number;
};

export function MapView() {
  const { employees, loading, error, refresh } = useEmployees();
  const navigate = useNavigate();

  const markers = useMemo<CityMarker[]>(() => {
    const counts = new Map<string, number>();

    for (const employee of employees) {
      const rawCity = employee.city?.trim();
      if (!rawCity) continue;

      const coords = CITY_COORDINATES[rawCity];
      if (!coords) continue;

      counts.set(rawCity, (counts.get(rawCity) ?? 0) + 1);
    }

    return Array.from(counts.entries()).map(([city, count]) => {
      const coords = CITY_COORDINATES[city];
      return {
        city,
        count,
        lat: coords[0],
        lng: coords[1],
      };
    });
  }, [employees]);

  const handleBack = () => {
    navigate('/list');
  };

  return (
    <section className="map-page">
      <div className="map-header">
        <div>
          <h1 className="map-title">Employee Locations</h1>
          <p className="text-sm text-muted mt-sm">Visualizing employee distribution across cities</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleBack}>
          Back to List
        </button>
      </div>

      {loading && (
        <div className="map-container">
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

      {!loading && !error && markers.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🗺️</div>
          <div className="empty-state-title">No location data</div>
          <div className="empty-state-description">No mappable city data available</div>
        </div>
      )}

      {!loading && !error && markers.length > 0 && (
        <div className="map-container">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            scrollWheelZoom={true}
            className="map-container"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
              {markers.map((marker) => (
                <Marker key={marker.city} position={[marker.lat, marker.lng]}>
                  <Popup>
                    <div style={{ textAlign: 'center', padding: '4px' }}>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                        {marker.city}
                      </strong>
                      <br />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                        Employees: {marker.count}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      )}
    </section>
  );
}

