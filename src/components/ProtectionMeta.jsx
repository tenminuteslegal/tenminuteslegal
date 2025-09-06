import { useEffect } from "react";

// Protection Meta Component
const ProtectionMeta = () => {
  useEffect(() => {
    // Add meta tags for additional protection
    const metaTags = [
      {
        name: "robots",
        content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
      },
      {
        name: "googlebot",
        content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
      },
      {
        name: "bingbot",
        content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
      },
      { "http-equiv": "X-Frame-Options", content: "DENY" },
      { "http-equiv": "X-Content-Type-Options", content: "nosniff" },
      { "http-equiv": "Referrer-Policy", content: "no-referrer" },
      {
        "http-equiv": "Permissions-Policy",
        content: "camera=(), microphone=(), geolocation=()",
      },
    ];

    metaTags.forEach((tag) => {
      const meta = document.createElement("meta");
      if (tag.name) {
        meta.setAttribute("name", tag.name);
      }
      if (tag["http-equiv"]) {
        meta.setAttribute("http-equiv", tag["http-equiv"]);
      }
      meta.setAttribute("content", tag.content);
      document.head.appendChild(meta);
    });

    // Disable text selection via JavaScript
    document.onselectstart = () => false;
    document.onmousedown = () => false;
    document.ondragstart = () => false;

    // Disable F12 and other developer tools shortcuts
    document.addEventListener("keydown", (e) => {
      // Disable F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+S (Save)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+A (Select All)
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+C (Copy)
      if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+V (Paste)
      if (e.ctrlKey && e.keyCode === 86) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+X (Cut)
      if (e.ctrlKey && e.keyCode === 88) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+P (Print)
      if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        return false;
      }
    });

    // Disable right-click context menu
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      return false;
    });

    // Disable drag and drop
    document.addEventListener("dragover", (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener("drop", (e) => {
      e.preventDefault();
      return false;
    });

    // Disable print
    window.addEventListener("beforeprint", (e) => {
      e.preventDefault();
      return false;
    });

    // Disable text selection
    document.addEventListener("selectstart", (e) => {
      e.preventDefault();
      return false;
    });

    // Disable image dragging
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("dragstart", (e) => {
        e.preventDefault();
        return false;
      });
    });

    // Disable text highlighting
    document.addEventListener("mouseup", (e) => {
      e.preventDefault();
      return false;
    });

    // Disable text selection with mouse
    document.addEventListener("mousedown", (e) => {
      if (e.detail > 1) {
        // Multiple clicks
        e.preventDefault();
        return false;
      }
    });

    // Disable touch selection on mobile
    document.addEventListener("touchstart", (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    });

    // Disable zoom on mobile
    document.addEventListener("gesturestart", (e) => {
      e.preventDefault();
      return false;
    });

    // Disable pinch zoom
    document.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length > 1) {
          e.preventDefault();
          return false;
        }
      },
      { passive: false }
    );
  }, []);

  return null; // This component doesn't render anything
};

export default ProtectionMeta;
