/**
 * 📜 Script Name: Retreat Planner
 * 🎯 Purpose: Calculates the maximum action interval (in minutes) available until a specific target time.
 * 🌐 Server: Tribal Wars BR
 * 🧠 Author: @GalinhaDeColete
 * 📅 Last Updated: 2025-06-29
 * 💡 Example: If it's currently 23:00 and you set the target time to 00:00, the available interval is 30 minutes.
 *
 * 🛠️ Use cases:
 * - Plan attacks that must return before you log off.
 * - Schedule actions that should only complete after a specific time.
 *
 * ✅ Instructions:
 * 1. Add this script to your quick access bar.
 * 2. Enter the desired time limit in HH:MM format.
 */


javascript:(function () {
    const scriptsToLoad = [];

    if (!window.CustomModal)
        scriptsToLoad.push($.getScript("https://takita-jonathan.github.io/tw-scripts/custom-modal.js"));

    Promise.all(scriptsToLoad).then(() => {
        CustomModal.show({
            title: "Retreat Planner",
            content: `
                <div style="display:flex; flex-direction:column; gap:8px;">
                    <input type="text" id="timeLimitInput" placeholder="HH:MM" style="padding:5px; text-align:center;" />
                    <div id="retreatResult" style="text-align:center; color:gray;">⌛ Waiting for valid time input...</div>
                </div>
            `
        });

        setTimeout(() => {
            const input = document.getElementById('timeLimitInput');
            const result = document.getElementById('retreatResult');
            if (!input || !result) return;

            input.addEventListener('input', () => {
                let value = input.value.replace(/\D/g, '').slice(0, 4);
                if (value.length >= 3) value = value.slice(0, 2) + ':' + value.slice(2);
                input.value = value;

                const regex = /^\d{1,2}:\d{2}$/;
                if (!regex.test(value)) {
                    result.innerHTML = '⌛ Waiting for valid time input...';
                    result.style.color = 'gray';
                    return;
                }

                const [targetHour, targetMinute] = value.split(':').map(Number);
                if (targetHour < 0 || targetHour > 23 || targetMinute < 0 || targetMinute > 59) {
                    result.innerHTML = '⛔ Hour must be 0–23 and minutes 0–59.';
                    result.style.color = 'red';
                    return;
                }

                const serverTime = document.querySelector('#serverTime')?.innerText.trim();
                if (!serverTime) {
                    result.innerHTML = '⛔ Could not read server time (#serverTime).';
                    result.style.color = 'red';
                    return;
                }

                const targetTotal = targetHour * 60 + targetMinute;
                const [currentHour, currentMinute] = serverTime.split(':').map(Number);
                const currentTotal = currentHour * 60 + currentMinute;

                let diff = targetTotal - currentTotal;
                if (diff < 0) diff += 1440;

                const maxDuration = diff / 2;
                const hours = Math.floor(maxDuration / 60);
                const minutes = Math.round(maxDuration % 60);

                result.style.color = 'white';
                result.innerHTML = `⏱️ <strong>Action interval:</strong> ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
            });

            input.focus();
        }, 0);
    });
})();
