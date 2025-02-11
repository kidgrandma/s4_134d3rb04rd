const API_URL = "https://script.google.com/macros/s/AKfycbxZYF13Uq3Pl2FUfuu7K9Uke9QpdLQwSFpJS8LOeQJSQlSqpDt0m_VnoMnVf1poFsEUNQ/exec";

async function fetchLeaderboard() {
    try {
        let response = await fetch(API_URL, {
            method: "GET",
            headers: { "Cache-Control": "no-cache" }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let data = await response.json();
        updateLeaderboardDisplay(data);
    } catch (error) {
        console.error(`Error fetching leaderboard:`, error);
    }
}

function updateLeaderboardDisplay(data) {
    let container = document.getElementById("leaderboard");
    container.innerHTML = `<h2>🏆 S4 Overview Leaderboard</h2>`;

    let table = document.createElement("table");
    table.innerHTML = `<tr><th>Type</th><th>Player Number</th><th>Score</th><th>Weapons</th></tr>`;

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

// Auto-load leaderboard when page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchLeaderboard();
});
