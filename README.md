# AFTER SCHOOL

An English, single-player anime styling game inspired by romantic and punk fashion magazines. Original generated character, dressing-room and wardrobe art.

## Play
Pick from nine coordinated outfits, with Punk and Romantic wardrobe filters. Change lipstick, blush, eyeliner, hairstyle, hair color and boot finish. Mix six necklaces with three earring styles and three bracelets. Choose Relaxed, Hand on hip or Peace sign, then press **Show off** to cycle through the poses. The character breathes, tilts her head, blinks and smiles while motion is on. Follow one of three optional styling briefs and earn up to four stars. Undo or randomize, save up to 12 looks in your browser, and download styled portraits.

This edition uses complete outfit sprites, rather than freely mixing every top and bottom. Hair controls offer a tousled bob, long waves, high ponytail and twin braids, each with four colors. Punk looks offer three platform-boot finishes; romantic looks have coordinated shoes. Makeup, hair and jewelry are composited on the character and reflected in the close-up and downloaded portrait. Downloaded portraits capture the selected pose as a still image. The Motion toggle pauses animation, and the site respects reduced-motion settings.

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

![Pose and face animation recorded in the game](docs/animation.gif)

## Deployment

GitHub Actions publishes `dist/` to GitHub Pages after every push to `main`. All asset and module paths are relative, so the game runs under the repository's Pages path. There are no server-side services or secrets.
