
let show = (data) => {
  console.log(data);
  document.getElementById("products").innerHTML = "";
  data.map((ele) => {

    let div = document.createElement("div");

    let img = document.createElement("img");
    img.src = ele.image;

    let title = document.createElement("h3");
    title.innerHTML = ele.title;

    let category = document.createElement("p");
    category.innerHTML = ele.category;
    category.setAttribute("class","category")

    let price = document.createElement("p");
    price.innerHTML = `${ele.price * 10}$`;
    category.setAttribute("class","price")

    let btn1 = document.createElement("button");
    btn1.innerHTML = "ADD TO CART";
    btn1.setAttribute("class","btn1 btn btn-primary")

    div.append(img, title, category, price, btn1);
    document.getElementById("products").append(div);

    btn1.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart"))||[];
      let exists = false;
      console.log(cart);
      cart.map((item, index) => {
        if (item.id == ele.id) {
          cart[index].qty += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          exists = true;
        }
      });

      if (!exists) {
        cart.push({ ...ele, qty: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("added to cart");
        window.location.reload();
      }
    });
    
  });
};
let products=[]

document.getElementById("sofa").addEventListener("click", () => {
  let temp = products.filter((val) => val.category == "Sofa")
  show(temp)
})

document.getElementById("furniture").addEventListener("click", () => {
  let temp = products.filter((val) => val.category == "Furniture")
  show(temp)
})

document.getElementById("decor").addEventListener("click", () => {
  let temp = products.filter((val) => val.category == "Decor")
  show(temp)
})

document.getElementById("lth").addEventListener("click", () => {
  products.sort((a, b) => a.price - b.price)
  show(products)
})

document.getElementById("htl").addEventListener("click", () => {

  console.log("clicked");
  products.sort((a, b) => b.price - a.price)
  show(products)
})



fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) =>{products=data,show(data)});