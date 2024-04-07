$(document).ready(function() {
    // Função para carregar as dicas de sustentabilidade
    function loadSustainabilityTips() {
        // Aqui você pode fazer uma solicitação AJAX para carregar as dicas de sustentabilidade do seu servidor
        // Por enquanto, vamos apenas adicionar algumas dicas fictícias como exemplo
        var sustainabilityTips = [
            "Reduza o uso de plástico descartável.",
            "Economize água sempre que possível.",
            "Recicle papel, plástico, vidro e metal.",
            "Prefira produtos locais e orgânicos.",
            "Desligue os aparelhos eletrônicos quando não estiver usando.",
            "Plante árvores para compensar as emissões de carbono."
        ];

        // Adiciona as dicas à lista
        var $tipsList = $("#sustainability-tips");
        sustainabilityTips.forEach(function(tip) {
            $tipsList.append("<li>" + tip + "</li>");
        });
    }

    // Função para carregar os resumos das reportagens
    function loadRelatedArticles() {
        // Aqui você pode fazer uma solicitação à sua fonte de reportagens e adicionar os resumos como elementos HTML
        // Por enquanto, vamos adicionar alguns resumos fictícios como exemplo
        var relatedArticles = [
            "10 maneiras de reduzir o desperdício em casa.",
            "A importância da energia renovável para o futuro do planeta.",
            "Como reciclar corretamente e reduzir sua pegada de carbono."
        ];

        // Adiciona os resumos à lista
        var $articlesList = $("#related-articles");
        relatedArticles.forEach(function(article) {
            $articlesList.append("<li>" + article + "</li>");
        });
    }

    // Carrega as dicas de sustentabilidade e os resumos das reportagens quando o documento estiver pronto
    loadSustainabilityTips();
    loadRelatedArticles();
});
