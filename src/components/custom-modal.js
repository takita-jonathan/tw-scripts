// CustomModal - Modal preto básico centralizado
(function() {
    if (window.CustomModal) return;

    const style = document.createElement('style');
    style.innerHTML = `
    .custom-modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 9998;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .custom-modal {
      background: black;
      color: white;
      width: 300px;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      z-index: 9999;
    }
  `;
    document.head.appendChild(style);

    window.CustomModal = {
        show(message = 'Hello World') {
            const backdrop = document.createElement('div');
            backdrop.className = 'custom-modal-backdrop';

            const modal = document.createElement('div');
            modal.className = 'custom-modal';
            modal.textContent = message;

            backdrop.appendChild(modal);
            document.body.appendChild(backdrop);

            backdrop.addEventListener('click', () => backdrop.remove());
        }
    };
})();
