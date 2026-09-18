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

document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".copy-btn")

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy
      if (!value) return

      const copied = await copyToClipboard(value)
      showCopiedBadge(button, copied ? "Скопійовано" : "Не вдалося скопіювати")
    })
  })

  async function copyToClipboard(value) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = value
      textarea.style.position = "fixed"
      textarea.style.left = "-9999px"
      document.body.appendChild(textarea)
      textarea.select()
      const copied = document.execCommand("copy")
      textarea.remove()
      return copied
    }
  }

  function showCopiedBadge(element, text) {
    element.querySelector(".copy-feedback")?.remove()

    const feedback = document.createElement("span")
    feedback.className = "copy-feedback"
    feedback.setAttribute("role", "status")
    feedback.textContent = text
    element.appendChild(feedback)

    requestAnimationFrame(() => feedback.classList.add("visible"))

    setTimeout(() => {
      feedback.classList.remove("visible")
      setTimeout(() => feedback.remove(), 260)
    }, 2000)
  }
})
