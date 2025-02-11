const API_URL = "https://script.google.com/macros/s/AKfycbwdZaF6qaA3HrAoCZ-BZ8_apxwva0yhyy_wCVQQhspVX9Gos83P_jbzUvilnB5Mn2JvMw/exec"; 

async function fetchLeaderboard(tabName) {
    let url = `${API_URL}?tab=${encodeURIComponent(tabName)}`;

    try {
        let response = await fetch(url, { 
            method: "GET",
            headers: { "Cache-Control": "no-cache" }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let textData = await response.text(); // Capture raw response
        console.log("Raw API Response:", textData); // Log response to DevTools

        let data = JSON.parse(textData); // Parse JSON manually
        console.log("Parsed JSON Data:", data); // Log final parsed data

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

// Auto-load leaderboard based on URL parameter
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab") || "S4 OVERVIEW";  // Default to Overview
    fetchLeaderboard(tab);
});
 
