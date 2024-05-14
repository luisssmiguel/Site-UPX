// JavaScript (script3.js)
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

    function deleteDataFromAPI(month) {
        fetch('https://662d5880a7dda1fa378a6de6.mockapi.io/codetech/Descarte')
            .then(response => response.json())
            .then(data => {
                const itemToDelete = data.find(item => item.month === month);
                if (itemToDelete) {
                    fetch(`https://662d5880a7dda1fa378a6de6.mockapi.io/codetech/Descarte/${itemToDelete.id}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao deletar os dados na API');
                        }
                        console.log('Dados deletados com sucesso');
                    })
                    .catch(error => {
                        console.error('Erro ao deletar os dados na API:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao obter os dados da API:', error);
            });
    }

    // Função para abrir o modal de adicionar dados
    document.getElementById('addMoreDataBtn').addEventListener('click', function() {
        document.getElementById('myModal').style.display = 'block';
    });

    // Função para fechar o modal de adicionar dados
    document.getElementsByClassName("close")[0].addEventListener('click', function() {
        document.getElementById('myModal').style.display = 'none';
    });

    // Função para salvar os novos dados
    document.getElementById('saveNewDataBtn').addEventListener('click', function() {
        var newMonth = document.getElementById('newMonth').value;
        var newRecycledAmount = document.getElementById('newRecycledAmount').value;
        var newTrashAmount = document.getElementById('newTrashAmount').value;

        if (newMonth && newRecycledAmount && newTrashAmount) {
            myChart.data.labels.push(newMonth);
            myChart.data.datasets[0].data.push(newRecycledAmount);
            myChart.data.datasets[1].data.push(newTrashAmount);

            localStorage.setItem('labels', JSON.stringify(myChart.data.labels));
            localStorage.setItem('recycledData', JSON.stringify(myChart.data.datasets[0].data));
            localStorage.setItem('trashData', JSON.stringify(myChart.data.datasets[1].data));

            // Salvar os dados na API
            saveDataToAPI({ month: newMonth, recycled: newRecycledAmount, trash: newTrashAmount });

            myChart.update();
        }

        // Fechar o modal após salvar os dados
        document.getElementById('myModal').style.display = 'none';
    });

    // Função para abrir o modal de apagar dados
    document.getElementById('clearDataBtn').addEventListener('click', function() {
        var monthSelect = document.getElementById('monthToDelete');

        // Limpar as opções do select
        monthSelect.innerHTML = '';

        // Adicionar opções dinamicamente
        myChart.data.labels.forEach(month => {
            var option = document.createElement('option');
            option.value = month;
            option.text = month;
            monthSelect.appendChild(option);
        });

        document.getElementById('deleteModal').style.display = 'block';
    });

    // Função para fechar o modal de apagar dados ao clicar no botão fechar (X)
    document.getElementsByClassName("closeDeleteModal")[0].addEventListener('click', function() {
        document.getElementById('deleteModal').style.display = 'none';
    });

    // Função para confirmar a exclusão dos dados do mês selecionado
    document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
        var monthToDelete = document.getElementById('monthToDelete').value;

        // Remover os dados do gráfico
        var index = myChart.data.labels.indexOf(monthToDelete);
        if (index !== -1) {
            myChart.data.labels.splice(index, 1);
            myChart.data.datasets[0].data.splice(index, 1);
            myChart.data.datasets[1].data.splice(index, 1);

            // Atualizar os dados no localStorage
            localStorage.setItem('labels', JSON.stringify(myChart.data.labels));
            localStorage.setItem('recycledData', JSON.stringify(myChart.data.datasets[0].data));
            localStorage.setItem('trashData', JSON.stringify(myChart.data.datasets[1].data));

            // Apagar os dados da API
            deleteDataFromAPI(monthToDelete);

            myChart.update();
        }

        // Fechar o modal após apagar os dados
        document.getElementById('deleteModal').style.display = 'none';
    });

    document.getElementById('show2023Btn').addEventListener('click', function() {
        addDataFor2023();

        // Esconder o botão "Apagar Dados" quando visualizando o gráfico de 2023
        document.getElementById('clearDataBtn').style.display = 'none';

        // Esconder o botão "Adicionar Mais" quando visualizando o gráfico de 2023
        document.getElementById('addMoreDataBtn').style.display = 'none';
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
        var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        for (var i = 0; i < 12; i++) {
            myChart.data.labels.push(months[i]);
            myChart.data.datasets[0].data.push(recycledData2023[i]);
            myChart.data.datasets[1].data.push(trashData2023[i]);
        }
        
        myChart.update(); // Atualiza o gráfico
    }

    // Função para voltar para o gráfico padrão (ano corrente)
    document.getElementById('backToCurrentBtn').addEventListener('click', function() {
        // Exibir o botão "Apagar Dados" quando voltamos para o gráfico padrão
        document.getElementById('clearDataBtn').style.display = 'block';
        
        // Restaurar os dados do ano corrente do localStorage
        myChart.data.labels = JSON.parse(localStorage.getItem('labels')) || [];
        myChart.data.datasets[0].data = JSON.parse(localStorage.getItem('recycledData')) || [];
        myChart.data.datasets[1].data = JSON.parse(localStorage.getItem('trashData')) || [];
        myChart.update(); // Atualiza o gráfico

        // Exibir o botão "Adicionar Mais" quando voltamos para o gráfico padrão
        document.getElementById('addMoreDataBtn').style.display = 'block';
    });
});
