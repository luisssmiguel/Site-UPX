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

    function addData() {
        var month = document.getElementById('month').value;
        var recycledAmount = parseFloat(document.getElementById('recycledAmount').value);
        var trashAmount = parseFloat(document.getElementById('trashAmount').value);

        if (isNaN(recycledAmount) || isNaN(trashAmount)) {
            alert("Por favor, insira números válidos para as quantidades.");
            return;
        }

        myChart.data.labels.push(month);
        myChart.data.datasets[0].data.push(recycledAmount);
        myChart.data.datasets[1].data.push(trashAmount);
        
        // Salvar os dados no localStorage
        localStorage.setItem('labels', JSON.stringify(myChart.data.labels));
        localStorage.setItem('recycledData', JSON.stringify(myChart.data.datasets[0].data));
        localStorage.setItem('trashData', JSON.stringify(myChart.data.datasets[1].data));

        myChart.update();
    }

    document.getElementById('addDataBtn').addEventListener('click', addData);

    // Função para apagar os dados salvos
    document.getElementById('clearDataBtn').addEventListener('click', function() {
        localStorage.removeItem('labels');
        localStorage.removeItem('recycledData');
        localStorage.removeItem('trashData');
        
        // Limpar os dados do gráfico
        myChart.data.labels = [];
        myChart.data.datasets[0].data = [];
        myChart.data.datasets[1].data = [];

        myChart.update();
    });

    // Função para visualizar os gráficos de 2023
    document.getElementById('show2023Btn').addEventListener('click', function() {
        // Adicionar dados de 2023 ao gráfico
        addDataFor2023();
    });

    function addDataFor2023() {
        // Dados fixos para 2023 (substitua pelos seus dados reais)
        var recycledData2023 = [55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110];
        var trashData2023 = [35, 40, 30, 45, 40, 35, 50, 45, 55, 50, 65, 60];
        
        // Limpar os dados do gráfico
        myChart.data.labels = [];
        myChart.data.datasets[0].data = [];
        myChart.data.datasets[1].data = [];
        
        // Ocultar o botão "Apagar Dados" durante a visualização do gráfico de 2023
        document.getElementById('clearDataBtn').style.display = 'none';
        // Exibir o botão "Voltar para o Gráfico Atual"
        document.getElementById('backToCurrentBtn').style.display = 'block';
    
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
        updateCurrentGraphPanel("Gráfico de 2023"); // Atualiza o painel para mostrar o gráfico atual
    }

    // Função para voltar para o gráfico padrão (ano corrente)
    document.getElementById('backToCurrentBtn').addEventListener('click', function() {
        // Restaurar os dados do ano corrente do localStorage
        myChart.data.labels = JSON.parse(localStorage.getItem('labels')) || [];
        myChart.data.datasets[0].data = JSON.parse(localStorage.getItem('recycledData')) || [];
        myChart.data.datasets[1].data = JSON.parse(localStorage.getItem('trashData')) || [];
        myChart.update(); // Atualiza o gráfico

        // Exibir o botão "Apagar Dados" quando voltar para o gráfico padrão
        document.getElementById('clearDataBtn').style.display = 'block';
        // Ocultar o botão "Voltar para o Gráfico Atual"
        document.getElementById('backToCurrentBtn').style.display = 'none';
        updateCurrentGraphPanel("Gráfico do Ano Corrente"); // Atualiza o painel para mostrar o gráfico atual
    });

    // Função para atualizar o painel mostrando o gráfico atual
    function updateCurrentGraphPanel(graphName) {
        document.getElementById('currentGraphPanel').innerText = "Você está visualizando: " + graphName;
    }
});
