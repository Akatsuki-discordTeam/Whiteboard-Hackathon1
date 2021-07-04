document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'media.png');
}, false);

function downloadCanvas(link, canvas, filename) {
    link.href = document.getElementById(canvas).toDataURL();
    link.download = filename;
}