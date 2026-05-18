<div align="center">
  <h1>
    <span style="color: #2563eb;">🚚 Transport Shipment Tracker</span>
  </h1>
<img width="1909" height="957" alt="image" src="https://github.com/user-attachments/assets/270665cd-86c5-432f-ad58-8a419769f6cf" />

  
  <p>

## ✨ Features

### 🎯 Core Features
| Feature | Description | Status |
|---------|-------------|--------|
| 📦 **Shipment List** | Card-based view with all shipment details | ✅ |
| 🔍 **Shipment Details** | Complete route, vehicle & transporter info | ✅ |
| 👥 **Assign Transporter** | Dropdown selection with instant feedback | ✅ |
| 📊 **Real-time Stats** | Live counter of assigned/pending shipments | ✅ |
| 🔔 **Smart Notifications** | Toast messages for success/error states | ✅ |
| 📱 **PWA Ready** | Installable as native app | ✅ |


### 💎 Technical Features
| Feature | Description | Status |
|---------|-------------|--------|
| ⚡ **Vue 3 Composition API** | Modern reactive programming | ✅ |
| 🗃️ **Pinia State Management** | Centralized, predictable state | ✅ |
| 🚦 **Vue Router** | Seamless page navigation | ✅ |
| 🎨 **TailwindCSS** | Utility-first responsive design | ✅ |
| 🧪 **Unit Testing** | 90%+ coverage with Vitest | ✅ |
| 🧪 **manifest json** | Installable as native app (PWA)| ✅ |


---

## 🏗️ Step by steps
# 1. into folder transport-shipment-tracker
cd transport-shipment-tracker

# 2. Install dependencies
npm install

# 3. Install TailwindCSS
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# 4. Create style.css
echo "@tailwind base;" > src/style.css
echo "@tailwind components;" >> src/style.css
echo "@tailwind utilities;" >> src/style.css

# 5. Start development server
npm run dev

# 6. Open browser
# Visit: http://localhost:5173
