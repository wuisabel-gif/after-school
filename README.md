# AFTER SCHOOL

An English, single-player anime styling game inspired by romantic and punk fashion magazines. Original generated character, dressing-room and wardrobe art.

## Play
Pick one of six coordinated outfits. Change lipstick, blush, eyeliner, hair color, boot finish and necklace. Follow one of three optional styling briefs and earn up to four stars. Undo or randomize, save up to 12 looks in your browser, and download styled portraits.

This first edition uses complete outfit sprites, rather than freely mixing every top and bottom. Hair controls change color, and shoes offer three platform-boot finishes. Makeup and necklaces are composited on the character and reflected in the close-up and downloaded portrait.

## Run
Serve `dist/` with any static server, for example `python3 -m http.server 5174 --directory dist`. No build, API key, backend or account is required by the game. Hosting access may depend on the site's sharing settings. Saved data stays in localStorage; clearing browser data removes the album.

## Structure
- `dist/index.html`: semantic app layout
- `dist/style.css`: responsive editorial design
- `dist/app.js`: controls, challenges, undo and saved-look storage
- `dist/art.js`: generated sprite atlas rendering and makeup compositing
- `dist/assets/`: original generated production artwork

External fonts are optional; Georgia and system sans-serif fallbacks are supplied. No analytics or uploaded photos.

## Play online

[Play AFTER SCHOOL](https://wuisabel-gif.github.io/after-school/)

![AFTER SCHOOL studio](docs/studio.png)

## Deployment

GitHub Actions publishes `dist/` to GitHub Pages after every push to `main`. All asset and module paths are relative, so the game runs under the repository's Pages path. There are no server-side services or secrets.
