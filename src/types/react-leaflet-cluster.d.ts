declare module 'react-leaflet-cluster' {
  import type { FC, ReactNode } from 'react';

  export type MarkerClusterGroupProps = {
    children?: ReactNode;
  };

  const MarkerClusterGroup: FC<MarkerClusterGroupProps>;

  export default MarkerClusterGroup;
}

