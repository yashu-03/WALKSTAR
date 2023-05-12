
window.onload = function cartAdder() {
   // console.log(Products);
  // console.log(file);
    cart = document.querySelectorAll('.addToCart');
  //  console.log(cart);
    let products = JSON.parse(file);
    for(let i = 0; i < cart.length; i++){
        // cart[i].addEventListener('click', () => {
        //     console.log("Clicked");
        //     var prod = products[i];
        //    console.log(prod);
        //     cartNumbers(prod);
        //     totalCost(prod);
        // });
    }
   onLoadCart();
}

function onLoadCart() {
    let productNumber = JSON.parse(localStorage.getItem('cartItems'));
    document.querySelector('.countItem').textContent = productNumber.length;
}
function cartNumbers(product) {
    let productNumber = localStorage.getItem('cartNumbers');
    if(productNumber != null){
        localStorage.setItem('cartNumbers',parseInt(productNumber)+1);
    }
    else
    localStorage.setItem('cartNumbers',1);   
    document.querySelectorAll('.countItem').textContent = localStorage.getItem('cartNumbers');
}
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost + parseInt(product.Price));
    }
    else
    localStorage.setItem('totalCost',product.Price);

    cartItems(product);
}
onLoadCart();

function cartItems(product) {
    let id_arr = JSON.parse(localStorage.getItem('cartItems'));
    if(id_arr == null){
        arr = [[parseInt(product.p_id),1]];
        localStorage.setItem('cartItems',JSON.stringify(arr));
    }
    else{
        var i = 0;
        for(i = 0; i < id_arr.length; i++)
        {
            if(id_arr[i][0] == parseInt(product.p_id)){
                id_arr[i][1] += 1;
                break;
            }
        }
        if(i == id_arr.length){
            temp = [product.p_id,1];
            id_arr.push(temp);
        }
        localStorage.setItem('cartItems',JSON.stringify(id_arr));
    }
}

