# Inetixus portfolio

Live at https://inetixus.it. Static Vercel deployment; no build command required.

The original large live avatar, camera, pose, chair, lighting, effects, and page layout are restored. The hero geometry is unchanged. Shirt and accessory UV coordinates come from the user's native Roblox Studio avatar export, with the baked clothing atlas and original-resolution accessory images.

The elevator is the user's actual elevator.rbxm, imported through its native Studio OBJ export with original mesh geometry and material textures. It stays tiny at the right edge (48 px desktop, 32 px mobile), at a constant size, with its vertical position following page-scroll progress. Native door meshes open at the ends and close during travel. An orthographic view keeps the widget front-facing. No CSS recreation replaces the supplied model.

The source model SHA-256 is in stage/native-elevator.json. The browser fallback is a capture of that actual model. No AI artwork is used.

Project content and package prices are in site-content.json. Supabase authentication is unchanged; see AUTH_SETUP.md for setup and email delivery requirements.
