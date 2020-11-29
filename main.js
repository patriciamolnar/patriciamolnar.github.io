window.addEventListener('DOMContentLoaded', setup); 

function setup() {
    //No Outline Unless Tabbing
    document.body.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
          document.documentElement.classList.remove('no-focus-outline');
        }
    });
    
    //Intersection Observer headline underline
    const faders = document.querySelectorAll('.section-title'); 

    const appearOptions = {
        threshold: 0, 
        rootMargin: '0px 0px -200px 0px'
    }; 

    const appearOnScroll = new IntersectionObserver(
        function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if(!entry.isIntersecting) { return; }
                else { 
                    entry.target.classList.add('underline'); 
                    appearOnScroll.unobserve(entry.target);
                }
            })
        }, appearOptions
    );

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    }); 


    // Mobile Navigation 
    const nav = document.getElementById('nav');
    const header = document.querySelector('header');

    function openCloseNav(e) {
        e.target.classList.toggle("change"); 
        nav.classList.toggle('show');
        nav.classList.toggle('notransition');   
        header.classList.toggle('show');

        const lis = document.querySelectorAll('#nav li'); 

        let num = lis.length; 
        let delay = 0.3;  
        while(num > 0) {
            lis[lis.length - num].style.animationDelay = delay + 's'; 
            num--; 
            delay += 0.3; 
        } 
    }

    const burger = document.querySelector('.burger'); 
    burger.addEventListener('click', function(e) {
        openCloseNav(e);
    }); 

    function removeStyle() {
        nav.classList.remove('show');
        header.classList.remove('show');
        nav.classList.toggle('notransition');
        document.querySelector('.burger').classList.remove('change');
    }

    //close navigation when nav link is clicked on mobile
    const navLinks = document.querySelectorAll('.nav-links');
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', function() {
            if(window.innerWidth < 1024) {
                removeStyle(); 
            }
        });
    });


    //Lazy Loading Video 

    const lazyVideos = [].slice.call(document.querySelectorAll(".lazy-video"));

    if ("IntersectionObserver" in window) {
    const lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(video) {
        if (video.isIntersecting) {
            for (const source in video.target.children) {
            const videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                videoSource.src = videoSource.dataset.src;
            }
            }

            video.target.load();
            video.target.classList.remove("lazy");
            lazyVideoObserver.unobserve(video.target);
        }
        });
    });

    lazyVideos.forEach(function(lazyVideo) {
        lazyVideoObserver.observe(lazyVideo);
    });
    }


    // Changing Nav bar color for desktop Intersection Observer 

    const welcomeSection = document.querySelector('.welcome'); 
		
    const options = {
        root: null, 
        threshold: 0,
        rootMargin: "-250px"
    }
    
    const observer = new IntersectionObserver( (entries, observer) => {
        entries.forEach(entry => {
            
            if(entry.isIntersecting) {
                header.classList.remove('show');; 
            } 

            if(!entry.isIntersecting) {
                header.classList.add('show');
            }
            
        })
    }, 
    options); 
    
    function checkSize() {
        if(window.innerWidth >= 1024) {
            observer.observe(welcomeSection); 
        } else {
            observer.unobserve(welcomeSection);
            header.classList.remove('show');
        }
    }

    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('resize', removeStyle);

    

    // Desktop Navigation - change colour of nav links based on where is on page. 
    const sections = document.querySelectorAll('section');

    const newOptions = {
        root: null, 
        threshold: 0,
        rootMargin: "-310px 0px"
    }

    const sectionObserver = new IntersectionObserver( (entries, observer) => {
        entries.forEach(entry => {
            
            if(entry.isIntersecting) {
                document.querySelector('a[href="#' + entry.target.getAttribute('id') + '"]').classList.add('underline'); 
            } else {
                document.querySelector('a[href="#' + entry.target.getAttribute('id') + '"]').classList.remove('underline');
            }

            
        })
    }, 
    newOptions); 

    sections.forEach(section => {
        sectionObserver.observe(section); 
    });

    
}