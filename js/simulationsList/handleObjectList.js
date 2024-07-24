import { populateSimulationHome } from "./simulationHandlers.js";
import * as header from "../header.js";

window.onload = () => {
    populateSimulationHome(1000);
    header.updateHeader();
}
