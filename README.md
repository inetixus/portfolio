# Inetixus portfolio

Live at https://inetixus.it. Static Vercel deployment; no build command required.

## Original portfolio and corrected avatar textures

The large live hero, its geometry, reference pose, camera, chair, lighting, crown effects, scroll transition, project showcases, pricing and contact layout are restored to the version before the elevator redesign. The original pose is retained, with the head and all head attachments seated 0.34 studs lower into the collar; normals, indices and the remaining body geometry are unchanged.

The user supplied a native Roblox Studio OBJ export of avatar.rbxm. Its baked body atlas and the avatar’s original-resolution accessory maps are in stage/native-avatar-tex. tools/import-native-exports.mjs transfers Studio's actual UV coordinates onto the existing posed hero geometry, preserving the bevels and pose. The earlier crop of the avatar thumbnail and planar shirt-template approximation are not used by the active avatar. Hero fallback plates are browser captures of the corrected live scene.

## Actual elevator model

The small elevator uses the supplied elevator.rbxm and its native Studio OBJ export, including 45 visible mesh groups, original wood/material textures, the indicator, interior and exterior door assemblies, and the light fixture. The source SHA-256 is recorded in stage/native-elevator.json. No substitute elevator geometry or CSS door panels are used.

The widget stays fixed at the right edge and remains the same small size throughout the page: 64 × 82 px on desktop, 44 × 56.375 px on mobile. Its vertical position tracks normalized page-scroll progress, with a short delay. It remains inside the viewport during fast scrolling and reversals. The actual mesh doors close during travel and open at the page ends. The upright avatar inside comes from the same native OBJ export. An orthographic camera keeps the small model front-facing. A subtle bottom-arrival light remains local to the widget.

The widget does not alter the main page's CSS, hero or section spacing. Physical GPU materials use the native normal maps, environment reflections, door shadows, a warm cabin light and a smooth pointer-responsive page light. It renders only when doors or lighting change and sleeps at rest; vertical travel uses a CSS transform. Reduced motion removes the travel and door easing. Its non-WebGL fallback is a capture of the actual supplied model.

## Content and accounts

Edit site-content.json for projects, reviews, screenshots and rates. Packages remain 200 / 300 / 450 Robux. Supabase account flows are unchanged. See AUTH_SETUP.md for Google OAuth, redirect and email-delivery configuration.

## Validation

npm run check verifies JavaScript. qa-native-edge.mjs checks the precise head translation and otherwise unchanged hero geometry and scene, and compares every elevator vertex against the native OBJ. Browser checks cover the large live hero, tiny constant widget size, viewport visibility, scroll progress, door sequencing, reversals, reduced motion and overflow. qa-polish.mjs covers original pose/crown/camera and FAQ interactions; qa-pricing.mjs covers package and contact behavior.


Mobile layouts now have compact navigation, touch-friendly controls, readable forms, smaller pricing cards, and a wider avatar camera view. The mobile 3D <I> mark is hidden and the side light is larger.
