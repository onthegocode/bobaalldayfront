window.addEventListener("DOMContentLoaded", () => {
	let height = window.innerHeight;

	document.documentElement.style.setProperty("--page-height", height + "px");
});

window.addEventListener("resize", () => {
	let height = window.innerHeight;

	document.documentElement.style.setProperty("--page-height", height + "px");
});
