function throttle(callback, wait, context = this) {
  let timeout = null;
  let callbackArgs = null;

  const later = () => {
    callback.apply(context, callbackArgs);
    timeout = null;
  };

  return function() {
    if (!timeout) {
      callbackArgs = arguments;
      timeout = setTimeout(later, wait);
    }
  };
};

function debounce(func, delay) {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

function generateArrayOf(slots = 0, fillWith) {
  return Array.from(Array(slots)).fill(fillWith);
}

export { throttle, debounce, generateArrayOf };
