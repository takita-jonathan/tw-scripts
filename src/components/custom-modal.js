// CustomModal - Modal básico com barra superior e suporte a arrastar
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
      font-size: 16px;
      z-index: 9999;
      box-sizing: border-box;
      display: inline-flex;
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

    .custom-modal-footer {
      padding: 6px;
      font-size: 11px;
      color: #ccc;
      text-align: center;
    }
  `;

    const html = (title, contentHTML) => `
      <div class="custom-modal-header">
        <span>${title}</span>
        <button class="custom-modal-close">&times;</button>
      </div>
      <div class="custom-modal-content">${contentHTML}</div>
      <div class="custom-modal-footer">Created By GalinhaDeColete</div>
    `;

    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);

    window.CustomModal = {
        _modal: null,

        show({ content = '', title = 'Modal' }) {
            this.close();

            const modal = document.createElement('div');
            modal.className = 'custom-modal';
            modal.innerHTML = html(title, content);
            document.body.appendChild(modal);
            this._modal = modal;

            modal.querySelector('.custom-modal-close').addEventListener('click', () => {
                this.close();
            });

            document.addEventListener('keydown', this._escHandler = (e) => {
                if (e.key === 'Escape') this.close();
            });

            this._enableDrag(modal);
        },

        _enableDrag(modal) {
            const header = modal.querySelector('.custom-modal-header');
            const closeBtn = modal.querySelector('.custom-modal-close');
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;

            header.addEventListener('mousedown', (e) => {
                if (e.target === closeBtn) return; // não arrasta ao clicar no botão de fechar

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
        },

        update(contentHTML) {
            if (this._modal) {
                const content = this._modal.querySelector('.custom-modal-content');
                if (content) content.innerHTML = contentHTML;
            }
        },

        close() {
            if (this._modal) {
                this._modal.remove();
                this._modal = null;
            }
        }
    };
})();
