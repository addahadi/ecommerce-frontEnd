
function openEditModal() {
  const modal = document.getElementById("editModal");
  const title = document.getElementById("productTitle").textContent;
  const description = document.getElementById("productDescription").textContent;
  const price = document.getElementById("productPrice").textContent;

  document.getElementById("editTitle").value = title;
  document.getElementById("editDescription").value = description.trim();
  document.getElementById("editPrice").value = price;

  modal.style.display = "block";

  modal.onclick = function (event) {
    if (event.target === modal) {
      closeEditModal();
    }
  };
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

async function saveProduct(productId){

    try {
        const EditedTitle = document.getElementById("editTitle").value.trim()
        const EditedDesc = document.getElementById("editDescription").value.trim();
        const EditedPrice = document.getElementById("editPrice").value.trim()

        if(!EditedTitle && !EditedDesc && !EditedPrice) {
          const toast = document.getElementById("toast");
          window.showToast("you need to fill out one of the inputs", toast);
          return 
        }
                
        const requestBody =  {
          EditedDesc,
          EditedTitle,
          EditedPrice,
        }
        const response = await fetch("http://localhost:8090/auth/edit-product" , {
          method : "POST",
          headers : {
            'Content-Type' : ''
          },
          body: JSON.stringify(requestBody)
        }) 
        if(response.ok){
          const toast = document.getElementById("toast")
          window.showToast("successful editing" , toast);
        }
    }
    catch(err){

    }
}



window.openEditModal = openEditModal
window.closeEditModal = closeEditModal
window.saveProduct = saveProduct
