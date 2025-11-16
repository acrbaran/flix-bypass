# 🎬 Flix Bypass

A Chrome extension that bypasses certain Netflix restrictions by temporarily modifying specific cookies.

[🇹🇷 Türkçe Dökümantasyon](./README_TR.md)

## 📋 Features

- ✨ **Automatic Mode**: Automatically activates when browsing Netflix content
- 🍪 **Cookie Management**: Temporarily modifies the `SecureNetflixId` cookie
- 🎯 **Smart Detection**: Works on `/watch` and `/browse` pages
- 🔄 **Auto-Restore**: Automatically restores original cookie values after bypass
- 🎨 **Netflix-styled UI**: Clean and modern interface matching Netflix design
- ⚡ **Fast & Lightweight**: Minimal resource usage

## 🚀 Installation

### Method 1: Manual Installation (Developer Mode)

1. Clone or download this repository:
```bash
git clone https://github.com/acrbaran/flix-bypass.git
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked**

5. Select the `flix-bypass` folder

6. The extension icon should now appear in your Chrome toolbar

### Method 2: Drag and Drop

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode**
3. Drag and drop the entire folder onto the extensions page

## 📸 Screenshots

<div align="center">

### Extension Popup - Inactive State
![Flix Bypass Inactive](ss1.png)

### Extension Popup - Active State
![Flix Bypass Active](ss2.png)

</div>

## 🎮 Usage

1. **Navigate to Netflix**
   - Go to [netflix.com](https://netflix.com)
   - Browse to any content page or watch page

2. **Activate Bypass**
   - Click the Flix Bypass extension icon
   - Click the **"Activate Bypass"** button
   - The button will turn green when active

3. **Enjoy Content**
   - The extension will automatically work when needed
   - Original cookies are restored after bypass

4. **Deactivate** (Optional)
   - Click the extension icon again
   - Click **"Deactivate Bypass"** to turn it off

## 📁 Project Structure

```
flix-bypass/
├── manifest.json      # Extension configuration
├── background.js      # Background service worker
├── popup.html        # Extension popup interface
├── popup.js          # Popup functionality
├── logo.png          # Extension icon
└── README.md         # Documentation
```

## 🔧 How It Works

1. **Detection**: The extension monitors Netflix pages for specific patterns
2. **Cookie Modification**: When triggered, it temporarily changes the `SecureNetflixId` cookie
3. **Button Click**: Automatically clicks the play/continue button
4. **Restoration**: After 3 seconds, the original cookie value is restored

## ⚙️ Technical Details

### Permissions Required

- `cookies` - To read and modify Netflix cookies
- `activeTab` - To interact with the current tab
- `storage` - To save extension settings
- `webNavigation` - To detect page navigation
- `scripting` - To inject scripts and click elements
- `host_permissions: <all_urls>` - To work on Netflix domains

### Technologies Used

- Chrome Extension Manifest V3
- JavaScript (ES6+)
- Chrome Storage API
- Chrome Cookies API
- Chrome Scripting API

## 🛡️ Privacy & Security

- **No Data Collection**: This extension does not collect, store, or transmit any user data
- **Local Operation**: All operations are performed locally in your browser
- **Temporary Changes**: Cookie modifications are temporary and automatically reversed
- **No External Connections**: The extension does not communicate with any external servers

## ⚠️ Disclaimer

This extension is for **educational purposes only**. Users are responsible for complying with Netflix's Terms of Service. The developers are not responsible for any misuse or violations of service terms.

## 🐛 Troubleshooting

### Extension Not Working?

1. Make sure the extension is **activated** (button should be green)
2. Refresh the Netflix page
3. Check that you're on a `/watch` or `/browse` page
4. Try disabling and re-enabling the extension

### Button Not Clicking?

- The extension looks for specific button classes
- Netflix may update their UI, which could affect functionality
- Try manually clicking the button first

### Cookies Not Changing?

- Check if other extensions are interfering
- Make sure you're logged into Netflix
- Clear your browser cache and try again

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is provided as-is for educational purposes.

## 👨‍💻 Developer

Developed with ❤️ for learning purposes

---

**Note**: This extension is not affiliated with, endorsed by, or connected to Netflix in any way.

