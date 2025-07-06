
let pages = 1




async function NextWishListPage(){
    pages += 1
    await fetchWishLists()
}


document.addEventListener("DOMContentLoaded" , async () => {
    await fetchWishLists()
})





async function fetchWishLists() {
    try{
        const response = await fetch(
          `https://ecommerce-backend-production-cce0.up.railway.app/wishlists/getwishlists/${pages}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if(response.ok){
            const result = await response.json()
            console.log(result.data)
            if(result.data.length == 0 ){
                document.getElementById("empty-state").style.display = "block";
                document.getElementById("btn-wishlist-minimal").style.display =
                  "none";
            }
            else {
                showWishLists(result.data)
                document.getElementById("btn-wishlist-minimal").style.display = "block";

            }
        }
    }
    catch(err){
        console.log(err)
    }
}





function showWishLists(data){
    const template = document.getElementById("wishlist-section");
    data.forEach(product => {
        const productRow = window.wishListCard(product)
        template.appendChild(productRow);
    });
}



window.NextWishListPage = NextWishListPage;