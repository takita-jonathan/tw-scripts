// CustomModal - Modal básico centralizado sem fundo
(function() {
    if (window.CustomModal) return;

    const style = document.createElement('style');
    style.innerHTML = `
    .custom-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
            const modal = document.createElement('div');
            modal.className = 'custom-modal';
            modal.textContent = message;

            document.body.appendChild(modal);

            document.addEventListener('click', function handler(event) {
                if (!modal.contains(event.target)) {
                    modal.remove();
                    document.removeEventListener('click', handler);
                }
            });
        }
    };
})();
