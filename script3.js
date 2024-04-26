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

    // Função para abrir o modal ao clicar no botão "Adicionar Mais"
    document.getElementById('addMoreDataBtn').addEventListener('click', function() {
        document.getElementById('myModal').style.display = "block";
    });

    // Função para fechar o modal ao clicar no botão fechar (X)
    document.getElementsByClassName("close")[0].addEventListener('click', function() {
        document.getElementById('myModal').style.display = "none";
    });

    // Função para salvar os novos dados inseridos no modal
    document.getElementById('saveNewDataBtn').addEventListener('click', function() {
        var newMonth = document.getElementById('newMonth').value;
        var newYear = document.getElementById('newYear').value; // Adicionado
        var newRecycledAmount = parseFloat(document.getElementById('newRecycledAmount').value);
        var newTrashAmount = parseFloat(document.getElementById('newTrashAmount').value);

        if (isNaN(newRecycledAmount) || isNaN(newTrashAmount)) {
            alert("Por favor, insira números válidos para as quantidades.");
            return;
        }

        myChart.data.labels.push(newMonth + ' ' + newYear); // Modificado
        myChart.data.datasets[0].data.push(newRecycledAmount);
        myChart.data.datasets[1].data.push(newTrashAmount);
        
        // Salvar os novos dados no localStorage
        localStorage.setItem('labels', JSON.stringify(myChart.data.labels));
        localStorage.setItem('recycledData', JSON.stringify(myChart.data.datasets[0].data));
        localStorage.setItem('trashData', JSON.stringify(myChart.data.datasets[1].data));

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

        myChart.update();
    });

    // Função para visualizar os gráficos de 2023
    document.getElementById('show2023Btn').addEventListener('click', function() {
        // Ocultar o painel de ano quando visualizamos o gráfico de 2023
        var currentYearPanel = document.getElementById('currentYearPanel');
        currentYearPanel.style.display = 'none';
        
        // Adicionar dados de 2023 ao gráfico
        addDataFor2023();

        // Remover o botão "Apagar Dados" quando visualizando o gráfico de 2023
        clearDataBtn.style.display = 'none';

        // Exibir o texto "Gráfico de 2023" no lugar do botão
        var yearLabel = document.getElementById('year2024Panel');
        yearLabel.style.display = 'block';
    });

    function addDataFor2023() {
        // Dados fixos para 2023 (substitua pelos seus dados reais)
        var recycledData2023 = [55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110];
        var trashData2023 = [35, 40, 30, 45, 40, 35, 50, 45, 55, 50, 65, 60];
        
        // Limpar os dados do gráfico
        myChart.data.labels = [];
        myChart.data.datasets[0].data = [];
        myChart.data.datasets[1].data = [];
        
        // Exibir apenas "Gráfico de 2023" no painel de ano
        var yearLabel = document.getElementById('yearLabel');
        yearLabel.style.display = 'block';

        // Esconder o painel de ano padrão
        var currentYearPanel = document.getElementById('currentYearPanel');
        currentYearPanel.style.display = 'none';
        
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
        // Exibir o painel de ano quando voltamos para o gráfico padrão
        var currentYearPanel = document.getElementById('currentYearPanel');
        currentYearPanel.style.display = 'block';
        
        // Restaurar os dados do ano corrente do localStorage
        myChart.data.labels = JSON.parse(localStorage.getItem('labels')) || [];
        myChart.data.datasets[0].data = JSON.parse(localStorage.getItem('recycledData')) || [];
        myChart.data.datasets[1].data = JSON.parse(localStorage.getItem('trashData')) || [];
        myChart.update(); // Atualiza o gráfico

        // Exibir o ano corrente no painel de ano
        updateCurrentGraphPanel("Gráfico do Ano Corrente"); // Atualiza o painel para mostrar o gráfico atual

        // Reexibir o botão "Apagar Dados" quando voltamos para o gráfico padrão
        clearDataBtn.style.display = 'block';

        // Esconder o texto "Gráfico de 2023"
        var yearLabel = document.getElementById('year2024Panel');
        yearLabel.style.display = 'none';
    });

    // Função para atualizar o painel mostrando o gráfico atual
    function updateCurrentGraphPanel(graphName) {
        var currentYearPanel = document.getElementById('currentYearPanel');
        currentYearPanel.innerText = graphName;
    }

    // Ao carregar a página, exibir o ano corrente
    updateCurrentGraphPanel("Gráfico do Ano Corrente");
});
