

const listItems = document.querySelectorAll(".sidebar li")
const sectionItems = document.querySelectorAll(" main .card")


let userData = {}
let userId
let page = 1


async function nextPage() {
  page += 1;
  await showProducts();
}



document.addEventListener("DOMContentLoaded" , async () => {
  try {
    const response = await fetch("https://ecommerce-backend-production-cce0.up.railway.app/auth/me" , {
      method:"GET",   
      credentials:"include"
    })
    if(response.ok){
      const  result = await response.json();
      console.log(result);
      if (result) {
        userData = result;
        populateUserInfo(result);
        console.log(result)
        if(result.role == "seller"){
          document.getElementById("seller-section").style.display = "block"
          userId = result.userId
        }
      }
    }
  }
  catch(err){
    console.log(err)
  }
})





function populateUserInfo (data){
  const mapping = {
    "welcom" : data.username,
    "name" : data.username,
    "email" : data.email,
    "phone" : "******",
    "store-name" : data.store_name && data.store_name,
    "store-phone" : data.phone_number && data.phone_number,
    "store-logo" : data.store_logo && data.store_logo
  }

  document.getElementById("total_products").textContent = data.total_products;
  document.getElementById("total_rating").textContent = data.avg_rating;
  document.getElementById("total_views").textContent = data.total_customers_rated;
  for(const Id in mapping){
    const element = document.getElementById(Id)
    console.log(mapping[Id])
    if(element){
      if(Id == "store-logo"){
        console.log(mapping[Id])
        element.src = `https://res.cloudinary.com/duw0bz1md/image/upload/v1720262720/${mapping[Id]}`;
      }
      element.textContent = mapping[Id];
    }
  }
}


listItems.forEach((item) => {
  item.addEventListener("click" , () => {
      listItems.forEach((li) => li.classList.remove("active"));

      item.classList.add("active");    

      sectionItems.forEach((section) => section.style.display = "none");
      const targetId = item.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      
      if(targetSection){
        targetSection.style.display = "block"
      }
  })
})





function showEditPersonalInfo(sectionId , fields) {
  document.getElementById(`${sectionId}-view`).style.display = "none";
  document.getElementById(`${sectionId}-edit`).style.display = "block";

  fields.forEach((field) => {
    const spanContent = document.getElementById(field).textContent || "";
    document.getElementById(`edit-${field}`).value = spanContent;
  })
}

window.showEditPersonalInfo = showEditPersonalInfo;


async function savePersonalInfo( section ,fields , endpoints , url) {

  const formData = new FormData()
  fields.forEach((field , index) => {
    const targetInput = document.getElementById(field)
  
    if (field === "edit-store-logo"){
      formData.append("image" , targetInput.files[0])
      return 
    }

    formData.append(`${endpoints[index]}` ,targetInput.value.trim());

  })

  try {
     
     const response = await fetch(url, {
       method: "POST",
       credentials: "include",
       body: formData,
     });

     
     if(response.ok){
      document.getElementById(`${section}-edit`).style.display = "none";
      document.getElementById(`${section}-view`).style.display = "block";

    }
  }
  catch(err){
    console.log(err)
  }
}

window.savePersonalInfo = savePersonalInfo;

function cancelEdit(section) {
  document.getElementById(`${section}-edit`).style.display = "none";
  document.getElementById(`${section}-view`).style.display = "block";
}

window.cancelEdit = cancelEdit;




document.getElementById("LogOut").addEventListener("click" , async () => {
  try {
    const response = await fetch("https://ecommerce-backend-production-cce0.up.railway.app/auth/logout", {
      method : "GET",
      credentials :"include"
    })
    
    if(response.ok){
      const result = await response.json()
      console.log(result)
      window.location.href = "/main"
    }
    
  }
  catch(err){
    console.log(err)
  }
})


async function showProducts(){
    try {
        const response = await fetch(
          `https://ecommerce-backend-production-cce0.up.railway.app/seller/getproducts/${userId}/${page}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if(response.ok) {
            const result = await response.json();
            const {data} = result;
            if(data.length === 0){
              document.getElementById("empty-product-state").style.display = "block";
              document.getElementById("btn-minimal").style.display = "none"
            }
            else {
              const productContainer = document.getElementById("products-grid");
              data.forEach(product => {
                  const productCard = window.productEditCard(product);
                  productContainer.appendChild(productCard);
              });
              document.getElementById("btn-minimal").style.display = "block";
            }
        }
    }
    catch(err){
        console.error('Error fetching seller products:', err);
    }
}

window.showProducts = showProducts
window.nextPage = nextPage
