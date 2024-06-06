import React, { useEffect, useRef, useState } from "react";
import "./Map.scss";

interface IMap {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  setDistanceInKm: React.Dispatch<React.SetStateAction<number>>;
}

interface IMarker {
  address: string;
  latitude: number;
  longitude: number;
  postalCode?: string; // Make postalCode optional
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;
type GooglePolyline = google.maps.Polyline;

const Map: React.FC<IMap> = ({
  mapType,
  mapTypeControl = false,
  setDistanceInKm,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const [marker, setMarker] = useState<IMarker>();
  const [homeMarker, setHomeMarker] = useState<GoogleMarker>();
  const [googleMarkers, setGoogleMarkers] = useState<GoogleMarker[]>([]);
  const [listenerIdArray, setListenerIdArray] = useState<any[]>([]);
  const [LastLineHook, setLastLineHook] = useState<GooglePolyline>();
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [postalCode, setPostalCode] = useState<string>("");

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    } else {
      const homeLocation = new google.maps.LatLng(52.5121924, -1.7901016);
      setHomeMarker(addHomeMarker(homeLocation));
    }
  };
  useEffect(startMap, [map]);

  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(52.5121924, -1.7901016);
    initMap(4, defaultAddress);
  };

  const initEventListener = (): void => {
    if (map) {
      google.maps.event.addListener(map, "click", function (e: any) {
        coordinateToAddress(e.latLng);
      });
    }
  };
  useEffect(initEventListener, [map]);

  const coordinateToAddress = async (coordinate: GoogleLatLng) => {
    const geocoder = new google.maps.Geocoder();
    await geocoder.geocode(
      { location: coordinate },
      function (results, status) {
        if (status === "OK" && results && results.length > 0) {
          let postalCode: string | undefined;
          if (results[0].address_components) {
            const postalComponent = results[0].address_components.find((component: any) =>
              component.types.includes("postal_code")
            );
            if (postalComponent) {
              const postalCodeDigits = postalComponent.long_name; // Extract only digits
              postalCode =postalCodeDigits;
            }
          }
          // Check if results is not null and has at least one element
          setMarker({
            address: results[0].formatted_address,
            latitude: coordinate.lat(),
            longitude: coordinate.lng(),
            postalCode: postalCode
          });
          localStorage.setItem("pn", results[0].formatted_address);
          localStorage.setItem("lt", coordinate.lat().toString());
          localStorage.setItem("lg", coordinate.lng().toString());
          localStorage.setItem("pc", postalCode!);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  useEffect(() => {
    if (marker) {
      addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
    }
  }, [marker]);

  const addMarker = (location: GoogleLatLng): void => {
    const marker: GoogleMarker = new google.maps.Marker({
      position: location,
      map: map,
      icon: getIconAttributes("#000000"),
    });
    console.log(marker);
    setGoogleMarkers((googleMarkers) => [...googleMarkers, marker]);

    const listenerId = marker.addListener("click", () => {
      const homePos = homeMarker?.getPosition();
      const markerPos = marker.getPosition();
      if (homePos && markerPos) {
        const distanceInMeters =
          google.maps.geometry.spherical.computeDistanceBetween(
            homePos,
            markerPos
          );
        setDistanceInKm(Math.round(distanceInMeters / 1000));

        if (LastLineHook) {
          LastLineHook.setMap(null);
        }

        const line = new google.maps.Polyline({
          path: [
            { lat: homePos.lat(), lng: homePos.lng() },
            { lat: markerPos.lat(), lng: markerPos.lng() },
          ],
          icons: [
            {
              icon: {
                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
              },
              offset: "100%",
            },
          ],
          map: map,
        });

        setLastLineHook(line);
      }
    });

    setListenerIdArray((listenerIdArray) => [...listenerIdArray, listenerId]);
  };

  useEffect(() => {
    listenerIdArray.forEach((listenerId) => {
      google.maps.event.removeListener(listenerId);
    });
    setListenerIdArray([]);
    setGoogleMarkers([]);
    googleMarkers.forEach((googleMarker) => {
      const markerPosition = googleMarker.getPosition();
      if (markerPosition) {
        addMarker(markerPosition);
      }
    });
  }, [LastLineHook]);

  const addHomeMarker = (location: GoogleLatLng): GoogleMarker => {
    const homeMarkerConst: GoogleMarker = new google.maps.Marker({
      position: location,
      map: map,
      icon: {
        url: window.location.origin + "/assets/images/homeAddressMarker.png",
      },
    });

    homeMarkerConst.addListener("click", () => {
      map?.panTo(location);
      map?.setZoom(6);
    });

    return homeMarkerConst;
  };

  const getIconAttributes = (iconColor: string) => {
    return {
      path: "M11.0639 15.3003L26.3642 2.47559e-05L41.6646 15.3003L26.3638 51.3639L11.0639 15.3003 M22,17.5a4.5,4.5 0 1,0 9,0a4.5,4.5 0 1,0 -9,0Z",
      fillColor: iconColor,
      fillOpacity: 0.8,
      strokeColor: "#F4C430",
      strokeWeight: 2,
      anchor: new google.maps.Point(30, 50),
    };
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: mapTypeControl,
          streetViewControl: false,
          rotateControl: false,
          scaleControl: true,
          fullscreenControl: false,
          panControl: false,
          zoomControl: true,
          gestureHandling: "cooperative",
          mapTypeId: mapType,
          draggableCursor: "pointer",
        })
      );
    }
  };

  return (
    <div className="map-container">
      <div ref={ref} className="map-container__map"></div>
    </div>
  );
};

export default Map;
