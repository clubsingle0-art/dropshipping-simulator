// ========================================
// MASSIVE DROPSHIPPING SIMULATOR UPDATE
// Like a real simulator game
// ========================================


// ========================================
// PLAYER DATA
// ========================================

let cash = 2500;
let bank = 0;

let xp = 0;
let level = 1;

let day = 1;

let reputation = 50;
let customerSatisfaction = 70;

let employees = 0;

let marketingLevel = 1;
let websiteLevel = 1;
let warehouseLevel = 1;

let totalRevenue = 0;
let totalSpent = 0;
let totalOrders = 0;

let failedOrders = 0;

let currentSeason = "Winter";

let vipCustomers = false;

let storageSpace = 100;

let inventory = {};

let deliverySpeed = 1;

let storeTier = "Starter Store";

let adsUnlocked = false;

let shippingCenter = false;


// ========================================
// PRODUCTS
// ========================================

const products = [

{
name:"LED Cat Lamp",
image:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
cost:8,
sell:25,
demand:75,
competition:20,
shipping:7,
season:"Winter",
stock:50,
trend:"TikTok Viral"
},

{
name:"Portable Fan",
image:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
cost:10,
sell:30,
demand:85,
competition:40,
shipping:8,
season:"Summer",
stock:60,
trend:"Hot Product"
},

{
name:"Mini Projector",
image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
cost:60,
sell:140,
demand:90,
competition:50,
shipping:5,
season:"Winter",
stock:25,
trend:"Exploding"
},

{
name:"Wireless Earbuds",
image:"https://images.unsplash.com/photo-1580894908361-967195033215",
cost:18,
sell:55,
demand:95,
competition:70,
shipping:6,
season:"All",
stock:80,
trend:"Best Seller"
},

{
name:"Luxury Watch",
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30",
cost:70,
sell:180,
demand:78,
competition:45,
shipping:4,
season:"All",
stock:15,
trend:"Luxury"
},

{
name:"Gaming Keyboard",
image:"https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
cost:25,
sell:75,
demand:80,
competition:55,
shipping:5,
season:"All",
stock:40,
trend:"Trending"
}

];


// ========================================
// RANDOM EVENTS
// ========================================

const events = [

{
text:"🔥 Your product went viral on TikTok!",
boost:2
},

{
text:"📦 Supplier delayed shipping!",
boost:0.7
},

{
text:"⭐ Customers love your products!",
boost:1.5
},

{
text:"📉 Ad costs increased today.",
boost:0.8
},

{
text:"🚀 Influencer promoted your store!",
boost:2.3
},

{
text:"💀 Refund wave happened!",
boost:0.5
}

];


// ========================================
// LOAD PRODUCTS INTO SELECT
// ========================================

function populateProducts(){

const select =
document.getElementById("productSelect");

select.innerHTML = "";

products.forEach((p,index)=>{

select.innerHTML +=

`<option value="${index}">
${p.name}
</option>`;

});

}

populateProducts();


// ========================================
// PRODUCT RESEARCH PAGE
// ========================================

function updateResearch(){

const box =
document.getElementById("researchProducts");

box.innerHTML = "";

products.forEach(product=>{

let score =

product.demand

-

product.competition

+

reputation;

box.innerHTML += `

<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>🔥 Trend: ${product.trend}</p>

<p>📈 Demand: ${product.demand}</p>

<p>⚔️ Competition: ${product.competition}%</p>

<p>📦 Stock: ${product.stock}</p>

<p>🚚 Shipping: ${product.shipping} days</p>

<p>💵 Buy Cost: $${product.cost}</p>

<p>💰 Suggested Sell: $${product.sell}</p>

<p>🏆 Product Score: ${score}</p>

</div>

`;

});

}

updateResearch();


// ========================================
// MAIN GAME LOOP
// ========================================

function runDay(){

const product =
products[
document.getElementById("productSelect").value
];

const price =
parseInt(
document.getElementById("priceInput").value
);

const adBudget =
parseInt(
document.getElementById("budgetInput").value
);


// CHECKS

if(isNaN(price)||isNaN(adBudget)){

alert("Enter numbers");

return;

}

if(adBudget > cash){

alert("Not enough money");

return;

}


// SPEND MONEY

cash -= adBudget;

totalSpent += adBudget;


// RANDOM EVENT

const event =
events[
Math.floor(Math.random()*events.length)
];


// DEMAND SYSTEM

let demand =

product.demand

+

(marketingLevel*12)

+

(websiteLevel*8)

+

(reputation/2)

+

(employees*3)

-

product.competition;


// PRICE EFFECT

if(price > product.sell * 1.7){

demand -= 35;

}

if(price < product.sell){

demand += 10;

}


// SEASON SYSTEM

if(product.season === currentSeason){

demand += 20;

}


// EVENT BOOST

demand *= event.boost;


// RANDOM FACTOR

demand += Math.floor(Math.random()*25);


// SALES

let sales = Math.floor(demand/10);


// STOCK LIMIT

if(sales > product.stock){

sales = product.stock;

}


// REMOVE STOCK

product.stock -= sales;


// FAILED ORDERS

let failed = Math.floor(Math.random()*4);

failedOrders += failed;


// PROFITS

let revenue =
sales * price;

let costs =
sales * product.cost;

let refunds =
failed * price;

let taxes =
Math.floor(revenue * 0.08);

let profit =

revenue

-

costs

-

refunds

-

taxes;


// UPDATE MONEY

cash += profit;

bank += Math.floor(profit * 0.15);


// STATS

totalRevenue += revenue;

totalOrders += sales;


// XP

xp += sales * 4;


// LEVEL UP

if(xp >= level * 200){

xp = 0;

level++;

cash += 3000;

alert("🎉 LEVEL UP! +$3000");

}


// REPUTATION

if(profit > 0){

reputation += 2;

customerSatisfaction += 1;

}else{

reputation -= 3;

customerSatisfaction -= 2;

}

if(reputation > 100){

reputation = 100;

}

if(customerSatisfaction > 100){

customerSatisfaction = 100;

}


// EVENT DISPLAY

document.getElementById("events").innerHTML =

`

<div class="eventBox">

${event.text}

</div>

`;


// UPDATE UI

updateUI();

saveGame();


// REPORT

alert(

`📦 Orders: ${sales}

❌ Failed Orders: ${failed}

💰 Revenue: $${revenue}

💸 Profit: $${Math.floor(profit)}

🏦 Bank Earned: $${Math.floor(profit*0.15)}

🧾 Taxes Paid: $${taxes}

⭐ Reputation: ${reputation}

😊 Customer Satisfaction: ${customerSatisfaction}

`

);


// NEXT DAY

day++;


// RESTOCK PRODUCTS

if(day % 5 === 0){

products.forEach(p=>{

p.stock += 20;

});

alert("📦 Supplier restocked products!");

}


// SEASON CHANGE

if(day % 20 === 0){

const seasons =
["Winter","Spring","Summer","Autumn"];

currentSeason =

seasons[
Math.floor(Math.random()*seasons.length)
];

alert(`🌎 Season changed to ${currentSeason}`);

}

}


// ========================================
// UI UPDATE
// ========================================

function updateUI(){

document.getElementById("cash").innerText =
Math.floor(cash);

document.getElementById("bank").innerText =
Math.floor(bank);

document.getElementById("day").innerText =
day;

document.getElementById("orders").innerText =
totalOrders;

document.getElementById("rep").innerText =
reputation;

document.getElementById("level").innerText =
level;

document.getElementById("xp").innerText =
xp;

document.getElementById("revenue").innerText =
Math.floor(totalRevenue);

document.getElementById("spent").innerText =
Math.floor(totalSpent);

document.getElementById("employees").innerText =
employees;

document.getElementById("marketing").innerText =
marketingLevel;

document.getElementById("website").innerText =
websiteLevel;

}


// ========================================
// UPGRADES
// ========================================

function upgradeMarketing(){

if(cash >= 500){

cash -= 500;

marketingLevel++;

alert("📢 Marketing upgraded!");

updateUI();

}

}

function upgradeWebsite(){

if(cash >= 1000){

cash -= 1000;

websiteLevel++;

alert("💻 Website upgraded!");

updateUI();

}

}

function hireEmployee(){

if(cash >= 1200){

cash -= 1200;

employees++;

alert("👨‍💼 Employee hired!");

updateUI();

}

}

function buyWarehouse(){

if(cash >= 4000){

cash -= 4000;

warehouseLevel++;

storageSpace += 100;

alert("🏭 Warehouse upgraded!");

updateUI();

}

}

function unlockVIP(){

if(cash >= 10000){

cash -= 10000;

vipCustomers = true;

alert("💎 VIP Customers unlocked!");

updateUI();

}

}

function unlockAdsAgency(){

if(cash >= 15000){

cash -= 15000;

adsUnlocked = true;

marketingLevel += 5;

alert("📺 Ads Agency unlocked!");

updateUI();

}

}

function upgradeShipping(){

if(cash >= 5000){

cash -= 5000;

deliverySpeed++;

alert("🚚 Shipping upgraded!");

updateUI();

}

}

function buyShippingCenter(){

if(cash >= 25000){

cash -= 25000;

shippingCenter = true;

alert("🏢 Shipping center purchased!");

updateUI();

}

}


// ========================================
// BANK SYSTEM
// ========================================

function depositMoney(){

let amount =
parseInt(prompt("Deposit amount"));

if(amount <= cash){

cash -= amount;

bank += amount;

updateUI();

}

}

function withdrawMoney(){

let amount =
parseInt(prompt("Withdraw amount"));

if(amount <= bank){

bank -= amount;

cash += amount;

updateUI();

}

}


// ========================================
// SAVE SYSTEM
// ========================================

function saveGame(){

const save = {

cash,
bank,
xp,
level,
day,
reputation,
customerSatisfaction,
employees,
marketingLevel,
websiteLevel,
warehouseLevel,
totalRevenue,
totalSpent,
totalOrders,
failedOrders,
vipCustomers,
currentSeason,
products

};

localStorage.setItem(
"dropshipSave",
JSON.stringify(save)
);

}


// ========================================
// LOAD SYSTEM
// ========================================

function loadGame(){

const save =
localStorage.getItem("dropshipSave");

if(save){

const data =
JSON.parse(save);

cash = data.cash || 2500;

bank = data.bank || 0;

xp = data.xp || 0;

level = data.level || 1;

day = data.day || 1;

reputation = data.reputation || 50;

customerSatisfaction =
data.customerSatisfaction || 70;

employees =
data.employees || 0;

marketingLevel =
data.marketingLevel || 1;

websiteLevel =
data.websiteLevel || 1;

warehouseLevel =
data.warehouseLevel || 1;

totalRevenue =
data.totalRevenue || 0;

totalSpent =
data.totalSpent || 0;

totalOrders =
data.totalOrders || 0;

failedOrders =
data.failedOrders || 0;

vipCustomers =
data.vipCustomers || false;

currentSeason =
data.currentSeason || "Winter";

updateUI();

}

}

loadGame();


// ========================================
// RESET GAME
// ========================================

function resetGame(){

localStorage.removeItem(
"dropshipSave"
);

location.reload();

}


// ========================================
// PAGE SWITCHING
// ========================================

function showPage(page){

document.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));

document.getElementById(page)
.classList.add("active");

}


// ========================================
// AUTO SAVE
// ========================================

setInterval(()=>{

saveGame();

},5000);