// --- Casino House and Circulation Logic ---
let houseBalance = 475.0; // House starts with 475 Amina
const totalCoins = 1000.0;
let playerBalance = 10.0; // Give player some starting Amina for demo

// --- Utility Functions ---
function updateBalances() {
    const resultDiv = document.getElementById('result');
    let balanceHtml = `
        <div style="margin-bottom:12px;">
            <strong>House Balance:</strong> ${houseBalance.toFixed(2)} Amina<br>
            <strong>Your Balance:</strong> ${playerBalance.toFixed(2)} Amina<br>
            <strong>Total Coins in Circulation:</strong> ${totalCoins.toFixed(2)} Amina
        </div>
    `;
    resultDiv.innerHTML = balanceHtml;
}

// --- Wallet Connect (placeholder) ---
function connectWallet() {
    alert("Wallet connection coming soon! For now, you have a demo balance.");
    updateBalances();
}

// --- Fractal Betting Prompt ---
function getBetAmount() {
    let bet = prompt(`How much Amina would you like to bet? (You have ${playerBalance.toFixed(2)} Amina)`);
    if (bet === null) return null;
    bet = parseFloat(bet);
    if (isNaN(bet) || bet <= 0) {
        alert("Please enter a valid positive number.");
        return null;
    }
    if (bet > playerBalance) {
        alert("You don't have enough Amina to make that bet.");
        return null;
    }
    return bet;
}

// --- Slot Game Example ---
function playSlot() {
    updateBalances();
    let bet = getBetAmount();
    if (bet === null) return;

    // Example slot odds: 1 in 5 chance to win 4x your bet
    let win = Math.random() < 0.2;
    let payout = win ? bet * 4 : 0;

    // Check house can pay
    if (win && payout > houseBalance) {
        alert("The house can't cover this payout. Try a smaller bet.");
        return;
    }

    let message = "";
    if (win) {
        playerBalance += payout;
        houseBalance -= payout;
        message = `🎉 You WON ${payout.toFixed(2)} Amina!`;
    } else {
        playerBalance -= bet;
        houseBalance += bet;
        message = `😢 You lost ${bet.toFixed(2)} Amina.`;
    }

    updateBalances();
    document.getElementById('result').innerHTML += `<div style="margin-top:14px;">${message}</div>`;
}

// --- Blackjack Example (simplified) ---
function playBlackjack() {
    updateBalances();
    let bet = getBetAmount();
    if (bet === null) return;

    // 45% chance to win 2x bet
    let win = Math.random() < 0.45;
    let payout = win ? bet * 2 : 0;

    if (win && payout > houseBalance) {
        alert("The house can't cover this payout. Try a smaller bet.");
        return;
    }

    let message = "";
    if (win) {
        playerBalance += payout;
        houseBalance -= payout;
        message = `🃏 Blackjack! You WON ${payout.toFixed(2)} Amina!`;
    } else {
        playerBalance -= bet;
        houseBalance += bet;
        message = `😢 Dealer wins. You lost ${bet.toFixed(2)} Amina.`;
    }

    updateBalances();
    document.getElementById('result').innerHTML += `<div style="margin-top:14px;">${message}</div>`;
}

// --- Plinko Example (simplified) ---
function playPlinko() {
    updateBalances();
    let bet = getBetAmount();
    if (bet === null) return;

    // Plinko: 1/10 chance 10x, 2/10 chance 2x, 7/10 lose
    let r = Math.random();
    let payout = 0;
    let message = "";
    if (r < 0.1) {
        payout = bet * 10;
        message = `🌟 Cosmic Plinko JACKPOT! You WON ${payout.toFixed(2)} Amina!`;
    } else if (r < 0.3) {
        payout = bet * 2;
        message = `✨ Plinko win! You WON ${payout.toFixed(2)} Amina!`;
    } else {
        message = `😢 Plinko missed. You lost ${bet.toFixed(2)} Amina.`;
    }

    if (payout > 0 && payout > houseBalance) {
        alert("The house can't cover this payout. Try a smaller bet.");
        return;
    }

    if (payout > 0) {
        playerBalance += payout;
        houseBalance -= payout;
    } else {
        playerBalance -= bet;
        houseBalance += bet;
    }

    updateBalances();
    document.getElementById('result').innerHTML += `<div style="margin-top:14px;">${message}</div>`;
}

// --- On Load ---
window.onload = updateBalances;
