console.log('Its working')

let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('light')
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')


for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode
		console.log('Option clicked:', mode)
		setTheme(mode)
	})
}

function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'default.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'blue.css'
	}
	localStorage.setItem('theme', mode)
}

const carouselTrack = document.querySelector('.carousel-track');
const posts = Array.from(document.querySelectorAll('.carousel-card'));
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
let currentIndex = 0;

function moveCarousel(index) {
    if (index !== undefined) {
        currentIndex = index;
    } else {
        currentIndex = (currentIndex + 1) % posts.length;
    }

    // Get the actual width of each card including margin
    const cardWidth = posts[0].getBoundingClientRect().width;
    const cardMarginRight = parseFloat(getComputedStyle(posts[0]).marginRight);
    const totalCardWidth = cardWidth + cardMarginRight;

    // Calculate the offset for the translation
    const offset = -currentIndex * totalCardWidth;

    // Move the carousel
    carouselTrack.style.transform = `translateX(${offset}px)`;
}

// Next button click event
nextButton.addEventListener('click', () => {
    if (currentIndex < posts.length - 1) {
        moveCarousel(currentIndex + 1);
    } else {
        moveCarousel(0); // Loop back to the first slide
    }
});

// Previous button click event
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        moveCarousel(currentIndex - 1);
    } else {
        moveCarousel(posts.length - 1); // Loop back to the last slide
    }
});

// Start the carousel movement
setInterval(() => moveCarousel(), 3000);
