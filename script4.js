document.addEventListener("DOMContentLoaded", function () {
    const gerarRelatorioBtn = document.getElementById('gerarRelatorioBtn');

    gerarRelatorioBtn.addEventListener('click', async function () {
        try {
            // Obtém os dados do Mock API
            const response = await fetch('https://662d5880a7dda1fa378a6de6.mockapi.io/codetech/Descarte');
            const data = await response.json();

            // Cria um novo documento PDF
            const pdfDoc = await PDFLib.PDFDocument.create();
            const page = pdfDoc.addPage();

            // Define a posição inicial para escrever o conteúdo no PDF
            let y = page.getHeight() - 50;

            // Itera sobre os dados e os adiciona ao PDF
            const startY = 800; // Posição inicial mais alta na página
const lineHeight = 20; // Altura da linha

data.forEach((item, index) => {
    const y = startY - index * lineHeight * 5; // Ajuste vertical para cada item

    page.drawText(`ID: ${item.id}`, { x: 50, y: y, size: 12 });
    page.drawText(`Mês: ${item.Mes}`, { x: 50, y: y - lineHeight, size: 12 });
    page.drawText(`Ano: ${item.Ano}`, { x: 50, y: y - lineHeight * 2, size: 12 });
    page.drawText(`Kilos Reciclados: ${item.KilosReciclados}`, { x: 50, y: y - lineHeight * 3, size: 12 });
    page.drawText(`Kilos Descartados: ${item.KilosDescartados}`, { x: 50, y: y - lineHeight * 4, size: 12 });
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
