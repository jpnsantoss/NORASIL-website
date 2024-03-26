import "client-only";

export function getLocalStorage(key: string, defaultValue: any) {
  let stickyValue = localStorage.getItem(key);

  if (stickyValue !== null && stickyValue !== "undefined") {
    return JSON.parse(stickyValue);
  } else {
    return defaultValue;
  }
}

export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
