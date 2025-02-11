const API_URL = "https://script.google.com/macros/s/AKfycbwOm-gYz6w2owJ2TlzofpcRAKABC_Or_8SVMba7RKxM6mfu9VFyYfxVniBRertThr-XxQ/exec";  // ✅ Replace with new API URL

async function fetchLeaderboard(tabName) {
    let url = `${API_URL}?tab=${encodeURIComponent(tabName)}`;

    try {
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "Cache-Control": "no-cache" }
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        let data = await response.json();
        updateLeaderboardDisplay(tabName, data);
    } catch (error) {
        console.error(`Error fetching leaderboard:`, error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchLeaderboard("S4 OVERVIEW");  // Default Load
});
function updateLeaderboardDisplay(tab, data) {
    let container = document.getElementById("leaderboard");
    container.innerHTML = `<h2>${tab === "S4 OVERVIEW" ? "🏆 Overview Leaderboard" : `🏠 ${tab} Leaderboard`}</h2>`;

    let table = document.createElement("table");
    table.innerHTML = `<tr>${tab === "S4 OVERVIEW"
        ? "<th>Type</th><th>Player Number</th><th>Score</th><th>Weapons</th>"
        : "<th>Type</th><th>Handle</th><th>Team</th><th>Player Number</th><th>Score</th>"}</tr>`;

    data.forEach(row => {
        let tr = document.createElement("tr");
        row.forEach(cell => {
            let td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    container.appendChild(table);
}

// Automatically load based on dropdown selection
document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("house-select");
    select.addEventListener("change", () => {
        let tab = select.value;
        fetchLeaderboard(tab);
    });

    // Default load S4 OVERVIEW
    fetchLeaderboard("S4 OVERVIEW");
});
