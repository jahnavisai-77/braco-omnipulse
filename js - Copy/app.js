/**
 * Braco OmniPulse - Application Coordinator & Router
 * Orchestrates navigation, toast notifications, demo reset, and module lifecycles.
 */

import { store } from './state.js';
import { initOverview, renderOverview } from './modules/overview.js';
import { initBriefGenerator } from './modules/briefGenerator.js';
import { initAnalytics, renderAnalyticsView } from './modules/analytics.js';
import { initRegionalInsights } from './modules/regional.js';
import { initTrustPulse } from './modules/trustPulse.js';
import { initCreatorStudio } from './modules/creatorStudio.js';
import { initCompetitiveAnalysis } from './modules/competitive.js';
import { initRecommendations } from './modules/recommendations.js';

class AppRouter {
  constructor() {
    this.currentSection = 'overview';
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('.app-section');
    this.bindEvents();
  }

  bindEvents() {
    // Navigation link clicks
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.section;
        this.navigate(target);
      });
    });

    // Hash change support
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(`section-${hash}`)) {
        this.navigate(hash, false);
      }
    });
  }

  navigate(sectionId, updateHash = true) {
    if (!document.getElementById(`section-${sectionId}`)) {
      sectionId = 'overview';
    }

    this.currentSection = sectionId;
    store.setActiveTab(sectionId);

    // Update section visibility
    this.sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === `section-${sectionId}`);
    });

    // Update nav active classes
    this.navLinks.forEach(link => {
      const isTarget = link.dataset.section === sectionId;
      link.classList.toggle('active', isTarget);
    });

    // Update breadcrumb
    const breadcrumb = document.getElementById('current-breadcrumb');
    if (breadcrumb) {
      const titles = {
        overview: 'Overview Dashboard',
        brief: 'AI Campaign Brief Generator',
        analytics: 'Campaign Analytics & Insights',
        regional: 'Regional Intelligence & A/B Testing',
        trustpulse: 'TrustPulse Brand Safety & Compliance',
        creators: 'Creator Campaign Studio',
        competitive: 'Competitive Intelligence & Brand Comparison',
        recommendations: 'OmniPulse Recommendations Hub'
      };
      breadcrumb.textContent = titles[sectionId] || 'Dashboard';
    }

    if (updateHash) {
      window.location.hash = sectionId;
    }

    // Close mobile sidebar if open
    closeMobileSidebar();

    // Trigger module-specific refreshes
    if (sectionId === 'overview') {
      renderOverview(this);
    } else if (sectionId === 'analytics') {
      renderAnalyticsView();
    }

    // Scroll to top of workspace
    const mainWorkspace = document.querySelector('.main-workspace');
    if (mainWorkspace) mainWorkspace.scrollTop = 0;

    if (window.lucide) window.lucide.createIcons();
  }

  navigateWithFilter(sectionId, filterValue) {
    if (sectionId === 'analytics' && filterValue) {
      const current = store.getState().analyticsFilter;
      store.updateState({
        analyticsFilter: { ...current, campaignId: filterValue }
      });
      const campSelect = document.getElementById('analytics-campaign-filter');
      if (campSelect) campSelect.value = filterValue;
    }
    this.navigate(sectionId);
  }
}

// Toast Notification System
export function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type} animate-slide-in`;

  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'warning') iconName = 'alert-triangle';
  if (type === 'error') iconName = 'x-circle';

  toast.innerHTML = `
    <div class="toast-content flex items-center gap-2">
      <i data-lucide="${iconName}" class="toast-icon"></i>
      <span class="text-xs font-medium text-slate-800">${escapeHtml(message)}</span>
    </div>
    <button class="toast-close-btn" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  const closeBtn = toast.querySelector('.toast-close-btn');
  const removeToast = () => {
    toast.classList.add('animate-slide-out');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  };

  if (closeBtn) closeBtn.addEventListener('click', removeToast);
  setTimeout(removeToast, duration);
}

// Mobile sidebar helpers
function openMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('active');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// DOM Content Loaded Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
  const router = new AppRouter();
  window.omniRouter = router;

  // Initialize Modules
  initOverview(router);
  initBriefGenerator(router, showToast);
  initAnalytics(router, showToast);
  initRegionalInsights(router, showToast);
  initTrustPulse(router, showToast);
  initCreatorStudio(router, showToast);
  initCompetitiveAnalysis(router, showToast);
  initRecommendations(router, showToast);

  // Setup Mobile Menu Buttons
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const closeSidebarBtn = document.getElementById('sidebar-close-btn');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (menuBtn) menuBtn.addEventListener('click', openMobileSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeMobileSidebar);
  if (backdrop) backdrop.addEventListener('click', closeMobileSidebar);

  // Quick Action Buttons in Topbar / Sidebar
  const btnTopNewBrief = document.getElementById('btn-topbar-new-brief');
  if (btnTopNewBrief) {
    btnTopNewBrief.addEventListener('click', () => {
      router.navigate('brief');
    });
  }

  // Reset Demo Data Button
  const btnResetAll = document.getElementById('btn-reset-demo-data');
  if (btnResetAll) {
    btnResetAll.addEventListener('click', () => {
      if (confirm('Reset all demo state to fresh default benchmark data?')) {
        store.resetDemoData();
        showToast('Demo data reset to pristine state', 'success');
        router.navigate('overview');
      }
    });
  }

  // Notification Bell Dropdown Toggle
  const notifBtn = document.getElementById('btn-notifications');
  const notifDropdown = document.getElementById('notifications-dropdown');
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      notifDropdown.classList.add('hidden');
    });
  }

  // Handle initial hash if present
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(`section-${initialHash}`)) {
    router.navigate(initialHash, false);
  } else {
    router.navigate('overview', false);
  }

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
