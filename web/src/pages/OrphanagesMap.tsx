import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiPlus } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapIcon from "../utils/mapIcon";
import mapMarkerImg from "../images/map-marker.svg";
import api from "../services/api";

import "../styles/pages/orphanages-map.css";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  // qq tipo de informação manipulada pelo componente
  // sempre que houver uma var que precisa ser alterada...
  // ...pelo prórpio componente, deve ser salva no estado.
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  //oq executar e quando executar
  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);
  // quando as variáveis do vetor mudarem, ele excuta a função

  // passando o vetor vazio [] a função será executada...
  // ...apenas quando o componente for renderizado pela 1ª vez

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Itu</strong>
          <span>São Paulo</span>
          <Link
            to="/"
            className="go-back-button"
            title="Voltar para a tela inicial"
          >
            <FiArrowLeft size={26} color="rgba(0, 0, 0, 0.6)" />
          </Link>
        </footer>
      </aside>

      <Map
        center={[-23.2765732, -47.3014979]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        {/* option 1 */}
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup
                className="map-popup"
                closeButton={false}
                minWidth={240}
                maxWidth={240}
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={28} color="FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
