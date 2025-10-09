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
    btn.addEventListener('click', async (e) => {
      const value = btn.getAttribute('data-copy');
      if (!value) return;

      // Спроба через сучасний clipboard API
      try {
        await navigator.clipboard.writeText(value);
        showCopiedBadge(btn, 'Скопійовано');
      } catch (err) {
        // Фолбек (старі браузери)
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
    });
  });

  function showCopiedBadge(el, text) {
    // видалити стару підказку, якщо є
    const existing = el.querySelector('.copy-feedback');
    if (existing) existing.remove();

    const span = document.createElement('span');
    span.className = 'copy-feedback';
    span.textContent = text;
    el.appendChild(span);

    // дати час для layout і показати
    requestAnimationFrame(() => span.classList.add('visible'));

    // прибрати через 2 секунди
    setTimeout(() => {
      span.classList.remove('visible');
      setTimeout(() => span.remove(), 220);
    }, 2000);
  }
});
