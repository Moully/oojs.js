const getAllFood = async () => {
  return await fetch("https://dev-api.mstars.mn/api/foods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

class MENU {
  constructor(category, category_id, image, discount, price, name, stock) {
    this.category = category;
    this.category_id = category_id;
    this.image = image;
    this.discount = discount;
    this.price = price;
    this.name = name;
    this.stock = stock;
  }
  addProduct() {
    this.stock++;
    return true;
  }
  removeProduct() {
    if (this.stock > 0) {
      this.stock--;
      return true;
    }
  }
}

foodData = getAllFood()
  .then((res) => res.json())
  .then((abs) => {
    let utga = abs.data.map((e) => {
      return new MENU(
        e.category,
        e.category_id,
        e.image,
        e.discount,
        e.price,
        e.name,
        e.stock
      );
    });
    generateHTML(utga);
  });

function generateHTML(utga) {
  const foods = document.querySelector(".foods");
  utga.map((e) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    let text = `<img src="https://mtars-fooddelivery.s3.ap-southeast-1.amazonaws.com${
      e.image
    }" alt="" class="mainTag" />
  <div class="badge">${e.discount}</div>
  <h2>${e.name}</h2>
  
  <div class="price">
  <p class=activePrice">${
    e.discount > 0 ? e.price * (1 - e.discount / 100) : e.price
  }</p>
  <p class="finalPrice">${e.price}</p>
  </div>
  
  <div id="${e.name}"> stock: ${e.stock}</div>
  
  <div class="btns">
  <button id="${e.name}-">-</button>
  <button id="${e.name}+">+</button>
  </div>
  `;

    card.innerHTML = text;
    foods.appendChild(card);

    document.getElementById(`${e.name}+`).addEventListener("click", () => {
      e.addProduct();
      document.getElementById(`${e.name}`).innerHTML = `stock: ${e.stock}`;
    });
    document.getElementById(`${e.name}-`).addEventListener("click", () => {
      e.removeProduct();
      document.getElementById(`${e.name}`).innerHTML = `stock: ${e.stock}`;
    });
  });
}

// getAllFood();

//Food class that has properties: category, category_id, image, discount, price, name, stock
//and methods: addProduct, removeProduct

//create an array foods

//call getAllFoods() then create Food objects and push every Food objects to foods array

//Generate HMTL function
