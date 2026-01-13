// enhanced.js - Funcionalidades extras para o site
console.log('Site da Fabielle carregado com sucesso! 🎉');

// Quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pronto para usar!');
    
    // Adiciona data atual
    const data = new Date();
    const dataFormatada = data.toLocaleDateString('pt-BR');
    
    // Procura um elemento para mostrar a data
    const body = document.querySelector('body');
    if (body) {
        const dataElemento = document.createElement('div');
        dataElemento.style.textAlign = 'center';
        dataElemento.style.marginTop = '30px';
        dataElemento.style.padding = '15px';
        dataElemento.style.backgroundColor = 'rgba(0,0,0,0.1)';
        dataElemento.style.borderRadius = '10px';
        dataElemento.innerHTML = `
            <p style="margin: 0; font-weight: bold;">✨ Site criado por Fabielle ✨</p>
            <p style="margin: 5px 0; color: #666;">Publicado em: ${dataFormatada}</p>
            <p style="margin: 0; font-size: 14px;">Feito com ❤️ durante o curso da Fundação Bradesco</p>
        `;
        body.appendChild(dataElemento);
    }
    
    // Efeito especial no botão
    const botao = document.querySelector('.btn');
    if (botao) {
        botao.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = '0.3s';
        });
        
        botao.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Contador de cliques
        let contadorCliques = 0;
        botao.addEventListener('click', function() {
            contadorCliques++;
            console.log(`Botão clicado ${contadorCliques} vezes!`);
        });
    }
    
    // Mensagem de boas-vindas
    setTimeout(function() {
        console.log('🌟 Bem-vindo ao Site da Fabielle! 🌟');
    }, 1000);
});
