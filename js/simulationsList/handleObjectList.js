import { populateSimulationHome } from "./simulationHandlers.js";
import * as header from "../header.js";
import { checkSessionID } from "../handleCatalogSearch.js";

window.onload = () => {
    populateSimulationHome(1000);
    header.updateHeader();
    checkSessionID();
}
