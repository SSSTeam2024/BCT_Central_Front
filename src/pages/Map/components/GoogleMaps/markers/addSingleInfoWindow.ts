export const addSingleInfoWindow = ({
    locations,
    map,
  }: {
    locations: ReadonlyArray<google.maps.LatLngLiteral>;
    map: google.maps.Map | null | undefined;
  }) =>
  
    locations.map(({ lat, lng }) => {
      const Infowindow = new google.maps.InfoWindow({
        content: "Add your popup content here"
      });
      return Infowindow;
    });