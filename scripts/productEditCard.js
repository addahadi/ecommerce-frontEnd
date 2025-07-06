const productEditCard = (product) => {
    const card = document.createElement("div")
    card.classList.add("product-card")
    card.setAttribute("id", "productCard");
    card.innerHTML = `
        <div class="profile-product-image">
            <img src="http://localhost:8090/uploads/${product.img_url}" alt="${
      product.title
    }">
        </div>
        <div class="product-content">
            <div class="product-header">
                <h3 class="product-title" id="productTitle">${
                  product.title
                }</h3>
                <div class="product-actions">
                    <button class="action-btn edit-btn" onclick="openEditModal()" title="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteProduct()" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <p class="product-description" id="productDescription">
                ${product.descr.slice(0, 60)}...
            </p>
            
            <div class="product-price" id="productPrice" style="color:#0056c1">${
              product.price
            }$</div>
        </div>
    </div>    
    `;
    return card
}

window.productEditCard = productEditCard;