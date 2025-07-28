# URL De-Tracker 🔗✂️

**Paste a link → get a clean link.**

Automatically removes tracking garbage (`utm_*`, `fbclid`, `gclid`, Amazon affiliate tags, etc.) from any URL you paste in Visual Studio Code. **No external APIs** - everything happens locally on your machine.

![Screen Recording 2025-07-28 at 10 35 11 AM-2](https://github.com/user-attachments/assets/cabaeae0-edf1-4a44-9dfa-61123c0f6a77)


## ✨ What Makes This Different

### ❌ **NOT a URL Shortener**
- **No TinyURL, Bitly, or external services** - we don't create new short links
- **No network calls** - your URLs never leave your computer
- **No third-party dependencies** - pure local string processing
- **No click tracking** - unlike URL shorteners that track every click

### ✅ **URL Cleaner & Tracker Remover**
- **Keeps original domain** - `amazon.com` stays `amazon.com`
- **Removes only junk parameters** - preserves functional ones
- **100% offline operation** - works without internet after installation
- **Privacy-first approach** - your links remain completely private

---

## ✨ Features

- **🚀 Automatic clean-paste** – intercepts `Ctrl/Cmd + V` and strips 95%+ of tracker parameters
- **🔧 Smart preservation** – keeps essential params (YouTube video IDs, Amazon variants, auth tokens)
- **⚡ One-click toggle** – status bar shows `🔗 Clean ON/OFF`
- **🔒 100% offline & private** – no external API calls, URLs never transmitted anywhere
- **🎯 Heavy-duty rules** – specialized cleaning for Amazon, eBay, social media links
- **🚫 No URL shortening** – maintains original domain for transparency

### Before & After Examples

| Before (tracking junk) | After (clean) |
|------------------------|---------------|
| `https://amazon.com/product/dp/B123?th=1&psc=1%60 | `https://amazon.com/product/dp/B123?th=1&psc=1` |
| `https://youtube.com/watch?v=abc&t=42s%60 | `https://youtube.com/watch?v=abc&t=42s` |
| `https://news.com/article?id=42%60 | `https://news.com/article?id=42` |

**Notice:** The domain stays the same - we clean, not shorten!

---

## 🔒 Privacy & Security

### **Why No External APIs?**
- **Corporate compliance** - many companies ban external URL services
- **Privacy protection** - your browsing habits aren't tracked
- **Reliability** - works offline, no service downtime
- **Speed** - instant processing without network delays
- **Transparency** - you can see exactly where links point

### **What We DON'T Do**
- ❌ Send URLs to TinyURL, Bitly, or any external service
- ❌ Create redirect links through third-party domains
- ❌ Track your usage or collect analytics
- ❌ Require internet connection after installation
- ❌ Store or log your URLs anywhere

### **What We DO**
- ✅ Process URLs locally using JavaScript regex patterns
- ✅ Preserve the original destination domain
- ✅ Keep functional parameters needed for the link to work
- ✅ Work completely offline once installed
---

## 📦 Installation

### Method 1: VS Code Marketplace (Recommended)

**🔗 Direct Link:** [Install URL De-Tracker](https://marketplace.visualstudio.com/items?itemName=rishitkar.url-detracker)

**Via Command Line:**

```bash
code --install-extension rishitkar.url-detracker
```
**This command works globally on any computer with VS Code installed!**

**Via VS Code Interface:**
1. Open VS Code
2. Press `Ctrl+Shift+X` (Extensions view)
3. Search: `URL De-Tracker` or `rishitkar`
4. Click **Install**
5. Reload when prompted

## 🚀 Quick Start Guide

### 1. Verify Installation
After installation, check the **status bar** (bottom-right) shows: `🔗 Clean ON`

### 2. See the Magic
- ✅ Brief toast: `🔗 tracking params removed`
- ✅ Status bar shows activity
- ✅ Clean, readable URL - still points to Amazon, just without junk
- ✅ **No external service calls made**

**💝 Love this extension? Star it on [GitHub](https://github.com/rishitkar/url-detracker) and share with your team!**

