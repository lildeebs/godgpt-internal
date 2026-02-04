/**
 * TypeScript type definitions for Dating App Comparison Presentation
 * Based on data-model.md specifications
 */

// Grid placement configuration for CSS Grid
export interface GridSpan {
  columnStart: number; // 1-based
  columnEnd: number; // 1-based
  rowStart: number; // 1-based
  rowEnd: number; // 1-based
}

// Reference to open source icon
export interface IconReference {
  name: string; // Heroicons icon name
  type: 'outline' | 'solid' | 'mini';
  size?: number; // pixels, default 24
}

// Reference to open source image
export interface ImageReference {
  src: string; // image source path or URL
  alt: string; // accessibility alt text
  source: 'unsplash' | 'pexels' | 'custom';
  attribution?: string | null; // optional attribution text
  lazyLoad?: boolean; // whether to lazy load, default true
}

// Micro animation configuration
export interface AnimationConfig {
  type: 'fade' | 'slide' | 'scale' | 'bounce';
  duration: number; // milliseconds, 200-400ms range
  delay?: number; // milliseconds, default 0
  trigger: 'hover' | 'click' | 'mount' | 'scroll';
  easing?: string; // CSS easing function, default "ease-out"
}

// Call-to-action link (optional)
export interface CTALink {
  text: string;
  url: string;
  external?: boolean; // whether link opens in new tab, default false
}

// Individual section within bento grid layout
export interface ContentSection {
  id: string; // unique identifier
  title: string; // section heading
  content: string; // section text content
  gridSpan: GridSpan; // grid column/row span configuration
  icon?: IconReference | null; // optional icon
  highlight?: boolean; // whether to highlight this section, default false
}

// Structured content for a slide
export interface SlideContent {
  text: string; // main text content, max 200 words
  sections: ContentSection[]; // bento grid sections
  cta?: CTALink | null; // optional call-to-action
}

// Reference to research data source
export interface SourceReference {
  url: string; // source URL (HTTP/HTTPS)
  title: string; // source title or description
  date: string; // publication or access date, ISO format
  credibility: 'high' | 'medium' | 'low'; // source credibility rating
}

// Fact-checked market research information
export interface ResearchData {
  comparisonMetric: string; // metric being compared, e.g., "User Demographics", "Revenue"
  hingeValue: string | number; // Hinge's value for this metric
  tinderValue: string | number; // Tinder's value for this metric
  unit?: string | null; // unit of measurement if applicable, e.g., "million users", "%"
  sources: SourceReference[]; // fact-checked sources
  verificationDate: string; // ISO date when data was verified
  verificationStatus: 'verified' | 'pending' | 'unverified'; // verification status
  additionalStats?: {
    hinge?: Record<string, string | number>; // additional statistics for Hinge
    tinder?: Record<string, string | number>; // additional statistics for Tinder
  };
}

// Bento grid layout configuration
export interface BentoGridLayout {
  columns: number; // number of grid columns
  rows?: number; // optional number of grid rows
  gap?: number; // gap between grid items in pixels
}

// Represents a single full-page view in the presentation
export interface Slide {
  id: string; // unique identifier, e.g., "slide-1", "slide-2"
  title: string; // slide heading, displayed prominently
  content: SlideContent; // structured content for the slide
  layout: BentoGridLayout; // grid configuration for bento layout
  slideNumber: number; // sequential slide number, 1-based
  keywords: string[]; // keywords to be capitalized for emphasis
  researchData?: ResearchData | null; // fact-checked research data if applicable
  images?: ImageReference[]; // references to open source images
  animations?: AnimationConfig[]; // micro animation configurations
}

// Current navigation state and available options
export interface NavigationState {
  currentSlideIndex: number; // 0-based index of current slide
  totalSlides: number; // total number of slides
  canGoPrevious: boolean; // whether previous navigation is available
  canGoNext: boolean; // whether next navigation is available
  slideIds: string[]; // array of all slide IDs in order
}
