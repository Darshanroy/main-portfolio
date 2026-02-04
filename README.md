# 🚀 Futuristic 3D Portfolio

A cutting-edge portfolio website featuring **Three.js 3D animations**, **GSAP scroll effects**, and **futuristic design aesthetics**.

![Portfolio Preview](https://img.shields.io/badge/Status-Ready-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## ✨ Features

- 🌌 **3D Animated Background** - Particle system with floating geometric shapes
- 🎨 **Futuristic Design** - Dark theme with neon cyan & magenta accents
- 💫 **Smooth Animations** - GSAP-powered scroll-triggered animations
- 🎯 **3D Skill Icons** - Interactive Three.js rendered tech stack
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **High Performance** - Smooth 60fps animations
- 🔍 **SEO Optimized** - Meta tags and semantic HTML
- ✨ **Glassmorphism UI** - Modern semi-transparent card designs

---

## 🎬 Live Demo

Simply open `index.html` in your browser to see it in action!

---

## 🛠️ Technologies

- **HTML5** - Semantic structure
- **CSS3** - Modern design system
- **JavaScript ES6+** - Interactive components
- **Three.js** - 3D graphics engine
- **GSAP** - Animation library
- **Google Fonts** - Orbitron, Rajdhani, Inter

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles.css              # Complete CSS design system
├── README.md              # This file
└── js/
    ├── three-background.js # 3D background animations
    ├── 3d-icons.js        # Interactive 3D skill icons
    ├── animations.js       # GSAP scroll animations
    └── main.js            # Main app controller
```

---

## 🚀 Quick Start

### Local Development

1. **Clone or download** this repository
2. **Open** `index.html` in a modern browser
3. That's it! No build process needed.

### Customization

#### 1. **Update Personal Info**

Edit `index.html`:
- Line 61: Your name
- Line 255+: Contact details
- Line 14: Page title

#### 2. **Add Your Projects**

Replace the example projects (lines 177-270) with your own:
- Project title
- Description
- Technology tags
- Links

#### 3. **Customize Skills**

Edit `js/3d-icons.js` - update the `skills` array:

```javascript
this.skills = [
    { name: 'Your Tech', level: 'Expert', color: 0xHEXCOLOR }
    // Add more...
];
```

#### 4. **Change Colors**

Edit `styles.css` CSS variables (lines 6-30):

```css
:root {
    --color-primary: #00f0ff;   /* Cyan */
    --color-secondary: #ff00ff; /* Magenta */
    --color-accent: #7b00ff;    /* Purple */
}
```

---

## 🌐 Deployment

### GitHub Pages (Free)

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

Then enable GitHub Pages in repository settings.

### Netlify (Free)

1. Visit [netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `portfolio` folder
3. Done!

### Vercel (Free)

```bash
npm install -g vercel
vercel
```

---

## 📱 Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome  | 90+             |
| Firefox | 88+             |
| Safari  | 14+             |
| Edge    | 90+             |

> **Note**: WebGL support required for 3D animations

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0a0f` | Primary background |
| Cyan | `#00f0ff` | Primary accent |
| Magenta | `#ff00ff` | Secondary accent |
| Purple | `#7b00ff` | Tertiary accent |
| White | `#ffffff` | Text |

---

## 📄 Sections

- **Hero** - Eye-catching introduction with animated title
- **About** - Personal info with animated statistics
- **Skills** - 3D interactive technology stack
- **Projects** - Showcase with glassmorphism cards
- **Contact** - Form with validation and social links

---

## 🎯 Performance

- ✅ 60fps animations via RequestAnimationFrame
- ✅ Hardware-accelerated CSS transforms
- ✅ Optimized Three.js rendering
- ✅ Lazy-loaded scroll animations
- ✅ Efficient particle system

---

## 💡 Future Enhancements

- [ ] Add blog section
- [ ] Integrate CMS
- [ ] Dark/light mode toggle
- [ ] Form backend integration
- [ ] Custom 3D models
- [ ] WebGL shaders
- [ ] Page transitions

---

## 📝 License

MIT License - Feel free to use for personal projects!

---

## 🙏 Credits

- **Fonts**: [Google Fonts](https://fonts.google.com)
- **3D Engine**: [Three.js](https://threejs.org)
- **Animations**: [GSAP](https://greensock.com/gsap)

---

## 📧 Contact

For questions or suggestions, feel free to reach out!

---

**Made with ❤️ and lots of caffeine ☕**

🚀 **Happy coding!**
