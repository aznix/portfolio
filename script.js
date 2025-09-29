// loading screen en overgang naar landing page
const letters = document.querySelectorAll(".loading span");
gsap.to(".loading span", {
  color: "white",
  duration: 0.8,
  textShadow: '0 0 20px white',
  yoyo: true,       
  stagger: 0.15,
  ease: "power1.in",
  onComplete: () => {
    gsap.to(".loading", {
      opacity: 0,
      duration: 1,
      delay: 1.5,
      onComplete: () => {
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".scroll-container").style.overflowY = "scroll"; 
        document.querySelector(".scroll-container").scrollTo(0, 0);
      }
    });
  }
});

// progress bar 
const scrollContainer = document.querySelector(".scroll-container");

scrollContainer.addEventListener("scroll", () => {
  const scrollTop = scrollContainer.scrollTop;
  const docHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
  const scrollPercent = scrollTop / docHeight;

  const progressBar = document.getElementById("scroll-indicator");
  if (progressBar) {
    const maxHeight = 300; // max 300px hoog
    progressBar.style.height = `${scrollPercent * maxHeight}px`; // <-- height ipv width
  }
});

// Particles genereren
const container = document.querySelector('.particles');
const totalParticles = 180; // niet te veel = soepel

// 1. particles maken
for (let i = 0; i < totalParticles; i++) {
  let p = document.createElement('div');
  p.classList.add('particle');
  container.appendChild(p);

  // random startpositie
  gsap.set(p, {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  });

  // 2. per particle een eigen animatie
  gsap.to(p, {
    x: `+=${Math.random() * 60 - 30}`, // random range -30 tot +30
    y: `+=${Math.random() * 60 - 30}`,
    duration: Math.random() * 3 + 2,   // random snelheid
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// Blokkeer Ctrl + scroll of Ctrl + +/- 
window.addEventListener("wheel", function(e) {
  if (e.ctrlKey) e.preventDefault();
}, { passive: false });

window.addEventListener("keydown", function(e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "-" || e.key === "0")) {
    e.preventDefault();
  }
});



gsap.to('.about span', {
  scale: 1.3,
  color: 'white',
  textShadow: '0 0 20px white',
  repeat: -1,
  yoyo: true,       
  stagger: 0.15,
  ease: "power1.inOut"
});

// Icons animations about me

gsap.registerPlugin(MotionPathPlugin);

let tl = gsap.timeline({ repeat: -1, defaults: { duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" } });

const icons = [".ico-java", ".ico-css", ".ico-gsap", ".ico-html"];


icons.forEach((icon, i) => {
  gsap.to(icon, {
    duration: 12,
    repeat: -1,
    ease: "linear",
    motionPath: {
      path: "#circlePath",
      align: "#circlePath",
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
      start: i * 0.25, 
      end: i * 0.25 + 1
    }
  }),
  tl.to(".ico-java", { scale: 1.3, duration: 1 })  
   .to(".ico-css",  { scale: 1.3, duration: 1 })  
   .to(".ico-gsap", { scale: 1.3, duration: 1 })  
   .to(".ico-html", { scale: 1.3, duration: 1 });
});

const mm = gsap.matchMedia();

mm.add("(max-width: 430px)", () => {

  gsap.registerPlugin(MotionPathPlugin);

  const icons = [".ico-java", ".ico-css", ".ico-gsap", ".ico-html"];

  gsap.set(".ico-java, .ico-css, .ico-gsap, .ico-html", { x: 0, y: 0 });

  // Animatie over de kleine path
  icons.forEach((icon, i) => {
    gsap.to(icon, {
      duration: 12,
      repeat: -1,
      ease: "linear",
      motionPath: {
        path: "#circlePathSmall",
        align: "#circlePathSmall",
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start: i * 0.25,
        end: i * 0.25 + 1
      }
    });
  });

  // Timeline voor icon scaling (los van loop)
  let tl = gsap.timeline({ repeat: -1, defaults: { duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" } });
  tl.to(".ico-java", { scale: 1.3, duration: 1 })  
    .to(".ico-css",  { scale: 1.3, duration: 1 })  
    .to(".ico-gsap", { scale: 1.3, duration: 1 })  
    .to(".ico-html", { scale: 1.3, duration: 1 });
});


gsap.to('.hero-aboutme', {
  duration: 1,
  repeat: -1,
  yoyo:true,
  ease: 'power3.in',
  boxShadow: "0 0 50px #1DCD9F"
})

gsap.registerPlugin(ScrollTrigger);

gsap.to('.hero-aboutme', {
  y: -30,
  opacity: 1,
  duration: 1,
  scrollTrigger: {
    trigger: '.hero-aboutme',
    scroller: '.scroll-container', // heel belangrijk!
    start: '10% 60%',
    end: '70% 40%',
    toggleActions: "play none none reverse",
  }
});

// Project animations

const proTitle = document.querySelector('.project-title');

gsap.to(proTitle, {
  duration: 1,
  opacity: 1,
  y: -30,
  scrollTrigger: {
    trigger: proTitle,
    scroller: '.scroll-container',
    start: '10% 60%',
    end: '70% 40%',
    toggleActions: "play none none reverse",
  }
})

const project1 = document.querySelector('.project1')

mm.add("(min-width: 431px)", () => {
  gsap.to(project1, {
    duration: 1,
    opacity: 1,
    x: 450,
    scrollTrigger: {
      trigger: project1,
      scroller: '.scroll-container',
      start: '-40% 10%',
      end: '10% 10%',
      scrub: 1,
      toggleActions: "play reverse play reverse",
    }
  });
});

mm.add("(max-width: 430px)", () => {
  gsap.to(project1, {
  duration: 1,
  opacity: 1,
  y: -100,
  scrollTrigger: {
    trigger: project1,
    scroller: '.scroll-container',
    start: '-130% 10%',
    end: '10% 10%',
    toggleActions: "play none none reverse",
  }
  })
});

const project2 = document.querySelector('.project2')

mm.add("(min-width: 431px)", () => {
  gsap.to(project2, {
  duration: 1,
  opacity: 1,
  y: -200,
  scrollTrigger: {
    trigger: project2,
    scroller: '.scroll-container',
    start: '-105% 10%',
    end: '-10% 10%',
    scrub: 1,
    toggleActions: "play reverse play reverse",
    }
  })
});

mm.add("(max-width: 430px)", () => {
  gsap.to(project2, {
  duration: 1,
  opacity: 1,
  y: -20,
  scrollTrigger: {
    trigger: project2,
    scroller: '.scroll-container',
    start: '-135% 10%',
    end: '-10% 10%',
    toggleActions: "play none none reverse",
  }
  })
});

const project3 = document.querySelector('.project3')

mm.add("(min-width: 431px)", () => {
  gsap.to(project3, {
  duration: 1,
  opacity: 1,
  y: -350,
  x: -350,
  scrollTrigger: {
    trigger: project3,
    scroller: '.scroll-container',
    start: '-130% 10%',
    end: '-55% 10%',
    scrub: 1,
    toggleActions: "play reverse play reverse",
    }
  })  
});

mm.add("(max-width: 430px)", () => {
  gsap.to(project3, {
  duration: 1,
  opacity: 1,
  y: -20,
  scrollTrigger: {
    trigger: project3,
    scroller: '.scroll-container',
    start: '-100% 10%',
    end: '-55% 10%',
    toggleActions: "play none none reverse",
    }
  })
});



// Upcoming title animation

const upcomingTitle = document.querySelector('.upcoming-title');


mm.add("(min-width: 431px)", () => {
  gsap.to(upcomingTitle, {
    duration: 1, 
    y: -150,
    opacity: 1,
    scrollTrigger: {
      trigger: upcomingTitle,
      scroller: '.scroll-container',
      start: '-165% 10%',
      end: '-30% 10%',
      scrub: 1,
      toggleActions: "play none none reverse"
    }
  })
});

mm.add("(max-width: 430px)", () => {
  gsap.to(upcomingTitle, {
    duration: 1, 
    y: -45,
    opacity: 1,
    scrollTrigger: {
      trigger: upcomingTitle,
      scroller: '.scroll-container',
      start: '-145% 10%',
      end: '-30% 10%',
      toggleActions: "play none none reverse"
    }
  })
});


// Project in progress animation

const upPro1 = document.querySelector('.projectup1')
const upPro2 = document.querySelector('.projectup2')
const upPro3 = document.querySelector('.projectup3')


mm.add("(min-width: 431px)", () => {
  gsap.to(upPro1, {
    y: -200,
    x: 100,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: upPro1,
      scroller: '.scroll-container',
      start: '-220% 10%',
      end: '-100% 10%',
      scrub: 1,
      toggleActions: "play none none reverse"
    }
  })
});


mm.add("(max-width: 430px)", () => {
  gsap.to(upPro1, {
    y: -80,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: upPro1,
      scroller: '.scroll-container',
      start: '-140% 10%',
      end: '-10% 10%',
      toggleActions: "play none none reverse"
    }
  })
});

mm.add("(min-width: 431px)", () => {
  gsap.to(upPro2, {
    y: -220,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: upPro2,
      scroller: '.scroll-container',
      start: '-220% 10%',
      end: '-100% 10%',
      scrub: 1,
      toggleActions: "play none none reverse"
    }
  })
});


mm.add("(max-width: 430px)", () => {
  gsap.to(upPro2, {
    y: -30,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
    trigger: upPro2,
    scroller: '.scroll-container',
    start: '-170% 10%',
    end: '-100% 10%',
    toggleActions: "play none none reverse"
    }
  })
});

mm.add("(min-width: 431px)", () => {
  gsap.to(upPro3, {
    y: -200,
    x: -100,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: upPro3,
      scroller: '.scroll-container',
      start: '-220% 10%',
      end: '-100% 10%',
      scrub: 1,
      toggleActions: "play none none reverse"
    }
  })
});


mm.add("(max-width: 430px)", () => {
  gsap.to(upPro3, {
    y: -30,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: upPro3,
      scroller: '.scroll-container',
      start: '-260% 10%',
      end: '-100% 10%',
      toggleActions: "play none none reverse"
    }
  })
});

// Project in progress box shadows

gsap.to('.projectup1', {
  duration: 1,
  repeat: -1,
  ease: 'power2.inOut',
  yoyo: true,
  boxShadow: '0 0 30px #1DCD9F'
})

gsap.to('.projectup3', {
  duration: 1,
  repeat: -1,
  ease: 'power2.inOut',
  yoyo: true,
  boxShadow: '0 0 30px #1DCD9F'
})

gsap.to('.projectup2', {
  duration: 1,
  repeat: -1,
  ease: 'power2.inOut',
  yoyo: true,
  boxShadow: '0 0 30px #1DCD9F'
})

// Project in progress title animation

gsap.to('.upcoming-projects svg', {
  repeat: -1,
  rotation: 360,
  ease: 'none',
  duration: 0.8
})

// // Contact title animation

mm.add("(min-width: 431px)", () => {
  gsap.to('.contact-title', {
    duration: 1,
    opacity: 1,
    y: -340,
    scrollTrigger: {
      trigger: '.contact-title',
      scroller: '.scroll-container',
      start: '-310% 70%',
      end: '-20% 60%',
      toggleActions: 'play none none reverse'
    }
  })
});


mm.add("(max-width: 430px)", () => {
  gsap.to('.contact-title', {
    duration: 1,
    opacity: 1,
    y: -340,
    scrollTrigger: {
      trigger: '.contact-title',
      scroller: '.scroll-container',
      start: '-420% 70%',
      end: '-20% 60%',
      toggleActions: 'play none none reverse'
    }
  })
});

// // Contact form box shadow animation

gsap.to('.contact-main', {
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: 'power3.in',
  boxShadow: '0 0 30px #1DCD9F'
})

// // Contact form animation


mm.add("(min-width: 431px)", () => {
  gsap.to('.contact-main', {
    duration: 1,
    opacity: 1,
    y: -700,
    scrollTrigger: {
      trigger: '.contact-main',
      scroller: '.scroll-container',
      start: '-120% 70%',
      end: '-30% 60%',
      toggleActions: 'play none none reverse'
    }
  })
});


mm.add("(max-width: 430px)", () => {
  gsap.to('.contact-main', {
    duration: 1,
    opacity: 1,
    y: -300,
    scrollTrigger: {
      trigger: '.contact-main',
      scroller: '.scroll-container',
      start: '-20% 70%',
      end: '0% 60%',
      toggleActions: 'play none none reverse'
    }
  })
});

// // Contact sub text animation

gsap.to('.hire-sub', {
  duration: 1, 
  opacity: 1, 
  y: -200,
  scrollTrigger: {
    trigger: '.hire-sub',
    scroller: '.scroll-container',
    start: '-160% 70%',
    end: '-80% 90%',
    toggleActions: 'play none none reverse'
  }
});


gsap.to('.or-sub', {
  duration: 1,
  opacity: 1,
  y: -200,
  scrollTrigger: {
    trigger: '.or-sub',
    scroller: '.scroll-container',
    start: '-160% 70%',
    end: '-90% 90%',
    toggleActions: 'play none none reverse'
  }
 
});

gsap.to('.que-sub', {
  duration: 1,
  opacity: 1, 
  y: -200,
  scrollTrigger: {
    trigger: '.que-sub',
    scroller: '.scroll-container',
    start: '-200% 70%',
    end: '-90% 60%',
    toggleActions: 'play none none reverse'
  }
});


// Question mark animation
let bounceStarted = false;

gsap.to('.que-mark', {
  duration: 1,
  opacity: 1,
  y: "-356%",
  x: "380%",
  scrollTrigger: {
    trigger: '.que-mark',
    scroller: '.scroll-container',
    start: '-310% 70%',
    end: '-250% 60%',
    toggleActions: 'play none none reverse',
  },
  onComplete: () => {
    // check if bounce is started so it doesn't stack the animation what causes piling up the animation and makes the question mark go down if u keep restarting the animation
    if (!bounceStarted) {
      bounceStarted = true; 
      gsap.to('.que-mark', {
        y: "+=10",
        duration: 0.7,
        yoyo: true,
        repeat: -1,
        ease: "none"
      });
    }
  }
});

// Error/Success message for contact

const textarea = document.getElementById("message");
const errorBox = document.getElementById("error");

let timeoutId;

textarea.addEventListener("input", () => {
const msg = textarea.value.trim(); // Get text from textarea and remove spaces at start/end
const words = msg.split(/\s+/).filter(w => w.length > 0); // Split text into words, remove empty strings

let error = ""; // Variable to store error message

if (msg.length < 10) { // Check if message has at least 10 characters (ignores leading/trailing spaces)
  error = "⚠️ Message must be at least 10 characters long"; // Shows error message if too short
  } else if (words.length < 3) { // Check if message has at least 3 words
  error = "⚠️ Message must contain at least 3 words"; // Shows error message if not enough words
  } else if (words.filter(w => w.length >= 3).length < 3) { // Check if there are at least 3 meaningful words (3+ characters)
  error = "⚠️ Message must contain at least 3 meaningful words (3+ characters)"; // Shows error message if not
}

if (error) { // If any error exists
  errorBox.style.color = "red"; // Set error text color to red
  errorBox.textContent = error; // Display error message
  } else { // No errors
  errorBox.style.color = "green"; // Set text color to green
  errorBox.textContent = "✅ Message looks good!"; // Display success message
} 

 // If new content, timer resets
  if (timeoutId) clearTimeout(timeoutId);

  // After 7 seconds content disappears
  timeoutId = setTimeout(() => {
    errorBox.textContent = "";
  }, 4000); 
});

// Footer button redirections if clicked

document.getElementById('about-foot').addEventListener('click', () => {
  const contactSection = document.querySelector('.about-text');
  contactSection.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('project-foot').addEventListener('click', () => {
  const projectTitle = document.querySelector('.hero-projects');
  projectTitle.scrollIntoView({ behavior: 'smooth'});
});

document.getElementById('upcom-foot').addEventListener('click', () => {
  const section = document.querySelector('.upcoming-title'); 
  section.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('contact-foot').addEventListener('click', () => {
  const section = document.querySelector('.contact-title'); 
  section.scrollIntoView({ behavior: 'smooth' });
});
