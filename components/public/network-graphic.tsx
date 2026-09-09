"use client";

import { useMemo } from "react";
import { motion, type Variants } from "motion/react";
import { geoMercator, geoOrthographic } from "d3-geo";
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from "react-simple-maps";
import type { Feature, Geometry } from "geojson";

import { cn } from "@/lib/utils";

/**
 * network-graphic.tsx — two bespoke decorative illustrations for `/about`,
 * per `context/decisions.md` DEC-010: `IndiaNetworkMap` (the "What is
 * Tech4Bharat" section) and `GlobalNetworkGlobe` (the GAVS 2026 section),
 * sharing the same `NetworkDot`/`NetworkArc` visual language — glowing
 * dots connected by curved arcs — at two scales, so the globe reads as a
 * deliberate "zoom out" from the map rather than an unrelated graphic.
 *
 * Both outlines are now real geography, not hand-invented paths (the first
 * version of this file used a freehand-guessed India silhouette, which
 * didn't actually resemble India — replaced per direct correction). The
 * India boundary and world landmass come from `world-atlas`'s TopoJSON,
 * extracted server-side via `lib/geo.ts` (`topojson-client` +
 * `d3-geo`) and passed in as plain `Feature` props — see that file for why
 * the extraction happens server-side rather than importing `world-atlas`'s
 * ~750KB country topology directly into this "use client" file. Rendering
 * itself goes through `react-simple-maps`' actual `ComposableMap`/
 * `Geographies`/`Geography`/`Sphere`/`Graticule` components, not a
 * hand-rolled `<path>`/`<ellipse>` approximation — confirmed by reading
 * react-simple-maps' own source (`node_modules/react-simple-maps/dist/
 * core/index.cjs.js`) rather than assumed from memory: notably, passing a
 * projection *instance* (not a projection name string) to `ComposableMap`
 * bypasses its own translate/rotate/scale wiring entirely, which is
 * required here since neither `.fitSize()` (India) nor `.clipAngle()`
 * (the globe, to hide back-hemisphere geometry) are reachable through its
 * string-based `projectionConfig` prop.
 *
 * The India map's dots sit at real coordinates for Delhi, Mumbai, Kolkata,
 * and Chennai, each arcing to Bengaluru specifically — the one city-level
 * location actually confirmed in `tbd.md` (the grand-finale city) — so
 * Bengaluru is the visual "hub," not an arbitrary choice. No city is
 * labeled with text, and nothing about these cities' role in the
 * hackathon is asserted — this is decorative geography, not a claim of
 * fact. The globe's outer points (London, Dubai, Singapore, Tokyo) are
 * similarly real, unlabeled coordinates chosen only because they're
 * visible from an India-centered orthographic rotation.
 *
 * Entrance is a one-time reveal: an ancestor `motion.div` with
 * `whileInView`/`viewport={{ once: true }}` propagates its "hidden"/"show"
 * state to the graphic wrapper (fade + rise), the dot group (staggered
 * pop-in), and the arc group (staggered fade-in, timed to start after the
 * dots) — the same technique verified for Prize Display's waveform/markers
 * in DEC-009, not independently-observed viewport triggers. Arcs
 * deliberately use an opacity stagger rather than a literal `pathLength`
 * stroke-draw: `pathLength` isn't covered by `MotionConfig`'s
 * `reducedMotion="user"` (which this project relies on for every other
 * continuous/entrance animation), and introducing an uncovered animation
 * type for a purely decorative flourish wasn't judged worth the
 * accessibility risk — see DEC-010.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const graphicRise: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

const dotGroup: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.3, staggerChildren: 0.1 } },
};

const dotPop: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } },
};

const arcGroup: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.75, staggerChildren: 0.12 } },
};

const arcFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

interface Point {
  x: number;
  y: number;
}

function NetworkDot({ point, featured = false }: { point: Point; featured?: boolean }) {
  return (
    <motion.g variants={dotPop}>
      {featured && <circle cx={point.x} cy={point.y} r={9} className="fill-primary/20" />}
      <circle
        cx={point.x}
        cy={point.y}
        r={featured ? 4.5 : 3}
        className={cn(featured ? "fill-primary" : "fill-primary/80")}
        style={featured ? { filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.8))" } : undefined}
      />
    </motion.g>
  );
}

/** A quadratic-bezier arc between two points, bowed outward from the midpoint. */
function NetworkArc({ from, to, bow = 24 }: { from: Point; to: Point; bow?: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow;

  return (
    <motion.path
      variants={arcFade}
      d={`M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`}
      fill="none"
      className="stroke-primary/50"
      strokeWidth={1.25}
      strokeLinecap="round"
    />
  );
}

const MAP_WIDTH = 320;
const MAP_HEIGHT = 380;

/** [longitude, latitude] — real coordinates, not hackathon-specific claims. */
const INDIA_CITY_COORDS = {
  delhi: [77.209, 28.6139] as [number, number],
  kolkata: [88.3639, 22.5726] as [number, number],
  mumbai: [72.8777, 19.076] as [number, number],
  chennai: [80.2707, 13.0827] as [number, number],
  bengaluru: [77.5946, 12.9716] as [number, number],
};

/**
 * The "What is Tech4Bharat" section's India-outline network illustration.
 * Self-contained: owns its own `whileInView` trigger (rather than
 * requiring the page to add one) so `app/about/page.tsx` can stay a
 * server component, matching how `PrizeDisplay` owns its own entrance
 * trigger rather than depending on its page.
 */
export function IndiaNetworkMap({ feature, className }: { feature: Feature<Geometry>; className?: string }) {
  const projection = useMemo(() => geoMercator().fitSize([MAP_WIDTH, MAP_HEIGHT], feature), [feature]);

  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      <motion.div variants={graphicRise} className={cn("mx-auto w-full max-w-sm", className)}>
        <ComposableMap
          projection={projection}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          className="h-auto w-full"
          role="img"
          aria-hidden="true"
        >
          <Geographies geography={[feature]}>
            {({ geographies, projection: activeProjection }) => {
              const cities = Object.fromEntries(
                Object.entries(INDIA_CITY_COORDS).map(([name, coords]) => {
                  const projected = activeProjection(coords);
                  return [name, projected ? { x: projected[0], y: projected[1] } : null];
                })
              ) as Record<keyof typeof INDIA_CITY_COORDS, Point | null>;
              const bengaluru = cities.bengaluru;

              return (
                <>
                  {geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="hsl(var(--primary) / 0.05)"
                      stroke="hsl(var(--border-light))"
                      strokeWidth={1.5}
                    />
                  ))}
                  {bengaluru && (
                    <motion.g variants={arcGroup}>
                      {cities.delhi && <NetworkArc from={cities.delhi} to={bengaluru} bow={-30} />}
                      {cities.kolkata && <NetworkArc from={cities.kolkata} to={bengaluru} bow={26} />}
                      {cities.mumbai && <NetworkArc from={cities.mumbai} to={bengaluru} bow={-18} />}
                      {cities.chennai && <NetworkArc from={cities.chennai} to={bengaluru} bow={14} />}
                    </motion.g>
                  )}
                  <motion.g variants={dotGroup}>
                    {cities.delhi && <NetworkDot point={cities.delhi} />}
                    {cities.kolkata && <NetworkDot point={cities.kolkata} />}
                    {cities.mumbai && <NetworkDot point={cities.mumbai} />}
                    {cities.chennai && <NetworkDot point={cities.chennai} />}
                    {bengaluru && <NetworkDot point={bengaluru} featured />}
                  </motion.g>
                </>
              );
            }}
          </Geographies>
        </ComposableMap>
      </motion.div>
    </motion.div>
  );
}

const GLOBE_SIZE = 320;

/** [longitude, latitude] — real coordinates, chosen only for visibility from an India-centered rotation. */
const GLOBE_OUTER_COORDS: [number, number][] = [
  [-0.1276, 51.5072], // London
  [55.2708, 25.2048], // Dubai
  [103.8198, 1.3521], // Singapore
  [139.6917, 35.6895], // Tokyo
];
const GLOBE_INDIA_COORD: [number, number] = [78.9629, 20.5937];

/**
 * The GAVS section's globe illustration — a "zoomed out" continuation of
 * IndiaNetworkMap's visual system, rendered from the same real-world
 * landmass data (`world-atlas`'s merged land topology) via an orthographic
 * projection rotated to center India. Self-contained; see IndiaNetworkMap.
 */
export function GlobalNetworkGlobe({ landFeature, className }: { landFeature: Feature<Geometry>; className?: string }) {
  const projection = useMemo(
    () =>
      geoOrthographic()
        .rotate([-82, -21, 0])
        .clipAngle(90)
        .scale(150)
        .translate([GLOBE_SIZE / 2, GLOBE_SIZE / 2]),
    []
  );

  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      <motion.div variants={graphicRise} className={cn("mx-auto w-full max-w-sm", className)}>
        <ComposableMap
          projection={projection}
          width={GLOBE_SIZE}
          height={GLOBE_SIZE}
          className="h-auto w-full"
          role="img"
          aria-hidden="true"
        >
          <Sphere id="about-globe-sphere" fill="hsl(var(--primary) / 0.04)" stroke="hsl(var(--border-light))" strokeWidth={1.5} />
          <Graticule stroke="hsl(var(--border-light) / 0.5)" strokeWidth={1} />
          <Geographies geography={[landFeature]}>
            {({ geographies, projection: activeProjection }) => {
              const indiaPoint = activeProjection(GLOBE_INDIA_COORD);
              const outerPoints = GLOBE_OUTER_COORDS.map((coord) => activeProjection(coord)).filter(
                (p): p is [number, number] => p !== null
              );

              return (
                <>
                  {geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="hsl(var(--primary) / 0.06)"
                      stroke="hsl(var(--border-light))"
                      strokeWidth={0.75}
                    />
                  ))}
                  {indiaPoint && (
                    <motion.g variants={arcGroup}>
                      {outerPoints.map(([x, y], i) => (
                        <NetworkArc key={i} from={{ x: indiaPoint[0], y: indiaPoint[1] }} to={{ x, y }} bow={i % 2 === 0 ? -22 : 22} />
                      ))}
                    </motion.g>
                  )}
                  <motion.g variants={dotGroup}>
                    {outerPoints.map(([x, y], i) => (
                      <NetworkDot key={i} point={{ x, y }} />
                    ))}
                    {indiaPoint && <NetworkDot point={{ x: indiaPoint[0], y: indiaPoint[1] }} featured />}
                  </motion.g>
                </>
              );
            }}
          </Geographies>
        </ComposableMap>
      </motion.div>
    </motion.div>
  );
}
