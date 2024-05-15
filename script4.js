document.addEventListener("DOMContentLoaded", function () {
    const gerarRelatorioBtn = document.getElementById('gerarRelatorioBtn');

    gerarRelatorioBtn.addEventListener('click', async function () {
        try {
            // Obtém os dados do Mock API
            const response = await fetch('https://662d5880a7dda1fa378a6de6.mockapi.io/codetech/Descarte');
            const data = await response.json();

            // Cria um novo documento PDF
            const pdfDoc = await PDFLib.PDFDocument.create();
            let page = pdfDoc.addPage();

            // Define margens e posição inicial
            const margin = 50;
            let y = page.getHeight() - margin;

            // Adiciona um título ao PDF
            const title = "Relatório de Descarte de Resíduos";
            const titleFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
            const bodyFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

            // Calcula a largura do texto para centralização
            const titleSize = 18;
            const textWidth = titleFont.widthOfTextAtSize(title, titleSize);
            const pageWidth = page.getWidth();
            const titleX = (pageWidth - textWidth) / 2;

            page.drawText(title, {
                x: titleX,
                y: y,
                size: titleSize,
                font: titleFont,
                color: PDFLib.rgb(0, 0, 0)
            });

            // Atualiza a posição Y após o título
            y -= 30;

            // Itera sobre os dados e os adiciona ao PDF
            const lineHeight = 20;
            const boxWidth = pageWidth - margin * 2; // largura da caixa de texto
            const boxHeight = lineHeight * 5 + 10; // altura da caixa de texto

            data.forEach((item, index) => {
                if (y < margin) {
                    page = pdfDoc.addPage(); // Adiciona uma nova página se necessário
                    y = page.getHeight() - margin;
                }

                // Desenha uma linha separadora para cada item
                if (index > 0) {
                    y -= 10;
                    page.drawLine({
                        start: { x: margin, y: y },
                        end: { x: page.getWidth() - margin, y: y },
                        thickness: 0.5,
                        color: PDFLib.rgb(0.75, 0.75, 0.75),
                    });
                    y -= 10;
                }

                // Adiciona os dados ao PDF com estilos adicionais
                const textY = y - lineHeight * 4; // ajuste vertical para o texto dentro da caixa

                page.drawRectangle({
                    x: margin,
                    y: textY - lineHeight,
                    width: boxWidth,
                    height: boxHeight,
                    borderWidth: 1,
                    borderColor: PDFLib.rgb(0, 0, 0), // cor da borda
                    color: PDFLib.rgb(0.9, 0.9, 0.9),
                });

                
                page.drawText(`Mês: ${item.Mes}`, { x: margin + 10, y: textY + 3 * lineHeight, size: 12, font: bodyFont, color: PDFLib.rgb(0.2, 0.2, 0.2) });
                page.drawText(`Ano: ${item.Ano}`, { x: margin + 10, y: textY + 2 * lineHeight, size: 12, font: bodyFont, color: PDFLib.rgb(0.2, 0.2, 0.2) });
                page.drawText(`Kilos Reciclados: ${item.KilosReciclados}`, { x: margin + 10, y: textY + lineHeight, size: 12, font: bodyFont, color: PDFLib.rgb(0.2, 0.2, 0.2) });
                page.drawText(`Kilos Descartados: ${item.KilosDescartados}`, { x: margin + 10, y: textY, size: 12, font: bodyFont, color: PDFLib.rgb(0.2, 0.2, 0.2) });

                // Atualiza a posição Y para o próximo item
                y -= boxHeight + 20;
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
