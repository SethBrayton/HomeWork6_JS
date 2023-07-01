let url = "https://dummyjson.com/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    render(data.products);
  });

let div_wrapper = document.createElement("div");
let div_root = document.querySelector("div");
div_wrapper.className = "product_wrapper";

function render(products) {
  for (let elem of products) {
    let div_product = document.createElement("div");
    let p_price = document.createElement("p");
    let p_title = document.createElement("p");
    let img_product = document.createElement("img");

    div_product.className = "product_elem";
    p_price.innerText = `Price: ${elem.price}$`;
    p_title.innerText = `Title: ${elem.title}`;
    img_product.src = elem.thumbnail;
    img_product.className = "product_image";

    let div_stars = rating(elem.rating); //здесь вызывается колбэк
    div_product.append(img_product, p_title, p_price, div_stars);
    div_wrapper.append(div_product);
  }
  div_root.append(div_wrapper);
}

function rating(n) {
  n = Math.round(n); //округляется до целого числа
  let div_stars = document.createElement("div"); //отдельный див для рейтинга каждого товара
  let stars = ""; //пока пустая переменная для звезд, которая будет заполняться
  for (let i = 0; i < 5; i++) {
    //цикл для каждого товара, звезд макс. 5
    if (i < n) {
      stars += '<span class="fa fa-star active"></span>'; //если счетчик меньше кол-ва звезд, то прибавл. активная звезда
    } else {
      stars += '<span class="fa fa-star"></span>'; //если равно или больше, то неактивная
    }
  }
  div_stars.innerHTML = stars; //переменная со <span> звездами летит в див
  return div_stars; //возвращаем полученный див, чтобы использовать как колбэк в render(products)
}
