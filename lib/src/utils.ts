// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

export function debounce(func:Function, wait:number, immediate:boolean = false) {
  let timeout: number | undefined;
  return function (this:any) {
    const context:any = this;
    const args = arguments;
    const later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait) as unknown as number;
    if (callNow) func.apply(context, args);
  };
};