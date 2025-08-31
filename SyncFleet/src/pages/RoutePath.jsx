import React, { useEffect, useState } from "react";
import { Polyline, Tooltip } from "react-leaflet";
import API from "@/utils/axios.js";
import { DIRECTIONS, GEOCODE } from "../utils/constant.js";

// ...imports unchanged

const RoutePath = ({ source, destination }) => {
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!source || !destination) return;

      setLoading(true);
      try {
        const geocodeOne = (val) => {
          if (
            val &&
            typeof val === "object" &&
            val.lat != null &&
            val.lng != null
          ) {
            return API.get(GEOCODE, { params: { lat: val.lat, lon: val.lng } }); // reverse
          }
          return API.get(GEOCODE, { params: { text: String(val) } }); // forward
        };

        const [srcResp, destResp] = await Promise.all([
          geocodeOne(source),
          geocodeOne(destination),
        ]);
        const src = srcResp.data;
        const dest = destResp.data;

        if (!src?.lat || !src?.lng || !dest?.lat || !dest?.lng) {
          console.error("❌ Geocoding failed", { src, dest });
          setPath([]);
          return;
        }

        // Call backend OSRM proxy with flat params it expects
        const routeResp = await API.get(DIRECTIONS, {
          params: {
            startLat: src.lat,
            startLng: src.lng,
            endLat: dest.lat,
            endLng: dest.lng,
          },
        });

        // Backend returns normalized coordinates for Leaflet
        const coords = routeResp.data?.route || [];
        setPath(coords);
      } catch (err) {
        console.error(
          "❌ Error fetching route:",
          err.response?.data || err.message
        );
        setPath([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [source, destination]);

  if (!source || !destination) return null;

  return (
    <>
      {loading && <div>Loading route...</div>}
      {path.length > 2 && (
        <Polyline positions={path} color="blue" weight={5}>
          <Tooltip sticky>Route Path</Tooltip>
        </Polyline>
      )}
    </>
  );
};

export default RoutePath;
