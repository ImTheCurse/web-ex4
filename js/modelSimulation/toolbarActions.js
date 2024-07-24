
export function ZoomIn() {
    let imgH = document.getElementById("simulation-img");
    imgH.style.transform = "scale(1.5)";
    imgH = imgH.style.transform;
}

export function ZoomOut() {
    let imgH = document.getElementById("simulation-img");
    imgH.style.transform = "scale(0.5)";
}

export function handleDropdownInputs() {
    const inputs = document.getElementById('inputs_area');
    const btn = document.getElementById('sim-btn');
    const sidebar = document.getElementById('sim-sidebar-inputs');
    if (inputs.style.display == 'none' || inputs.style.display == '') {
        inputs.style.display = 'block';
        sidebar.style.height = '500px';
        sidebar.style.marginTop = '-20vh';
    }
    else {
        inputs.style.display = 'none';
        sidebar.style.height = '200px';
    }
}
