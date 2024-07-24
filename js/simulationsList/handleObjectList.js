import { populateSimulationHome } from "./simulationHandlers.js";
import * as header from "../js_header.js";

window.onload = () => {
    populateSimulationHome(1000);
    header.updateHeader();
}
