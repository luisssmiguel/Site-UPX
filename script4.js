document.addEventListener("DOMContentLoaded", function () {
    const gerarRelatorioBtn = document.getElementById('gerarRelatorioBtn');

    gerarRelatorioBtn.addEventListener('click', async function () {
        try {
            // Obtém os dados do Mock API
            const response = await fetch('https://662d5880a7dda1fa378a6de6.mockapi.io/codetech/usuarios');
            const data = await response.json();

            // Cria um novo documento PDF
            const pdfDoc = await PDFLib.PDFDocument.create();
            const page = pdfDoc.addPage();

            // Define a posição inicial para escrever o conteúdo no PDF
            let y = page.getHeight() - 50;

            // Itera sobre os dados e os adiciona ao PDF
            data.forEach(item => {
                page.drawText(`ID: ${item.id}`, { x: 50, y, size: 12 });
                page.drawText(`Nome: ${item.nome}`, { x: 50, y: y - 20, size: 12 });
                page.drawText(`Descrição: ${item.descricao}`, { x: 50, y: y - 40, size: 12 });
                y -= 60;
            });

            // Salva o PDF com o nome 'relatorio.pdf'
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

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
        } catch (error) {
            console.error('Erro ao obter dados do Mock API:', error);
        }
    });
});
