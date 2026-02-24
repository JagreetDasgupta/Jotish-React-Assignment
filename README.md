# Employee Dashboard - Modern React Application

A sophisticated employee management dashboard built with React, TypeScript, and Vite, featuring a modern UI design, comprehensive data visualization, and seamless user experience.

DEMO LINK: https://drive.google.com/file/d/1AywjaoQ59T-FLNBdotmiutWDAnnb7WQc/view?usp=sharing
## 🌟 Features

### 🔐 Authentication System
- **Secure Login**: Simple yet effective credential-based authentication
- **Persistent Sessions**: Login state maintained across browser sessions
- **Protected Routes**: Route guards ensuring authenticated access to sensitive pages
- **Automatic Redirects**: Intelligent navigation based on authentication status

### 📊 Employee Management
- **Real-time Data Fetching**: Dynamic employee data from external API
- **Centralized State Management**: React Context for efficient data handling
- **Advanced Search**: Real-time filtering by employee name or city
- **Data Persistence**: Search queries saved for user convenience
- **Export Functionality**: CSV export for data analysis

### 📈 Data Visualization
- **Interactive Charts**: Beautiful salary bar charts using Recharts
- **Geographic Mapping**: Leaflet-powered city distribution visualization
- **Responsive Design**: Charts and maps adapt to all screen sizes
- **Smooth Animations**: Engaging transitions and micro-interactions

### 📸 Media Integration
- **Webcam Support**: Direct camera access for employee photos
- **Photo Capture**: High-quality image capture functionality
- **Download Capability**: Save captured photos locally
- **Employee Association**: Link photos to specific employee records

### 🎨 Modern UI/UX
- **Professional Design**: Clean, minimalist interface inspired by modern SaaS platforms
- **Dark/Light Themes**: Seamless theme switching with persistent preferences
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: WCAG-compliant color contrasts and keyboard navigation
- **Micro-interactions**: Subtle animations and hover effects throughout

## 🛠 Tech Stack

### Core Technologies
- **React 19** - Modern hooks and concurrent features
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Lightning-fast development and building

### Routing & State Management
- **React Router DOM v7** - Client-side routing with route guards
- **React Context** - Global state management for authentication and data

### Data & API
- **Axios** - HTTP client for API communication
- **Custom API Integration** - RESTful API with POST-based data fetching

### Visualization & Mapping
- **Recharts** - Interactive chart library with custom styling
- **React Leaflet** - Map integration with clustering support
- **React Webcam** - Camera access and photo capture

### Styling & Design
- **Custom CSS** - Modern CSS with CSS variables
- **Google Fonts** - Inter and Space Grotesk typography
- **CSS Grid & Flexbox** - Responsive layout systems
- **CSS Variables** - Comprehensive theming system

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser with camera permissions

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jotish-react-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open application**
   - Navigate to `http://localhost:5173` (or port shown in terminal)
   - Application will automatically reload on file changes

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🔑 Authentication

### Default Credentials
- **Username**: `testuser`
- **Password**: `Test123`

### Authentication Flow
1. Enter credentials on the login page
2. Successful authentication redirects to employee list
3. Session persists across browser refreshes
4. Logout clears session and returns to login

## 📱 Application Structure

### Page Overview

#### **Login Page**
- Clean, centered authentication interface
- Form validation and error handling
- Responsive design for all devices

#### **Employee List**
- Comprehensive employee data table
- Real-time search functionality
- Export to CSV capability
- Quick navigation to details and visualizations

#### **Employee Details**
- Individual employee information display
- Photo capture integration
- Navigation back to list
- Clean, card-based layout

#### **Salary Chart**
- Interactive bar chart visualization
- Top 10 employees by salary
- Responsive and animated
- Custom tooltip styling

#### **City Map**
- Geographic employee distribution
- Interactive markers with clustering
- City-based employee counts
- Smooth map interactions

#### **Photo Capture**
- Webcam integration
- Real-time preview
- Photo download functionality
- Employee association

### Component Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation with theme toggle
│   ├── ProtectedRoute.tsx # Authentication guard
│   ├── ScrollToTop.tsx   # Route change handler
│   └── Skeleton.tsx      # Loading placeholder
├── context/            # Global state management
│   ├── AuthContext.tsx   # Authentication state
│   ├── EmployeeContext.tsx # Employee data
│   ├── ThemeContext.tsx  # Theme preferences
│   └── ToastContext.tsx  # Notifications
├── pages/              # Route components
│   ├── Login.tsx        # Authentication page
│   ├── List.tsx         # Employee list
│   ├── Details.tsx      # Employee details
│   ├── BarChart.tsx     # Salary visualization
│   ├── MapView.tsx      # Geographic view
│   └── PhotoResult.tsx  # Photo capture
├── services/           # API integration
│   ├── apiClient.ts     # HTTP client configuration
│   └── employeeService.ts # Employee data fetching
├── types/              # TypeScript definitions
│   └── employee.ts     # Employee interface
└── utils/              # Helper functions
    └── storage.ts      # Local storage utilities
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` (Light) / `#3b82f6` (Dark)
- **Background**: `#f8fafc` (Light) / `#0f172a` (Dark)
- **Card Background**: `#ffffff` (Light) / `#1e293b` (Dark)
- **Text**: `#0f172a` (Light) / `#f1f5f9` (Dark)

### Typography
- **Primary Font**: Inter (clean, readable body text)
- **Heading Font**: Space Grotesk (modern, distinctive headers)
- **Font Sizes**: Responsive scaling from 12px to 36px
- **Line Height**: 1.6 for optimal readability

### Spacing System
- **Base Unit**: 8px (0.5rem)
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px
- **Consistent Usage**: Applied throughout all components

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px
- **Large Desktop**: > 1200px (max-width container)

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting (if configured)
- **Prettier**: Code formatting (if configured)
- **React Hooks**: Modern React patterns
- **Component Composition**: Reusable, maintainable components

### Performance Optimizations
- **Code Splitting**: Lazy loading of route components
- **Memoization**: React.memo and useMemo for expensive operations
- **Efficient Rendering**: Optimized re-renders with proper dependencies
- **Bundle Optimization**: Vite's optimized building process

## 🌐 Browser Support

- **Chrome/Chromium**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile Browsers**: iOS Safari, Android Chrome

## 📸 Screenshots & Demos

### Key Screens to Explore

1. **Login Interface**
   - Clean authentication form
   - Error state handling
   - Responsive design

2. **Employee Dashboard**
   - Comprehensive data table
   - Search and filter capabilities
   - Export functionality

3. **Data Visualizations**
   - Interactive salary charts
   - Geographic employee distribution
   - Responsive chart design

4. **Employee Details**
   - Individual record view
   - Photo integration
   - Clean information hierarchy

5. **Photo Capture**
   - Webcam interface
   - Real-time preview
   - Download functionality

## 🔒 Security Considerations

- **Authentication**: Client-side validation with API integration
- **Data Protection**: No sensitive data stored in localStorage
- **API Security**: HTTPS communication with external services
- **Camera Permissions**: Proper permission handling and error states

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: AWS CloudFront, Cloudflare
- **Server**: Nginx, Apache with static file serving

### Environment Variables
Create `.env.production` for production-specific configurations:
```env
VITE_API_URL=https://your-api.com
VITE_APP_TITLE=Employee Dashboard
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make changes with proper testing
4. Submit pull request with description

### Code Standards
- Follow TypeScript best practices
- Use meaningful component and variable names
- Implement proper error handling
- Maintain responsive design principles

## 📝 License

This project is for demonstration purposes as part of the Jotish React assignment.

## 📞 Support

For questions or issues regarding this assignment:
- Review the code comments and documentation
- Check browser console for errors
- Ensure all dependencies are properly installed
- Verify camera permissions for photo features

---

**Built with ❤️ using modern web technologies**
