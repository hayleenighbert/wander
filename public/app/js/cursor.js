$(function() {
    var canvas = document.createElement("canvas");
    canvas.width = 24;
    canvas.height = 24;
    //document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.font = "24px FontAwesome";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("\uf002", 12, 12);
    var dataURL = canvas.toDataURL('image/png')
    $('body').css('cursor', 'url('+dataURL+'), auto');
});