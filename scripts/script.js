const API_URL = "https://script.google.com/macros/s/AKfycbyF01KhquL62sLqz28iLhNsZaqUYThJD3ExlFOzrw7cY7i7U6BL6IC0YdoZSEYomlY8NQ/exec";  // ✅ Replace with new API URL

async function fetchLeaderboard(tabName) {
    let url = `${API_URL}?tab=${encodeURIComponent(tabName)}`;

    try {
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: { "Cache-Control": "no-cache" }
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        let data = await response.json();
        updateLeaderboardDisplay(tabName, data);
    } catch (error) {
        console.error(`Error fetching leaderboard:`, error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchLeaderboard("S4 OVERVIEW");  // Default Load
});
