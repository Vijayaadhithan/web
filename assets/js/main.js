const topbar = document.querySelector('.topbar');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.topnav a');
const proofModal = document.querySelector('#proofModal');
const proofTriggers = document.querySelectorAll('.open-proof');
const proofCloseTargets = document.querySelectorAll('[data-close-proof]');
const proofModalImage = document.querySelector('#proofModalImage');
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

const closeProofModal = () => {
	if (!proofModal || proofModal.hidden) {
		return;
	}

	document.body.classList.remove('modal-open');
	proofModal.hidden = true;
	proofModal.setAttribute('aria-hidden', 'true');

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

	if (proofModalImage) {
		proofModalImage.src = proofImage;
		proofModalImage.alt = proofAlt;
	}

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
		proofModalSource.href = proofSource;
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

proofCloseTargets.forEach((target) => {
	target.addEventListener('click', closeProofModal);
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		closeProofModal();
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
