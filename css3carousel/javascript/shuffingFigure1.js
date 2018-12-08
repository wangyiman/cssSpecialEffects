window.onload = function() {
    let images = document.getElementsByTagName('img');
    let imageParent = document.getElementsByClassName('img_list')[0];
    let i = 0;

    let btn = document.getElementsByClassName('circle');

    Array.prototype.forEach.call(images, function(img) {
        pictureResize(img);
    });

    function showPicture(index) {
        let timer = setInterval(function() {
            if(typeof(index) === 'number') {
                i = index;
            }

            if((i)*200 === 1200) {
                imageParent.style.transform = `translate3d(${-1400}px, 0, 0)`;
                imageParent.style.transitionDuration = `${0}s`;
                imageParent.style.transform = `translate3d(${-200}px, 0, 0)`;
                i = 0;
                return;
            }

            imageParent.style.transitionDuration = `${1}s`;
            imageParent.style.transform = `translate3d(${-200*(i+1)}px, 0, 0)`;
            if(i === 5) {
                selectedBtn(0);
            } else {
                selectedBtn(i);
            }
            i++;
        }, 1000);
        return timer;
    }

    function selectedBtn(i) {
        for(let num = 0;num < btn.length;num++) {
            if(num === i) {
                btn[num].className = 'circle selected';
            } else {
                btn[num].className = 'circle';
            }
        }
    }

    let timer = showPicture();

    for(var j = 0;j < btn.length;j++) {
        btn[j].onmouseenter = (function(index) {
            return function() {
                clearInterval(timer);
                imageParent.style.transform = `translate3d(${-200*(index + 1)}px, 0, 0)`;
                selectedBtn(index);
                i = index + 1;
            }
        })(j);
        btn[j].onmouseleave = (function(index) {
            return function() {
                timer = showPicture();
                imageParent.style.transform = `translate3d(${-200*(index + 1)}px, 0, 0)`;
            }
        })(j);
    }
}
