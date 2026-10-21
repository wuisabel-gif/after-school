# AFTER SCHOOL

An English, single-player anime styling game inspired by romantic and punk fashion magazines. Original generated character, dressing-room and wardrobe art.

## Play
Pick from nine coordinated outfits, with Punk and Romantic wardrobe filters. Change lipstick, blush, eyeliner, hairstyle, hair color and boot finish. Mix six necklaces with three earring styles and three bracelets. Choose Relaxed, Hand on hip or Weight shift, then select Neutral, Soft gaze, Eyes closed or Smile for the character's face. The character idles with gentle breathing, a slight sway and natural blinks, and pops into each new outfit or pose (all paused for reduced-motion users). Play the Story: one week after school in five scenes, from a first café visit to a midnight show, where earning four stars on each scene unlocks the next day. Follow one of five optional styling briefs; the stage note shows your stars live as you style, and completed briefs are remembered. One brief is highlighted as today's, and finishing briefs on consecutive days builds a streak. Undo and redo (Cmd/Ctrl+Z and Shift+Z) or randomize, save up to 12 looks in your browser, download styled portraits, or copy a share link that opens any look in another browser.

This edition uses complete outfit sprites, rather than freely mixing every top and bottom. Hair controls offer a tousled bob, long waves, high ponytail and twin braids, each with four colors. Punk looks offer three platform-boot finishes; romantic looks have coordinated shoes. Makeup, hair, jewelry, pose and facial expression are reflected in the close-up, saved look and downloaded portrait.

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

## More screenshots

### Punk styling and makeup

![Leather jacket look with makeup controls](docs/punk-studio.png)

### Romantic wardrobe and hairstyles

![Floral outfit with long waves and the weight-shift pose](docs/romantic-studio.png)

### Jewelry collection

![Necklace choices alongside the styled character](docs/jewelry-studio.png)

### Styling challenges

![The three optional styling briefs](docs/styling-challenges.png)

### On your phone

<img src="docs/mobile-studio.png" alt="AFTER SCHOOL studio on a phone" width="390">

## Deployment

GitHub Actions publishes `dist/` to GitHub Pages after every push to `main`. All asset and module paths are relative, so the game runs under the repository's Pages path. There are no server-side services or secrets.
