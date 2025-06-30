(function () {
    const scriptsToLoad = [];

    if (!window.CustomModal)
        scriptsToLoad.push($.getScript("https://takita-jonathan.github.io/tw-scripts/custom-modal.js"));

    Promise.all(scriptsToLoad).then(() => {
        CustomModal.show({
            title: "Hora limite",
            content: `
            <div style="display:flex; flex-direction:column; gap:8px;">
                <input type="text" id="horaLimiteInput" placeholder="HH:MM" style="padding:5px; text-align:center;" />
                <button id="confirmarHora" style="padding:5px; cursor:pointer;">Confirmar</button>
            </div>
        `
        });

        setTimeout(() => {
            const input = document.getElementById('horaLimiteInput');
            const botao = document.getElementById('confirmarHora');

            if (!input || !botao) return;

            botao.addEventListener('click', () => {
                const inputHora = input.value.trim();
                const regex = /^\d{1,2}:\d{2}$/;

                if (!regex.test(inputHora)) {
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
                if (diferenca < 0) diferenca += 1440;

                const tempoMaximo = diferenca / 2;
                const horas = Math.floor(tempoMaximo / 60);
                const minutos = Math.round(tempoMaximo % 60);

                alert(
                    `🎯 Hora limite: ${horaAlvo.toString().padStart(2, '0')}:${minutoAlvo.toString().padStart(2, '0')}${diaExtra ? ' (próximo dia)' : ''}\n` +
                    `🕓 Hora atual: ${horaAtual.toString().padStart(2, '0')}:${minutoAtual.toString().padStart(2, '0')}\n\n` +
                    `⏱️ Máx. duração de ataque (ida + volta):\n` +
                    `${horas.toString().padStart(2, '0')}h ${minutos.toString().padStart(2, '0')}m`
                );

                document.querySelector('.custom-modal')?.remove();
            });
        }, 0);    });
})();
