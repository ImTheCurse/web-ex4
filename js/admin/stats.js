import { checkSessionID } from "../handleCatalogSearch.js";
import { updateHeader } from "../header.js";

window.addEventListener('DOMContentLoaded', () => {
    checkSessionID();
    updateHeader();
});
