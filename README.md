# assignment7
# Hypnotic Taiji

## Concept & Aesthetics  
This meditation on cosmic duality explores the tension between minimalism and digital psychedelia. The rotating Taiji symbol—an ancient representation of yin-yang balance—becomes a portal to virtual cosmology through GLSL shaders. As rotational acceleration increases, chromatic aberration mimics relativistic spacetime distortion, while gold-tinted glow effects manifest imagined quantum energy fields. The intentional visual noise created by RGB channel splitting paradoxically enhances the symbol's primal resonance in our digital age.

## Technical Exploration  
The shader pipeline achieves three key transformations:  
1. **Velocity-Driven Effects** - Rotation speed (`rotSpeed`) dynamically controls chromatic offset magnitude and glow intensity  
2. **Perceptual Layering** - Luminance-based glow creates illusory depth beyond the 2D plane  
3. **Coordinate Remapping** - Texture Y-axis inversion bridges p5's screen space with WebGL's UV coordinates  

**Shader Additions**  
- Temporal RGB separation creating motion trails  
- Self-illumination effect reacting to contrast changes  
- Dynamic texture sampling offsets  

**Sacrificed Elements**  
- Original monochromatic purity  
- Immediate visual legibility  
- Precise geometric edge definition  
