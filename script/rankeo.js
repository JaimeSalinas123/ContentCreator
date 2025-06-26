document.addEventListener('DOMContentLoaded', function() {
    const rankeojs = document.querySelector('.rankeojs');
    const players = [
        { name: "꧁爪卂ㄒㄒ卄乇山꧂ ", points: 7 },
        { name: "kathe 🤡🐶 · ", points: 2 },
        { name: "elbauser", points: 2 },
        { name: "𝐴.𝑙𝑜𝑝𝑒𝑧∛", points: 5 },
        { name: "eliza2004", points: 4 },
        { name: "loghairmark", points: 3 },
        { name: "Enrique Oseguedx", points: 1 },
        { name: "&", points: 0 },
        { name: "&", points: 0 },
        { name: "&", points: 0 }
    ];
    
    function showRanking() {
        const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
        
        let rankingHTML = `
            <h2 class="ranking-title">ChorgeAmikos</h2>
            <h3 class="ranking-subtitle">Rankeds</h3>
            <div class="ranking-list">
        `;
        
        sortedPlayers.forEach((player, index) => {
            let positionClass = '';
            if (index === 0) positionClass = 'first-place';
            else if (index === 1) positionClass = 'second-place';
            else if (index === 2) positionClass = 'third-place';
            
            rankingHTML += `
                <div class="player-rank ${positionClass}">
                    <div class="player-position">
                        ${index < 3 ? ['🥇', '🥈', '🥉'][index] : ''}
                        <span>${index + 1}°</span>
                    </div>
                    <div class="player-name">${player.name}</div>
                    <div class="player-points">${player.points} pts</div>
                </div>
            `;
        });
        
        rankingHTML += `</div>`;
        rankeojs.innerHTML = rankingHTML;
    }
    
    showRanking();
    setInterval(showRanking, 5000);
});
