document.addEventListener('DOMContentLoaded', () => {
  const categoryTabsContainer = document.getElementById('category-tabs');
  const promptsContainer = document.getElementById('prompts-container');
  const searchInput = document.getElementById('search-input');

  let activeCategory = 'all';
  let searchQuery = '';

  const CATEGORY_LABELS = {
    all: 'All',
    auth: 'Auth Forms',
    pricing: 'Pricing',
    features: 'Features / Bento',
    hero: 'Hero Sections',
    cta: 'CTA Banners',
    stats: 'Stats Bars',
    nav: 'Nav Bars',
    testimonials: 'Testimonials',
    footer: 'Footer',
    faq: 'FAQ',
    dashboards: 'Dashboards',
    onboarding: 'Onboarding',
    blog: 'Blog / Content',
    contact: 'Contact',
    bonus: 'Bonus',
  };

  const CATEGORY_COUNTS = {};
  
  // Calculate counts
  CATEGORY_COUNTS['all'] = PROMPTS.length;
  PROMPTS.forEach(p => {
    CATEGORY_COUNTS[p.category] = (CATEGORY_COUNTS[p.category] || 0) + 1;
  });

  const categories = Object.keys(CATEGORY_LABELS);

  function renderTabs() {
    categoryTabsContainer.innerHTML = '';
    categories.forEach(category => {
      // Don't render tab if count is 0 and it's not 'all'
      if (category !== 'all' && !CATEGORY_COUNTS[category]) return;

      const btn = document.createElement('button');
      btn.className = `tab-btn ${activeCategory === category ? 'active' : ''}`;
      btn.innerHTML = `${CATEGORY_LABELS[category]} <span class="count-badge">${CATEGORY_COUNTS[category]}</span>`;
      
      btn.addEventListener('click', () => {
        activeCategory = category;
        renderTabs();
        renderPrompts();
      });

      categoryTabsContainer.appendChild(btn);
    });
  }

  function getFilteredPrompts() {
    let result = PROMPTS;

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }

    return result;
  }

  function renderPrompts() {
    promptsContainer.innerHTML = '';
    const filtered = getFilteredPrompts();

    if (filtered.length === 0) {
      promptsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin-top: 2rem;">No prompts found matching your criteria.</p>';
      return;
    }

    // Group by category to show headers when 'all' is selected or when searching across all
    const grouped = {};
    filtered.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });

    Object.keys(CATEGORY_LABELS).forEach(cat => {
      if (grouped[cat] && grouped[cat].length > 0) {
        const section = document.createElement('div');
        section.className = 'category-section';

        const title = document.createElement('h2');
        title.className = 'category-title';
        title.innerHTML = `${CATEGORY_LABELS[cat]} <span class="category-count">${grouped[cat].length} prompts</span>`;
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'prompts-grid';

        grouped[cat].forEach(prompt => {
          const card = document.createElement('div');
          card.className = 'prompt-card';
          
          card.innerHTML = `
            <h3 class="prompt-name">${prompt.name}</h3>
            <p class="prompt-desc">${prompt.description}</p>
            <div class="prompt-actions">
              <button class="btn btn-copy" data-prompt-id="${prompt.id}">Copy prompt</button>
              <a href="${prompt.glowupUrl}" target="_blank" class="btn btn-glowup">Generate in GlowUp</a>
            </div>
          `;

          grid.appendChild(card);
        });

        section.appendChild(grid);
        promptsContainer.appendChild(section);
      }
    });

    // Attach event listeners for copy buttons
    document.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', handleCopy);
    });
  }

  async function handleCopy(e) {
    const btn = e.target;
    const promptId = btn.getAttribute('data-prompt-id');
    const promptObj = PROMPTS.find(p => p.id === promptId);
    
    if (promptObj) {
      try {
        await navigator.clipboard.writeText(promptObj.prompt);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        
        setTimeout(() => {
          btn.textContent = 'Copy prompt';
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  }

  // Search input handler
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderPrompts();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // "/" to focus search
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.shiftKey && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }

    // "Escape" to clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      searchQuery = '';
      searchInput.blur();
      renderPrompts();
    }
  });

  // Initial render
  renderTabs();
  renderPrompts();
});
