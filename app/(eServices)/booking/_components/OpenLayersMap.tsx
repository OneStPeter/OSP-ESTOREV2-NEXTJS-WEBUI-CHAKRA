"use client";

import { useEffect, useRef, useState } from "react";
//@ts-ignore
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import Translate from "ol/interaction/Translate";
import Collection from "ol/Collection";

interface Props {
  initial: { lat: number; lng: number };
  onChange: (value: { lat: number; lng: number; address?: string }) => void;
  search?: string;
}

export default function OpenLayersMap({ initial, onChange, search }: Props) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Feature<Point> | null>(null);
  const onChangeRef = useRef(onChange);

  // Status States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const handleReverseGeocode = async (lon: number, lat: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      );
      const data = await res.json();
      onChangeRef.current({
        lat,
        lng: lon,
        address: data?.display_name || `${lat}, ${lon}`,
      });
    } catch {
      onChangeRef.current({ lat, lng: lon });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mapElement.current) return;

    const initialCoords = fromLonLat([initial.lng, initial.lat]);
    const marker = new Feature({ geometry: new Point(initialCoords) });

    marker.setStyle(
      new Style({
        image: new Icon({
          src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          anchor: [0.5, 1],
          scale: 0.07,
        }),
      }),
    );

    const markerSource = new VectorSource({ features: [marker] });
    const markerLayer = new VectorLayer({ source: markerSource });

    const map = new Map({
      target: mapElement.current,
      layers: [new TileLayer({ source: new OSM() }), markerLayer],
      view: new View({ center: initialCoords, zoom: 14 }),
      controls: defaultControls(),
    });

    const translate = new Translate({
      features: new Collection([marker]),
      hitTolerance: 15,
    });

    map.addInteraction(translate);

    translate.on("translateend", (evt) => {
      const geom = (evt.features.item(0) as Feature<Point>).getGeometry();
      if (geom) {
        const [lng, lat] = toLonLat(geom.getCoordinates());
        handleReverseGeocode(lng, lat);
      }
    });

    map.on("singleclick", (evt) => {
      const coords = evt.coordinate;
      marker.getGeometry()?.setCoordinates(coords);
      const [lng, lat] = toLonLat(coords);
      handleReverseGeocode(lng, lat);
    });

    markerRef.current = marker;
    mapRef.current = map;

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
    };
  }, []);

  // --- Search Handling with Loading/Error ---
  useEffect(() => {
    if (!search?.trim()) {
      setError(null);
      return;
    }
    if (!mapRef.current || !markerRef.current) return;

    const controller = new AbortController();

    const fetchCoords = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&limit=1`,
          { signal: controller.signal },
        );
        const data = await res.json();

        if (data && data.length > 0) {
          const { lat, lon, display_name } = data[0];
          const coords = fromLonLat([parseFloat(lon), parseFloat(lat)]);

          markerRef.current?.getGeometry()?.setCoordinates(coords);
          mapRef.current
            ?.getView()
            .animate({ center: coords, zoom: 16, duration: 800 });

          onChangeRef.current({
            lat: parseFloat(lat),
            lng: parseFloat(lon),
            address: display_name,
          });
        } else {
          setError("Location not found");
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Geocode failed", err);
          setError("Search failed. Try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchCoords, 800); // Increased debounce for better UX
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={mapElement}
        style={{
          width: "100%",
          height: "100%",
          touchAction: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      />

      {/* Loading Spinner Overlay */}
      {loading && (
        <div style={overlayStyle}>
          <div className="animate-spin" style={spinnerStyle} />
        </div>
      )}

      {/* Error Message Tooltip */}
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}

// Inline Styles for the Indicators
const overlayStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  zIndex: 1000,
  background: "rgba(255, 255, 255, 0.8)",
  padding: "8px",
  borderRadius: "50%",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
};

const spinnerStyle: React.CSSProperties = {
  width: "20px",
  height: "20px",
  border: "3px solid #f3f3f3",
  borderTop: "3px solid #3498db",
  borderRadius: "50%",
};

const errorStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  background: "#ff4d4d",
  color: "white",
  padding: "8px 16px",
  borderRadius: "4px",
  fontSize: "14px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
};
