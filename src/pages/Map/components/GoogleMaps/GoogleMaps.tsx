import { useEffect, useRef } from "react";
import { addClusterMarkers, addSingleMarkers } from "./markers";

const DEFAULT_CENTER = { lat: 54.154195, lng: -2.130527 };
const DEFAULT_ZOOM = 5;

export const GoogleMaps = ({
  locations,
  useClusters = true,
  mapId,
  className,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  useClusters?: boolean;
  mapId?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Display the map
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapId,
      });

      // Displays cluster markers or single markers on map when called
      useClusters
        ? addClusterMarkers({ locations, map })
        : addSingleMarkers({ locations, map });
    }
  }, [ref, mapId, locations, useClusters]);

  return (
    <div
      className={className}
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  );
};