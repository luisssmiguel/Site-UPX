document.addEventListener("DOMContentLoaded", function () {
    const gerarRelatorioBtn = document.getElementById('gerarRelatorioBtn');

    gerarRelatorioBtn.addEventListener('click', function () {
        // Simula a geração do relatório localmente
        const conteudoRelatorio = "Este é um relatório de exemplo.";

        // Cria um novo objeto Blob com o conteúdo do relatório
        const blob = new Blob([conteudoRelatorio], { type: 'application/pdf' });

        // Cria um objeto URL a partir do Blob
        const url = window.URL.createObjectURL(blob);

        // Cria um link <a> para o download do PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio.pdf'; // Nome do arquivo
        // Simula um clique no link para iniciar o download
        a.click();
        // Libera o objeto URL
        window.URL.revokeObjectURL(url);
    });
});
