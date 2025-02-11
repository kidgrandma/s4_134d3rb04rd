document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://script.google.com/macros/s/AKfycbycv_Hy2h7rt3I37rcueIpTbzibDwQpBXEB8Rd02HOPSROeCiykIdc6QHdQrrIvXMrHtQ/exec";

    async function fetchLeaderboard() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            const tbody = document.querySelector("#leaderboard tbody");
            tbody.innerHTML = "";

            data.forEach(player => {
                let row = `<tr>
                    <td>${player["Type"]}</td>
                    <td>${player["Handle"]}</td>
                    <td>${player["Team"]}</td>
                    <td>${player["Tr"]}</td>
                    <td>${player["Weapons"]}</td>
                    <td>${player["Player Number"]}</td>
                    <td>${player["Score"]}</td>
                </tr>`;
                tbody.innerHTML += row;
            });
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    }

    fetchLeaderboard();
    setInterval(fetchLeaderboard, 30000); // Refresh every 30 sec
});
