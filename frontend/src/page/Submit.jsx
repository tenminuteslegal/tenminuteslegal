import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthReduxContext";
// import { useAuth } from "../lib/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
;


export default function SubmitPage() {
  const { user } = useAuth();
  const [session] = useState({ user: { email: user.email } }); // fake auth
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [role, setRole] = useState("free"); // Add this new state
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const ADMIN_EMAILS = [user.email]; // Hardcoded admins
  
  const textareaRef = useRef(null);

  const isAdmin =
    !!session?.user?.email && ADMIN_EMAILS.includes(session.user.email);

    console.log('is admin:', isAdmin);

  // Insert tag around selected text
  const insertTag = (tagStart, tagEnd) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);

    const before = content.substring(0, start);
    const after = content.substring(end);

    const newText = before + tagStart + selected + tagEnd + after;
    setContent(newText);

    // Keep focus & move cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + tagStart.length,
        end + tagStart.length
      );
    }, 0);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("app_token")}`
        },
        body: JSON.stringify({ title, subtitle, content, role }), // Add role to the body
      }); 

      const data = await res.json();
      console.log("Save response:", data);
      if (!res.ok) throw new Error(data.error || "Failed to save");

      setMessage("✅ Saved successfully");
      setTitle("");
      setSubTitle("");
      setContent("");
      setRole("free"); // Reset role
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!session) {
    return (
      <div className="p-6 text-center w-full">
        <p className="text-gray-700">Please sign in to continue.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-6 mx-auto">
        <p className="text-red-600">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)}>Back</button>

      <h1 className="text-2xl font-bold mb-4">Add / Edit Article</h1>
      <form className="space-y-4" onSubmit={handleSave}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        
       

        {/* Abstract */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded min-h-[120px]"
          />
        </div>

        {/* Content + Toolbar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content (HTML)
          </label>

          {/* Toolbar */}
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
              onClick={() => insertTag("<b>", "</b>")}
            >
              B
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 italic"
              onClick={() => insertTag("<i>", "</i>")}
            >
              I
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 underline"
              onClick={() => insertTag("<u>", "</u>")}
            >
              U
            </button>
            <button
              type="button"
              className="px-2 py-1 border rounded bg-gray-100 hover:bg-yellow-200"
              onClick={() => insertTag("<mark>", "</mark>")}
            >
              Highlight
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded min-h-[200px]"
          />
        </div>

        {/* Role Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Article Access
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="role"
                value="free"
                checked={role === "free"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="ml-2">Free</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="role"
                value="paid"
                checked={role === "paid"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="ml-2">Paid</span>
            </label>
          </div>
        </div>

        {message && <div className="text-sm text-gray-600">{message}</div>}

        <button
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
