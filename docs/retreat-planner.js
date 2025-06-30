/**
 * 📜 Script Name: Retreat Planner
 * 🎯 Calcula o tempo máximo de duração de um ataque para garantir o retorno das tropas até o horário limite.
 * 🌐 Servidor: Tribal Wars BR
 * 🧠 Autor: @GalinhaDeColete
 * 📅 Atualizado: 2025-06-29
 * 💡 Exemplo: Se agora são 23:00 e você quer sair às 00:00, ataques de até 30 minutos (ida + volta) são seguros.
 *
 * ✅ Instruções:
 * 1. Adicione à barra de acesso rápido.
 * 2. Insira o horário limite no formato HH:MM.
 */

(function() {
    const inputHora = prompt('Informe o horário limite (HH:MM):', '00:00');
    const regex = /^\d{1,2}:\d{2}$/;

    if (!inputHora || !regex.test(inputHora)) {
        alert('⛔ Formato inválido! Use HH:MM (ex: 23:45)');
        return;
    }

    const [horaAlvo, minutoAlvo] = inputHora.split(':').map(Number);
    if (horaAlvo < 0 || horaAlvo > 23 || minutoAlvo < 0 || minutoAlvo > 59) {
        alert('⛔ Horário inválido! Hora entre 0–23 e minutos entre 0–59.');
        return;
    }

    const minutosAlvo = horaAlvo * 60 + minutoAlvo;

    const servidorHora = document.querySelector('#serverTime')?.innerText.trim();
    if (!servidorHora) {
        alert('⛔ Não foi possível ler o horário do servidor (#serverTime).');
        return;
    }

    const [horaAtual, minutoAtual] = servidorHora.split(':').map(Number);
    const minutosAtual = horaAtual * 60 + minutoAtual;

    let diferenca = minutosAlvo - minutosAtual;
    const diaExtra = diferenca < 0 ? 1 : 0;
    if (diferenca < 0) diferenca += 1440; // adiciona 24h se for no próximo dia

    const tempoMaximo = diferenca / 2;
    const horas = Math.floor(tempoMaximo / 60);
    const minutos = Math.round(tempoMaximo % 60);

    alert(
        `🎯 Hora limite: ${horaAlvo.toString().padStart(2, '0')}:${minutoAlvo.toString().padStart(2, '0')}${diaExtra ? ' (próximo dia)' : ''}\n` +
        `🕓 Hora atual: ${horaAtual.toString().padStart(2, '0')}:${minutoAtual.toString().padStart(2, '0')}\n\n` +
        `⏱️ Máx. duração de ataque (ida + volta):\n` +
        `${horas.toString().padStart(2, '0')}h ${minutos.toString().padStart(2, '0')}m`
    );
})();
