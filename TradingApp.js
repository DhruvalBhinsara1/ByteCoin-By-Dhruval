let byteCoinPrice = 1000;
let previousPrice = byteCoinPrice; // Store previous price
let balance = 0, wallet = 5500, lastBought = 0, lastSold = 0, boughtPrice = 0, soldPrice = 0;

// Function to update the ByteCoin price every second
setInterval(() => {
    previousPrice = byteCoinPrice; // Store the last price before updating
    byteCoinPrice = parseFloat((byteCoinPrice + (Math.random() * 50 - 25)).toFixed(2));

    let priceElement = document.getElementById("price");
    priceElement.innerText = `ByteCoin Price: $${byteCoinPrice}`;

    // Change text color based on price movement
    if (byteCoinPrice > previousPrice) {
        priceElement.style.color = "lightgreen"; // Price increased
    } else if (byteCoinPrice < previousPrice) {
        priceElement.style.color = "red"; // Price decreased
    } else {
        priceElement.style.color = "white"; // No change
    }
}, 3000);

// Function to update balance, wallet, and last transaction details
function updateDisplay() {
    document.getElementById("balance").innerText = `Balance: ${balance.toFixed(4)} BYTC`;
    document.getElementById("wallet").innerText = `Wallet: $${wallet.toFixed(2)}`;
    document.getElementById("lastBought").innerText = `Last Bought: ${lastBought} BYTC at $${boughtPrice}`;
    document.getElementById("lastSold").innerText = `Last Sold: ${lastSold} BYTC at $${soldPrice}`;
}

// Function to show transaction images
function showTransactionImage(type, duration) {
    let img = document.getElementById(type === "buy" ? "buyImage" : "sellImage");
    img.style.display = "block";
    setTimeout(() => img.style.display = "none", duration);
}

// Buy button logic
document.getElementById("buyBtn").onclick = () => {
    let amount = parseFloat(document.getElementById("amount").value);
    if (amount > 0 && wallet >= amount * byteCoinPrice) {
        balance += amount;
        wallet -= amount * byteCoinPrice;
        lastBought = amount;
        boughtPrice = byteCoinPrice;
        byteCoinPrice = parseFloat((byteCoinPrice + Math.random() * 5).toFixed(2));
        updateDisplay();
        showTransactionImage("buy", 3000);
    } else {
        alert("Not enough funds!");
    }
};

// Sell button logic
document.getElementById("sellBtn").onclick = () => {
    let amount = parseFloat(document.getElementById("amount").value);
    if (amount > 0 && balance >= amount) {
        balance -= amount;
        wallet += amount * byteCoinPrice;
        lastSold = amount;
        soldPrice = byteCoinPrice;
        byteCoinPrice = parseFloat((byteCoinPrice - Math.random() * 5).toFixed(2));
        updateDisplay();
        showTransactionImage("sell", 2000);
    } else {
        alert("Not enough BYTC!");
    }
};

// Function to close the QR popup
function closePopup() {
    const qrContainer = document.querySelector('.qr-code-container');
    if (qrContainer) {
        qrContainer.style.display = 'none';
    }
}

// Dark mode toggle
document.getElementById("toggleDarkMode").onclick = () => {
    document.body.classList.toggle("dark-mode");
};

updateDisplay();
