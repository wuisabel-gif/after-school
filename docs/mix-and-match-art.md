# Mix-and-match clothes: art brief

The nine outfits are each painted as one piece, so a top and a bottom can't be swapped.
A test that cut outfits at the waist and recombined them leaked sleeves from one outfit
and skirt edges from the other, because the arms and the skirt share the same pixels.
Real mix-and-match needs the clothes drawn as separate layers on one shared body. This
brief lists the three images to generate and how the game will stack them.

## Layers (drawn in this order)

1. **Body**: the figure in a plain black camisole, fitted black shorts and black tights, barefoot.
2. **Bottom**: skirt or trousers only.
3. **Top**: blouse, cardigan, shirt or jacket only, including sleeves.
4. **Shoes**: the existing boot finishes and romantic shoes.
5. **Head, makeup and jewelry**: unchanged.

Every image uses the cell size of `dist/assets/characters.webp`: each cell is 300 × 900 px,
the figure stands in the Relaxed pose, and the body sits in exactly the same place in every cell.

## Prompt 1: body (`body.png`)

Attach `dist/assets/characters.webp`.

```
Draw ONE figure on a 300 x 900 px transparent PNG, matching the first figure in the attached sheet exactly: same pose, size, position, proportions and painting style.
She wears only a plain black camisole, fitted black shorts and sheer black tights, and is barefoot. Arms hang relaxed at her sides exactly as in the reference.
Stop at the collar: no head, no jewelry, no text, no background.
```

## Prompt 2: tops (`tops.png`)

Attach `dist/assets/characters.webp` and the body image from prompt 1.

```
Make a 1800 x 900 px transparent PNG with six 300 x 900 px cells, left to right:
1 black leather biker jacket over a lace camisole, 2 cream lace blouse with a neck bow, 3 rose knit cardigan, 4 black lace corset top, 5 black button shirt, 6 lavender cardigan.
Each cell shows ONLY the garment, as worn by the body in the second image: same pose, same position, sleeves following the arms exactly to the wrists.
Draw nothing else: no skin, no head, no legs, no skirt, no background, no text. Tops end at the waist (about y = 330) except the jacket, which may hang to the hip.
Match the painting style and lighting of the first image.
```

## Prompt 3: bottoms (`bottoms.png`)

Attach the same two images.

```
Make a 1500 x 900 px transparent PNG with five 300 x 900 px cells, left to right:
1 red tartan pleated mini skirt with a studded belt, 2 black pleated mini skirt, 3 dark wide-leg jeans, 4 long cream floral skirt with a ribbon waist, 5 white ruffled tiered skirt.
Each cell shows ONLY the garment, as worn by the body in the second image: waistband at the same height (about y = 320), same position and proportions.
Draw nothing else: no skin, no tights, no shoes, no top, no background, no text.
Match the painting style and lighting of the first image.
```

## When the art arrives

1. Check each sheet is exactly the size above with transparency:
   `sips -g pixelWidth -g pixelHeight -g hasAlpha file.png`
2. Convert to WebP like the other sheets:
   `cwebp -q 90 -alpha_q 100 -exact -m 6 file.png -o dist/assets/file.webp`
3. Add `top` and `bottom` to the look state, and Tops and Bottoms tabs to the wardrobe. The
   nine complete outfits stay as presets, and briefs and the style judge read the new fields.
4. Hand on hip and Weight shift need their own tops and bottoms sheets later; until then
   mixing is offered in the Relaxed pose only.
