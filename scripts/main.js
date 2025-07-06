


document.addEventListener('DOMContentLoaded' , async () => {
  
  try {

    const response = await fetch("https://ecommerce-backend-production-cce0.up.railway.app/products/getall" , {
      method : 'GET',
      credentials :"include"
    })

    if(response.ok){
      let result = await response.json()
      console.log(result)
      result.data.forEach(product => {
        document.getElementById("Explore-container").appendChild(window.productCard(product));
      });
    }
  }
  catch(err){
    console.log(err)
  }

  try {
    const response = await fetch("https://ecommerce-backend-production-cce0.up.railway.app/products/gettopphone", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      let result = await response.json();
      console.log(result);
      result.data.forEach((product) => {
        document
          .getElementById("Topphone-container")
          .appendChild(window.productCard(product));
      });
    }
  }
  catch(err){
    console.log(err)
  }

  try {
    const response = await fetch("https://ecommerce-backend-production-cce0.up.railway.app/products/getlowercomputer", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      let result = await response.json();
      console.log(result);
      result.data.forEach((product) => {
        document
          .getElementById("lowercomputer-container")
          .appendChild(window.productCard(product));
      });
    }
  } catch (err) {
    console.log(err);
  }

})

function scrollLeft() {
  document.getElementById("category-container").scrollBy({
    left: -500,
    behavior: "smooth",
  });
}
window.scrollL = scrollLeft;

function scrollRight() {
  document.getElementById("category-container").scrollBy({
    left: 500,
    behavior: "smooth",
  });
}

window.scrollRight = scrollRight;