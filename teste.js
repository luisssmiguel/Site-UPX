document.addEventListener("DOMContentLoaded", function () {
    const energyConsumedElem = document.getElementById('energyConsumed');
    const wasteCollectedElem = document.getElementById('wasteCollected');
    const energyCostElem = document.getElementById('energyCost');

    // Inicializar dados acumulados
    let totalEnergyAccumulated = 0;
    let totalCostAccumulated = 0;

    // Carregar dados do localStorage
    const storedEnergyConsumed = localStorage.getItem('totalEnergia');
    const storedEnergyCost = localStorage.getItem('custoTotal');

    if (storedEnergyConsumed && storedEnergyCost) {
        totalEnergyAccumulated += parseFloat(storedEnergyConsumed);
        totalCostAccumulated += parseFloat(storedEnergyCost);
        energyConsumedElem.textContent = `Energia Consumida: ${totalEnergyAccumulated.toFixed(2)} kWh`;
        energyCostElem.textContent = `Custo de Energia: R$${totalCostAccumulated.toFixed(2)}`;
    } else {
        energyConsumedElem.textContent = 'Energia Consumida: 0 kWh';
        energyCostElem.textContent = 'Custo de Energia: R$0.00';
    }

    // Carregar dados da MockAPI
    fetch('https://6651ef0620f4f4c4427932b2.mockapi.io/energia/energia')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados da API.');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                totalEnergyAccumulated += parseFloat(item.totalEnergia);
                totalCostAccumulated += parseFloat(item.custoTotal);
            });

            energyConsumedElem.textContent = `Energia Consumida: ${totalEnergyAccumulated.toFixed(2)} kWh`;
            energyCostElem.textContent = `Custo de Energia: R$${totalCostAccumulated.toFixed(2)}`;
        })
        .catch(error => {
            console.error('Erro ao carregar os dados da API:', error.message);
        });

    // Carregar dados de resíduos e energia da API
    fetch('https://662d5880a7dda1fa378a6de6.mockapi.io/codetech/Descarte')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados de descarte.');
            }
            return response.json();
        })
        .then(data => {
            const energyData = [];
            const wasteData = [];

            data.forEach(item => {
                energyData.push(parseInt(item.recycled, 10)); // Assumindo que 'recycled' se refere à energia consumida
                wasteData.push(parseInt(item.trash, 10) + parseInt(item.recycled, 10)); // Somando lixo reciclado e normal
            });

            // Atualizar valores de exemplo
            const totalEnergy = energyData.reduce((a, b) => a + b, 0);
            const totalWaste = wasteData.reduce((a, b) => a + b, 0);

            wasteCollectedElem.textContent = `Resíduos Coletados: ${totalWaste} kg`;

            // Atualizar gráficos
            updateProgressChart(totalEnergy);
            updateEnergyChart(energyData);
            updateWasteChart(wasteData);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados de descarte:', error.message);
        });

    // Funções para atualizar os gráficos
    function updateProgressChart(totalEnergy) {
        const progressCtx = document.getElementById('progressChart').getContext('2d');
        new Chart(progressCtx, {
            type: 'doughnut',
            data: {
                labels: ['Energia Consumida', 'Meta Restante'],
                datasets: [{
                    data: [totalEnergy, 1000 - totalEnergy],
                    backgroundColor: ['#007bff', '#e9f2fd']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function updateEnergyChart(energyData) {
        const energyCtx = document.getElementById('energyChart').getContext('2d');
        new Chart(energyCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Aug', 'Set', 'Out', 'Nov', 'Dez'],
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
    }

    function updateWasteChart(wasteData) {
        const wasteCtx = document.getElementById('wasteChart').getContext('2d');
        new Chart(wasteCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Aug', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Resíduos Coletados (kg)',
                    data: wasteData,
                    backgroundColor: '#007bff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
    }

    // Carregar o próximo evento ao carregar a página
    loadNextEvent();

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
});
