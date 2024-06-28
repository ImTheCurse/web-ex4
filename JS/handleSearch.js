window.onload = () =>{
    if('true' === sessionStorage.getItem('input-value-available')){
        insertInputData();
    }

}

export function handleSearchFromHome(){
    const HomeSearchBar = document.getElementById('Search-bar-modal');
    sessionStorage.setItem('input-value',HomeSearchBar.value);
    sessionStorage.setItem('input-value-available','true');
    window.location.href = 'catalog.html';

    
}

function insertInputData(){
    const newInputBar = document.getElementById('search_input');
    newInputBar.value = sessionStorage.getItem('input-value');
    newInputBar.focus();
    sessionStorage.removeItem('input-value-available');
    sessionStorage.removeItem('input-value');

}

if(window.location.href == 'http://127.0.0.1:5501/index.html'){
    document.getElementById('search-btn-modal').addEventListener('click',()=>{
    handleSearchFromHome();
})
}

