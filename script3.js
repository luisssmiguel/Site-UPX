document.addEventListener("DOMContentLoaded", function () {
    var currentYearData = {
        labels: JSON.parse(localStorage.getItem('labels')) || [],
        datasets: [{
            label: 'Quantidade de Resíduos Reciclados',
            data: JSON.parse(localStorage.getItem('recycledData')) || [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'Quantidade de Resíduos para o Lixo',
            data: JSON.parse(localStorage.getItem('trashData')) || [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: currentYearData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: true // Manter a proporção de aspecto
        }
    });

    function saveDataToAPI(data) {
        fetch('https://662d5880a7dda1fa378a6de6.mockapi.io/codetech/Descarte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar os dados na API');
            }
            return response.json();
        })
        .then(savedData => {
            console.log('Dados salvos com sucesso:', savedData);
        })
        .catch(error => {
            console.error('Erro ao salvar os dados na API:', error);
        });
    }

    function deleteAllDataFromAPI() {
        fetch('https://662d5880a7dda1fa378a6de6.mockapi.io/codetech/Descarte')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    fetch(`https://662d5880a7dda1fa378a6de6.mockapi.io/codetech/Descarte/${item.id}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao apagar os dados da API');
                        }
                        console.log(`Dados com id ${item.id} apagados com sucesso`);
                    })
                    .catch(error => {
                        console.error('Erro ao apagar os dados da API:', error);
                    });
                });
            })
            .catch(error => {
                console.error('Erro ao obter os dados da API:', error);
            });
    }

    function addData() {
        var month = document.getElementById('month').value;
        var recycledAmount = parseFloat(document.getElementById('recycledAmount').value);
        var trashAmount = parseFloat(document.getElementById('trashAmount').value);

        if (isNaN(recycledAmount) || isNaN(trashAmount)) {
            alert("Por favor, insira números válidos para as quantidades.");
            return;
        }

        var newData = {
            Mes: month,
            Ano: new Date().getFullYear(),
            KilosReciclados: recycledAmount,
            KilosDescartados: trashAmount
        };

        myChart.data.labels.push(month);
        myChart.data.datasets[0].data.push(recycledAmount);
        myChart.data.datasets[1].data.push(trashAmount);
        
        // Salvar os dados no localStorage
        localStorage.setItem('labels', JSON.stringify(myChart.data.labels));
        localStorage.setItem('recycledData', JSON.stringify(myChart.data.datasets[0].data));
        localStorage.setItem('trashData', JSON.stringify(myChart.data.datasets[1].data));

        // Salvar os dados na API
        saveDataToAPI(newData);

        myChart.update();
    }

    document.getElementById('addDataBtn').addEventListener('click', addData);

    // Função para abrir o modal ao clicar no botão "Adicionar Mais"
    var addMoreDataBtn = document.getElementById('addMoreDataBtn');
    addMoreDataBtn.addEventListener('click', function() {
        document.getElementById('myModal').style.display = "block";
    });

    // Função para fechar o modal ao clicar no botão fechar (X)
    document.getElementsByClassName("close")[0].addEventListener('click', function() {
        document.getElementById('myModal').style.display = "none";
    });

    // Função para salvar os novos dados inseridos no modal
    document.getElementById('saveNewDataBtn').addEventListener('click', function() {
        var newMonth = document.getElementById('newMonth').value;
        var newRecycledAmount = parseFloat(document.getElementById('newRecycledAmount').value);
        var newTrashAmount = parseFloat(document.getElementById('newTrashAmount').value);

        if (isNaN(newRecycledAmount) || isNaN(newTrashAmount)) {
            alert("Por favor, insira números válidos para as quantidades.");
            return;
        }

        var newData = {
            Mes: newMonth,
            Ano: new Date().getFullYear(),
            KilosReciclados: newRecycledAmount,
            KilosDescartados: newTrashAmount
        };

        myChart.data.labels.push(newMonth);
        myChart.data.datasets[0].data.push(newRecycledAmount);
        myChart.data.datasets[1].data.push(newTrashAmount);
        
        // Salvar os novos dados no localStorage
        localStorage.setItem('labels', JSON.stringify(myChart.data.labels));
        localStorage.setItem('recycledData', JSON.stringify(myChart.data.datasets[0].data));
        localStorage.setItem('trashData', JSON.stringify(myChart.data.datasets[1].data));

        // Salvar os dados na API
        saveDataToAPI(newData);

        myChart.update();

        // Fechar o modal após salvar os dados
        document.getElementById('myModal').style.display = "none";
    });

    // Função para apagar os dados salvos
    var clearDataBtn = document.getElementById('clearDataBtn');
    clearDataBtn.addEventListener('click', function() {
        localStorage.removeItem('labels');
        localStorage.removeItem('recycledData');
        localStorage.removeItem('trashData');
        
        // Limpar os dados do gráfico
        myChart.data.labels = [];
        myChart.data.datasets[0].data = [];
        myChart.data.datasets[1].data = [];

        // Apagar os dados da API
        deleteAllDataFromAPI();

        myChart.update();
    });

    document.getElementById('show2023Btn').addEventListener('click', function() {
        addDataFor2023();

        // Esconder o botão "Apagar Dados" quando visualizando o gráfico de 2023
        clearDataBtn.style.display = 'none';

        // Esconder o botão "Adicionar Mais" quando visualizando o gráfico de 2023
        addMoreDataBtn.style.display = 'none';
    });

    function addDataFor2023() {
        // Dados fixos para 2023 (substitua pelos seus dados reais)
        var recycledData2023 = [55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110];
        var trashData2023 = [35, 40, 30, 45, 40, 35, 50, 45, 55, 50, 65, 60];
        
        // Limpar os dados do gráfico
        myChart.data.labels = [];
        myChart.data.datasets[0].data = [];
        myChart.data.datasets[1].data = [];
        
        // Adicionando os dados de 2023 ao gráfico
        for (var i = 0; i < 12; i++) {
            var month = "";
            switch(i) {
                case 0:
                    month = "Janeiro";
                    break;
                case 1:
                    month = "Fevereiro";
                    break;
                case 2:
                    month = "Março";
                    break;
                case 3:
                    month = "Abril";
                    break;
                case 4:
                    month = "Maio";
                    break;
                case 5:
                    month = "Junho";
                    break;
                case 6:
                    month = "Julho";
                    break;
                case 7:
                    month = "Agosto";
                    break;
                case 8:
                    month = "Setembro";
                    break;
                case 9:
                    month = "Outubro";
                    break;
                case 10:
                    month = "Novembro";
                    break;
                case 11:
                    month = "Dezembro";
                    break;
            }
            myChart.data.labels.push(month);
            myChart.data.datasets[0].data.push(recycledData2023[i]);
            myChart.data.datasets[1].data.push(trashData2023[i]);
        }
        
        myChart.update(); // Atualiza o gráfico
    }

    // Função para voltar para o gráfico padrão (ano corrente)
    document.getElementById('backToCurrentBtn').addEventListener('click', function() {
        // Exibir o botão "Apagar Dados" quando voltamos para o gráfico padrão
        clearDataBtn.style.display = 'block';
        
        // Restaurar os dados do ano corrente do localStorage
        myChart.data.labels = JSON.parse(localStorage.getItem('labels')) || [];
        myChart.data.datasets[0].data = JSON.parse(localStorage.getItem('recycledData')) || [];
        myChart.data.datasets[1].data = JSON.parse(localStorage.getItem('trashData')) || [];
        myChart.update(); // Atualiza o gráfico

        // Exibir o botão "Adicionar Mais" quando voltamos para o gráfico padrão
        addMoreDataBtn.style.display = 'block';
    });
});
