import { useEffect } from "react";

// Protection Layer Component
const ProtectionLayer = () => {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for copying
    const handleKeyDown = (e) => {
      // Disable Ctrl+C, Ctrl+A, Ctrl+V, Ctrl+X, Ctrl+S, Ctrl+P
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "c" ||
          e.key === "C" ||
          e.key === "a" ||
          e.key === "A" ||
          e.key === "v" ||
          e.key === "V" ||
          e.key === "x" ||
          e.key === "X" ||
          e.key === "s" ||
          e.key === "S" ||
          e.key === "p" ||
          e.key === "P" ||
          e.key === "u" ||
          e.key === "U" ||
          e.key === "i" ||
          e.key === "I" ||
          e.key === "F12" ||
          e.key === "F11" ||
          e.key === "F10" ||
          e.key === "F9")
      ) {
        e.preventDefault();
        return false;
      }

      // Disable F12 (Developer Tools)
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable drag start
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable print
    const handleBeforePrint = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable screenshot attempts (basic protection)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, might be taking screenshot
        document.body.style.display = "none";
        setTimeout(() => {
          document.body.style.display = "block";
        }, 100);
      }
    };

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("beforeprint", handleBeforePrint);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Disable developer tools (basic detection)
    // let devtools = { open: false, orientation: null };
    let devtools = { open: true, orientation: null }; // temporart
    const threshold = 160;

    setInterval(() => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          // Redirect or show warning
          console.clear();
          document.body.innerHTML =
            '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 24px; color: red;">Developer tools detected. Access denied.</div>';
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Disable console methods
    const noop = () => {};
    const methods = [
      "log",
      "debug",
      "info",
      "warn",
      "error",
      "trace",
      "dir",
      "group",
      "groupEnd",
      "time",
      "timeEnd",
      "profile",
      "profileEnd",
      "count",
      "clear",
      "assert",
      "table",
    ];
    methods.forEach((method) => {
      console[method] = noop;
    });

    // Disable common debugging methods
    window.console = {
      log: noop,
      debug: noop,
      info: noop,
      warn: noop,
      error: noop,
      trace: noop,
      dir: noop,
      group: noop,
      groupEnd: noop,
      time: noop,
      timeEnd: noop,
      profile: noop,
      profileEnd: noop,
      count: noop,
      clear: noop,
      assert: noop,
      table: noop,
    };

    // Cleanup function
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("beforeprint", handleBeforePrint);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ProtectionLayer;
