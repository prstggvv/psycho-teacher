export function scrollToSection(sectionId: string): void {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 80;
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: 'auto',
  });
}
