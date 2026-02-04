# How to Add TikTok Video Examples to the Look & Feel Slide

This guide explains how to replace the placeholder video thumbnails with actual TikTok video examples from your account.

## Option 1: TikTok Video Embeds (Recommended)

TikTok provides embed codes for videos. Here's how to add them:

### Steps:
1. Go to the TikTok video you want to feature
2. Click the "Share" button
3. Select "Embed"
4. Copy the embed code
5. Replace the placeholder div in the HTML

### Example Embed Code Structure:
```html
<div class="content-card p-0 overflow-hidden aspect-[9/16]">
    <blockquote class="tiktok-embed" 
        cite="https://www.tiktok.com/@godgpt_/video/VIDEO_ID" 
        data-video-id="VIDEO_ID" 
        style="max-width: 100%; min-width: 325px;">
        <section>
            <a target="_blank" title="@godgpt_" href="https://www.tiktok.com/@godgpt_?refer=embed">
                @godgpt_
            </a>
        </section>
    </blockquote>
    <script async src="https://www.tiktok.com/embed.js"></script>
</div>
```

## Option 2: Video Thumbnails with Links

If you prefer to use static thumbnails that link to videos:

### Steps:
1. Take a screenshot of the video thumbnail
2. Save it in a `thumbnails/` folder
3. Replace the placeholder with an `<img>` tag

### Example:
```html
<div class="content-card p-0 overflow-hidden aspect-[9/16] relative group cursor-pointer">
    <a href="https://www.tiktok.com/@godgpt_/video/VIDEO_ID" target="_blank">
        <img src="thumbnails/video1.jpg" 
             alt="UGC Video Example 1" 
             class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div class="text-white text-2xl">▶</div>
        </div>
    </a>
</div>
```

## Option 3: Direct Video Links

For a simpler approach, you can link directly to TikTok videos:

```html
<div class="content-card p-0 overflow-hidden aspect-[9/16] relative group cursor-pointer">
    <a href="https://www.tiktok.com/@godgpt_/video/VIDEO_ID" 
       target="_blank"
       class="block w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center hover:from-purple-500/30 hover:to-pink-500/30 transition-all">
        <div class="text-center p-4">
            <div class="text-4xl mb-2">🎬</div>
            <p class="text-xs text-gray-400">Click to view</p>
        </div>
    </a>
</div>
```

## Finding Your Best UGC Videos

To identify which videos to feature:

1. **Check TikTok Analytics:**
   - Go to TikTok Creator Tools
   - Sort by engagement rate
   - Look for videos with high completion rates (>80%)

2. **Look for:**
   - Videos that align with your content pillars
   - High-quality production
   - Authentic, relatable content
   - Strong engagement (comments, shares, saves)

3. **Diversity:**
   - Mix of different creators
   - Various content types (Personal Stories, Reviews, How-To)
   - Different demographics and styles

## Recommended Videos to Feature

Based on your content pillars, aim for:

- **2-3 Personal Stories (TOF)** - Authentic, relatable moments
- **2-3 Reviews (MOF)** - User experiences and feedback
- **1-2 How-To (Conversion)** - Tutorial or feature highlights

## Updating the Slide

1. Open `index.html`
2. Find the "Look & Feel - Community Content" slide (Slide 4)
3. Replace the 6 placeholder divs with your chosen method above
4. Test that links/embeds work correctly
5. Ensure videos are mobile-responsive

## Notes

- TikTok embeds require the embed.js script (already included in the example)
- Thumbnails should maintain 9:16 aspect ratio
- Always test on mobile devices
- Keep file sizes optimized if using images

---

**Need Help?** Contact dionne.ng@aelf.io for assistance with video selection or technical implementation.