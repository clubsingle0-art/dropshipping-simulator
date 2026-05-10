/* SOUNDS */

const notificationSound = new Audio(
"https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
);

const cashSound = new Audio(
"https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3"
);

/* AUDIO FIX */

let audioUnlocked = false;

function unlockAudio(){

if(audioUnlocked) return;

notificationSound.play()
.then(()=>{

notificationSound.pause();
notificationSound.currentTime = 0;

});

cashSound.play()
.then(()=>{

cashSound.pause();
cashSound.currentTime = 0;

});

audioUnlocked = true;

}

document.body.addEventListener(
"click",
unlockAudio
);

/* GAME */

let game = {

cash:1500,
level:1,
orders:0,
fans:0,
conversion:2.1,
day:1,
launchedProducts:[]

};

/* PRODUCTS */

const products = [

{
name:"LED Cat Lamp",
price:120,
baseProfit:35,
trend:90,
saturation:15,
image:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500"
},

{
name:"Smart Watch",
price:400,
baseProfit:90,
trend:85,
saturation:25,
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
},

{
name:"Gaming Keyboard",
price:250,
baseProfit:70,
trend:70,
saturation:45,
image:"https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500"
},

{
name:"Sneakers",
price:300,
baseProfit:80,
trend:60,
saturation:50,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
}

];

/* UI */

function updateUI(){

document.getElementById("cash").innerText =
"$" + game.cash;

document.getElementById("level").innerText =
game.level;

document.getElementById("orders").innerText =
game.orders;

document.getElementById("fans").innerText =
game.fans;

document.getElementById("conversion").innerText =
game.conversion + "%";

document.getElementById("day").innerText =
game.day;

document.getElementById("progressBar").style.width =
(game.level * 10) + "%";

}

/* PRODUCT STATUS */

function getTrend(trend){

if(trend >= 80){

return `
<p class="trend-high">
🔥 Viral
</p>
`;

}

if(trend >= 50){

return `
<p class="trend-medium">
📈 Trending
</p>
`;

}

return `
<p class="trend-low">
❌ Dead Product
</p>
`;

}

/* RENDER */

function renderProducts(){

const container =
document.getElementById("products");

container.innerHTML = "";

products.forEach((product,index)=>{

const profit =
Math.floor(
product.baseProfit *
(product.trend / 50)
);

const card =
document.createElement("div");

card.className = "product";

card.innerHTML = `

<img src="${product.image}">

<h3>${product.name}</h3>

<p>Price: $${product.price}</p>

${getTrend(product.trend)}

<p>Trend Score: ${product.trend}%</p>

<p>Saturation: ${product.saturation}%</p>

<p>Profit: $${profit}</p>

<button class="launch-btn">
🚀 Launch Product
</button>

`;

container.appendChild(card);

/* BUTTON FIX */

const btn =
card.querySelector(".launch-btn");

btn.addEventListener("click", ()=>{

launchProduct(
product.name,
profit
);

});

});

}

/* LAUNCH */

function launchProduct(name,profit){

if(!game.launchedProducts.includes(name)){

game.launchedProducts.push(name);

}

game.cash += profit;

game.orders += 1;

game.fans +=
Math.floor(Math.random()*10)+2;

game.conversion =
(parseFloat(game.conversion)+0.1).toFixed(1);

showNotification(
`🚀 ${name} launched`
);

playCash();

if(game.orders % 10 === 0){

game.level++;

showNotification(
"🎉 LEVEL UP!"
);

}

updateUI();

saveGame();

checkAchievements();

}

/* NOTIFICATIONS */

function showNotification(text){

const box =
document.createElement("div");

box.className = "notification";

box.innerText = text;

document.getElementById("notifications")
.prepend(box);

notificationSound.currentTime = 0;

notificationSound.play()
.catch(()=>{});

setTimeout(()=>{

box.remove();

},3000);

}

/* CASH SOUND */

function playCash(){

cashSound.currentTime = 0;

cashSound.play()
.catch(()=>{});

}

/* NEXT DAY */

function nextDay(){

game.day++;

products.forEach(product=>{

product.trend +=
Math.floor(Math.random()*21)-10;

if(product.trend > 100){
product.trend = 100;
}

if(product.trend < 5){
product.trend = 5;
}

});

renderProducts();

updateUI();

showNotification(
"🌅 Market Updated"
);

}

/* PAGE */

function showPage(page){

document.getElementById("dashboardPage")
.classList.add("hidden");

document.getElementById("productsPage")
.classList.add("hidden");

document.getElementById("marketingPage")
.classList.add("hidden");

document.getElementById("socialPage")
.classList.add("hidden");

document.getElementById(page)
.classList.remove("hidden");

}

/* MENU */

function toggleMenu(){

document.getElementById("menu")
.classList.toggle("active");

}

/* THEME */

function toggleTheme(){

document.body.classList.toggle("light");

}

/* UPGRADES */

function buyUpgrade(type){

let cost = 0;

if(type === "tiktok") cost = 500;
if(type === "instagram") cost = 1200;
if(type === "facebook") cost = 2000;
if(type === "ai") cost = 5000;

if(game.cash < cost){

showNotification(
"❌ Not Enough Money"
);

return;

}

game.cash -= cost;

if(type === "tiktok"){

game.fans += 50;

showNotification(
"🎵 TikTok Campaign Viral!"
);

}

if(type === "instagram"){

game.conversion =
(parseFloat(game.conversion)+1).toFixed(1);

showNotification(
"📸 Influencer Boosted Sales!"
);

}

if(type === "facebook"){

game.orders += 15;

showNotification(
"📘 Facebook Ads Worked!"
);

}

if(type === "ai"){

showNotification(
"🤖 AI Marketing Enabled!"
);

setInterval(()=>{

const bonus =
Math.floor(Math.random()*300)+100;

game.cash += bonus;

game.orders += 1;

showNotification(
`🤖 AI earned $${bonus}`
);

updateUI();

saveGame();

},10000);

}

updateUI();

saveGame();

}

/* CUSTOMERS */

function fakeCustomers(){

const names = [

"Emma",
"Noah",
"Lucas",
"Sophia",
"Daniel",
"James",
"Olivia",
"Himyaan"

];

setInterval(()=>{

if(game.launchedProducts.length === 0){
return;
}

const customer =
names[
Math.floor(Math.random()*names.length)
];

const productName =
game.launchedProducts[
Math.floor(
Math.random()*game.launchedProducts.length
)
];

const earned =
Math.floor(Math.random()*150)+20;

const p =
document.createElement("p");

p.innerText =
`${customer} bought ${productName} for $${earned}`;

document.getElementById("customers")
.prepend(p);

showNotification(
`🛒 ${customer} bought ${productName}`
);

game.cash += earned;

game.orders += 1;

updateUI();

if(
document.getElementById("customers")
.children.length > 8
){

document.getElementById("customers")
.lastChild.remove();

}

saveGame();

},7000);

}

/* ACHIEVEMENTS */

function checkAchievements(){

const achievements =
document.getElementById("achievements");

if(game.orders >= 10 &&
!document.getElementById("a1")){

achievements.innerHTML +=
`<p id="a1">🏆 First 10 Orders</p>`;

}

if(game.cash >= 5000 &&
!document.getElementById("a2")){

achievements.innerHTML +=
`<p id="a2">💰 Rich Seller</p>`;

}

if(game.level >= 5 &&
!document.getElementById("a3")){

achievements.innerHTML +=
`<p id="a3">🚀 Business Master</p>`;

}

}

/* ADS */

function watchAd(){

showNotification(
"📺 Running Ads..."
);

setTimeout(()=>{

game.cash += 500;

showNotification(
"💵 +$500 Earned"
);

playCash();

updateUI();

saveGame();

},3000);

}

/* SAVE */

function saveGame(){

localStorage.setItem(
"dropEmpireSave",
JSON.stringify(game)
);

}

/* LOAD */

function loadGame(){

const save =
localStorage.getItem("dropEmpireSave");

if(save){

game = JSON.parse(save);

}

}

/* RESET */

function resetGame(){

localStorage.removeItem(
"dropEmpireSave"
);

location.reload();

}

/* START */

loadGame();

updateUI();

renderProducts();

fakeCustomers();

checkAchievements();

showNotification(
"✅ Game Loaded Successfully"
);

/* MARKET CHANGES */

setInterval(()=>{

nextDay();

},15000);
