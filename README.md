# QuickHire™ Job Board — Global Shell Build

Last Updated: 2026-06-08T20:38:12Z UTC  
Developed by Cook Technology Services

## Canonical global layout

Every HTML page now loads the same shared site shell:

- `assets/global-shell.css`
- `assets/global-shell.js`

The shared shell owns the QuickHire Job Board header, responsive search bar, account navigation, contextual page links, legal footer, and footer year. Page files no longer contain independent copies of the header or footer markup.

## Canonical favicon data

All pages reference the same root icon set:

- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon-48x48.png`
- `favicon-96x96.png`
- `favicon-192x192.png`
- `apple-touch-icon.png`
- `site.webmanifest`

`assets/global-shell.js` also restores these head references automatically on future pages that load the shell.

## GitHub Pages

The custom domain remains defined by the root `CNAME` file:

`jobboard.quickhireagency.com`

## Important maintenance rule

Edit the global header, footer, navigation, or favicon references in the shared shell files instead of editing every page independently.
