document.addEventListener("DOMContentLoaded", function () {
    const energyConsumed = document.getElementById('energyConsumed');
    const wasteCollected = document.getElementById('wasteCollected');
    const energyCost = document.getElementById('energyCost');

    // Exemplo de dados
    const energyData = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];
    const wasteData = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

    // Atualizar valores de exemplo
    energyConsumed.textContent = `${energyData.reduce((a, b) => a + b, 0)} kWh`;
    wasteCollected.textContent = `${wasteData.reduce((a, b) => a + b, 0)} kg`;
    energyCost.textContent = `$${(energyData.reduce((a, b) => a + b, 0) * 0.12).toFixed(2)}`;

    // Gráfico de progresso
    const progressCtx = document.getElementById('progressChart').getContext('2d');
    new Chart(progressCtx, {
        type: 'doughnut',
        data: {
            labels: ['Energia Consumida', 'Meta Restante'],
            datasets: [{
                data: [energyData.reduce((a, b) => a + b, 0), 1000 - energyData.reduce((a, b) => a + b, 0)],
                backgroundColor: ['#007bff', '#e9f2fd']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Gráfico de consumo de energia
    const energyCtx = document.getElementById('energyChart').getContext('2d');
    new Chart(energyCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Energia Consumida (kWh)',
                data: energyData,
                borderColor: '#007bff',
                backgroundColor: '#e9f2fd',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2, // Definir a proporção desejada
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Mês'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Energia Consumida (kWh)'
                        }
                    }
                }
            }
        }
    });

    // Gráfico de resíduos coletados
    const wasteCtx = document.getElementById('wasteChart').getContext('2d');
    new Chart(wasteCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Resíduos Coletados (kg)',
                data: wasteData,
                backgroundColor: '#007bff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2, // Definir a proporção desejada
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Mês'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Resíduos Coletados (kg)'
                        }
                    }
                }
            }
        }
    });
});
