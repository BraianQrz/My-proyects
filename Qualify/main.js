const ratingContainer = document.querySelector(".qualify");
let currentValue = 0;
const limit = 10;

html = Array.from(Array(limit)).map((star, i) => {
    return `<div class="star star-${i}" data-pos="${i}"></div>`;
});

ratingContainer.innerHTML = html.join("");

document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("mouseover", (e) => {
        const pos = star.getAttribute("data-pos");

        if (currentValue === parseInt(pos) + 1) {
            return;
        }
        document.querySelectorAll(".star").forEach((star) => {
            if (star.classList.contains("star-full")) {
                star.classList.remove("star-full");
            }
        });
        for (let i = 0; i <= pos; i++) {
            const star = document.querySelector(`.star-${i}`);
            if (!star.classList.contains("star-full")) {
                star.classList.add("star-full");
            }
        }
        currentValue = parseInt(pos) + 1;
    });

    star.addEventListener("click", (e) => {
        const position = star.getAttribute("data-pos");
        currentValue = parseInt(position) + 1;
        console.log(`El valor actual es: ${currentValue}`);
    });
});

