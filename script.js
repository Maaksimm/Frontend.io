const burgerMenu = document.getElementById('burgerMenu')
const navLinks = document.getElementById('navLinks')

burgerMenu.addEventListener('click', () => {
	burgerMenu.classList.toggle('active')
	navLinks.classList.toggle('active')
})


document.querySelectorAll('.nav-link').forEach(link => {
	link.addEventListener('click', () => {
		burgerMenu.classList.remove('active')
		navLinks.classList.remove('active')
	})
})


function showPopup(title, message) {
	const popup = document.getElementById('globalPopup')
	const popupTitle = document.getElementById('popupTitle')
	const popupMsg = document.getElementById('popupMessage')
	popupTitle.innerText = title
	popupMsg.innerText = message
	popup.classList.add('active')
}

function closePopup() {
	document.getElementById('globalPopup').classList.remove('active')
}

const closeBtn = document.getElementById('closePopupBtn')
if (closeBtn) {
	closeBtn.addEventListener('click', closePopup)
}

const overlayPopup = document.getElementById('globalPopup')
if (overlayPopup) {
	overlayPopup.addEventListener('click', e => {
		if (e.target === overlayPopup) closePopup()
	})
}


function handleTicketOrder(concertInfo = null) {
	let msg = ''
	if (concertInfo) {
		msg = `Ви замовили квиток на: ${concertInfo}. Найближчим часом з Вами зв'яжеться менеджер для підтвердження.`
	} else {
		msg = `Вітаємо! Ви перейшли до оформлення квитків. Будь ласка, оберіть концерт з таблиці вище або зателефонуйте нам для бронювання.`
	}
	showPopup('🎫 Замовлення квитка', msg)
}


const allTicketBtns = document.querySelectorAll('.order-ticket-btn')
allTicketBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		const concertData = btn.getAttribute('data-concert') || 'концерт гурту'
		handleTicketOrder(concertData)
	})
})


const globalTicketBtn = document.getElementById('globalTicketBtn')
if (globalTicketBtn) {
	globalTicketBtn.addEventListener('click', () => handleTicketOrder(null))
}


const menuTicketsBtn = document.getElementById('menuTicketsBtn')
if (menuTicketsBtn) {
	menuTicketsBtn.addEventListener('click', e => {
		e.preventDefault()
		handleTicketOrder(null)
	})
}


const locationImage = document.getElementById('locationImage')
if (locationImage) {
	locationImage.addEventListener('click', () => {
		showPopup(
			'🗺️ Карта місцезнаходження',
			'Наше місцезнаходження: Київ, вул. Культури, 01008. Макет в Макарове, Restaurant.',
		)
	})
}

const contactForm = document.getElementById('contactForm')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')
const nameError = document.getElementById('nameError')
const emailError = document.getElementById('emailError')
const messageError = document.getElementById('messageError')

function validateForm() {
	let isValid = true

	nameError.innerText = ''
	emailError.innerText = ''
	messageError.innerText = ''

	const nameVal = nameInput.value.trim()
	if (nameVal === '') {
		nameError.innerText = "Будь ласка, введіть ім'я"
		isValid = false
	} else if (nameVal.length < 2) {
		nameError.innerText = "Ім'я має містити хоча б 2 символи"
		isValid = false
	}

	const emailVal = emailInput.value.trim()
	const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/
	if (emailVal === '') {
		emailError.innerText = 'Введіть email адресу'
		isValid = false
	} else if (!emailPattern.test(emailVal)) {
		emailError.innerText = 'Невірний формат email (наприклад, name@domain.com)'
		isValid = false
	}

	const msgVal = messageInput.value.trim()
	if (msgVal === '') {
		messageError.innerText = 'Напишіть ваше повідомлення або ідею'
		isValid = false
	} else if (msgVal.length < 5) {
		messageError.innerText = 'Повідомлення має бути не менше 5 символів'
		isValid = false
	}

	return isValid
}

if (contactForm) {
	contactForm.addEventListener('submit', e => {
		e.preventDefault()

		if (!validateForm()) {
			showPopup(
				'❌ Помилка форми',
				'Будь ласка, заповніть всі поля коректно (імʼя, email, повідомлення)',
			)
			return
		}

		const nameValue = nameInput.value.trim()
		const emailValue = emailInput.value.trim()
		const messageValue = messageInput.value.trim()

	
		const params = new URLSearchParams({
			name: nameValue,
			email: emailValue,
			message: messageValue,
			_t: Date.now(),
		})
		const getUrl = `https://httpbin.org/get?${params.toString()}`


		fetch(getUrl, { method: 'GET', cache: 'no-store' })
			.then(response => {
				if (response.ok) {
					showPopup(
						'✅ Дякуємо!',
						`Ваше повідомлення відправлено, ${nameValue}! Ми зв'яжемося з вами найближчим часом.`,
					)
					contactForm.reset()
				} else {
					showPopup(
						'⚠️ Помилка',
						'Не вдалося надіслати запит. Спробуйте пізніше.',
					)
				}
			})
			.catch(err => {
				console.warn('GET запит помилка:', err)
				showPopup(
					'📡 Запит відправлено',
					`Ваш запит отримано (симуляція). Дякуємо, ${nameValue}! Ми обов'язково відповімо.`,
				)
				contactForm.reset()
			})
	})
}


document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const targetId = this.getAttribute('href')
		if (targetId && targetId !== '#') {
			const targetElem = document.querySelector(targetId)
			if (targetElem) {
				e.preventDefault()
				targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}
		}
	})
})

window.addEventListener('resize', () => {
	if (window.innerWidth > 999) {
		burgerMenu.classList.remove('active')
		navLinks.classList.remove('active')
	}
})


const instagramLink = document.getElementById('instagramLink')
const youtubeLink = document.getElementById('youtubeLink')
const facebookLink = document.getElementById('facebookLink')

if (instagramLink) {
	instagramLink.addEventListener('click', e => {
		e.preventDefault()
		showPopup(
			'📸 Instagram',
			'Перехід на сторінку Instagram гурту «Грим та Грім». Слідкуйте за нашими новинами!',
		)
	})
}

if (youtubeLink) {
	youtubeLink.addEventListener('click', e => {
		e.preventDefault()
		showPopup(
			'🎬 YouTube',
			'Перехід на YouTube-канал гурту «Грим та Грім». Дивіться наші кліпи та концерти!',
		)
	})
}

if (facebookLink) {
	facebookLink.addEventListener('click', e => {
		e.preventDefault()
		showPopup(
			'📘 Facebook',
			'Перехід на сторінку гурту «Грим та Грім» у Facebook. Приєднуйтесь до нашої спільноти!',
		)
	})
}
