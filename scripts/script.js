const API_URL = "https://script.google.com/macros/s/AKfycbxd0BPS-W2FvAaBntg_gM1sRifgsQlvtn0k2lOYNLJct5wqxXwV0Mmz1ylXTcMeKjssgA/exec";

async function fetchLeaderboard() {
    try {
        let response = await fetch(API_URL, { method: "GET", cache: "no-cache" });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        let data = await response.json();
        updateLeaderboard(data);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
    }
}

function updateLeaderboard(data) {
    let tbody = document.querySelector("#leaderboard tbody");
    tbody.innerHTML = "";

    data.forEach(player => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${player["Type"]}</td>
            <td>${player["Handle"]}</td>
            <td>${player["Team"]}</td>
            <td>${player["Weapons"]}</td>
            <td>${player["Player Number"]}</td>
            <td>${player["Score"]}</td>
        `;
        tbody.appendChild(row);
    });
}

// Load data on page load
document.addEventListener("DOMContentLoaded", fetchLeaderboard);
 
