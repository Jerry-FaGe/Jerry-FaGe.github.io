// Twikoo/OwO 表情悬浮放大预览
if (document.getElementById('post-comment')) owoBig();

function owoBig() {
    const comment = document.getElementById('post-comment');
    const body = document.body;
    const scale = 3;
    let previewTimer = null;
    let currentTarget = null;

    let preview = document.getElementById('owo-big');
    if (!preview) {
        preview = document.createElement('div');
        preview.id = 'owo-big';
        body.appendChild(preview);
    }

    const getPreviewImage = target => {
        if (!(target instanceof Element)) return null;
        const image = target.closest('.OwO-body img, img.tk-owo-emotion');
        if (!image || !comment.contains(image)) return null;
        return image;
    };

    const hidePreview = () => {
        preview.style.display = 'none';
        currentTarget = null;
        clearTimeout(previewTimer);
    };

    comment.addEventListener('mouseover', event => {
        if (body.clientWidth <= 768) return;
        const image = getPreviewImage(event.target);
        if (!image || image === currentTarget) return;

        currentTarget = image;
        clearTimeout(previewTimer);
        previewTimer = setTimeout(() => {
            const rect = image.getBoundingClientRect();
            const width = rect.width * scale;
            const height = rect.height * scale;
            let left = rect.left - (width - rect.width) / 2;
            const top = rect.top;

            if (left + width > body.clientWidth) left -= left + width - body.clientWidth + 10;
            if (left < 0) left = 10;

            preview.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
            preview.innerHTML = `<img src="${image.currentSrc || image.src}" alt="">`;
        }, 300);
    });

    comment.addEventListener('mouseout', event => {
        const image = getPreviewImage(event.target);
        if (image && !image.contains(event.relatedTarget)) hidePreview();
    });

    comment.addEventListener('contextmenu', event => {
        if (body.clientWidth <= 768 && getPreviewImage(event.target)) event.preventDefault();
    });
}
