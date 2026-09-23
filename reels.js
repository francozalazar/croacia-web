(() => {
    const reelVideos = document.querySelectorAll("video[data-reel-src]");
    if (!reelVideos.length) return;

    const overlay = document.createElement("div");
    overlay.className = "reel-modal-overlay";
    overlay.innerHTML = `
        <div class="reel-modal" role="dialog" aria-modal="true" aria-label="Reel ampliado">
            <button class="reel-modal-close" type="button" aria-label="Cerrar reel">&times;</button>
            <video class="reel-modal-player" controls playsinline></video>
        </div>
    `;
    document.body.appendChild(overlay);

    const player = overlay.querySelector(".reel-modal-player");
    const closeButton = overlay.querySelector(".reel-modal-close");

    const closeReel = () => {
        player.pause();
        player.removeAttribute("src");
        player.load();
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    const openReel = (video) => {
        const source = video.getAttribute("data-reel-src");
        if (!source) return;

        player.src = source;
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        player.play().catch(() => {});
    };

    reelVideos.forEach((video) => {
        video.classList.add("reel-clickable");
        video.addEventListener("click", () => openReel(video));
        video.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openReel(video);
            }
        });
    });

    closeButton.addEventListener("click", closeReel);
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeReel();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && overlay.classList.contains("active")) {
            closeReel();
        }
    });
})();
