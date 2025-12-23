document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("img-container");
  const button = document.getElementById("order-btn");
  const mask = document.getElementById("mask");

  document.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = (rect.right - e.clientX - rect.width / 4) * -1;
    const y = e.clientY - rect.top - rect.height / 10;

    button.style.pointerEvents = "none";
    const isHovering = document.elementFromPoint(e.clientX, e.clientY) === mask;
    button.style.pointerEvents = "all";

    if (isHovering) {
      button.classList.add("hovering");
      button.style.transform = `translate(calc(${x}px + 50%), calc(${y}px - 50%))`;
    } else {
      button.classList.remove("hovering");
      button.style = "";
    }
  });
});
