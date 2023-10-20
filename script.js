document.addEventListener('DOMContentLoaded', function() {
	var h1 = document.querySelector('h1');
	var h2 = document.querySelector('h2');
	
	h1.classList.add('fade-in');
	h2.classList.add('fly-up');
});

const background = document.querySelector(".background");

background.addEventListener("mousemove", e => {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  background.style.setProperty("--mouseX", mouseX);
  background.style.setProperty("--mouseY", mouseY);
});

