function calculatePrice() {
    // Captura os valores de entrada
    const nylonCostPerMeter = parseFloat(document.getElementById('nylon-cost').value) || 0;
    const fabricCostPerMeter = parseFloat(document.getElementById('fabric-cost').value) || 0;
    const fabricHeight = parseFloat(document.getElementById('fabric-height').value) || 0;
    const fabricWidth = parseFloat(document.getElementById('fabric-width').value) || 0;
    const zipperCostPerMeter = parseFloat(document.getElementById('zipper').value) || 0;
    const cursorQuantityPerPackage = parseInt(document.getElementById('cursor-quantity').value) || 0;
    const cursorQuantityForPiece = parseInt(document.getElementById('quantity').value) || 0;
    const profitMargin = parseFloat(document.getElementById('profit').value) || 0;

    // Calcula área do tecido e do nylon em m²
    const fabricAreaCm2 = fabricHeight * fabricWidth; // em cm²
    const fabricAreaM2 = fabricAreaCm2 / 10000; // Convertendo para m²

    // Calcula os custos
    const fabricPieceCost = fabricCostPerMeter * fabricAreaM2; // Custo do pedaço de tecido
    const nylonPieceCost = nylonCostPerMeter * fabricAreaM2; // Custo do pedaço de nylon

    // Calcula o custo dos cursores
    const cursorCostPerUnit = cursorQuantityPerPackage > 0
        ? (fabricCostPerMeter / cursorQuantityPerPackage)
        : 0; // Evitar divisão por zero
    const totalCursorCost = cursorCostPerUnit * cursorQuantityForPiece;

    // Calcula o custo total da peça
    const totalCost = fabricPieceCost + nylonPieceCost + zipperCostPerMeter + totalCursorCost;

    // Adiciona margem de lucro
    const profit = totalCost * (profitMargin / 100);
    const suggestedPrice = totalCost + profit;

    // Calcula preços para plataformas com comissões
    const shopeeFee = (suggestedPrice * 0.14) + 4; // 12% de comissão Shopee
    const elo7Fee = suggestedPrice * 0.18; // 18% de comissão Elo7
    const shopeePrice = suggestedPrice + shopeeFee;
    const elo7Price = suggestedPrice + elo7Fee;

    

    // Exibe os resultados
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <strong>Resultados:</strong>
        <p>Área do tecido/nylon (m²): ${fabricAreaM2.toFixed(4)}</p>
        <p>Custo do pedaço de tecido: R$ ${fabricPieceCost.toFixed(2)}</p>
        <p>Custo do pedaço de nylon: R$ ${nylonPieceCost.toFixed(2)}</p>
        <p>Custo dos cursores (para ${cursorQuantityForPiece} unidades): R$ ${totalCursorCost.toFixed(2)}</p>
        <p>Custo total: R$ ${totalCost.toFixed(2)}</p>
        <p>Preço sugerido (presencial): R$ ${suggestedPrice.toFixed(2)}</p>
        <p>Preço sugerido (Shopee): R$ ${shopeePrice.toFixed(2)} (inclui 12% de comissão)</p>
        <p>Preço sugerido (Elo7): R$ ${elo7Price.toFixed(2)} (inclui 18% de comissão)</p>
    `;
}

function clearResults() {
    // Limpa os valores dos campos de entrada
    document.getElementById('nylon-cost').value = '';
    document.getElementById('fabric-cost').value = '';
    document.getElementById('fabric-height').value = '';
    document.getElementById('fabric-width').value = '';
    document.getElementById('zipper').value = '';
    document.getElementById('cursor-quantity').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('profit').value = '';

    // Limpa o conteúdo da área de resultados
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}
