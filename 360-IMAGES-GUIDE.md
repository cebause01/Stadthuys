# 360-Degree Images Guide for The Stadthuys E-Portfolio

## Overview

The website now includes 360-degree virtual tour functionality using **Pannellum**, a free and open-source panorama viewer library. This allows visitors to explore The Stadthuys in an immersive way.

## Current Implementation

The 360-degree viewers are currently using placeholder images. You need to replace these with actual 360-degree (equirectangular) photographs taken during your site visit.

## How to Create 360-Degree Images

### Method 1: Using a Smartphone (Easiest)

1. **iPhone (iOS 14+):**
   - Open the Camera app
   - Select "Pano" mode
   - Take a full 360° panoramic photo
   - The resulting image can be used, but note: standard panorama mode creates wide-angle images, not true 360° spheres

2. **Android Phones:**
   - Use Google Street View app
   - Tap the Camera icon
   - Select "Photo Sphere"
   - Follow on-screen instructions to capture 360° view

3. **Dedicated 360° Camera Apps:**
   - **Google Camera** (Android): Photo Sphere feature
   - **360 Panorama** (iOS)
   - **Cardboard Camera** (iOS/Android)

### Method 2: Using Specialized 360° Cameras

- Insta360 ONE X2
- Ricoh Theta
- GoPro MAX
- Samsung Gear 360

### Method 3: Using Traditional Camera + Software

1. Take multiple overlapping photos in a circle (every 30-45 degrees)
2. Use stitching software:
   - **Hugin** (Free, cross-platform)
   - **PTGui** (Paid, professional)
   - **Autopano Giga** (Paid, professional)

## Image Requirements

### Technical Specifications

- **Format:** JPEG or PNG
- **Aspect Ratio:** 2:1 (width must be exactly twice the height)
- **Recommended Resolution:** 
  - Minimum: 4000 x 2000 pixels
  - Optimal: 8000 x 4000 pixels or higher
- **Projection:** Equirectangular (standard 360° panorama format)

### Example Dimensions
- 4000 x 2000 pixels (acceptable quality)
- 6000 x 3000 pixels (good quality)
- 8000 x 4000 pixels (high quality)
- 10000 x 5000 pixels (excellent quality)

## Where to Replace Images

### Main Panorama (attraction.html, line ~180)

**Current code:**
```javascript
"panorama": "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1200&h=600&fit=crop",
```

**Replace with:**
```javascript
"panorama": "images/360-exterior-stadthuys.jpg",  // Your actual 360° image path
```

### Exterior View Panorama (attraction.html, line ~190)

**Current code:**
```javascript
"panorama": "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1200&h=600&fit=crop",
```

**Replace with:**
```javascript
"panorama": "images/360-exterior-red-square.jpg",  // Your actual 360° image path
```

### Interior View Panorama (attraction.html, line ~200)

**Current code:**
```javascript
"panorama": "https://images.unsplash.com/photo-1539650116574-75c0c6d73b6e?w=1200&h=600&fit=crop",
```

**Replace with:**
```javascript
"panorama": "images/360-interior-museum.jpg",  // Your actual 360° image path
```

## Folder Structure Recommendation

Create an `images` folder in your project root:

```
stadthuys/
├── images/
│   ├── 360-exterior-stadthuys.jpg
│   ├── 360-exterior-red-square.jpg
│   ├── 360-interior-museum.jpg
│   ├── group-photo.jpg
│   └── (other photos)
├── index.html
├── attraction.html
├── ...
```

## Uploading Images to the Web

### Option 1: Host Locally
- Place images in the `images` folder
- Reference them as relative paths: `"images/360-exterior-stadthuys.jpg"`

### Option 2: Use Cloud Storage
- Upload to Google Drive, Dropbox, or OneDrive
- Get a direct link to the image
- Use the direct link as the panorama URL

### Option 3: Use Image Hosting Services
- **Imgur** (free, no account needed for public images)
- **ImgBB** (free)
- **Cloudinary** (free tier available)

**Important:** For cloud-hosted images, ensure the URLs are direct links to the image files (ending in .jpg or .png), not gallery pages.

## Testing Your 360° Images

1. Open `attraction.html` in a web browser
2. Verify the panorama loads correctly
3. Test interactive controls:
   - Click and drag to rotate
   - Scroll to zoom in/out
   - Use compass to orient view
   - Test fullscreen mode
4. Test on mobile devices for responsive behavior

## Troubleshooting

### Image Not Displaying
- **Check file path:** Ensure the path is correct and relative to the HTML file
- **Check file format:** Must be JPEG or PNG
- **Check aspect ratio:** Must be 2:1 (width = 2 × height)
- **Check CORS:** If hosting on a different domain, ensure CORS headers are set

### Image Appears Distorted
- **Verify aspect ratio:** Must be exactly 2:1
- **Check image orientation:** Top should be "up" (north pole), bottom should be "down" (south pole)
- **Verify equirectangular projection:** Image should wrap seamlessly when joined at edges

### Performance Issues
- **Reduce image size:** If file is too large (>10MB), compress it
- **Use JPEG instead of PNG:** JPEG files are smaller and load faster
- **Optimize resolution:** 6000 x 3000 is usually sufficient for web viewing

## Recommended Shots for Your Site Visit

1. **Exterior - Red Square Front View:**
   - Capture the full front facade of The Stadthuys
   - Include Christ Church Melaka in the background
   - Show the Red Square area

2. **Exterior - Side View:**
   - Capture the side of the building
   - Include surrounding colonial architecture
   - Show the red clock tower if visible

3. **Interior - Main Museum Hall:**
   - Capture the main exhibition space
   - Include artifacts and displays
   - Show the historic architecture details

4. **Interior - Gallery Section:**
   - Capture the Cheng Ho Gallery
   - Include exhibit displays
   - Show the architectural features

5. **Interior - Entrance/Reception Area:**
   - Capture the entrance hall
   - Include visitor services area
   - Show the overall interior atmosphere

## Additional Resources

- **Pannellum Documentation:** https://pannellum.org/documentation/
- **360° Image Stitching Guide:** https://pannellum.org/documentation/overview/equirectangular/
- **Image Conversion Tools:**
  - PTGui (Stitching): https://www.ptgui.com/
  - Hugin (Free stitching): http://hugin.sourceforge.net/
  - ImageMagick (Image processing): https://imagemagick.org/

## Quick Start Checklist

- [ ] Create `images` folder in project root
- [ ] Capture 360° images during site visit (minimum 3 views)
- [ ] Process images to ensure 2:1 aspect ratio
- [ ] Optimize images (compress to reasonable file size)
- [ ] Upload images to `images` folder or cloud storage
- [ ] Update panorama URLs in `attraction.html`
- [ ] Test in web browser
- [ ] Test on mobile devices
- [ ] Verify all interactive controls work correctly

---

**Note:** If you're unable to capture true 360° images during your site visit, you can use regular wide-angle or panoramic photos. However, they won't provide the full 360° experience. The Pannellum viewer will still display them, but users will only be able to pan within the limited field of view.
