const API_URL = "https://script.google.com/macros/s/AKfycbx8EYRig-k1CxlJeSzTHdBI1EVDEBh7vilh9-9cfnD2vp3fzNDqarCM8_nwnyHzb72a2w/exec";

async function fetchLeaderboard(tabName) {
    if (!tabName) {
        console.error("Error: tab is not defined.");
        return;
    }

    let url = `${API_URL}?tab=${encodeURIComponent(tabName)}`;
    console.log("Fetching leaderboard for tab:", tabName); // ✅ Debugging log

    try {
        let response = await fetch(url, {
            method: "GET",
            mode: "cors", // ✅ Ensures cross-origin request
            headers: { "Cache-Control": "no-cache" }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

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

// ✅ Ensure tab is retrieved correctly from the URL
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab") || "S4 OVERVIEW";  // ✅ Default to Overview if no tab is provided
    console.log("Tab detected:", tab); // ✅ Debugging log
    fetchLeaderboard(tab);
});
 
