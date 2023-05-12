

let http = new XMLHttpRequest(); //http-request object.

var page = 1;
http.open('get','objects.json',true); //prepare request with open method

http.send();

http.onload = function() {
    if(this.readyState == 4 && this.status == 200){
      file = this.responseText;  
      let SHOES = JSON.parse(this.responseText);
      // SHOES.sort((a,b) => a.Price - b.Price);
        let output = "";
        for(let item of SHOES){
            output += `
            <div class = "object card">
            <a role ="button" onmouseover = "loadModal(${item.p_id})" data-toggle="modal" data-target="#exampleModal">
            <img src="${item.image}" alt="${item.image}" ></a>
                <p class="Model_Name">${item.Model_Name}</p>
                <p class="Category">${item.Category}</p>
                <p class="price">
                    <span>$</span>
                    <span>${item.Price}</span>
                </p>
                
                <a href = "" class="btn btn-dark addToCart" onclick = "carter(${item.p_id},${item.Price})">Add to Cart</a>
            </div>
            `;
        }
        document.querySelector('.Products').innerHTML = output;
        cat = localStorage.getItem('category');
        if(cat!= null) {
            filter_(cat);
            localStorage.removeItem('category');
        }
    }
}
function sort(type){
  let SHOES = JSON.parse(file);
  if(type.match('Ascending'))
  SHOES.sort((a,b) => a.Price - b.Price);
  else if(type.match('Descending')){
  SHOES.sort((a,b) => b.Price - a.Price);
  }
      let output = "";
      for(let item of SHOES){
          output += `
          <div class = "object card">
          <a role ="button" onmouseover = "loadModal(${item.p_id})" data-toggle="modal" data-target="#exampleModal">
          <img src="${item.image}" alt="${item.image}" ></a>
              <p class="Model_Name">${item.Model_Name}</p>
              <p class="Category">${item.Category}</p>
              <p class="price">
                  <span>$</span>
                  <span>${item.Price}</span>
              </p>
              
              <a href = "" class="btn btn-dark addToCart" onclick = "carter(${item.p_id},${item.Price})" >Add to Cart</a>
          </div>
          `;
      }
      document.querySelector('.Products').innerHTML = output;
      document.getElementById('dropdownMenuButton').textContent = "Sort By : " + type;

}

function filter_(id){
    console.log(id);
        let SHOES = JSON.parse(file);
    //    SHOES.sort((a,b) => a.Price - b.Price);
        let output = "";
        if(!id.match('All'))
        SHOES= SHOES.filter(x => x.Category == id);
        console.log(SHOES);
        let i = 0;
        for(let item of SHOES){
            output += `
            <div class = "object card">
            <a role ="button" onmouseover = "loadModal(${item.p_id})" data-toggle="modal" data-target="#exampleModal">
            <img src="${item.image}" alt="${item.image}" ></a>
                <p class="Model_Name">${item.Model_Name}</p>
                <p class="Category">${item.Category}</p>
                <p class="price">
                    <span>$</span>
                    <span>${item.Price}</span>
                </p>
                
                <a href = "" class="btn btn-dark addToCart" onclick = "carter(${item.p_id},${item.Price})" >Add to Cart</a>
            </div>
            `;
        }
        document.querySelector('.Products').innerHTML = output; 
        document.getElementById('dropdownMenuButton2').textContent = "Filter By : " + id;
}
function carter(id,price){
    console.log('here we are');
    let totalCost = localStorage.getItem('totalCost');
    if(totalCost!=null){
    totalCost = parseInt(totalCost) + parseInt(price);
    }
    else {
        totalCost = price;
    }
    localStorage.setItem('totalCost',totalCost);
    let id_arr = JSON.parse(localStorage.getItem('cartItems'));
    if(id_arr == null){
        arr = [[parseInt(id),1]];
        localStorage.setItem('cartItems',JSON.stringify(arr));
    }
    else{
        var i = 0;
        for(i = 0; i < id_arr.length; i++)
        {
            if(id_arr[i][0] == parseInt(id)){
                id_arr[i][1] += 1;
                break;
            }
        }
        if(i == id_arr.length){
            temp = [id,1];
            id_arr.push(temp);
        }
        localStorage.setItem('cartItems',JSON.stringify(id_arr));
    }
    cartNumbers();
    onLoadCart(); 
    updateCart();
}


function loadModal(product) {
    let SHOES = JSON.parse(file);
    SHOES = SHOES.filter(x => x.p_id == product);
    let output = "";
    let id = 0;
    for(let product of SHOES){
    output += `
  <h5 id="exampleModalLabel" class = "text-center" style = "font-family:'Arima'; font-weight:bolder;">${product.Model_Name}</h5>
  <br>
  <img src = "${product.image}" style = "height:21vw; border-radius:1.30vw; margin-left:auto;margin-right:auto;display:block; box-shadow: 0px 9px 12px #707070;">
  <br> <br>
  <p class="Category text-center" style = "font-family:'Arima'; font-weight:bolder;">Category : ${product.Category}</p>
  <p class="price text-center">
      <span style = "font-family:'Arima'; font-weight:bolder;">Price : $${product.Price}</span>
  </p>
  <p class = "description text-center" style = "font-family: 'Arima'; font-weight:bolder;"> Description: Sizes available - UK 9, 10, 11, 12</p>
  `;
  id = product.p_id;
    }
  document.querySelector('.modal-body').innerHTML = output;

  output = "";
  output += `<button type="button" class="btn btn-dark" style="font-family: 'Arima'; font-weight:bolder;padding-right: 41.5%; padding-left: 41%;" onclick = "carter(${id},${price})">Add to Cart</button>`;
  document.querySelector('.modal-footer').innerHTML = output;
  console.log("settled");
}
