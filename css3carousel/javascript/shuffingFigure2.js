window.onload = function() {
    let images = document.getElementsByTagName('img');
    let imageParent = document.getElementsByClassName('img_list')[0];
    let picture_list = document.getElementsByClassName('picture_list')[0];
    let i = 1;
    let animationing = false;

    let btn = document.getElementsByClassName('circle');

    Array.prototype.forEach.call(images, function(img) {
        pictureResize(img);
    });

    function showPicture() {
        if(animationing) return;

        animationing = true;
        imageParent.style.transitionDuration = `${0.5}s`;
        if(i === 5) {
            imageParent.style.transform = `translate3d(${-1200}px, 0, 0)`;
            var innerTimer = setInterval(function() {
                imageParent.style.transitionDuration = '0.0s';//important
                imageParent.style.transform = `translate3d(${-200}px, 0, 0)`;
                animationing = false;
                clearInterval(innerTimer);
                i = 1;
            }, 1000);
            //此处要大于transition的时间1s才能看起来流畅
            //否则transition还没做完，图片就切换了
        } else {
            imageParent.style.transform = `translate3d(${-200*(i+1)}px, 0, 0)`;
            i++;
            animationing = false;
        }
    }

    function next() {
        if(animationing) return; //important
        if(i === 5) {
            selectedBtn(0);
        } else {
            selectedBtn(i);
        }
        showPicture();
    }

    function showPicture_prev() {
        if(animationing) return;

        animationing = true;
        imageParent.style.transitionDuration = `${0.5}s`;
        if(i < 0) {
            imageParent.style.transform = `translate3d(${0}px, 0, 0)`;
            var innerTimer = setInterval(function() {
                imageParent.style.transitionDuration = '0.0s';//important
                imageParent.style.transform = `translate3d(${-1000}px, 0, 0)`;
                animationing = false;
                clearInterval(innerTimer);
            }, 1000);
            //此处要大于transition的时间才能看起来流畅
            //否则transition还没做完，图片就切换了
        } else {
            imageParent.style.transform = `translate3d(${-200*(i+1)}px, 0, 0)`;
            animationing = false;
        }
    }
    function prev() {
        if(animationing) return; //important

        if(i > 0) {
            i--;
            selectedBtn(i);
            showPicture_prev();
        } else if(i===0){
            //而i === 0的时候走的是下面的逻辑
            //切换保持在第一处 -200 ——》0
            //按钮选择的却是4
            i--;
            selectedBtn(4);
            showPicture_prev();
            i = 4;
        }
    }

    function defaultShowPicture(index) {
        let timer = setInterval(function() {
            next();
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

    let timer = defaultShowPicture();

    for(var j = 0;j < btn.length;j++) {
        btn[j].onmouseenter = (function(index) {
            return function() {
                clearInterval(timer);
                imageParent.style.transform = `translate3d(${-200*(index + 1)}px, 0, 0)`;
                selectedBtn(index);
                i = index + 1;
            }
        })(j);
        btn[j].onmouseleave = (function() {
            return function() {
                timer = defaultShowPicture();
            }
        })();
    }

    let arrow1 = document.getElementsByClassName('arrow1')[0];
    let arrow2 = document.getElementsByClassName('arrow2')[0];
    arrow1.addEventListener('click', () => {
        clearInterval(timer);
        next();
    }, false);
    arrow2.addEventListener('click', () => {
        clearInterval(timer);
        prev();
    }, false);

    arrow1.addEventListener('mouseleave', () => {
        clearInterval(timer);
        timer = defaultShowPicture();
    }, false);
    arrow2.addEventListener('mouseleave', () => {
        clearInterval(timer);
        timer = defaultShowPicture();
    }, false);

    picture_list.addEventListener('mouseleave', () => {
        clearInterval(timer);
        timer = defaultShowPicture();
    }, false);
}
