document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://script.google.com/macros/s/AKfycbycv_Hy2h7rt3I37rcueIpTbzibDwQpBXEB8Rd02HOPSROeCiykIdc6QHdQrrIvXMrHtQ/exec" 
 
    async function fetchLeaderboard() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            const tbody = document.querySelector("#leaderboard tbody");
            tbody.innerHTML = ""; // Clear the table before updating

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
                    <td class="${playerClass}">${player["Player Number"]}</td>
                    <td>${player["Score"]}</td>
                </tr>`;

                tbody.innerHTML += row;
            });

            console.log("Leaderboard updated at:", new Date().toLocaleTimeString());

        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    }

    // Initial Load
    fetchLeaderboard();

    // Auto-refresh every 30 seconds
    setInterval(fetchLeaderboard, 30000);
});
