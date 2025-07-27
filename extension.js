const vscode = require('vscode');
const { URL } = require('url');

/* 95 % generic tracker keys */
const TRACKER_KEYS = [
  /^utm_/i, /^fbclid$/i, /^gclid$/i, /^dclid$/i, /^msclkid$/i,
  /^yclid$/i, /^igshid$/i, /^mc_/i, /^vero_/i,
  /^_hsenc$/i, /^_hsmi$/i, /^ga_\w+/i, /^pk_\w+/i,
  /^spm$/i, /^ref$/i, /^ref_$/i, /^fb_action_.+/i
];

/* keep-needed keys per host */
const DOMAIN_WHITELIST = {
  'youtube.com': [/^v$/i, /^t$/i],
  'youtu.be'   : [/^v$/i, /^t$/i],
  'github.com' : [/^tab$/i],
  'amazon.com':   [/^th$/i, /^psc$/i],
  'amazon.in':    [/^th$/i, /^psc$/i],
  'amazon.co.uk': [/^th$/i, /^psc$/i],
  'ebay.com':     [/^var$/i, /^hash$/i]
};

/* heavy retailer junk */
const HEAVY_RETAIL_KEYS = [
  /^crid$/i, /^qid$/i, /^sr$/i, /^keywords$/i, /^sprefix$/i,
  /^linkCode$/i, /^tag$/i, /^adId$/i, /^ascsubtag$/i,
  /^hsa_.+/i, /^pf_rd_.+/i, /^pd_rd_.+/i, /^mkcid$/i, /^mkrid$/i,
  /^siteid$/i, /^campid$/i
];

let enabled = true;
let bar;

function activate(context) {
  const cfg = vscode.workspace.getConfiguration('urlDetracker');
  enabled = cfg.get('enabled', true);
  setCtx(enabled);

  bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  bar.command = 'urlDetracker.toggle';
  updateBar();
  bar.show();

  context.subscriptions.push(
    vscode.commands.registerCommand('urlDetracker.paste', onPaste),
    vscode.commands.registerCommand('urlDetracker.toggle', toggle),
    bar
  );
}
exports.activate = activate;
exports.deactivate = () => {};

async function onPaste() {
  const ed = vscode.window.activeTextEditor;
  if (!ed || !enabled) {
    return vscode.commands.executeCommand('editor.action.clipboardPasteAction');
  }

  const raw     = await vscode.env.clipboard.readText();
  const cleaned = cleanBlock(raw);

  await ed.edit(b => ed.selections.forEach(sel => b.replace(sel, cleaned)));
  if (cleaned !== raw)
    vscode.window.setStatusBarMessage('🔗 tracking params removed', 1800);
}

function cleanBlock(text) {
  const cfg         = vscode.workspace.getConfiguration('urlDetracker');
  const keepExtra   = cfg.get('keepList',   []).map(r => new RegExp(r, 'i'));
  const removeExtra = cfg.get('removeList', []).map(r => new RegExp(r, 'i'));

  return text.replace(/https?:\/\/[^\s)'"<>]+/gi, raw => {
    let url; try { url = new URL(raw); } catch { return raw; }

    const host      = url.hostname.replace(/^www\./, '');
    const hostKeep  = DOMAIN_WHITELIST[host] || [];
    const isRetail  = /amazon\./.test(host) || /ebay\./.test(host);

    const qs = url.searchParams;
    let removed = 0;

    for (const key of [...qs.keys()]) {
      /* keep rules */
      if (hostKeep.some(re => re.test(key)) || keepExtra.some(re => re.test(key)))
        continue;

      /* removal rules */
      const kill =
        removeExtra.some(re => re.test(key)) ||
        TRACKER_KEYS.some(re => re.test(key)) ||
        (isRetail && HEAVY_RETAIL_KEYS.some(re => re.test(key)));

      if (kill) { qs.delete(key); removed++; }
    }

    /* safety: if everything would go, keep original */
    if (!removed || ![...qs.keys()].length) return raw;

    url.search = qs.toString();
    return url.toString();
  });
}

function toggle() {
  enabled = !enabled;
  vscode.workspace.getConfiguration('urlDetracker').update('enabled', enabled, true);
  setCtx(enabled);
  updateBar();
  vscode.window.showInformationMessage(`URL De-Tracker ${enabled ? 'enabled' : 'disabled'}`);
}

function updateBar() {
  bar.text = enabled ? '🔗 Clean ON' : '🔗 Clean OFF';
  bar.tooltip = 'URL De-Tracker — click to toggle';
}
function setCtx(v) {
  vscode.commands.executeCommand('setContext', 'urlDetracker.enabled', v);
}
