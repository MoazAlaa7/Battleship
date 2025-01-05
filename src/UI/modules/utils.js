function createElement(tag, classList = [], textContent = "", attributes = {}) {
  const element = document.createElement(tag);
  if (classList.length) element.classList.add(...classList);
  if (textContent) element.textContent = textContent;
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}

export { createElement };
