const buttonLike = document.querySelector("[button-like]")
if(buttonLike){
    buttonLike.addEventListener("click", () => {
        buttonLike.classList.toggle("liked");
        const slug = document.querySelector(".action-buttons").getAttribute("data-slug");
        const link = `/music/songs/${slug}/like`;
        fetch(link, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: buttonLike.classList.contains("liked") ? "like" : "unlike"
            }),
        })
        .then(response => response.json())
        .then(data => {
            const likeCount = document.querySelector("#like-count");
            likeCount.textContent = data.like;
        });
    });
}