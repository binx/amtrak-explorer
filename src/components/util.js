import { extent } from "d3-array";

export const getScaleInfo = (visType, routes) => {
  const typeExtent = extent(routes, d => d[visType]);
  let scale;

  if (visType === "passengers" || visType === "weekly_trips")
    scale = "scaleLog";
  else if (visType === "normalized")
    scale = "scaleLinear";

  return {
    scaleType: scale,
    extent: typeExtent,
    // colorRange: ["#6495ED", "#DE3163"]
    colorRange: ["#2425ED", "#DE3163"]
  };
}