function modifyPFontColor() {
    try {
        var fontColor = '#' + (Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0'));
        document.getElementById("P").style.color = fontColor;
    }
    catch (ex) {
        console.log(ex.message);
    }
}