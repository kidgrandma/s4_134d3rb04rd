const API_URL = "https://script.google.com/macros/s/AKfycbyFuissvzEjNgDs75ZqtGhWeN5dQkHKq8p_86HAieK0Ur_Fk0Luy1_Ggsa7ELaJyQQVrA/exec";

async function fetchLeaderboard(tabName) {
    let url = `YOUR_DEPLOYMENT_URL?tab=${encodeURIComponent(tabName)}`;

    try {
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",  // ✅ Ensures cross-origin request
            headers: { "Cache-Control": "no-cache" }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let data = await response.json();
        updateLeaderboardDisplay(tabName, data);
    } catch (error) {
        console.error(`Error fetching leaderboard:`, error);
    }
}

function updateLeaderboardDisplay(house, data) {
    let container = document.getElementById("leaderboard");
    container.innerHTML = `<h2>${house === "S4 OVERVIEW" ? "🏆 Overview Leaderboard" : `🏠 ${house} Leaderboard`}</h2>`;

    let table = document.createElement("table");
    table.innerHTML = `<tr>${house === "S4 OVERVIEW" 
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
