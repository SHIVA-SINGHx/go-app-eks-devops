(() => {
    const cards = Array.from(document.querySelectorAll("[data-topic-card]"));
    if (cards.length === 0) {
        return;
    }

    const storageKey = "blueprint-completed-topics";
    const savedTopics = new Set((localStorage.getItem(storageKey) || "").split(",").filter(Boolean));
    const searchInput = document.querySelector("[data-topic-search]");
    const noResults = document.querySelector("[data-no-results]");
    const progressLabel = document.querySelector("[data-progress-label]");
    const progressFill = document.querySelector("[data-progress-fill]");

    const updateProgress = () => {
        const completedCount = cards.filter((card) => savedTopics.has(card.dataset.topicId)).length;
        progressLabel.textContent = `${completedCount} / ${cards.length} topics`;
        progressFill.style.width = `${(completedCount / cards.length) * 100}%`;
    };

    cards.forEach((card) => {
        const topicId = card.dataset.topicId;
        const button = card.querySelector("[data-complete]");
        const isComplete = savedTopics.has(topicId);
        button.setAttribute("aria-pressed", String(isComplete));
        button.classList.toggle("is-complete", isComplete);

        button.addEventListener("click", () => {
            if (savedTopics.has(topicId)) {
                savedTopics.delete(topicId);
            } else {
                savedTopics.add(topicId);
            }

            button.setAttribute("aria-pressed", String(savedTopics.has(topicId)));
            button.classList.toggle("is-complete", savedTopics.has(topicId));
            localStorage.setItem(storageKey, Array.from(savedTopics).join(","));
            updateProgress();
        });
    });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach((card) => {
            const matches = card.dataset.search.includes(query);
            card.hidden = !matches;
            if (matches) {
                visibleCount += 1;
            }
        });

        document.querySelectorAll("[data-stage-section]").forEach((stage) => {
            stage.hidden = !stage.querySelector("[data-topic-card]:not([hidden])");
        });
        noResults.hidden = visibleCount > 0;
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
            event.preventDefault();
            searchInput.focus();
        }
    });

    updateProgress();
})();
