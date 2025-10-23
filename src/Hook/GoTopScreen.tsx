export function GoTopScreen() {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",  
    });
  }
}