import './order-tracking.css';

/**
 * OrderTracking - A framework-agnostic order tracking component
 * @class OrderTracking
 */
class OrderTracking {
  /**
   * @param {Object} options - Configuration options
   * @param {string} options.apiUrl - API endpoint URL (e.g., '/api/common/order_tracking')
   * @param {string} options.container - CSS selector for the container element
   * @param {number} [options.mobileBreakpoint=700] - Breakpoint for mobile layout (in pixels)
   * @param {Object} [options.texts] - Custom text labels
   * @param {Function} [options.onError] - Error callback
   * @param {Function} [options.onSuccess] - Success callback
   */
  constructor(options = {}) {
    // Validate required options
    if (!options.apiUrl) {
      throw new Error('OrderTracking: apiUrl is required');
    }
    if (!options.container) {
      throw new Error('OrderTracking: container is required');
    }

    this.apiUrl = options.apiUrl;
    this.container = typeof options.container === 'string' 
      ? document.querySelector(options.container) 
      : options.container;
    
    if (!this.container) {
      throw new Error('OrderTracking: container element not found');
    }

    // Mobile breakpoint configuration
    this.mobileBreakpoint = options.mobileBreakpoint || 700;
    
    // Auto-detect mobile layout
    this.isMobile = this.detectMobile();
    this.texts = {
      title: options.texts?.title || 'Order Tracking',
      placeholder: options.texts?.placeholder || 'Enter your order number',
      trackButton: options.texts?.trackButton || 'Track',
      errorEmpty: options.texts?.errorEmpty || 'Please enter an order number',
      errorNotFound: options.texts?.errorNotFound || 'Could Not Find Order',
      errorNotShipped: options.texts?.errorNotShipped || 'This order has not been shipped yet. Please check again after it has been shipped',
      errorGeneric: options.texts?.errorGeneric || 'An error occurred while tracking your order'
    };
    this.onError = options.onError || (() => {});
    this.onSuccess = options.onSuccess || (() => {});

    // State
    this.orderId = '';
    this.errorMessage = '';
    this.mountedReady = false;

    // Bind methods
    this.handleSearch = this.handleSearch.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleResize = this.handleResize.bind(this);

    // Initialize
    this.init();
  }

  /**
   * Detect if device is mobile based on window width
   */
  detectMobile() {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= this.mobileBreakpoint;
  }

  /**
   * Handle window resize with debounce
   */
  handleResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    this.resizeTimeout = setTimeout(() => {
      const wasMobile = this.isMobile;
      this.isMobile = this.detectMobile();
      
      // Re-render if layout changed
      if (wasMobile !== this.isMobile) {
        this.render();
        this.attachEventListeners();
        this.updateUI();
      }
    }, 150);
  }

  /**
   * Initialize the component
   */
  init() {
    this.render();
    this.attachEventListeners();
    this.mountedReady = true;
    this.updateUI();
    
    // Add resize listener for responsive layout
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  }

  /**
   * Render the HTML structure
   */
  render() {
    const html = `
      <div class="order-tracking-search-section">
        <div class="order-tracking-search-container">
          <h1 class="order-tracking-search-title">${this.texts.title}</h1>
          
          <div class="order-tracking-search-box" data-role="search-box">
            <div class="order-tracking-search-input-wrapper">
              <input 
                type="text" 
                class="order-tracking-search-input" 
                placeholder="${this.texts.placeholder}"
                data-role="search-input"
              />
              <button 
                class="order-tracking-clear-button" 
                data-role="clear-button"
                type="button"
                style="display: none;"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L9 9M9 1L1 9" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            ${!this.isMobile ? `
              <button class="order-tracking-search-button" data-role="search-button">
                <svg class="order-tracking-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 14L11.1 11.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${this.texts.trackButton}
              </button>
            ` : ''}
          </div>
          
          <div class="order-tracking-error-message" data-role="error-message"></div>

          ${this.isMobile ? `
            <div class="order-tracking-search-mobile">
              <button class="order-tracking-search-button" data-role="search-button-mobile">
                <svg class="order-tracking-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 14L11.1 11.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${this.texts.trackButton}
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const input = this.container.querySelector('[data-role="search-input"]');
    const clearButton = this.container.querySelector('[data-role="clear-button"]');
    const searchButton = this.container.querySelector('[data-role="search-button"]');
    const searchButtonMobile = this.container.querySelector('[data-role="search-button-mobile"]');

    if (input) {
      input.addEventListener('input', this.handleInputChange);
      input.addEventListener('keypress', this.handleKeyPress);
    }

    if (clearButton) {
      clearButton.addEventListener('click', this.clearInput);
    }

    if (searchButton) {
      searchButton.addEventListener('click', this.handleSearch);
    }

    if (searchButtonMobile) {
      searchButtonMobile.addEventListener('click', this.handleSearch);
    }
  }

  /**
   * Handle input change
   */
  handleInputChange(e) {
    this.orderId = e.target.value;
    
    // Clear error message when input changes
    if (this.errorMessage) {
      this.errorMessage = '';
      this.updateUI();
    }

    // Show/hide clear button
    const clearButton = this.container.querySelector('[data-role="clear-button"]');
    if (clearButton) {
      clearButton.style.display = this.orderId ? 'flex' : 'none';
    }
  }

  /**
   * Handle key press (Enter to search)
   */
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  /**
   * Handle search action
   */
  async handleSearch() {
    if (!this.orderId.trim()) {
      this.errorMessage = this.texts.errorEmpty;
      this.updateUI();
      return;
    }

    this.errorMessage = '';
    this.updateUI();

    try {
      const response = await fetch(`${this.apiUrl}/${this.orderId.trim()}`);
      const data = await response.json();

      if (response.ok && data && data.status === 200 && data.data && data.data.delivery_id) {
        // Open tracking page
        const trackingUrl = `https://t.17track.net/en#nums=${data.data.delivery_id}`;
        window.open(trackingUrl, '_blank');
        this.onSuccess(data);
      } else if (response.ok && data) {
        this.errorMessage = this.texts.errorNotShipped;
        this.updateUI();
        this.onError(new Error(this.texts.errorNotShipped));
      } else {
        this.errorMessage = this.texts.errorNotFound;
        this.updateUI();
        this.onError(new Error(this.texts.errorNotFound));
      }
    } catch (error) {
      console.error('OrderTracking error:', error);
      
      if (error.message && error.message.includes('Could Not Find Order')) {
        this.errorMessage = this.texts.errorNotFound;
      } else {
        this.errorMessage = this.texts.errorGeneric;
      }
      
      this.updateUI();
      this.onError(error);
    }
  }

  /**
   * Clear input
   */
  clearInput() {
    this.orderId = '';
    this.errorMessage = '';
    
    const input = this.container.querySelector('[data-role="search-input"]');
    if (input) {
      input.value = '';
    }

    this.updateUI();
  }

  /**
   * Update UI based on state
   */
  updateUI() {
    const searchBox = this.container.querySelector('[data-role="search-box"]');
    const errorElement = this.container.querySelector('[data-role="error-message"]');
    const clearButton = this.container.querySelector('[data-role="clear-button"]');

    // Update search box error state
    if (searchBox) {
      if (this.errorMessage) {
        searchBox.classList.add('order-tracking-search-box-error');
      } else {
        searchBox.classList.remove('order-tracking-search-box-error');
      }
    }

    // Update error message
    if (errorElement) {
      errorElement.textContent = this.errorMessage;
      if (this.errorMessage) {
        errorElement.classList.add('visible');
      } else {
        errorElement.classList.remove('visible');
      }
    }

    // Update clear button visibility
    if (clearButton) {
      clearButton.style.display = this.orderId ? 'flex' : 'none';
    }
  }

  /**
   * Destroy the component
   */
  destroy() {
    const input = this.container.querySelector('[data-role="search-input"]');
    const clearButton = this.container.querySelector('[data-role="clear-button"]');
    const searchButton = this.container.querySelector('[data-role="search-button"]');
    const searchButtonMobile = this.container.querySelector('[data-role="search-button-mobile"]');

    if (input) {
      input.removeEventListener('input', this.handleInputChange);
      input.removeEventListener('keypress', this.handleKeyPress);
    }

    if (clearButton) {
      clearButton.removeEventListener('click', this.clearInput);
    }

    if (searchButton) {
      searchButton.removeEventListener('click', this.handleSearch);
    }

    if (searchButtonMobile) {
      searchButtonMobile.removeEventListener('click', this.handleSearch);
    }

    // Remove resize listener
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }

    // Clear resize timeout
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.container.innerHTML = '';
  }

  /**
   * Update configuration
   */
  updateConfig(options = {}) {
    if (options.mobileBreakpoint !== undefined) {
      this.mobileBreakpoint = options.mobileBreakpoint;
      const wasMobile = this.isMobile;
      this.isMobile = this.detectMobile();
      
      // Re-render if layout changed
      if (wasMobile !== this.isMobile) {
        this.render();
        this.attachEventListeners();
        this.updateUI();
      }
    }
    
    if (options.texts) {
      this.texts = { ...this.texts, ...options.texts };
    }
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OrderTracking;
}

if (typeof window !== 'undefined') {
  window.OrderTracking = OrderTracking;
}

export default OrderTracking;

