# ElectroHub - Modern Electronics E-commerce Website

A modern, responsive electronics e-commerce website built with HTML, TailwindCSS, and JavaScript featuring a futuristic dark theme with neon accents.

## 🚀 Features

### Design & UI
- **Dark/Light Mode Toggle**: Switch between dark and light themes with theme persistence
- **Modern Dark Theme**: Sleek black background with neon blue/green accents
- **Clean Light Theme**: Professional white/gray theme for better readability
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: CSS transitions and JavaScript-powered interactions
- **Futuristic Design**: Tech-inspired UI with glowing effects

### Pages
- **Homepage**: Hero section, featured categories, product carousel, deals section
- **Products Page**: Grid layout with filtering and search functionality
- **Product Details**: Image gallery, specifications, add to cart
- **About Page**: Company story, mission, team information
- **Contact Page**: Contact form, store location, FAQ section

### Functionality
- **Shopping Cart**: Persistent cart with local storage
- **Product Search**: Real-time search across all products
- **Product Filtering**: Filter by category, price range, and sorting options
- **Mobile Navigation**: Collapsible mobile menu
- **Interactive Elements**: Product carousels, image galleries, form validation

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **TailwindCSS**: Utility-first CSS framework via CDN
- **JavaScript (ES6+)**: Modern JavaScript for interactivity
- **Lucide Icons**: Beautiful icon library
- **Local Storage**: For cart persistence

## 📁 File Structure

```
ElectroHub/
├── index.html              # Homepage
├── products.html            # Products listing page
├── product-details.html     # Individual product page
├── about.html              # About us page
├── contact.html            # Contact page
├── assets/
│   ├── js/
│   │   ├── main.js         # Core functionality & cart management
│   │   ├── products.js     # Products page functionality
│   │   ├── product-details.js # Product details page
│   │   └── contact.js      # Contact form handling
│   └── images/             # Image assets (placeholder folder)
└── README.md               # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary Dark**: #0A0A0A (dark-bg)
- **Secondary Dark**: #1A1A1A (dark-secondary) 
- **Accent Dark**: #2A2A2A (dark-accent)
- **Neon Blue**: #00D2FF (primary accent)
- **Neon Green**: #39FF14 (secondary accent)

### Key Components
- Glowing button effects with CSS box-shadow
- Gradient backgrounds and borders
- Hover animations and transitions
- Responsive grid layouts
- Fixed navigation with backdrop blur

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open index.html** in a web browser
3. **Explore** the different pages and features

### Running Locally
Since this is a static website, you can:
- Open directly in browser
- Use a local server like Python's `http.server`
- Use VS Code Live Server extension

```bash
# Using Python 3
python -m http.server 3000

# Using Node.js http-server
npx http-server -p 3000
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🛍️ Shopping Cart Features

- Add/remove products
- Quantity management
- Price calculations
- Persistent storage (localStorage)
- Slide-out cart sidebar
- Floating cart button

## 🔧 Customization

### Adding New Products
Products are stored in JavaScript arrays in `main.js` and `products.js`. To add new products:

```javascript
{
    id: 13,
    name: "New Product",
    category: "category-name",
    price: 199.99,
    originalPrice: 249.99,
    image: "image-url",
    description: "Product description",
    featured: false
}
```

### Styling Changes
The website uses TailwindCSS classes. Custom colors are defined in the `tailwind.config` object in each HTML file.

### JavaScript Functionality
- `main.js`: Core functions, cart management, navigation
- `products.js`: Product filtering, search, display
- `product-details.js`: Individual product functionality
- `contact.js`: Form handling and FAQ interactions
- `theme.js`: Dark/Light mode toggle with localStorage persistence

### Theme Toggle Feature
The website includes a theme toggle button in the navigation bar:
- **Moon icon**: Indicates dark mode is active (click to switch to light mode)
- **Sun icon**: Indicates light mode is active (click to switch to dark mode)
- **Persistence**: Your theme preference is saved in localStorage
- **Smooth Transition**: All elements transition smoothly between themes

## 📊 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🎯 Future Enhancements

- User authentication
- Payment integration
- Real backend API
- Product reviews system
- Wishlist functionality
- Advanced product filtering
- Social media integration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

**ElectroHub** - Your One-Stop Electronics Store 🛒⚡
