import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./Map.module.css";
import { useContext, useState } from "react";
import { useCities } from "../contexts/CitiesContext";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cities } = useCities();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.cityName}, {city.country}
              {city.emoji}
              <br />
              {city.notes}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
