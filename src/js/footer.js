// js/footer.js
export async function loadFooter(targetId = "footer-placeholder") {
    const container = document.getElementById(targetId);
    if (!container) return;

    try {
        const response = await fetch("components/footer.html");
        container.innerHTML = await response.text();
    } catch (err) {
        console.error("Failed to load footer:", err);
    }
}
