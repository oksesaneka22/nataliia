// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running"
    }
  })
}, observerOptions)

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".slide-up, .fade-in")
  animatedElements.forEach((el) => {
    el.style.animationPlayState = "paused"
    observer.observe(el)
  })
})

// Smooth scroll for anchor links (if you add navigation later)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    // забезпечуємо фокус-так-відповідність без переходу
    btn.setAttribute('type', 'button');
    btn.addEventListener('click', async (e) => {
      const value = btn.getAttribute('data-copy');
      if (!value) return;

      // Копіювання
      try {
        await navigator.clipboard.writeText(value);
        showCopiedBadge(btn, 'Скопійовано');
      } catch (err) {
        // Фолбек
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showCopiedBadge(btn, 'Скопійовано');
        } catch (e) {
          showCopiedBadge(btn, 'Не вдалося');
        }
        ta.remove();
      }

      // Зберігаємо доступність: короткий візуальний фокус, але не видимий outline
      btn.focus({ preventScroll: true });
    });
  });

  function showCopiedBadge(el, text) {
    // якщо є стара підказка — видаляємо її, щоб анімація перезапустилась
    const existing = el.querySelector('.copy-feedback');
    if (existing) {
      existing.remove();
    }

    const span = document.createElement('span');
    span.className = 'copy-feedback';
    span.setAttribute('role', 'status');
    span.setAttribute('aria-live', 'polite');
    span.textContent = text;
    el.appendChild(span);

    // Примусово прочитати layout для перезапуску анімації
    // (читання offsetHeight змушує браузер застосувати початкові стилі)
    // eslint-disable-next-line no-unused-vars
    const _force = span.offsetHeight;

    // Додаємо клас visible в наступному кадрі для плавності
    requestAnimationFrame(() => span.classList.add('visible'));

    // Прибираємо через 2 секунди
    setTimeout(() => {
      span.classList.remove('visible');
      // дочекаємось transition і видалимо елемент
      setTimeout(() => {
        if (span.parentNode) span.remove();
      }, 260);
    }, 2000);
  }
});
