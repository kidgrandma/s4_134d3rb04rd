async function loadOverviewLeaderboard() {
    const response = await fetch('https://script.google.com/macros/s/OVERVIEW_WEB_APP_URL/exec');
    const data = await response.json();

    let overviewHTML = '';
    data.forEach((row, index) => {
        overviewHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${row.name}</td>
                <td>${row.house}</td>
                <td>${row.score}</td>
            </tr>`;
    });

    document.getElementById('overview-leaderboard').innerHTML = overviewHTML;
}

async function loadHouseLeaderboard(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();

    let leaderboardHTML = '';
    data.forEach((row) => {
        leaderboardHTML += `
            <tr>
                <td>${row.type}</td>
                <td>${row.handle}</td>
                <td>${row.team}</td>
                <td>${row.playerNumber}</td>
                <td>${row.rank}</td>
                <td>${row.score}</td>
            </tr>`;
    });

    document.getElementById('leaderboard').innerHTML = leaderboardHTML;
}
