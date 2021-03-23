{
  const slider = document.querySelector('.items');
  const slides = Array.from(slider.children);
  const nextBtn = document.querySelector('.button__next');
  const prevBtn = document.querySelector('.button__previous');
  const startBtn = document.querySelector('.button__start');
  const endBtn = document.querySelector('.button__end')
  let isDown = false;
  let startX;
  let scrollLeft;

  const init = () => {
    console.log('↓↓↓↓↓ INIT START ↓↓↓↓↓');
    checkReach();
    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('scroll', checkReach)
    nextBtn.addEventListener('click', handleNextClick);
    prevBtn.addEventListener('click', handlePreviousClick);
    startBtn.addEventListener('click', handleEndClick);
    endBtn.addEventListener('click', handleEndClick);
  }

  const checkReach = () => {

    if (slider.scrollLeft + window.innerWidth >= slider.scrollWidth) {
      toggleButton('disable', endBtn);
      toggleButton('disable', nextBtn);
    } else if (slider.scrollLeft < 30) {
      toggleButton('disable', startBtn);
      toggleButton('disable', prevBtn)
    } else {
      toggleButton('activate', endBtn);
      toggleButton('activate', startBtn);
      toggleButton('activate', prevBtn);
      toggleButton('activate', nextBtn);
    }
  }

  const toggleButton = (action, button) => {
    if (action == 'activate') {
      button.disabled = false;
      button.style.cursor = 'pointer';
      button.style.opacity = 1;
    } else if (action == 'disable') {
      button.disabled = true;
      button.style.cursor = 'not-allowed';
      button.style.opacity = 0.4;
    }
  }

  const handleEndClick = (e) => {
   
    const desiredPosition = e.currentTarget.dataset.position;
    if (desiredPosition == 'Start') {
      slider.scrollTo(0, 0);
      slides.forEach(slide => { slide.classList.remove('current-slide')})
      slides[0].classList.add('current-slide');  
    } else {
      slider.scrollTo(slider.scrollWidth, 0);
      // slides.forEach(slide => { slide.classList.remove('current-slide')})
      // slides[slides.length - 1].classList.add('current-slide');
    }
  }

  const handleNextClick = (e) => {
    let browser = myFunction();
    if (browser == 'Chrome') {
      console.log('start chrome')
      let slide = document.querySelector('.current-slide');
      const total = slider.scrollLeft + slide.clientWidth;
      console.log(total)
      slider.scrollTo(total, 0);
    } else if (browser == 'Safari') {
      SmoothHorizontalScrolling(document.querySelector('.current-slide'), 275, 100, 0)
    } else {
      slides.forEach(slide => {
        if ((slide.offsetLeft + (slide.clientWidth / 2)) > slider.scrollLeft && (slide.offsetLeft + (slide.clientWidth / 2)) < (slider.scrollLeft + slide.clientWidth) ) {
          
          const total = (slider.scrollLeft + slide.clientWidth);
          
          slide.classList.remove('current-slide');
          slide.nextElementSibling.classList.add('current-slide');
          slider.scrollTo(total, 0);
        } 
      }); 
    }
    
  }

  const handlePreviousClick = (e) => {


    if ((slider.scrollLeft + document.body.offsetWidth) == slider.scrollWidth) {
      var filtered = slides.filter(function(slide) { 
        return (slide.offsetLeft > slider.scrollLeft); 
      });

      let pos = slides[slides.length - filtered.length].previousElementSibling.offsetLeft;
      slider.scrollTo(pos, 0)
    } else {
      slides.forEach(slide => {
        if ((slide.offsetLeft + (slide.clientWidth / 2)) > slider.scrollLeft && (slide.offsetLeft + (slide.clientWidth / 2)) < (slider.scrollLeft + slide.clientWidth) ) {
          const total = (slider.scrollLeft - slide.clientWidth);
          slide.classList.remove('current-slide');
          slide.previousElementSibling.classList.add('current-slide');
          slider.scrollTo(total, 0);
        }
      });  
    }

    
  }

  const handleMouseDown = e => {
    console.log('ok')
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.remove('scrolsnap-container');
  }

  const handleMouseUp = () => {
    isDown = false;
    slider.classList.remove('active');
    slider.classList.add('scrolsnap-container');
    if ((slider.scrollLeft + document.body.offsetWidth) != slider.scrollWidth) {
      slider.scrollTo(slider.scrollLeft + 1, 0)
    }
    
  }

  const handleMouseLeave = () => {
    isDown = false;
    slider.classList.remove('active');
    slider.classList.add('scrolsnap-container');
  }

  const handleMouseMove = e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  }



  const myFunction = () => { 
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
   {
       return('Opera');
   }
   else if(navigator.userAgent.indexOf("Chrome") != -1 )
   {
       return('Chrome');
   }
   else if(navigator.userAgent.indexOf("Safari") != -1)
   {
       return('Safari');
   }
   else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
   {
        return('Firefox');
   }
   else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
   {
     return('IE'); 
   }  
   else 
   {
      return('unknown');
   }
   }

  init();
}