document.addEventListener("DOMContentLoaded", () => {
  handleMouseMove();
  loadReviews();
});

async function loadReviews() {
  const res = await fetch("reviews.json");
  const reviews = await res.json();

  const reviewContainer = document.getElementById("review-container");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  let currentIndex = 0;

  let review = createReview(reviews[currentIndex]);
  reviewContainer.appendChild(review);

  function addReview(nextIndex) {
    nextIndex = (nextIndex + reviews.length) % reviews.length;

    reviewContainer.removeChild(review);
    review = createReview(reviews[nextIndex]);
    reviewContainer.appendChild(review);
    currentIndex = nextIndex;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex++;
    addReview(currentIndex + 1);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex--;
    addReview(currentIndex - 1);
  });
}

function createReview(review) {
  const reviewDiv = document.createElement("div");
  reviewDiv.classList.add("review");

  //review stars
  const reviewStarsDiv = document.createElement("div");
  reviewStarsDiv.classList.add("review-stars");
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("img");
    star.setAttribute("src", "assets/star.svg");
    star.setAttribute("alt", "star icon");
    star.classList.add("review-star");

    if (i > review.stars) {
      star.classList.add("faded");
    }

    reviewStarsDiv.appendChild(star);
  }
  reviewDiv.appendChild(reviewStarsDiv);

  //review content
  const reviewContent = document.createElement("p");
  reviewContent.classList.add("review-content");
  reviewContent.textContent = review.content;

  reviewDiv.appendChild(reviewContent);

  // reviewer
  const reviewer = document.createElement("span");
  reviewer.classList.add("reviewer");
  reviewer.textContent = "-" + review.name;

  reviewDiv.appendChild(reviewer);

  return reviewDiv;
}

function handleMouseMove() {
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("img-container");
    const button = document.getElementById("order-btn");
    const mask = document.getElementById("mask");

    document.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      const x = (rect.right - e.clientX - rect.width / 4) * -1;
      const y = e.clientY - rect.top - rect.height / 10;

      button.style.pointerEvents = "none";
      const isHovering =
        document.elementFromPoint(e.clientX, e.clientY) === mask;
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
}
