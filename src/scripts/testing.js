(function () {
    const scriptsToLoad = [];

    if (!window.CustomModal)
        scriptsToLoad.push($.getScript("https://takita-jonathan.github.io/tw-scripts/custom-modal.js"));

    Promise.all(scriptsToLoad).then(() => {
        CustomModal.show("🚀 Tudo pronto no testing.js!");
    });
})();
