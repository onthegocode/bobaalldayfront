"use strict";
window.addEventListener("load", () => {
	let resized = window.innerWidth;

	// Mobile Menu
	const mobileNav = () => {
		const nav = document.querySelector(".navMenu");
		const burgerMenu = document.querySelector(".burgerMenuLink");
		const body = document.querySelector("body");
		const mobileMenuBg = document.querySelector(".mobileMenuBackground");

		window.addEventListener("resize", () => {
			if (resized > 840) {
				body.classList.remove("noMove");
				nav.classList.remove("open");
				burgerMenu.classList.remove("open");
				mobileMenuBg.classList.remove("mobileMenuBackground-open");
			}
			resized = window.innerWidth;
		});

		//Click actions
		nav.addEventListener("click", (e) => {
			if (e.target.tagName.toLowerCase() === "a" && resized < 840) {
				body.classList.toggle("noMove");
				nav.classList.toggle("open");
				burgerMenu.classList.toggle("open");
				mobileMenuBg.classList.toggle("mobileMenuBackground-open");
			}
		});

		burgerMenu.addEventListener("click", () => {
			if (resized < 840) {
				body.classList.toggle("noMove");
				nav.classList.toggle("open");
				burgerMenu.classList.toggle("open");
				mobileMenuBg.classList.toggle("mobileMenuBackground-open");
			}
		});
	};
	mobileNav();

	// Curved Background Heights - ensures the total height of the curve is showing.
	const curvedFunc = () => {
		const curvedEl = document.querySelectorAll(".curved");
		const curved = curvedEl[0];
		let curvedHeight = -curved.getBoundingClientRect().height.toFixed(2);
		let curvedBottom = (
			curved.getBoundingClientRect().height.toFixed(2) * 2.5
		).toFixed(2);

		if (resized < 500) {
			curvedEl.forEach((e) => {
				e.style.cssText = `width: ${resized + 20}px;`;
			});
		}

		window.addEventListener("resize", () => {
			resized = window.innerWidth;
			curvedHeight = -curved.getBoundingClientRect().height.toFixed(2);
			curvedBottom = curved.getBoundingClientRect().height.toFixed(2) * 2.5;

			document.documentElement.style.setProperty(
				"--curved-height",
				curvedHeight + "px"
			);
			document.documentElement.style.setProperty(
				"--curved-bottom",
				curvedBottom + "px"
			);
		});
		document.documentElement.style.setProperty(
			"--curved-height",
			curvedHeight + "px"
		);
		document.documentElement.style.setProperty(
			"--curved-bottom",
			curvedBottom + "px"
		);
	};
	curvedFunc();

	//Glidejs

	const config = {
		type: "slider",
		rewind: true,
		bound: true,
		startAt: 0,
		autoplay: 5000,
		hoverpause: true,
		perView: 3,
		breakpoints: {
			1080: {
				perView: 2,
			},
			720: {
				perView: 1,
			},
		},
	};

	var glide = new Glide(".glide", config);

	const glideBullets = document.querySelectorAll(".glide__bullet");

	let i = 0;
	const responsiveGlide = function (e, bullet, num) {
		const steps = +e.steps;
		const direction = e.direction;

		//Use arrows to determine if to add or subtract, also account for stesp and arrow to see if it reset or not and which direction
		if (direction === ">" && i < num) {
			i++;
		} else if (direction === "<" && i < num) {
			i--;
		} else if (steps === 0 && direction === "=") {
			bullet[0].classList.add("glideActive");
			bullet[1].classList.remove("glideActive");
			bullet[2].classList.remove("glideActive");
			i = 0;
		} else if (steps === 3 && direction === "=") {
			bullet[0].classList.remove("glideActive");
			bullet[1].classList.add("glideActive");
			bullet[2].classList.remove("glideActive");
			i = 3;
		} else if (steps === 6 && direction === "=") {
			bullet[0].classList.remove("glideActive");
			bullet[1].classList.remove("glideActive");
			bullet[2].classList.add("glideActive");
			i = 6;
		}

		//Checks to see if its higher than a certain value then it will make first page button active
		if (i === num) {
			bullet[0].classList.add("glideActive");
			bullet[1].classList.remove("glideActive");
			bullet[2].classList.remove("glideActive");
			i = 0;
		}
		//Checks to see if its less than a certain value then it will make last page button active
		else if (i < 0) {
			bullet[0].classList.remove("glideActive");
			bullet[1].classList.remove("glideActive");
			bullet[2].classList.add("glideActive");
			i = num;
		}
		//checks to see if current slide is greater than 5 and if so it will make last page button active
		else if (i > 5) {
			bullet[0].classList.remove("glideActive");
			bullet[1].classList.remove("glideActive");
			bullet[2].classList.add("glideActive");
		}
		//checks to see if i is between 2 and 5 and if so it will make middle page button active
		else if (i > 2 && i < 5) {
			bullet[0].classList.remove("glideActive");
			bullet[1].classList.add("glideActive");
			bullet[2].classList.remove("glideActive");
		}
		//checks to see if i is less than 3 and if so it will make first page button active
		else if (i < 2) {
			bullet[0].classList.add("glideActive");
			bullet[1].classList.remove("glideActive");
			bullet[2].classList.remove("glideActive");
		}
	};
	const glideResponsiveInit = (e) => {
		if (resized > 1080) {
			responsiveGlide(e, glideBullets, 7);
		} else if (resized <= 1080 && resized > 720) {
			responsiveGlide(e, glideBullets, 8);
		} else if (resized <= 720) {
			responsiveGlide(e, glideBullets, 9);
		}
	};

	glide.on("run", function (e) {
		glideResponsiveInit(e);
	});

	glide.mount();

	//Test Out some smart loading stuff like when in view or close or on move/change, load, etc... Basically loading only when needed, kinda like lazy load for code

	//Check to see if Boba Making Section H2 text wrapped

	const headingWrapped = () => {
		const headContainer = document.querySelector(".bobaMakingContent");
		const head = document
			.querySelector(".bobaMakingHeading")
			.querySelector("h2");
		if (head.clientWidth > headContainer.clientWidth) {
			head.style.cssText = "white-space: normal !important";

			head.innerHTML = "<div>The Art Of Boba</div><br/><div>Making</div>";
		}
	};
	headingWrapped();

	//Animations
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(
			(entry) => {
				if (
					entry.isIntersecting &&
					entry.target.classList.contains("hiddenContent")
				) {
					entry.target.classList.add("inView");
					entry.target.parentElement.parentElement.classList.add("inView");
				}
			},
			{
				threshold: 0,
			}
		);
	});

	const aniEl = document.querySelectorAll(".hiddenContent");

	aniEl.forEach((el) => observer.observe(el));
});
