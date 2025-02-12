document.addEventListener("DOMContentLoaded", async function () {
   const API_URL = "https://script.google.com/macros/s/AKfycbycv_Hy2h7rt3I37rcueIpTbzibDwQpBXEB8Rd02HOPSROeCiykIdc6QHdQrrIvXMrHtQ/exec";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const tbody = document.querySelector("#leaderboard tbody");
        tbody.innerHTML = ""; // Clear table before updating

        data.forEach(player => {
            // Determine class based on Type
            let playerClass = "";
            if (player["Type"] === "VIRGIN") {
                playerClass = "virgin";
            } else if (player["Type"] === "VETERAN") {
                playerClass = "veteran";
            }

            // Generate table row with the correct class
            let row = `<tr>
                <td class="${playerClass}">${player["Type"]}</td>
                <td class="${playerClass}">${player["Handle"]}</td>
                <td>${player["Team"]}</td>
                <td>${player["Weapons"]}</td>
                <td>${player["Player Number"]}</td>
                <td>${player["Score"]}</td>
            </tr>`;

            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
    }
});
    fetchLeaderboard();
    setInterval(fetchLeaderboard, 30000); // Refresh every 30 sec
;
