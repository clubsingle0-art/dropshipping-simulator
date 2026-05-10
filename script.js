<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Dropshipping Empire</title>

<link rel="stylesheet" href="style.css">

</head>

<body>

<header>

<h1>📦 Dropshipping Empire</h1>

<p class="subtitle">
Build your online business empire
</p>

<button class="menu-btn" onclick="toggleMenu()">
☰ Menu
</button>

</header>

<!-- SIDE MENU -->

<div class="menu" id="menu">

<h2>Settings</h2>

<button onclick="toggleTheme()">
🌙 Toggle Theme
</button>

<button onclick="saveGame()">
💾 Save Game
</button>

<button onclick="watchAd()">
📺 Watch Ads
</button>

<button onclick="resetGame()">
🗑 Reset Game
</button>

<button onclick="toggleMenu()">
❌ Close
</button>

</div>

<!-- MAIN -->

<div class="container">

<!-- DASHBOARD -->

<div id="dashboardPage">

<div class="card">

<h2>Business Stats</h2>

<div class="stats">

<div class="stat-box">
<h3>Cash</h3>
<p id="cash">$0</p>
</div>

<div class="stat-box">
<h3>Level</h3>
<p id="level">1</p>
</div>

<div class="stat-box">
<h3>Orders</h3>
<p id="orders">0</p>
</div>

<div class="stat-box">
<h3>Fans</h3>
<p id="fans">0</p>
</div>

<div class="stat-box">
<h3>Conversion</h3>
<p id="conversion">0%</p>
</div>

<div class="stat-box">
<h3>Day</h3>
<p id="day">1</p>
</div>

</div>

</div>

<div class="card">

<h2>Store Progress</h2>

<div class="progress">

<div class="progress-bar" id="progressBar"></div>

</div>

</div>

<div class="card">

<h2>Achievements</h2>

<div id="achievements"></div>

</div>

</div>

<!-- PRODUCTS -->

<div id="productsPage" class="hidden">

<div class="card">

<h2>Trending Products</h2>

<div id="products"></div>

</div>

</div>

<!-- MARKETING -->

<div id="marketingPage" class="hidden">

<div class="card">

<h2>Marketing Upgrades</h2>

<button onclick="buyUpgrade('tiktok')">
🎵 TikTok Ads ($500)
</button>

<button onclick="buyUpgrade('instagram')">
📸 Instagram Influencer ($1200)
</button>

<button onclick="buyUpgrade('facebook')">
📘 Facebook Ads ($2000)
</button>

<button onclick="buyUpgrade('ai')">
🤖 AI Marketing ($5000)
</button>

</div>

</div>

<!-- SOCIAL -->

<div id="socialPage" class="hidden">

<div class="card">

<h2>Live Customers</h2>

<div id="customers"></div>

</div>

</div>

</div>

<!-- NOTIFICATIONS -->

<div id="notifications"></div>

<!-- NAVIGATION -->

<div class="bottom-nav">

<button onclick="showPage('dashboardPage')">
🏠
</button>

<button onclick="showPage('productsPage')">
📦
</button>

<button onclick="showPage('marketingPage')">
📢
</button>

<button onclick="showPage('socialPage')">
🌍
</button>

</div>

<script src="script.js"></script>

</body>

</html>
