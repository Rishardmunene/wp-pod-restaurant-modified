# WordPress React Pods Integration

A modern React-based frontend implementation for WordPress using Pods Framework, designed specifically for restaurant management systems.

## 🌟 Features

### Core Architecture

- **TypeScript-based**: Full TypeScript support with comprehensive type definitions
- **Pods Framework Integration**: Seamless integration with WordPress Pods Framework
- **Component-Based Design**: Modular architecture with reusable components
- **Responsive Design**: Built with Tailwind CSS for responsive layouts

### Base Page System

- **Flexible Navigation**

  - Multiple navigation types (top/side/both/none)
  - Support for hierarchical menus
  - Icon integration
  - Dynamic menu item management

- **Hero Section**

  - Multiple display types (slider/static/video)
  - Content overlay support
  - Automatic image slider functionality
  - Responsive image handling

- **Layout System**
  - Configurable layouts (full_width/boxed/contained)
  - Inheritance support for child pages
  - Responsive design patterns

### Restaurant Management

- **Restaurant Listing**

  - Multiple display modes (grid/list/masonry)
  - Advanced filtering system
  - Dynamic pagination
  - Responsive grid layouts

- **Restaurant Details**
  - Comprehensive information display
  - Location integration with maps
  - Operating hours management
  - Image gallery support

### Menu System

- **Hierarchical Structure**

  - Restaurant → Menu → Menu Item relationship
  - Category-based organization
  - Dynamic menu updates

- **Menu Items**
  - Detailed item information
  - Ingredient tracking
  - Allergen information
  - Nutritional data
  - Preparation time tracking

## 🛠 Technical Stack

- **Frontend**

  - React 18+
  - TypeScript
  - Tailwind CSS
  - React Router
  - Vite

- **Backend**

  - WordPress
  - Pods Framework
  - Custom REST API endpoints

- **Development**
  - Docker containerization
  - Hot Module Replacement (HMR)
  - TypeScript compilation
  - ESLint + Prettier

## �� Project Structure

wp-react-pods/
├── src/
│ ├── components/
│ │ ├── base/ # Base components matching base_page pod
│ │ │ ├── Navigation.tsx # Handles navigation types (top/side)
│ │ │ ├── Hero.tsx # Hero section component
│ │ │ └── Layout.tsx # Page layout wrapper
│ │ ├── restaurant/ # Restaurant-specific components
│ │ │ ├── RestaurantCard.tsx # Grid/list item display
│ │ │ ├── RestaurantDetails.tsx # Single restaurant view
│ │ │ ├── RestaurantFilters.tsx # Filter implementation
│ │ │ └── RestaurantList.tsx # List container
│ │ ├── menu/ # Menu-related components
│ │ │ ├── MenuList.tsx # Display menu categories
│ │ │ ├── MenuItem.tsx # Individual menu item
│ │ │ └── MenuCategory.tsx # Menu category container
│ │ └── common/ # Shared components
│ │ ├── ImageGallery.tsx # Handle multiple images
│ │ ├── LocationMap.tsx # Display restaurant location
│ │ └── OperatingHours.tsx # Show business hours
│ ├── pages/ # Page components
│ │ ├── RestaurantListingPage/ # Maps to restaurant_listing_page pod
│ │ │ ├── index.tsx
│ │ │ └── styles.ts
│ │ └── SingleRestaurant/ # Individual restaurant page
│ │ ├── index.tsx
│ │ └── styles.ts
│ ├── hooks/ # Custom React hooks
│ │ ├── usePodData.ts # Hook to fetch pod data
│ │ └── useRestaurantFilters.ts # Filter logic
│ ├── types/ # TypeScript definitions
│ │ ├── pods.d.ts # Pod structure types
│ │ ├── restaurant.d.ts # Restaurant-related types
│ │ └── menu.d.ts # Menu-related types
│ ├── utils/ # Utility functions
│ │ ├── api.ts # WordPress REST API handlers
│ │ └── formatting.ts # Data formatting helpers
│ ├── styles/ # Global styles
│ │ ├── tailwind.css # Tailwind imports
│ │ └── global.css # Custom styles
│ └── App.tsx # Main React component
├── wordpress/ # WordPress theme files
│ ├── functions/
│ │ ├── pods-init.php # Pods configuration
│ │ ├── rest-api.php # Custom endpoints
│ │ └── assets.php # Asset loading
│ ├── templates/
│ │ ├── restaurant-listing.php
│ │ └── single-restaurant.php
│ ├── functions.php
│ ├── index.php
│ └── style.css
├── docker/ # Docker configuration
│ ├── wordpress/
│ │ └── Dockerfile
│ └── mysql/
│ └── init.sql
├── config/
│ ├── vite.config.ts
│ └── tailwind.config.js
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md

````

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Docker and Docker Compose
- WordPress development environment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wp-react-pods.git
cd wp-react-pods
````

2. Install dependencies:

```bash
npm install
```

3. Start the development environment:

```bash
docker-compose up -d
```

4. Run the development server:

```bash
npm run dev
```

## 🔧 Configuration

### WordPress Setup

1. Install and activate the Pods Framework plugin
2. Import the provided Pods configurations
3. Configure the REST API endpoints

### Environment Variables

Create a `.env` file:

```env
VITE_WP_API_URL=http://localhost:8080/wp-json
VITE_WP_API_VERSION=wp/v2
```

## 🔌 API Integration

### Pods Data Structure

- Base Page Pod
- Restaurant Pod
- Menu Pod
- Menu Item Pod
- Navigation Pod

### REST API Endpoints

- `/wp-json/wp/v2/restaurant`
- `/wp-json/wp/v2/menu`
- `/wp-json/wp/v2/menu-item`

## 📦 Component Usage

### Base Components

- `Layout`: Page layout wrapper
- `Navigation`: Site navigation
- `Hero`: Hero section display

### Restaurant Components

- `RestaurantList`: Restaurant listing container
- `RestaurantCard`: Individual restaurant display
- `RestaurantFilters`: Filter implementation

### Menu Components

- `MenuList`: Menu category display
- `MenuItem`: Individual menu item
- `MenuCategory`: Menu category container

