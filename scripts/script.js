const API_URL = "https://script.google.com/macros/s/AKfycbzqfFC9WZ86WTZ5HX5IyH5-sdscvnR1yGy1HbhTIhlZw2YhGNOxmpAenEM8NJC7cpc0/exec";

async function fetchLeaderboard(house) {
    let url = `${API_URL}?house=${encodeURIComponent(house)}`;

    try {
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "Cache-Control": "no-cache" }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let data = await response.json();
        updateLeaderboardDisplay(house, data);
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
