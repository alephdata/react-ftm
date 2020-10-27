export const isScrolledIntoView = (el:HTMLElement) => {
  const { top, bottom, left, right } = el.getBoundingClientRect();

  return (top >= 0 && bottom <= window.innerHeight) && (left >= 0 && right <= window.innerWidth)
}
