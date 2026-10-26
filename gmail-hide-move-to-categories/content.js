const HIDDEN_LABELS = new Set(["Social", "Updates", "Forums", "Promotions"]);

function hideCategories(root) {
  const items = root.querySelectorAll('[role="menuitem"]');
  for (const item of items) {
    if (item.dataset.categoryHidden) {
      continue;
    }
    const text = item.textContent.trim();
    if (HIDDEN_LABELS.has(text)) {
      item.style.display = "none";
      item.dataset.categoryHidden = "1";
    }
  }
}

let scheduled = false;
const observer = new MutationObserver(() => {
  if (scheduled) {
    return;
  }
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    hideCategories(document.body);
  });
});

observer.observe(document.body, { childList: true, subtree: true });
hideCategories(document.body);
