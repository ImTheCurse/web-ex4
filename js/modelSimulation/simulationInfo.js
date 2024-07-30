export function loadSimName() {
    const titleName = sessionStorage.getItem('model-name');
    const date = sessionStorage.getItem('model-date');
    const fullTitle = titleName + `, ${date}`;
    const contentArea = document.getElementById('simulation-area');
    const titleElem = document.createElement('h2');
    titleElem.textContent = fullTitle;
    contentArea.insertBefore(titleElem, contentArea.firstChild);

}
