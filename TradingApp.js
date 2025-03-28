//I have set the first opening price of bytecoin as 1000 usd
let byteCoinPrice = 1000;
let balance = 0, wallet = 5500, lastBought = 0, lastSold = 0, boughtPrice = 0, soldPrice = 0;


//this function is made so it updates the value every 3 seconds so it looks like real world stock market data
setInterval(() => {
    byteCoinPrice = parseFloat((byteCoinPrice + (Math.random() * 50 - 25)).toFixed(2));
    document.getElementById("price").innerText = `ByteCoin Price: $${byteCoinPrice}`;
}, 1000);

//this function updates the balance, wallet, lastBought, lastSold, boughtPrice, soldPrice and updates the display
function updateDisplay() {
    document.getElementById("balance").innerText = `Balance: ${balance.toFixed(4)} BYTC`;
    document.getElementById("wallet").innerText = `Wallet: $${wallet.toFixed(2)}`;
    document.getElementById("lastBought").innerText = `Last Bought: ${lastBought} BYTC at $${boughtPrice}`;
    document.getElementById("lastSold").innerText = `Last Sold: ${lastSold} BYTC at $${soldPrice}`;
}


//this function shows the happy or sad dog image :D
function showTransactionImage(type, duration) {
    let img = document.getElementById(type === "buy" ? "buyImage" : "sellImage");
    img.style.display = "block";
    setTimeout(() => img.style.display = "none", duration);
}


//this function has logic the buy button
document.getElementById("buyBtn").onclick = () => {
    let amount = parseFloat(document.getElementById("amount").value);
    if (amount > 0 && wallet >= amount * byteCoinPrice) {
        balance += amount;
        wallet -= amount * byteCoinPrice;
        lastBought = amount; boughtPrice = byteCoinPrice;
        byteCoinPrice = parseFloat((byteCoinPrice + Math.random() * 5).toFixed(2));
        updateDisplay();
        showTransactionImage("buy", 3000); // Show buy image for 3 seconds
    } else alert("Not enough funds!");
};


//this function has logic for the sell button
document.getElementById("sellBtn").onclick = () => {
    let amount = parseFloat(document.getElementById("amount").value);
    if (amount > 0 && balance >= amount) {
        balance -= amount;
        wallet += amount * byteCoinPrice;
        lastSold = amount; soldPrice = byteCoinPrice;
        byteCoinPrice = parseFloat((byteCoinPrice - Math.random() * 5).toFixed(2));
        updateDisplay();
        showTransactionImage("sell", 2000); // Show sell image for 2 seconds
    } else alert("Not enough BYTC!");
};

function closePopup() {
    const qrContainer = document.querySelector('.qr-code-container');
    if (qrContainer) {
        qrContainer.style.display = 'none';
    }
}

document.getElementById("toggleDarkMode").onclick = () => document.body.classList.toggle("dark-mode");

updateDisplay();
