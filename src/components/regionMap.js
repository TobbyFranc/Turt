// regionMap.js
import countryMap from "./countryMap";
import tribeMap from "./tribeMap";

const regionMap = {
  ...countryMap,
  ...tribeMap,
};

export default regionMap;
