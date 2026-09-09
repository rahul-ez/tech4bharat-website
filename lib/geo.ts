import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { Feature, Geometry } from "geojson";

import worldCountriesJson from "world-atlas/countries-50m.json";
import worldLandJson from "world-atlas/land-110m.json";

const worldCountries = worldCountriesJson as unknown as Topology;
const worldLand = worldLandJson as unknown as Topology;

/**
 * Server-only geo data extraction — never imported by a "use client"
 * component directly. `world-atlas`'s country-level topology is ~750KB and
 * its land topology is ~55KB; both are read here (at build time, since
 * every page that uses this is statically prerendered) and reduced to the
 * one small `Feature` each caller actually needs before crossing the
 * server/client boundary as a prop. This keeps the raw multi-hundred-KB
 * source files out of the client JS bundle entirely — only the already-
 * extracted India boundary (`getIndiaFeature`) or merged world landmass
 * (`getWorldLandFeature`) is ever serialized to the client.
 *
 * ISO 3166-1 numeric 356 = India, per `world-atlas`'s `countries-50m.json`
 * (confirmed by inspecting the actual data, not assumed from memory).
 */
export function getIndiaFeature(): Feature<Geometry> {
  const countries = feature(worldCountries, worldCountries.objects.countries as GeometryCollection);
  const india = countries.features.find((f) => f.id === "356");
  if (!india) {
    throw new Error("India (ISO 356) not found in world-atlas countries-50m.json");
  }
  return india;
}

/** The merged world landmass, for the GAVS section's zoomed-out globe. */
export function getWorldLandFeature(): Feature<Geometry> {
  return feature(worldLand, worldLand.objects.land as GeometryCollection).features[0];
}
