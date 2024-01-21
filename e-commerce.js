"use strict";

const readline = require("readline");

function prompt(query) {
  // Pseudo synchronous Behaviour based on Asynchronous behaviour
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
    // reject("I/O error encountered Please restart Application");
  });
}

/**  Data */
const catalogue = [
  {
    name: "Electronics",
    products: [
      ["Smart Tv", "$1500"],
      ["Refrigerator", "$2000"],
      ["Generator", "$1200"],
      ["Electric Iron", "$80"],
      ["Fan", "$60"],
      ["Smart Lock", "$300"],
    ],
    length: 6,
  },
  {
    name: "Fashion",
    products: [
      ["Denin Jeans", "$50"],
      ["Denim Jacket", "$150"],
      ["Tailored Suit", "$800"],
      ["Graphic T-shirt", "$80"],
    ],
  },
  {
    name: "Accessories",
    products: [
      ["Leather Handbag", "$100"],
      ["Designer Sunglasses", "$300"],
      ["Stainless Steel Watch", "$600"],
      ["Silk Scarf", "$30"],
      ["Leather Belt", "$129"],
    ],
  },
  {
    name: "Perfumes",
    products: [
      ["Chanel", "$300"],
      ["Dior", "$250"],
      ["Gucci", "$200"],
      ["Tom Ford", "$400"],
      ["Marc Jacobs", "$180"],
    ],
  },
];
const _categories = ["Electronics", "Fashion", "Accessories", "Perfumes"];
const cart = [];
let order = {};

/**  Functions */
const reset = function () {
  cart.splice(0, cart.length);
  order = {};
};

const showProducts = async function (genre) {
  try {
    let cases = {};
    console.log(`~~~~|INDIGO STORE| CATEGORIES| ${catalogue[genre].name}`);
    console.log(`Select item: `);
    for (let i = 0; i < catalogue[genre].products.length; i++) {
      console.log(
        `${i}- ${catalogue[genre].products[i][0]} #price -- ${catalogue[genre].products[i][1]} `
      );
    }
    catalogue[genre].products.forEach((item, i) => {
      cases[i] = [handleProduct, item];
    });
    let ping = await prompt("Enter: \t");
    // return ping.then(res => res)
    // return catalogue[genre];
    cases[ping][0](cases[ping][1]);
  } catch (error) {
    console.error("Error:", error);
  }
};

async function handleProduct(item) {
  console.log(`~~~~|INDIGO STORE| CATEGORIES| ${item[0]}@ ${item[1]} `);
  console.log(`Great choice! Your selection is Available. Ready to make it yours?
    ${item[0]} for price-${item[1]}\n`);
  let qty = await prompt("Enter quantity: ");
  console.log(`\n0- checkout items only\n1- Add item to cart`);
  let ping = await prompt(`Enter: \t`);

  if (ping == "1") {
    // cart.push(item);
    cart.push([item[0], qty, qty * Number(item[1].replace("$", ""))]); // [ [ 'Smart Tv', '4', 6000 ] ]
    cartDisplay(cart);
  } else {
    cart.push([item[0], qty, qty * Number(item[1].replace("$", ""))]);
    checkout(cart);
  }
}

async function start() {
  try {
    console.log(`
    /************************************************/
    /*****/*****/WELCOME TO INDIGO STORE/*****/*****/
    /************************************************/
    
    Discover a world of quality products, exceptional service, and unbeatable deals.
    Start exploring our curated collection today and make your every purchase a delightful journey.
    Happy shopping!!!!
    
    0- Enter Shipping Address
    1- View Categories
    2- Cancel
    `);

    let ping = await prompt(`Enter: \t`);
    switch (ping) {
      case "0":
        shippingAddress();
        break;
      case "1":
        categories();
        break;
      case "2":
        return;
      default:
        console.log("Option not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//TODO ... CONTINUE HERE

async function shippingAddress() {
  try {
    console.log(`~~~~~|INDIGO STORE| SHIPPING...`);

    console.log(` \nPlease type in your shipping Address `);
    order.shippingAddress = await prompt("Enter: \t");
    console.log(`

    Your shipping Address - ${order.shippingAddress}*
    \n0- Proceed to Categories\n1- Cancel Application\n2- Continue `);

    let ping = await prompt("Enter: \t"); // handle Progress.
    switch (ping) {
      case "0":
        categories();
        break;
      case "1":
        return;
      case "2":
        if(cart.length){
          payment();
        }else{
          categories();
        }
        break;
      default:
        console.log("Option not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function categories() {
  try {
    console.log(`~~~~|INDIGO STORE| CATEGORIES`);
    console.log(`Please enter a section`);
    for (let i = 0; i < _categories.length; i++) {
      console.log(`${i}- ${_categories[i]}`);
    }
    let ping = await prompt("\nEnter: \t");
    // console.log(ping);
    switch (ping) {
      case "0":
        showProducts(Number(ping));
        break;
      case "1":
        showProducts(Number(ping));
        break;
      case "2":
        showProducts(Number(ping));
        break;
      case "3":
        showProducts(Number(ping));
        break;
      default:
        console.log("Option not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const cartDisplay = async function (cart = cart) {
  console.log(`~~~~|INDIGO STORE| CART`);
  console.log(
    `Discover more must-have items to elevate your collection and enjoy exclusive deals!!  \n`
  );
  for (let item of cart) {
    console.log(`${item[0]} \tQty: ${item[1]}`);
  }
  console.log(`\n0- Clear Cart\n1- Proceed to checkout\n2- continue shopping `);
  let ping = await prompt("Enter: \t");

  switch (ping) {
    case "0":
      cart.splice(0, cart.length);
      console.log("Cart cleared.");
      categories();
      break;
    case "1":
      checkout();
      break;
    case "2":
      categories();
      break;
    default:
      console.log("Option not found");
  }
};

const checkout = async function (cart = cart) {
  console.log(`~~~~|INDIGO STORE| CHECKOUT`);
  console.log(`Complete your purchase now and indulge in your new favorites.`);
  // cart.
  let tableData = [];
  cart.forEach((object) =>
    tableData.push({ Item: object[0], Quantity: object[1], price: object[2] })
  );
  console.table(tableData);
  let sum = cart.reduce((acc, item) => {
    return acc + item[2];
  }, 0);
  console.log(`Total sum is $${sum}`);
  console.log(`\n0- Enter Shipping Address\n1- Cancel Order`);
  let ping = await prompt("Enter: \t");

  switch (ping) {
    case "0":
      if (!order.shippingAddress) {
        shippingAddress();
      } else {
        payment();
      }
      break;
    case "1":
      // Break loop
      break;
    default:
      console.log("Option not found");
  }
};

const confirmation = function () {
  console.log(`~~~~|INDIGO STORE| CONFIRMATION`);
  order.date = new Date();
  let sum = cart.reduce((acc, item) => {
    return acc + item[2];
  }, 0);
  console.log(`Thank you for choosing INDIGO STORES! We're thrilled to confirm that we have received your order
    and it is currently being processed.

    Order Details:

        Order Number: ${order.code}
        Date: ${order.date}
        Shipping Address: ${order.shippingAddress}
        Payment Status: Paid

    Total Amount: $${sum}

    You will receive a shipping confirmation email with tracking information once your order has been dispatched.

    `);
  reset();
};

async function payment() {
  try {
    console.log(`~~~~|INDIGO STORE| PAYMENT`);
    let rand = Math.random() * 9023;
    console.log(`Generated Indigo Merchant Paycode- ${rand}
  This is a unique paycode linked to your money acc
  Entering means you will be debited,
  Cancel to stop Process
  0- to cancel`);
    let ping = await prompt(`Enter: \t`);

    if (ping == String(rand)) {
      order.code = String(rand);
      confirmation();
    } else if (ping == "0") {
      // End loop;
    } else {
      console.log("Error: Failed to input paycode, process canceled");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

/** Tests */
// shippingAddress()
// start();
// categories();
// cartDisplay(cart)
// checkout(cart)
// confirmation();
// payment()
// start()

start();
