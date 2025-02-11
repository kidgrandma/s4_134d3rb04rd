const API_URL = "https://script.google.com/macros/s/AKfycbzq90skfdMkf--1W6aRkPDRM8sPyDU38P9A1naRC78fugh04yoLz0wDG1md5m4ybugleg/exec";

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
