const API_URL = "https://script.google.com/macros/s/AKfycbzq90skfdMkf--1W6aRkPDRM8sPyDU38P9A1naRC78fugh04yoLz0wDG1md5m4ybugleg/exec";

// Function to fetch leaderboard data
async function fetchLeaderboard(tabName) {
    let url = `${API_URL}?tab=${encodeURIComponent(tabName)}`;
    console.log("Fetching leaderboard for:", tabName);

    try {
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "Cache-Control": "no-cache" }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let data = await response.json();
        console.log("Leaderboard data received:", data);
        updateLeaderboardDisplay(tabName, data);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
    }
}

// Function to update leaderboard display
function updateLeaderboardDisplay(tab, data) {
    let container = document.getElementById("leaderboard");
    container.innerHTML = `<h2>${tab === "S4 OVERVIEW" ? "🏆 Overview Leaderboard" : `🏠 ${tab} Leaderboard`}</h2>`;

    let table = document.createElement("table");
    table.innerHTML = `<tr>
        <th>Type</th>
        ${tab === "S4 OVERVIEW" ? "<th>Player Number</th><th>Score</th><th>Weapons</th>" : "<th>Handle</th><th>Team</th><th>Player Number</th><th>Score</th>"}
    </tr>`;

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

// Auto-load leaderboard on page load
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab") || "S4 OVERVIEW";  // Default to Overview
    console.log("Tab detected:", tab);
    fetchLeaderboard(tab);

    // Set interval to auto-refresh leaderboard every 10 seconds
    setInterval(() => {
        console.log("Auto-refreshing leaderboard for:", tab);
        fetchLeaderboard(tab);
    }, 10000);
});

// Dropdown to change leaderboard dynamically
document.getElementById("house-select").addEventListener("change", function() {
    let selectedTab = this.value;
    console.log("Dropdown changed to:", selectedTab);
    fetchLeaderboard(selectedTab);

    // Clear previous interval and start a new one for the selected house
    clearInterval(window.leaderboardInterval);
    window.leaderboardInterval = setInterval(() => {
        console.log("Auto-refreshing leaderboard for:", selectedTab);
        fetchLeaderboard(selectedTab);
    }, 10000);
});
