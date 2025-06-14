/**
 * 📜 Script Name: I'm Leaving
 * 🎯 Purpose: Calcula o tempo para enviar tropas para garantir que estejam fora até um horário limite.
 * 🌐 Servidor: Tribal Wars BR
 * 🧠 Autor: @GalinhaDeColete
 * 📅 Data: 2025-06-13
 * Icon: https://img.icons8.com/?size=20&id=64342&format=png&color=000000
 *
 * ✅ Como usar:
 * - Adicione na barra de acesso rápido.
 * - Informe o horário limite (formato HH:MM).
 * - O script calcula (hora_alvo - hora_atual) / 2 e retorna o resultado.
 * - Se a hora alvo for menor que a atual, assume que é no próximo dia.
 *
 * 🚫 Restrição:
 * - Horas válidas entre 0 e 23.
 * - Minutos válidos entre 0 e 59.
 */

(function() {
    const inputHora = prompt('Informe o horário limite (HH:MM):', '00:00');
    const regex = /^\d{1,2}:\d{2}$/;

    if (!inputHora || !regex.test(inputHora)) {
        alert('Formato inválido! Use HH:MM');
        return;
    }

    const [horaAlvo, minutoAlvo] = inputHora.split(':').map(Number);

    // Validação de horário
    if (horaAlvo < 0 || horaAlvo > 23 || minutoAlvo < 0 || minutoAlvo > 59) {
        alert('Horário inválido! Hora deve ser entre 0 e 23. Minuto entre 0 e 59.');
        return;
    }

    const minutosAlvo = (horaAlvo * 60) + minutoAlvo;

    const servidorHora = document.querySelector('#serverTime').innerText.trim();
    const [horaAtual, minutoAtual] = servidorHora.split(':').map(Number);
    const minutosAtual = (horaAtual * 60) + minutoAtual;

    // Detecta se é hoje ou próximo dia
    let diferenca = minutosAlvo - minutosAtual;
    const diaExtra = diferenca < 0 ? 1 : 0;

    if (diferenca < 0) {
        diferenca += 24 * 60;
    }

    const resultado = diferenca / 2;

    const horasResultado = Math.floor(resultado / 60);
    const minutosResultado = Math.round(resultado % 60);

    alert(
        `Hora alvo: ${horaAlvo.toString().padStart(2, '0')}:${minutoAlvo.toString().padStart(2, '0')}${diaExtra === 1 ? ' (próximo dia)' : ''}\n` +
        `Hora atual: ${horaAtual.toString().padStart(2, '0')}:${minutoAtual.toString().padStart(2, '0')}\n\n` +
        `Resultado: ${horasResultado}h ${minutosResultado}m`
    );
})();