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

    // Carregar o próximo evento ao carregar a página
    loadNextEvent();
});

// Função para formatar a data
function formatDate(date) {
    var options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
}

// Função para carregar o próximo evento de coleta de resíduos com base na data atual
function loadNextEvent() {
    fetch('https://664552b2b8925626f8918e41.mockapi.io/facens/Calendario')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os eventos.');
            }
            return response.json();
        })
        .then(data => {
            const now = new Date();
            let closestEvent = null;
            let closestEventDate = Infinity;

            // Iterar sobre os eventos para encontrar o mais próximo da data atual
            data.forEach(event => {
                const eventDate = parseDate(event.Data);
                const timeDifference = eventDate.getTime() - now.getTime();
                if (timeDifference > 0 && timeDifference < closestEventDate) {
                    closestEvent = event;
                    closestEventDate = timeDifference;
                }
            });

            // Exibir o próximo evento ou uma mensagem se não houver eventos futuros
            if (closestEvent) {
                const formattedDate = formatDate(closestEvent.Data);
                document.getElementById('nextCollection').innerText = `
                    Tipo de Resíduo: ${closestEvent.TipodeResiduo}
                    Local: ${closestEvent.Local}
                    Início: ${closestEvent.inicio}
                    Fim: ${closestEvent.fim}
                `;
            } else {
                document.getElementById('nextCollection').innerText = 'Nenhuma coleta agendada.';
            }
        })
        .catch(error => {
            console.error('Erro:', error.message);
            document.getElementById('nextCollection').innerText = 'Erro ao carregar a coleta.';
        });
}

// Função para analisar a string de data no formato "23 de maio de 2024" e retornar um objeto Date
function parseDate(dateString) {
    const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const parts = dateString.split(' ');

    if (parts.length !== 5 || parts[1] !== 'de') {
        throw new Error('Formato de data inválido.');
    }

    const day = parseInt(parts[0], 10);

    const monthName = parts[2].toLowerCase();
    const month = months.indexOf(monthName);

    if (month === -1) {
        throw new Error('Mês inválido.');
    }

    const year = parseInt(parts[4], 10);

    return new Date(year, month, day);
}
