const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.site-nav a');
const sections = [...navLinks].map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const typedQuery = document.querySelector('.typed-query');
const engineNodes = document.querySelectorAll('.engine-node');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelector('#year').textContent = new Date().getFullYear();

const closeMenu = () => {
	menuToggle?.setAttribute('aria-expanded', 'false');
	siteNav?.classList.remove('is-open');
};

menuToggle?.addEventListener('click', () => {
	const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
	menuToggle.setAttribute('aria-expanded', String(willOpen));
	siteNav?.classList.toggle('is-open', willOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if ('IntersectionObserver' in window && !reduceMotion) {
	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.12, rootMargin: '0px 0px -7% 0px' }
	);

	revealItems.forEach((item, index) => {
		item.style.setProperty('--delay', `${(index % 4) * 80}ms`);
		revealObserver.observe(item);
	});

	const navObserver = new IntersectionObserver(
		(entries) => {
			const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (!current) return;
			navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${current.target.id}`));
		},
		{ threshold: 0.2, rootMargin: '-28% 0px -55% 0px' }
	);
	sections.forEach((section) => navObserver.observe(section));
} else {
	revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (typedQuery && !reduceMotion) {
	const queries = JSON.parse(typedQuery.dataset.queries || '[]');
	let queryIndex = 0;
	let charIndex = typedQuery.textContent.length;
	let deleting = true;
	let pause = 1600;

	const typeLoop = () => {
		const phrase = queries[queryIndex];
		if (!phrase) return;
		if (pause > 0) {
			pause -= 80;
			window.setTimeout(typeLoop, 80);
			return;
		}
		charIndex += deleting ? -1 : 1;
		typedQuery.textContent = phrase.slice(0, Math.max(0, charIndex));
		if (deleting && charIndex <= 0) {
			deleting = false;
			queryIndex = (queryIndex + 1) % queries.length;
		} else if (!deleting && charIndex >= queries[queryIndex].length) {
			deleting = true;
			pause = 2000;
		}
		window.setTimeout(typeLoop, deleting ? 34 : 56);
	};
	window.setTimeout(typeLoop, 2000);
}

if (engineNodes.length && !reduceMotion) {
	let activeNode = 0;
	window.setInterval(() => {
		engineNodes[activeNode].classList.remove('active');
		activeNode = (activeNode + 1) % engineNodes.length;
		engineNodes[activeNode].classList.add('active');
	}, 1600);
}

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') closeMenu();
});
