const API_URL = "https://script.google.com/macros/s/AKfycbzAdfQiumMdWaYhMn9_8cCiTjjSjDiyF_9MB4eiHdwmw6LA4SGSO1AxenyCZxy3YewR/exec"; // Corrected API URL

async function fetchLeaderboard(type, house = null) {
    let sheetName = type === "overview" ? "S4 OVERVIEW" : house;
    let url = `https://script.google.com/macros/s/AKfycbzAdfQiumMdWaYhMn9_8cCiTjjSjDiyF_9MB4eiHdwmw6LA4SGSO1AxenyCZxy3YewR/exec?type=${type}&house=${encodeURIComponent(sheetName)}`;

    try {
        let response = await fetch(url, {
            method: "GET",
            mode: "cors", // <-- Force CORS mode
            headers: { "Cache-Control": "no-cache" }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let data = await response.json();
        console.log("Fetched Data:", data); // Debugging
        updateLeaderboardDisplay(type, data, sheetName);
    } catch (error) {
        console.error(`Error fetching ${type} leaderboard:`, error);
    }
}

function updateLeaderboardDisplay(type, data, house) {
    let containerId = type === "overview" ? "overview-leaderboard" : `${house.toLowerCase().replace(" ", "-")}-leaderboard`;
    let container = document.getElementById(containerId);
    
    if (!container) return;

    // Clear existing data
    container.innerHTML = `<h2>${type === "overview" ? "Overview Leaderboard" : house} Leaderboard</h2>`;

    let table = document.createElement("table");
    table.innerHTML = `<tr>${type === "overview" 
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
