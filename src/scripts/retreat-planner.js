/**
 * 📜 Script Name: Retreat Planner
 * 🎯 Purpose: Calculates the maximum round-trip attack duration to ensure troops return before a target time.
 * 🌐 Server: Tribal Wars BR
 * 🧠 Author: @GalinhaDeColete
 * 📅 Last Updated: 2025-06-29
 * 💡 Example: If it's currently 23:00 and you want to leave at 00:00, only attacks lasting up to 30 minutes (outbound + return) are safe.
 *
 * ✅ Instructions:
 * 1. Add this script to your quick access bar.
 * 2. Enter the target time in HH:MM format.
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
                    <button id="confirmTime" style="padding:5px; cursor:pointer;">Confirm</button>
                </div>
            `
        });

        setTimeout(() => {
            const input = document.getElementById('timeLimitInput');
            const button = document.getElementById('confirmTime');

            if (!input || !button) return;

            button.addEventListener('click', () => {
                const rawTime = input.value.trim();
                const regex = /^\d{1,2}:\d{2}$/;

                if (!regex.test(rawTime)) {
                    CustomModal.update('<span style="color:red;">⛔ Invalid format! Use HH:MM</span>');
                    return;
                }

                const [targetHour, targetMinute] = rawTime.split(':').map(Number);
                if (targetHour < 0 || targetHour > 23 || targetMinute < 0 || targetMinute > 59) {
                    CustomModal.update('<span style="color:red;">⛔ Hour must be 0–23 and minutes 0–59.</span>');
                    return;
                }

                const targetTotal = targetHour * 60 + targetMinute;

                const serverTime = document.querySelector('#serverTime')?.innerText.trim();
                if (!serverTime) {
                    CustomModal.update('<span style="color:red;">⛔ Could not read server time (#serverTime).</span>');
                    return;
                }

                const [currentHour, currentMinute] = serverTime.split(':').map(Number);
                const currentTotal = currentHour * 60 + currentMinute;

                let diff = targetTotal - currentTotal;
                const isNextDay = diff < 0 ? 1 : 0;
                if (diff < 0) diff += 1440;

                const maxDuration = diff / 2;
                const hours = Math.floor(maxDuration / 60);
                const minutes = Math.round(maxDuration % 60);

                CustomModal.update(`
                    <div style="text-align:left;">
                        <div>🎯 <strong>Target time:</strong> ${targetHour.toString().padStart(2, '0')}:${targetMinute.toString().padStart(2, '0')}${isNextDay ? ' (next day)' : ''}</div>
                        <div>🕓 <strong>Current time:</strong> ${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}</div>
                        <div style="margin-top: 10px; display: flex; justify-content: space-between;">
                            <span>⏱️ <strong>Max attack duration (round-trip):</strong></span>
                            <span><strong>${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m</strong></span>
                        </div>
                    </div>
                `);

            });
        }, 0);
    });
})();
