const API_URL = "https://script.google.com/macros/s/AKfycbxAuzgY2NvYafArQvz0vUkMjpLzlecsgCbejCIztA0zhxaVwFjgqgshm1KIjnT14TcI/exec"; // Replace with your Google Apps Script Web App URL

async function fetchLeaderboard(type, house = null) {
    let url = `${API_URL}?type=${type}`;
    if (house) url += `&house=${house}`;

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch leaderboard data");

        let data = await response.json();
        updateLeaderboardDisplay(type, data, house);
    } catch (error) {
        console.error(`Error fetching ${type} leaderboard:`, error);
    }
}

function updateLeaderboardDisplay(type, data, house) {
    let containerId = type === "overview" ? "overview-leaderboard" : `house-${house.toLowerCase().replace(" ", "-")}`;
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

// Function to determine which leaderboards to show based on house selection
function loadLeaderboards(house) {
    fetchLeaderboard("overview");
    if (house) fetchLeaderboard("house", house);
}

// Refresh leaderboards every 10 seconds
setInterval(() => {
    const selectedHouse = localStorage.getItem("selectedHouse");
    loadLeaderboards(selectedHouse);
}, 10000);

// House selection logic
document.addEventListener("DOMContentLoaded", () => {
    const houseSelect = document.getElementById("house-select");
    
    if (houseSelect) {
        houseSelect.addEventListener("change", (event) => {
            const house = event.target.value;
            localStorage.setItem("selectedHouse", house);
            loadLeaderboards(house);
        });

        // Load previously selected house
        const savedHouse = localStorage.getItem("selectedHouse");
        if (savedHouse) {
            houseSelect.value = savedHouse;
            loadLeaderboards(savedHouse);
        }
    }
});
