(function() {
    if (window.CustomModal) return;

    const style = `
    .custom-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #414141;
      border-radius: 5px;
      color: white;
      width: 300px;
      height: 200px;
      font-size: 16px;
      z-index: 9999;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    .custom-modal-header {
      background: #2e2e2e;
      padding: 5px 10px;
      cursor: move;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    .custom-modal-close {
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
    }

    .custom-modal-content {
      padding: 10px;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  `;

    const html = (title, contentHTML) => `
      <div class="custom-modal-header">
        <span>${title}</span>
        <button class="custom-modal-close">&times;</button>
      </div>
      <div class="custom-modal-content">${contentHTML}</div>
    `;

    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);

    window.CustomModal = {
        show({ content = '', title = 'Modal' }) {
            const modal = document.createElement('div');
            modal.className = 'custom-modal';
            modal.innerHTML = html(title, content);
            document.body.appendChild(modal);

            modal.querySelector('.custom-modal-close').addEventListener('click', () => modal.remove());

            document.addEventListener('click', function handler(event) {
                if (!modal.contains(event.target)) {
                    modal.remove();
                    document.removeEventListener('click', handler);
                }
            });

            const header = modal.querySelector('.custom-modal-header');
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;

            header.addEventListener('mousedown', (e) => {
                isDragging = true;
                const rect = modal.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
                modal.style.transform = 'none';
            });

            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    modal.style.left = `${e.clientX - offsetX}px`;
                    modal.style.top = `${e.clientY - offsetY}px`;
                }
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        }
    };
})();
