const topbar = document.querySelector('.topbar');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.topnav a');
const proofModal = document.querySelector('#proofModal');
const proofTriggers = document.querySelectorAll('.open-proof');
const proofCloseTargets = document.querySelectorAll('[data-close-proof]');
const proofModalMedia = document.querySelector('.proof-modal-media');
const proofModalImage = document.querySelector('#proofModalImage');
const proofModalPrev = document.querySelector('#proofModalPrev');
const proofModalNext = document.querySelector('#proofModalNext');
const proofModalCounter = document.querySelector('#proofModalCounter');
const proofModalType = document.querySelector('#proofModalType');
const proofModalBadge = document.querySelector('#proofModalBadge');
const proofModalTitle = document.querySelector('#proofModalTitle');
const proofModalDescription = document.querySelector('#proofModalDescription');
const proofModalPoints = document.querySelector('#proofModalPoints');
const proofModalTags = document.querySelector('#proofModalTags');
const proofModalSource = document.querySelector('#proofModalSource');
const proofModalClose = document.querySelector('.proof-modal-close');
const sections = Array.from(navLinks)
	.map((link) => document.querySelector(link.getAttribute('href')))
	.filter(Boolean);
let lastProofTrigger = null;
let currentProofGallery = [];
let currentProofIndex = 0;

revealItems.forEach((item, index) => {
	item.style.setProperty('--reveal-delay', `${(index % 6) * 70}ms`);
});

const syncTopbarState = () => {
	if (!topbar) {
		return;
	}

	topbar.classList.toggle('is-scrolled', window.scrollY > 18);
};

syncTopbarState();
window.addEventListener('scroll', syncTopbarState, { passive: true });

const setProofList = (container, items) => {
	if (!container) {
		return;
	}

	container.innerHTML = '';
	items.forEach((item) => {
		const listItem = document.createElement('li');
		listItem.textContent = item;
		container.appendChild(listItem);
	});
};

const setProofTags = (container, items) => {
	if (!container) {
		return;
	}

	container.innerHTML = '';
	items.forEach((item) => {
		const tag = document.createElement('span');
		tag.textContent = item;
		container.appendChild(tag);
	});
};

const buildProofGallery = (projectCard) => {
	const { proofImage, proofAlt, proofGallery, proofGalleryAlts } = projectCard.dataset;
	const images = (proofGallery || '').split('|').filter(Boolean);
	const alts = (proofGalleryAlts || '').split('|');

	if (!images.length) {
		return proofImage ? [{ src: proofImage, alt: proofAlt || '' }] : [];
	}

	return images.map((src, index) => ({
		src,
		alt: alts[index] || proofAlt || '',
	}));
};

const renderProofGallery = () => {
	if (!proofModalImage || !currentProofGallery.length) {
		return;
	}

	const currentImage = currentProofGallery[currentProofIndex];
	const hasMultipleImages = currentProofGallery.length > 1;

	proofModalImage.src = currentImage.src;
	proofModalImage.alt = currentImage.alt;

	if (proofModalCounter) {
		proofModalCounter.hidden = !hasMultipleImages;
		proofModalCounter.textContent = `${currentProofIndex + 1} / ${currentProofGallery.length}`;
	}

	if (proofModalPrev) {
		proofModalPrev.hidden = !hasMultipleImages;
	}

	if (proofModalNext) {
		proofModalNext.hidden = !hasMultipleImages;
	}
};

const moveProofGallery = (direction) => {
	if (currentProofGallery.length <= 1) {
		return;
	}

	currentProofIndex =
		(currentProofIndex + direction + currentProofGallery.length) %
		currentProofGallery.length;
	renderProofGallery();
};

const closeProofModal = () => {
	if (!proofModal || proofModal.hidden) {
		return;
	}

	document.body.classList.remove('modal-open');
	proofModal.hidden = true;
	proofModal.setAttribute('aria-hidden', 'true');
	currentProofGallery = [];
	currentProofIndex = 0;

	if (lastProofTrigger) {
		lastProofTrigger.focus();
	}
};

const openProofModal = (trigger) => {
	if (!proofModal) {
		return;
	}

	const projectCard = trigger.closest('.project-card');
	if (!projectCard) {
		return;
	}

	const {
		proofType,
		proofBadge,
		proofTitle,
		proofImage,
		proofAlt,
		proofDescription,
		proofPoints,
		proofTags,
		proofSource,
	} = projectCard.dataset;

	lastProofTrigger = trigger;
	currentProofGallery = buildProofGallery(projectCard);
	currentProofIndex = 0;
	renderProofGallery();

	if (proofModalType) {
		proofModalType.textContent = proofType;
	}

	if (proofModalBadge) {
		proofModalBadge.textContent = proofBadge;
	}

	if (proofModalTitle) {
		proofModalTitle.textContent = proofTitle;
	}

	if (proofModalDescription) {
		proofModalDescription.textContent = proofDescription;
	}

	if (proofModalSource) {
		if (proofSource) {
			proofModalSource.hidden = false;
			proofModalSource.href = proofSource;
		} else {
			proofModalSource.hidden = true;
			proofModalSource.removeAttribute('href');
		}
	}

	setProofList(proofModalPoints, (proofPoints || '').split('|').filter(Boolean));
	setProofTags(proofModalTags, (proofTags || '').split('|').filter(Boolean));

	document.body.classList.add('modal-open');
	proofModal.hidden = false;
	proofModal.setAttribute('aria-hidden', 'false');

	if (proofModalClose) {
		proofModalClose.focus();
	}
};

proofTriggers.forEach((trigger) => {
	trigger.addEventListener('click', () => openProofModal(trigger));
});

if (proofModalPrev) {
	proofModalPrev.addEventListener('click', (event) => {
		event.preventDefault();
		event.stopPropagation();
		moveProofGallery(-1);
	});
}

if (proofModalNext) {
	proofModalNext.addEventListener('click', (event) => {
		event.preventDefault();
		event.stopPropagation();
		moveProofGallery(1);
	});
}

if (proofModalMedia) {
	proofModalMedia.addEventListener('click', (event) => {
		if (currentProofGallery.length <= 1 || event.target.closest('button')) {
			return;
		}

		const mediaBounds = proofModalMedia.getBoundingClientRect();
		const clickedLeftHalf = event.clientX < mediaBounds.left + mediaBounds.width / 2;

		moveProofGallery(clickedLeftHalf ? -1 : 1);
	});
}

proofCloseTargets.forEach((target) => {
	target.addEventListener('click', closeProofModal);
});

document.addEventListener('keydown', (event) => {
	if (!proofModal || proofModal.hidden) {
		return;
	}

	if (event.key === 'Escape') {
		closeProofModal();
		return;
	}

	if (event.key === 'ArrowLeft') {
		event.preventDefault();
		moveProofGallery(-1);
	}

	if (event.key === 'ArrowRight') {
		event.preventDefault();
		moveProofGallery(1);
	}
});

if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			});
		},
		{
			threshold: 0.18,
			rootMargin: '0px 0px -8% 0px',
		}
	);

	revealItems.forEach((item) => revealObserver.observe(item));

	const navObserver = new IntersectionObserver(
		(entries) => {
			const visibleEntry = entries
				.filter((entry) => entry.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

			if (!visibleEntry) {
				return;
			}

			navLinks.forEach((link) => {
				const isCurrent =
					link.getAttribute('href') === `#${visibleEntry.target.id}`;

				if (isCurrent) {
					link.setAttribute('aria-current', 'page');
				} else {
					link.removeAttribute('aria-current');
				}
			});
		},
		{
			threshold: 0.35,
			rootMargin: '-30% 0px -45% 0px',
		}
	);

	sections.forEach((section) => navObserver.observe(section));
} else {
	revealItems.forEach((item) => item.classList.add('is-visible'));
}
