const makeProduct = (product) => {
    return `
        <div class="product">
            <img class="product-image" src="${product.thumbnail}" alt="${product.title}">
            <div class="product-info"> 
                <div class="product-header">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-id"> ID: ${product.id}</p>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-pricing">
                    <p class="product-price">Price: $${product.price}</p>
                    <p class="product-discount">${product.discountPercentage}% Off!</p>
                </div>
                <p class="product-rating">Rating: ${product.rating}/5</p>
            </div>
        </div>
    `
}

function showError(message) {
    const result = document.querySelector('#result');
    result.innerHTML = `<div class="error-alert">${message}</div>`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').onsubmit = async function(event){
        event.preventDefault();
        const productId = document.querySelector('#productId').value;
        const isEmpty = productId === "";

        const response = isEmpty ? 
                            await fetch('https://dummyjson.com/products/?limit=10') : 
                            await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        
        if (response.status === 429) {
            showError('Rate limit exceeded. Please wait a moment before trying again.');
            return;
        }
        
        if (!response.ok) {
            showError(data.message || 'An error occurred while fetching the product data.');
            return;
        }
        
        console.log(data);

        const result = document.querySelector('#result');
        result.innerHTML = "";
        
        if (isEmpty) {
            data.products.map(product => {
                result.innerHTML += makeProduct(product);
            })
        } else {
            result.innerHTML = makeProduct(data);
        }
    }
});