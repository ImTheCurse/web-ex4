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

export function insertInputData(){
    const newInputBar = document.getElementById('search_input');
    newInputBar.value = sessionStorage.getItem('input-value');
    newInputBar.focus();
    sessionStorage.removeItem('input-value-available');
    sessionStorage.removeItem('input-value');

}

if(document.getElementById('search-btn-modal') != null){
    document.getElementById('search-btn-modal').addEventListener('click',()=>{
        handleSearchFromHome();
    })
}


