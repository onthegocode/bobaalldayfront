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
			body.classList.toggle("noMove");
			nav.classList.toggle("open");
			burgerMenu.classList.toggle("open");
			mobileMenuBg.classList.toggle("mobileMenuBackground-open");
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
		const curvedElW = document.querySelectorAll(".curved-w");
		const curvedElements = [...curvedEl, ...curvedElW];

		const curved = curvedEl[0];
		let curvedHeight = -curved.getBoundingClientRect().height.toFixed(2);
		let curvedBottom = (
			curved.getBoundingClientRect().height.toFixed(2) * 2.5
		).toFixed(2);

		if (resized < 500) {
			curvedElements.forEach((e) => {
				e.style.cssText = `width: ${resized + 20}px; left: -10px;`;
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

			if (resized < 500) {
				curvedElements.forEach((e) => {
					e.style.cssText = `width: ${resized + 20}px; left: -10px;`;
				});
			}
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

	// Subject Colored
	const subColored = () => {
		const subject = document.getElementById("subject");

		subject.addEventListener("change", (e) => {
			if (subject.value != "") {
				subject.classList.add("subjectColored");
			} else {
				subject.classList.remove("subjectColored");
			}
		});
	};
	subColored();
});
