/**
 * Polished Touch and Click Ripple Feedback System
 * Generates an expanding blue/indigo radial ripple from the exact coordinates of touch or click.
 * Smooth 300-500ms duration, clipped to container boundaries, and cleaned up automatically.
 */

export function initRippleEffect(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handlePointerDown = (e: PointerEvent) => {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Only respond to primary click / touch (ignore right clicks)
    if (e.button !== 0 && e.pointerType === 'mouse') {
      return;
    }

    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Identify the interactive container element
    const interactiveEl = target.closest<HTMLElement>(
      'button, a, [role="button"], article[id^="product-card-"], #hero-recommended-shoe, .interactive-ripple, input[type="button"], input[type="submit"]'
    );

    if (!interactiveEl) return;

    // Skip disabled elements
    if (
      interactiveEl.hasAttribute('disabled') ||
      interactiveEl.getAttribute('aria-disabled') === 'true'
    ) {
      return;
    }

    const rect = interactiveEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate maximum radius to all four corners from click coordinate
    const radius = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y)
    );
    const diameter = Math.max(radius * 2, 40);

    // Ensure element has relative positioning to contain the absolute ripple
    const computedStyle = window.getComputedStyle(interactiveEl);
    if (computedStyle.position === 'static') {
      interactiveEl.style.position = 'relative';
    }

    // Clip ripple inside rounded bounds if not explicitly overflow-visible
    if (computedStyle.overflow !== 'hidden' && !interactiveEl.classList.contains('overflow-visible')) {
      interactiveEl.style.overflow = 'hidden';
    }

    // Create the ripple span
    const ripple = document.createElement('span');
    ripple.className = 'touch-ripple-effect';
    ripple.style.width = `${diameter}px`;
    ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x - diameter / 2}px`;
    ripple.style.top = `${y - diameter / 2}px`;

    interactiveEl.appendChild(ripple);

    // Guaranteed cleanup: removes ripple cleanly after animation completes
    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    };

    ripple.addEventListener('animationend', cleanup, { once: true });
    setTimeout(cleanup, 450);
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true, capture: true });

  return () => {
    window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
  };
}
