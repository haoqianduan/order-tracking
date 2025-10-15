export interface OrderTrackingOptions {
  /**
   * API endpoint URL (e.g., '/api/common/order_tracking')
   */
  apiUrl: string;

  /**
   * CSS selector or DOM element for the container
   */
  container: string | HTMLElement;

  /**
   * Breakpoint for mobile layout detection (in pixels)
   * @default 700
   */
  mobileBreakpoint?: number;

  /**
   * Custom text labels
   */
  texts?: {
    title?: string;
    placeholder?: string;
    trackButton?: string;
    errorEmpty?: string;
    errorNotFound?: string;
    errorNotShipped?: string;
    errorGeneric?: string;
  };

  /**
   * Error callback
   */
  onError?: (error: Error) => void;

  /**
   * Success callback
   */
  onSuccess?: (data: any) => void;
}

export interface TrackingResponse {
  delivery_id?: string;
  [key: string]: any;
}

export default class OrderTracking {
  constructor(options: OrderTrackingOptions);

  /**
   * Initialize the component
   */
  init(): void;

  /**
   * Render the HTML structure
   */
  render(): void;

  /**
   * Handle search action
   */
  handleSearch(): Promise<void>;

  /**
   * Clear input
   */
  clearInput(): void;

  /**
   * Update UI based on state
   */
  updateUI(): void;

  /**
   * Destroy the component
   */
  destroy(): void;

  /**
   * Update configuration
   */
  updateConfig(options: Partial<OrderTrackingOptions>): void;
}

