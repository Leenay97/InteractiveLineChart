# 📊 InteractiveLineChart

**Live Demo:**
👉 [https://leenay97.github.io/InteractiveLineChart/](https://leenay97.github.io/InteractiveLineChart/)

Interactive Line Chart for visualizing A/B test statistics based on `data.json`.
The app displays **conversion rates** for each variation, allows toggling lines, switching between day/week data, changing line style, using light/dark theme, and exporting the chart as PNG.

Built with **React + TypeScript** and deployed on **GitHub Pages**.

---

## ✨ Features

### 🔹 Core Functionality

* Display **conversion rate (%)** for all variations.
* **Day / Week toggle**:

  * **Day** — daily data
  * **Week** — weekly averages automatically calculated
* **Variation selector**:

  * At least one variation is always active
  * Graph axes adjust automatically when variations are toggled
* Fully **responsive layout** (671px — 1300px)
* **Hover effect**:

  * Vertical guide line
  * Custom tooltip with sorted variation values

### 🔹 Bonus Features (implemented)

* **Line style selector**: choose between Line, Smooth (monotone), and Area
* **Light / Dark theme toggle**
* **Export chart to PNG**

---

## 🛠️ Tech Stack

| Technology             | Usage                                      |
| ---------------------- | ------------------------------------------ |
| **React + TypeScript** | Core application logic                     |
| **Recharts**           | Lines, axes, tooltips, chart customization |
| **CSS Modules / SCSS** | Component styling                          |
| **GitHub Pages**       | Deployment                                 |

---

## 📦 Installation & Local Development

```bash
# 1. Clone repository
git clone https://github.com/leenay97/InteractiveLineChart.git

# 2. Go to project directory
cd InteractiveLineChart

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open in your browser:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🚀 Deploy to GitHub Pages

The project is already deployed, but to redeploy:

```bash
npm run build
npm run deploy
```

Deployment uses **gh-pages** branch.

---

## 📁 Project Structure

```
InteractiveLineChart/
│
├── public/
├── src/
│   ├── components/
│   │   ├── Chart/
│   │   ├── OptionPanel/
│   │   ├── CustomTooltip/
│   │   └── ...
│   ├── contexts/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── App.css
│
├── data.json
├── package.json
└── README.md
```

---

## 📊 Conversion Rate Calculation

```ts
conversionRate = (conversions / visits) * 100;
```

All values are displayed as percentages with two decimal places.

---

## 📱 Responsive Layout

* Fully responsive for **screens between 671px and 1300px**
* Tooltip and control panel adapt for smaller screens
* Chart scaling and scrolling work responsively

---

## 💡 Visualization Library

**Recharts** is used because:

* Easy and fast integration
* Support for custom tooltips, lines, and areas
* Handles large datasets efficiently
* Flexible styling

---

## 🎨 Bonus Features

* **Light / Dark theme toggle**
* **Export chart to PNG**
* **Line style selector** (Line, Smooth, Area)
