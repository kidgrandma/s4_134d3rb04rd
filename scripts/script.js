const API_URL = "https://script.google.com/macros/s/AKfycbzGeOmzJCi6gj8MfTtrhEBCd-3j1bJqZZ-k_T4bEKntI4lQqtVU_evF4_g6pcIeOiGdmg/exec";

async function fetchLeaderboard(tabName) {
    let url = `${API_URL}?tab=${encodeURIComponent(tabName)}`;

    try {
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "Cache-Control": "no-cache" }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let data = await response.json();
        updateLeaderboardDisplay(tabName, data);
    } catch (error) {
        console.error(`❌ Error fetching leaderboard:`, error);
    }
}

function updateLeaderboardDisplay(tabName, data) {
    let container = document.getElementById("leaderboard");
    container.innerHTML = `<h2>${tabName === "S4 OVERVIEW" ? "🏆 Overview Leaderboard" : `🏠 ${tabName} Leaderboard`}</h2>`;

    let table = document.createElement("table");
    table.innerHTML = `<tr>${tabName === "S4 OVERVIEW" 
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

// Load leaderboard based on URL parameter
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab") || "S4 OVERVIEW"; // Default to Overview
    fetchLeaderboard(tab);
});
