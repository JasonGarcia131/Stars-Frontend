
//This can be used for pagination with pages.
export const handlePaginate = (buttonId, api, page) => {

    switch(buttonId){
        case "previous" :
            api(page.previous?.page);
            break;
        case "next" : 
            api(page.next?.page);
            break;
    }
}

//Infinite scroll pagination function
export const handleInfiniteScroll = (api, page) => {
    api(page.next?.page);
}
