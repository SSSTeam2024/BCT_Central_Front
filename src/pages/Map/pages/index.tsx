import React from "react";
import {
  GoogleMaps,
  Layout,
} from "../components";
import { GoogleMapsWrapper, LOCATIONS } from "../components/GoogleMaps";

const Map = () => (
  <Layout>
    <GoogleMapsWrapper>
      <GoogleMaps mapId="map_id" locations={LOCATIONS} />
    </GoogleMapsWrapper>
  </Layout>
);

export default Map;