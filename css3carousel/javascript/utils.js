function pictureResize(img) {
    let width = img.naturalWidth;
    let height = img.naturalHeight;
    let resizeCanvas = document.createElement('canvas');
    if(height > 300 || width > 200) {
        let newWidth = 200;
        let newHeight = 300;
        img.width = newWidth;
        img.height = newHeight; 
    }
}