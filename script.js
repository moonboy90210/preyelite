const images = document.querySelectorAll('.image1'); // select all images with class 'pics'
// const popup = document.getElementById('popup');
// const popupImg = document.getElementById('popupImg');
// const closeBtn = document.getElementById('closeBtn');

// images.forEach(img => {
//     img.addEventListener('click', () => {
//         const fullImgSrc = img.getAttribute('data-full'); // get the full image source from data-full attribute
//         popupImg.src = fullImgSrc;  // set the popup image source
//         popup.classList.remove('hidden'); // remove hidden class to show the popup
//     });
// });


// });

document.addEventListener('keydown', (e) => {
	if (!popup.classList.contains('hidden')) {
		if (e.key === 'Escape') {
			popup.classList.add('hidden');
		}
	}
});

// Track current image index for navigation
let currentIndex = -1;
const imageArray = Array.from(images);

// Set currentIndex on image click and show popup
images.forEach((img, idx) => {
	img.addEventListener('click', () => {
		currentIndex = idx;
		showImage(currentIndex);
	});
});

// Show image in popup by index
function showImage(index) {
	if (index >= 0 && index < imageArray.length) {
		const fullImgSrc = imageArray[index].getAttribute('data-full');
		popupImg.src = fullImgSrc;
		popup.classList.remove('hidden');
		currentIndex = index;
		updateNavButtons();
	}
}


// Keyboard navigation for desktop
document.addEventListener('keydown', (e) => {
	if (!popup.classList.contains('hidden')) {
		if (e.key === 'ArrowRight') {
			if (currentIndex < imageArray.length - 1) {
				showImage(currentIndex + 1);
			}
		} else if (e.key === 'ArrowLeft') {
			if (currentIndex > 0) {
				showImage(currentIndex - 1);
			}
		}
	}
});
// close on click of close button
closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});

// Optional: Close popup when clicking outside the image
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.add('hidden');
    }});
// Touch swipe navigation for mobile
let touchStartX = 0;
let touchEndX = 0;

popup.addEventListener('touchstart', (e) => {
	if (e.touches.length === 1) {
		touchStartX = e.touches[0].clientX;
	}
});

popup.addEventListener('touchend', (e) => {
	if (e.changedTouches.length === 1) {
		touchEndX = e.changedTouches[0].clientX;
		handleSwipe();
	}
});

function handleSwipe() {
	const swipeThreshold = 50; // Minimum px distance for swipe
	if (touchEndX < touchStartX - swipeThreshold && currentIndex < imageArray.length - 1) {
		showImage(currentIndex + 1); // Swipe left, next image
	} else if (touchEndX > touchStartX + swipeThreshold && currentIndex > 0) {
		showImage(currentIndex - 1); // Swipe right, previous image
	}
}

// Tap left or right to change image
popup.addEventListener('click', (e) => {
	if (e.target === popupImg) {
		const rect = popupImg.getBoundingClientRect();
		const x = e.clientX;
		const leftZone = rect.left + rect.width * 0.3;
		const rightZone = rect.right - rect.width * 0.3;
		if (x < leftZone && currentIndex > 0) {
			showImage(currentIndex - 1);
		} else if (x > rightZone && currentIndex < imageArray.length - 1) {
			showImage(currentIndex + 1);
		}
	}
});

// --- Add left/right navigation buttons for desktop ---

// Create buttons
const leftBtn = document.createElement('button');
const rightBtn = document.createElement('button');
leftBtn.innerHTML = '&#8592;';
rightBtn.innerHTML = '&#8594;';
leftBtn.setAttribute('aria-label', 'Previous image');
rightBtn.setAttribute('aria-label', 'Next image');
leftBtn.style.position = rightBtn.style.position = 'absolute';
leftBtn.style.top = rightBtn.style.top = '50%';
leftBtn.style.transform = rightBtn.style.transform = 'translateY(-50%)';
leftBtn.style.left = '40px';
rightBtn.style.right = '40px';
leftBtn.style.zIndex = rightBtn.style.zIndex = '1001';
leftBtn.style.fontSize = rightBtn.style.fontSize = '2rem';
leftBtn.style.background = rightBtn.style.background = 'rgba(87, 87, 87, 0.5)';
leftBtn.style.color = rightBtn.style.color = '#fff';
leftBtn.style.border = rightBtn.style.border = 'none';
leftBtn.style.borderRadius = rightBtn.style.borderRadius = '50%';
leftBtn.style.width = rightBtn.style.width = '48px';
leftBtn.style.height = rightBtn.style.height = '50px';
leftBtn.style.cursor = rightBtn.style.cursor = 'pointer';
leftBtn.style.display = rightBtn.style.display = 'none'; // hidden by default

// Add to popup
popup.appendChild(leftBtn);
popup.appendChild(rightBtn);

// Show/hide buttons based on screen size and image index
function updateNavButtons() {
	const isDesktop = window.innerWidth >= 768;
	leftBtn.style.display = (isDesktop && currentIndex > 0) ? 'block' : 'none';
	rightBtn.style.display = (isDesktop && currentIndex < imageArray.length - 1) ? 'block' : 'none';
}

// Update buttons on resize
window.addEventListener('resize', updateNavButtons);

// Button click handlers
leftBtn.addEventListener('click', (e) => {
	e.stopPropagation();
	if (currentIndex > 0) showImage(currentIndex - 1);
});
rightBtn.addEventListener('click', (e) => {
	e.stopPropagation();
	if (currentIndex < imageArray.length - 1) showImage(currentIndex + 1);
});



