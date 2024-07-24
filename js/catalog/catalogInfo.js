
export function loadToSimulationFromView() {
    if (sessionStorage.getItem('model-available-from-view') !== 'true') {
        return;
    }
    const imgID = sessionStorage.getItem('model-image-id');
    for (let i = 0; i < document.getElementsByClassName('card-body').length; i++) {
        const cardBody = document.getElementsByClassName('card-body')[i];
        const cardContainer = cardBody.parentNode.parentNode;
        const titleSpan = cardBody.getElementsByTagName('span')[0];
        const image = titleSpan.getElementsByTagName('img')[0];
        const imageAlt = image.alt;
        const currentImageID = imageAlt.slice(4);
        if (currentImageID == imgID) {
            const event = new Event('click');
            cardContainer.dispatchEvent(event);
            sessionStorage.removeItem('model-available-from-view');
            sessionStorage.setItem('model-img-id', imgID.toString());
            return;
        }
    }
}

