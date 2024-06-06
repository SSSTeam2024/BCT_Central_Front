import img14 from "assets/images/Animation - 1704963653101.gif";
import { addSingleInfoWindow } from "./addSingleInfoWindow";

let shape = {
  coords: [25, 25, 25],
  type: 'poly'
};

const contents = [
  { content: "hello"},
  { content: "There"},
  { content: "Test1"},
  { content: "There"},
  { content: "Test1"},
];


export const addSingleMarkers = ({
    locations,
    map,
  }: {
    locations: ReadonlyArray<google.maps.LatLngLiteral>;
    map: google.maps.Map | null | undefined;
  }) =>
  
    locations.map(({ lat, lng }) => {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        shape: shape,
        icon: 
        img14
      });
      return marker;
    });