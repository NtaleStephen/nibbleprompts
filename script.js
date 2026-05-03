document.addEventListener('DOMContentLoaded', () => {
  const categoryTabsContainer = document.getElementById('category-tabs');
  const promptsContainer = document.getElementById('prompts-container');
  const searchInput = document.getElementById('search-input');
  const themeToggle = document.getElementById('theme-toggle');

  let activeCategory = 'all';
  let searchQuery = '';

  // Theme Management
  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

  function updateThemeIcon() {
    if(!themeToggle) return;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeToggle.innerHTML = currentTheme === 'light' ? moonIcon : sunIcon;
  }

  updateThemeIcon();

  if(themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon();
    });
  }

  if(!categoryTabsContainer) return; // If on about page, stop here.

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
  CATEGORY_COUNTS['all'] = PROMPTS.length;
  PROMPTS.forEach(p => {
    CATEGORY_COUNTS[p.category] = (CATEGORY_COUNTS[p.category] || 0) + 1;
  });

  const categories = Object.keys(CATEGORY_LABELS);

  function renderTabs() {
    categoryTabsContainer.innerHTML = '';
    categories.forEach(category => {
      if (category !== 'all' && !CATEGORY_COUNTS[category]) return;

      const btn = document.createElement('button');
      btn.className = `tab-btn ${activeCategory === category ? 'active' : ''}`;
      
      btn.innerHTML = `
        ${CATEGORY_LABELS[category]} <span class="count-badge">${CATEGORY_COUNTS[category]}</span>
      `;
      
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

  // --- Wireframe Generators ---
  function getWireframeHTML(category, index) {
    let html = '';
    switch(category) {
      case 'hero':
        html = `
          <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;">
            <div class="wf-line" style="width: 40%;"></div>
            <div class="wf-line" style="width: 60%; height:4px; opacity:0.5;"></div>
            <div style="display:flex; gap:8px; margin-top:4px;">
              <div class="wf-accent" style="width:24px; height:8px;"></div>
              <div class="wf-line" style="width:24px; height:8px; opacity:0.5;"></div>
            </div>
            <div class="wf-box" style="width: 80%; flex-grow:1; margin-top:8px;"></div>
          </div>
        `;
        break;
      case 'auth':
        html = `
          <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
             <div class="wf-card" style="width:60%; height:80%; box-shadow:0 0 0 1px var(--wf-border); border-radius:6px; display:flex; flex-direction:column; padding:12px; gap:8px;">
                <div class="wf-line" style="width: 50%; align-self:center; margin-bottom:8px;"></div>
                <div class="wf-box" style="width:100%; height:12px;"></div>
                <div class="wf-box" style="width:100%; height:12px;"></div>
                <div class="wf-accent" style="width:100%; height:16px; margin-top:4px;"></div>
             </div>
          </div>
        `;
        break;
      case 'pricing':
        html = `
          <div style="width:100%; height:100%; display:flex; gap:8px; align-items:center; justify-content:center;">
             <div class="wf-card" style="width:25%; height:70%; border:1px solid var(--wf-border); border-radius:4px;"></div>
             <div class="wf-card" style="width:30%; height:85%; border:1px solid var(--wf-accent); border-radius:4px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);"></div>
             <div class="wf-card" style="width:25%; height:70%; border:1px solid var(--wf-border); border-radius:4px;"></div>
          </div>
        `;
        break;
      case 'features':
        html = `
          <div style="width:80%; height:80%; display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin:auto;">
             <div class="wf-box"></div><div class="wf-box"></div>
             <div class="wf-box" style="grid-column: span 2;"></div>
          </div>
        `;
        break;
      case 'cta':
        html = `
          <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
            <div class="wf-box" style="width:90%; height:60%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;">
               <div class="wf-line" style="width: 40%;"></div>
               <div class="wf-accent" style="width:20%; height:12px;"></div>
            </div>
          </div>
        `;
        break;
      case 'dashboards':
        html = `
          <div style="width:100%; height:100%; display:flex; gap:6px;">
             <div class="wf-box" style="width:20%; height:100%;"></div>
             <div style="flex-grow:1; display:flex; flex-direction:column; gap:6px;">
                <div class="wf-box" style="width:100%; height:15%;"></div>
                <div class="wf-card" style="width:100%; flex-grow:1; border:1px solid var(--wf-border); border-radius:4px;"></div>
             </div>
          </div>
        `;
        break;
      default:
        html = `
          <div style="width:100%; height:100%; display:flex; flex-direction:column; gap:8px; padding:8px;">
            <div class="wf-line" style="width: 30%;"></div>
            <div class="wf-box" style="width: 100%; flex-grow: 1;"></div>
          </div>
        `;
        break;
    }
    return `<div class="wf-layout">${html}</div>`;
  }

  function renderPrompts() {
    promptsContainer.innerHTML = '';
    const filtered = getFilteredPrompts();

    if (filtered.length === 0) {
      promptsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin-top: 2rem;">No prompts found matching your criteria.</p>';
      return;
    }

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

        grouped[cat].forEach((prompt, idx) => {
          const card = document.createElement('div');
          card.className = 'prompt-card';
          
          const wireframe = getWireframeHTML(prompt.category, idx);

          card.innerHTML = `
            <div class="wf-container">
              ${wireframe}
            </div>
            <h3 class="prompt-name">${prompt.name}</h3>
            <p class="prompt-desc">${prompt.description}</p>
            <div class="prompt-actions">
              <button class="btn btn-copy" data-prompt-id="${prompt.id}">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                 Copy prompt
              </button>
              <a href="${prompt.glowupUrl}" target="_blank" class="btn btn-glowup">Generate in GlowUp</a>
            </div>
          `;

          grid.appendChild(card);
        });

        section.appendChild(grid);
        promptsContainer.appendChild(section);
      }
    });

    document.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', handleCopy);
    });
  }

  async function handleCopy(e) {
    const btn = e.currentTarget;
    const promptId = btn.getAttribute('data-prompt-id');
    const promptObj = PROMPTS.find(p => p.id === promptId);
    
    if (promptObj) {
      try {
        await navigator.clipboard.writeText(promptObj.prompt);
        const originalContent = btn.innerHTML;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
        btn.classList.add('copied');
        
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  }

  // Search input handler
  if(searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPrompts();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.shiftKey && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchQuery = '';
        searchInput.blur();
        renderPrompts();
      }
    });
  }

  // Initial render
  renderTabs();
  renderPrompts();
});
