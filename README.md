# URL De-Tracker 🔗✂️  
*Paste a link → get a **clean** link.*

URL De-Tracker automatically removes advertising & analytics junk—`utm_*`, `fbclid`, `gclid`, Amazon “ref=” blobs, etc.—from any URL you paste in Visual Studio Code.

---

## ✨ What It **Does**

- **Automatic clean-paste** – intercepts **Ctrl/Cmd + V** and strips 95 %+ of known tracker keys.  
- **Heavy-duty retailer rules** – shrinks Amazon, eBay and similar “mile-long” links to the bare essentials (`th`, `psc`, variant IDs stay).  
- **One-click toggle** – status-bar indicator **🔗 Clean ON / OFF**.  
- **User customisation** –  
  - `keepList` → keys you *never* want removed.  
  - `removeList` → extra keys you *always* want gone.  
- **Safety fallback** – if wiping keys would break the link (nothing left after `?`) it pastes the original URL unchanged.

---

## 🚫 What It **Does NOT** Do

- **No shortening services** – it doesn’t hit external APIs (tinyurl, bit.ly).  
- **No hyperlink conversion** – pastes plain cleaned URLs (no `[label](url)` markup).  
- **No tracking of you** – extension runs 100 % offline; it never sends URLs anywhere.

