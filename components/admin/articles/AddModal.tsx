import Modal from "@/components/common/Modal";
import React, { useState, useEffect, useRef } from "react";
import SidebarSettings from "./SidebarSettings";

interface ModalProps {
  isShowModal: boolean;
  setShowModal: (value: boolean) => void;
}

const AddModal = ({ isShowModal, setShowModal }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");
  const [visibility, setVisibility] = useState("Public");
  const [category, setCategory] = useState("Technology");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    featuredImage?: string;
  }>({});

  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("transparent");
  const [paintFormat, setPaintFormat] = useState<{
    fontFamily?: string;
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
  } | null>(null);

  const [showTextColor, setShowTextColor] = useState(false);
  const [showHighlightColor, setShowHighlightColor] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showAlignDropdown, setShowAlignDropdown] = useState(false);
  const [showSpacingDropdown, setShowSpacingDropdown] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const editorImageInputRef = useRef<HTMLInputElement>(null);

  const historyRef = useRef<string[]>([""]);
  const historyIndexRef = useRef<number>(0);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const saveToHistory = (newContent: string) => {
    const currentHistory = historyRef.current;
    const currentIndex = historyIndexRef.current;

    if (currentHistory[currentIndex] === newContent) return;

    const updatedHistory = currentHistory.slice(0, currentIndex + 1);
    updatedHistory.push(newContent);

    if (updatedHistory.length > 100) {
      updatedHistory.shift();
    }

    historyRef.current = updatedHistory;
    historyIndexRef.current = updatedHistory.length - 1;
  };

  const handleUndo = () => {
    const currentHistory = historyRef.current;
    const currentIndex = historyIndexRef.current;

    if (currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      historyIndexRef.current = nextIndex;
      const prevContent = currentHistory[nextIndex];
      if (editorRef.current) {
        editorRef.current.innerHTML = prevContent;
      }
      setContent(prevContent);
    }
  };

  const handleRedo = () => {
    const currentHistory = historyRef.current;
    const currentIndex = historyIndexRef.current;

    if (currentIndex < currentHistory.length - 1) {
      const nextIndex = currentIndex + 1;
      historyIndexRef.current = nextIndex;
      const nextContent = currentHistory[nextIndex];
      if (editorRef.current) {
        editorRef.current.innerHTML = nextContent;
      }
      setContent(nextContent);
    }
  };

  const applyInlineStyle = (styleName: string, value: string) => {
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement("span");
    span.style.setProperty(styleName, value);

    try {
      span.appendChild(range.extractContents());
      range.insertNode(span);
      selection.removeAllRanges();

      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      selection.addRange(newRange);

      if (editorRef.current) {
        const html = editorRef.current.innerHTML;
        setContent(html);
        saveToHistory(html);
      }
    } catch (e) {
      console.error("Error applying style:", e);
    }
  };

  const handlePaintFormatCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const parent = range.commonAncestorContainer.parentElement;
    if (!parent) return;

    const computedStyle = window.getComputedStyle(parent);
    setPaintFormat({
      fontFamily: computedStyle.fontFamily,
      fontSize: computedStyle.fontSize,
      color: computedStyle.color,
      backgroundColor: computedStyle.backgroundColor,
    });
  };

  const handlePaintFormatApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!paintFormat) return;
    editorRef.current?.focus();

    if (paintFormat.fontFamily)
      applyInlineStyle("font-family", paintFormat.fontFamily);
    if (paintFormat.fontSize)
      applyInlineStyle("font-size", paintFormat.fontSize);
    if (paintFormat.color)
      document.execCommand("foreColor", false, paintFormat.color);
    if (paintFormat.backgroundColor)
      document.execCommand("hiliteColor", false, paintFormat.backgroundColor);

    setPaintFormat(null);
    if (editorRef.current) {
      saveToHistory(editorRef.current.innerHTML);
    }
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editorRef.current) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${title || "Draft Article"}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; line-height: 1.6; }
            h2 { color: #333; }
            pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
            blockquote { border-left: 4px solid #ccc; padding-left: 10px; font-style: italic; color: #555; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <h1>${title || "Untitled Article"}</h1>
          <div>${editorRef.current.innerHTML}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleChecklist = () => {
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className =
      "mr-2 size-4 cursor-pointer align-middle accent-(--color-orange)";

    const space = document.createTextNode(" ");
    range.insertNode(space);
    range.insertNode(checkbox);

    const newRange = document.createRange();
    newRange.setStartAfter(space);
    newRange.setEndAfter(space);
    selection.removeAllRanges();
    selection.addRange(newRange);

    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setContent(html);
      saveToHistory(html);
    }
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      setShowTextColor(false);
      setShowHighlightColor(false);
      setShowFontDropdown(false);
      setShowStyleDropdown(false);
      setShowAlignDropdown(false);
      setShowSpacingDropdown(false);
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);

    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-");
    setSlug(autoSlug);
  };

  useEffect(() => {
    if (isShowModal) {
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setStatus("Draft");
      setVisibility("Public");
      setCategory("Technology");
      setFeaturedImage(null);
      setFontSize(14);
      setFontFamily("Poppins");
      setErrors({});
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
      historyRef.current = [""];
      historyIndexRef.current = 0;
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    }
  }, [isShowModal]);

  useEffect(() => {
    if (title.trim()) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  }, [title]);

  useEffect(() => {
    if (slug.trim()) {
      setErrors((prev) => ({ ...prev, slug: undefined }));
    }
  }, [slug]);

  useEffect(() => {
    if (excerpt.trim()) {
      setErrors((prev) => ({ ...prev, excerpt: undefined }));
    }
  }, [excerpt]);

  useEffect(() => {
    if (content.trim()) {
      setErrors((prev) => ({ ...prev, content: undefined }));
    }
  }, [content]);

  useEffect(() => {
    if (featuredImage) {
      setErrors((prev) => ({ ...prev, featuredImage: undefined }));
    }
  }, [featuredImage]);

  const handleFormat = (command: string, value: string = "") => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);

    if (editorRef.current) {
      const imgs = editorRef.current.querySelectorAll("img");
      imgs.forEach((img) => {
        if (!img.className) {
          img.className =
            "max-w-full rounded-lg border border-[rgba(0,0,0,0.06)] my-3 max-h-[320px] object-contain";
        }
      });
      const html = editorRef.current.innerHTML;
      setContent(html);
      saveToHistory(html);
    }
  };

  const handleLinkAction = () => {
    const url = prompt("Enter link URL:");
    if (url) {
      handleFormat("createLink", url);
    }
  };

  const handleEditorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);

      editorRef.current?.focus();
      document.execCommand("insertImage", false, blobUrl);

      if (editorRef.current) {
        const imgs = editorRef.current.querySelectorAll("img");
        imgs.forEach((img) => {
          img.className =
            "max-w-full rounded-lg border border-[rgba(0,0,0,0.06)] my-3 max-h-[320px] object-contain";
        });
        const html = editorRef.current.innerHTML;
        setContent(html);
        saveToHistory(html);
      }
    }
    e.target.value = "";
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const html = e.currentTarget.innerHTML;
    setContent(html);

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    typingTimerRef.current = setTimeout(() => {
      saveToHistory(html);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      if (e.shiftKey) {
        handleRedo();
      } else {
        handleUndo();
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
      e.preventDefault();
      handleRedo();
      return;
    }

    if (e.key === " " || e.key === "Enter" || e.key === "Tab") {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
      if (editorRef.current) {
        saveToHistory(editorRef.current.innerHTML);
      }
    }
  };

  const handleConfirm = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) {
      newErrors.title = "Article title cannot be empty.";
    }
    if (!slug.trim()) {
      newErrors.slug = "Permalink / slug cannot be empty.";
    }
    if (!excerpt.trim()) {
      newErrors.excerpt = "Short summary cannot be empty.";
    }
    if (!content.trim() || content === "<p><br></p>" || content === "") {
      newErrors.content = "Main content cannot be empty.";
    }
    if (!featuredImage) {
      newErrors.featuredImage = "Featured image is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("Publishing article:", {
      title,
      slug,
      excerpt,
      content,
      status,
      visibility,
      category,
      featuredImage,
    });

    setShowModal(false);
  };

  return (
    <Modal
      width={"92%"}
      isOpen={isShowModal}
      onClose={() => setShowModal(false)}
      onConfirm={handleConfirm}
      title="Create a New Article"
      mainText="Publish"
      description="Welcome to the article creator. Enter your title and basic details below to start drafting your new blog post"
    >
      <div className="mt-10 flex gap-x-6 w-full items-start max-h-[calc(100vh-150px)] overflow-y-auto pr-2 custom-scrollbar select-text">
        <div className="flex-1 flex flex-col gap-y-5">
          <div className="flex justify-between gap-x-5">
            <div className="flex flex-col w-[50%]">
              <div className="">
                <label className=" text-[14px] font-normal">
                  Article Title
                </label>
                <span className="text-(--color-orange)">*</span>
              </div>
              <div className={`w-full h-10 border ${
                errors.title ? "border-red-500" : "border-[rgba(0,0,0,0.1)] focus-within:border-black/30"
              } rounded-[10px] px-2.5 mt-[5px] flex items-center transition-colors duration-200`}>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full h-full outline-none border-none  text-[13px]"
                  placeholder="Optimizing Next.js App Performance"
                />
              </div>
              {errors.title && (
                <p className="text-red-500 text-[12px] mt-[5px] font-normal animate-in fade-in slide-in-from-top-1 duration-150">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="w-[50%] flex flex-col">
              <div>
                <label className=" text-[14px] font-normal">
                  Permalink / Slug{" "}
                </label>
                <span className="text-(--color-orange)">*</span>
              </div>
              <div className={`w-full h-10 border ${
                errors.slug ? "border-red-500" : "border-[rgba(0,0,0,0.1)] focus-within:border-black/30"
              } rounded-[10px] px-2.5 mt-[5px] flex items-center gap-x-0.5 overflow-hidden transition-colors duration-200`}>
                <span className="text-[13px] text-[rgba(0,0,0,0.4)] font-medium select-none whitespace-nowrap">
                  https://kray-web.com/notes/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="optimizing-nextjs-app-performance"
                  className="flex-1 h-full  bg-transparent text-[13px] border-none outline-none text-(--color-orange) font-medium p-0 select-text placeholder-(--color-orange)/40"
                />
              </div>
              {errors.slug && (
                <p className="text-red-500 text-[12px] mt-[5px] font-normal animate-in fade-in slide-in-from-top-1 duration-150">
                  {errors.slug}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-1.5">
            <label className=" text-[14px] font-normal">
              Short Summary <span className="text-(--color-orange)">*</span>
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a quick overview for card previews and search engines..."
              rows={2}
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.excerpt ? "border-red-500" : "border-[rgba(0,0,0,0.1)] focus:border-black/30"
              } outline-none text-[13px] bg-white text-black placeholder-[rgba(0,0,0,0.3)] transition-colors select-text resize-none`}
            />
            {errors.excerpt && (
              <p className="text-red-500 text-[12px] mt-[2px] font-normal animate-in fade-in slide-in-from-top-1 duration-150">
                {errors.excerpt}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-1.5">
            <label className=" text-[14px] font-normal">
              Main Content Area <span className="text-(--color-orange)">*</span>
            </label>
            <div className={`w-full border ${
              errors.content ? "border-red-500" : "border-[rgba(0,0,0,0.1)] focus-within:border-black/30"
            } rounded-lg overflow-hidden flex flex-col bg-white transition-colors`}>
              <div className="flex flex-wrap items-center gap-2 px-3.5 py-2 bg-(--color-white-grey) border-b border-[rgba(0,0,0,0.06)] select-none">
                <div className="flex items-center gap-x-1">
                  <button
                    type="button"
                    onClick={handleUndo}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[#4C4C4C]"
                    title="Undo"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleRedo}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[#4C4C4C]"
                    title="Redo"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[#4C4C4C]"
                    title="Print"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229-2.523a1.125 1.125 0 00-1.12-1.227H7.231c-.662 0-1.18.553-1.12 1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-14.326 0C3.768 7.28 3 8.215 3 9.296v6.299a2.25 2.25 0 002.25 2.25h1.091M9 10.125h3.75M9 15h6.75"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={
                      paintFormat
                        ? handlePaintFormatApply
                        : handlePaintFormatCopy
                    }
                    className={`w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer ${paintFormat ? "text-(--color-orange) bg-orange-50 border border-orange-200" : "text-[#4C4C4C]"}`}
                    title={
                      paintFormat ? "Apply Paint Format" : "Copy Paint Format"
                    }
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.53 16.122A3 3 0 00.75 18v3A1.5 1.5 0 002.25 22.5h19.5a1.5 1.5 0 001.5-1.5v-3a3 3 0 00-8.78-1.878m-5 0c-.097-.05-.195-.102-.293-.156L8 15.25v-2m1.53 2.872a3.3 3.3 0 011.97 0M10.5 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="w-[1.5px] h-5 bg-[rgba(0,0,0,0.1)] mx-1"></div>

                <div className="flex items-center gap-x-1.5">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowStyleDropdown(!showStyleDropdown);
                        setShowFontDropdown(false);
                        setShowTextColor(false);
                        setShowHighlightColor(false);
                        setShowAlignDropdown(false);
                        setShowSpacingDropdown(false);
                      }}
                      className="h-8 flex items-center gap-x-1 px-2 text-[13px] font-medium text-[#4C4C4C] hover:bg-[rgba(0,0,0,0.05)] rounded cursor-pointer"
                    >
                      <span>Styles</span>
                      <svg
                        className="w-3.5 h-3.5 text-[#4C4C4C]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {showStyleDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-lg py-1 z-50">
                        {[
                          { label: "Normal Text", tag: "<p>" },
                          { label: "Heading 1", tag: "<h1>" },
                          { label: "Heading 2", tag: "<h2>" },
                          { label: "Heading 3", tag: "<h3>" },
                          { label: "Heading 4", tag: "<h4>" },
                        ].map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => {
                              handleFormat("formatBlock", item.tag);
                              setShowStyleDropdown(false);
                            }}
                            className="w-full text-left px-3.5 py-1.5 text-[13px] text-black hover:bg-[#F3F4F6] transition-colors"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowFontDropdown(!showFontDropdown);
                        setShowStyleDropdown(false);
                        setShowTextColor(false);
                        setShowHighlightColor(false);
                        setShowAlignDropdown(false);
                        setShowSpacingDropdown(false);
                      }}
                      className="h-8 flex items-center gap-x-1 px-2 text-[13px] font-medium text-[#4C4C4C] hover:bg-[rgba(0,0,0,0.05)] rounded cursor-pointer"
                    >
                      <span
                        className="truncate max-w-[90px]"
                        style={{ fontFamily }}
                      >
                        {fontFamily}
                      </span>
                      <svg
                        className="w-3.5 h-3.5 text-[#4C4C4C]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {showFontDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-lg py-1 z-50 max-h-56 overflow-y-auto">
                        {[
                          "Poppins",
                          "Arial",
                          "Georgia",
                          "Courier New",
                          "Times New Roman",
                          "Trebuchet MS",
                          "Verdana",
                          "Impact",
                        ].map((font) => (
                          <button
                            key={font}
                            type="button"
                            onClick={() => {
                              setFontFamily(font);
                              document.execCommand("fontName", false, font);
                              setShowFontDropdown(false);
                            }}
                            style={{ fontFamily: font }}
                            className="w-full text-left px-3.5 py-1.5 text-[13px] text-black hover:bg-[#F3F4F6] transition-colors"
                          >
                            {font}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-x-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        const next = Math.max(8, fontSize - 1);
                        setFontSize(next);
                        applyInlineStyle("font-size", `${next}px`);
                      }}
                      className="w-7 h-7 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded cursor-pointer text-lg font-semibold select-none text-[#4C4C4C]"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={fontSize}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 14;
                        setFontSize(val);
                        applyInlineStyle("font-size", `${val}px`);
                      }}
                      className="w-11 h-[26px] border border-[rgba(0,0,0,0.15)] rounded text-center text-[13px] font-medium outline-none bg-white text-black select-text"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = Math.min(72, fontSize + 1);
                        setFontSize(next);
                        applyInlineStyle("font-size", `${next}px`);
                      }}
                      className="w-7 h-7 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded cursor-pointer text-lg font-semibold select-none text-[#4C4C4C]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="w-[1.5px] h-5 bg-[rgba(0,0,0,0.1)] mx-1"></div>

                <div className="flex items-center gap-x-1">
                  <button
                    type="button"
                    onClick={() => handleFormat("bold")}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[15px] font-bold text-[#4C4C4C]"
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat("italic")}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[15px] font-serif italic text-[#4C4C4C]"
                    title="Italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat("underline")}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[15px] underline text-[#4C4C4C]"
                    title="Underline"
                  >
                    U
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat("strikeThrough")}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[15px] line-through text-[#4C4C4C]"
                    title="Strikethrough"
                  >
                    S
                  </button>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTextColor(!showTextColor);
                        setShowHighlightColor(false);
                        setShowFontDropdown(false);
                        setShowStyleDropdown(false);
                        setShowAlignDropdown(false);
                        setShowSpacingDropdown(false);
                      }}
                      className="w-8 h-8 flex flex-col items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded cursor-pointer"
                      title="Text Color"
                    >
                      <span className="text-[15px] font-bold text-black leading-none">
                        A
                      </span>
                      <div
                        className="w-4.5 h-0.5 mt-0.5"
                        style={{ backgroundColor: textColor }}
                      ></div>
                    </button>
                    {showTextColor && (
                      <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-lg z-50 grid grid-cols-4 gap-1.5 w-32">
                        {[
                          "#000000",
                          "#374151",
                          "#DC2626",
                          "#F97316",
                          "#16A34A",
                          "#1D4ED8",
                          "#7C3AED",
                          "#6B7280",
                        ].map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => {
                              setTextColor(color);
                              document.execCommand("foreColor", false, color);
                              setShowTextColor(false);
                            }}
                            style={{ backgroundColor: color }}
                            className="w-4.5 h-4.5 rounded-full border border-gray-300 hover:scale-110 transition-transform cursor-pointer"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHighlightColor(!showHighlightColor);
                        setShowTextColor(false);
                        setShowFontDropdown(false);
                        setShowStyleDropdown(false);
                        setShowAlignDropdown(false);
                        setShowSpacingDropdown(false);
                      }}
                      className="w-8 h-8 flex flex-col items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded cursor-pointer"
                      title="Highlight Color"
                    >
                      <svg
                        className="w-[18px] h-[18px] text-[#4C4C4C]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.53 16.122A3 3 0 00.75 18v3A1.5 1.5 0 002.25 22.5h19.5a1.5 1.5 0 001.5-1.5v-3a3 3 0 00-8.78-1.878"
                        />
                      </svg>
                      <div
                        className="w-4.5 h-0.5 mt-0.5"
                        style={{
                          backgroundColor:
                            bgColor === "transparent" ? "#E5E7EB" : bgColor,
                        }}
                      ></div>
                    </button>
                    {showHighlightColor && (
                      <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-lg z-50 grid grid-cols-4 gap-1.5 w-32">
                        {[
                          "transparent",
                          "#FEF08A",
                          "#BBF7D0",
                          "#BFDBFE",
                          "#FFEDD5",
                          "#FCA5A5",
                          "#E9D5FF",
                          "#F3F4F6",
                        ].map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => {
                              setBgColor(color);
                              document.execCommand("hiliteColor", false, color);
                              setShowHighlightColor(false);
                            }}
                            style={{
                              backgroundColor:
                                color === "transparent" ? "#ffffff" : color,
                            }}
                            className={`w-4.5 h-4.5 rounded-full border border-gray-300 hover:scale-110 transition-transform cursor-pointer ${color === "transparent" ? "relative overflow-hidden before:absolute before:inset-0 before:bg-red-500 before:h-0.5 before:top-1/2 before:-translate-y-1/2 before:rotate-45" : ""}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-[1.5px] h-5 bg-[rgba(0,0,0,0.1)] mx-1"></div>

                <div className="flex items-center gap-x-1">
                  <button
                    type="button"
                    onClick={handleLinkAction}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[#4C4C4C]"
                    title="Link"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => editorImageInputRef.current?.click()}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[#4C4C4C]"
                    title="Image"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat("formatBlock", "<pre>")}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[#4C4C4C]"
                    title="Code Block"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormat("formatBlock", "<blockquote>")}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-[17px] font-serif font-bold text-[#4C4C4C]"
                    title="Blockquote"
                  >
                    “
                  </button>
                </div>

                <div className="w-[1.5px] h-5 bg-[rgba(0,0,0,0.1)] mx-1"></div>

                <div className="flex items-center gap-x-1">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAlignDropdown(!showAlignDropdown);
                        setShowTextColor(false);
                        setShowHighlightColor(false);
                        setShowFontDropdown(false);
                        setShowStyleDropdown(false);
                        setShowSpacingDropdown(false);
                      }}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded cursor-pointer text-[#4C4C4C]"
                      title="Align"
                    >
                      <svg
                        className="w-[18px] h-[18px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    </button>
                    {showAlignDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-lg z-50 py-1 flex flex-col w-28">
                        {[
                          { label: "Left", command: "justifyLeft" },
                          { label: "Center", command: "justifyCenter" },
                          { label: "Right", command: "justifyRight" },
                          { label: "Justify", command: "justifyFull" },
                        ].map((align) => (
                          <button
                            key={align.label}
                            type="button"
                            onClick={() => {
                              handleFormat(align.command);
                              setShowAlignDropdown(false);
                            }}
                            className="w-full text-left px-3.5 py-1.5 text-[13px] text-black hover:bg-[#F3F4F6] transition-colors"
                          >
                            {align.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSpacingDropdown(!showSpacingDropdown);
                        setShowTextColor(false);
                        setShowHighlightColor(false);
                        setShowFontDropdown(false);
                        setShowStyleDropdown(false);
                        setShowAlignDropdown(false);
                      }}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded cursor-pointer text-[#4C4C4C]"
                      title="Line Spacing"
                    >
                      <svg
                        className="w-[18px] h-[18px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                        />
                      </svg>
                    </button>
                    {showSpacingDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-lg z-50 py-1 flex flex-col w-24">
                        {["1.0", "1.15", "1.5", "2.0"].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => {
                              applyInlineStyle("line-height", val);
                              setShowSpacingDropdown(false);
                            }}
                            className="w-full text-left px-3.5 py-1.5 text-[13px] text-black hover:bg-[#F3F4F6] transition-colors"
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleFormat("outdent")}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-black"
                    title="Decrease Indent"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15l-3-3m0 0l3-3m-3 3h12M3 6h18M3 18h18"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFormat("indent")}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded transition-colors cursor-pointer text-black"
                    title="Increase Indent"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 15l3-3m0 0l-3-3m3 3H6M3 6h18M3 18h18"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <style
                dangerouslySetInnerHTML={{
                  __html: `
                .editor-content:empty:before {
                  content: "Write your rich content here using inline styling, images, and block elements...";
                  color: rgba(0, 0, 0, 0.3);
                  pointer-events: none;
                }
                .editor-content blockquote {
                  border-left: 4px solid rgba(0, 0, 0, 0.15);
                  padding-left: 14px;
                  font-style: italic;
                  margin: 12px 0;
                  color: rgba(0, 0, 0, 0.5);
                }
                .editor-content pre {
                  background-color: #F8F9FA;
                  padding: 14px;
                  border-radius: 8px;
                  border: 1px solid rgba(0, 0, 0, 0.06);
                  font-family: monospace;
                  font-size: 12px;
                  margin: 12px 0;
                  overflow-x: auto;
                  white-space: pre-wrap;
                }
                .editor-content h2 {
                  font-size: 18px;
                  font-weight: bold;
                  margin-top: 20px;
                  margin-bottom: 8px;
                  color: black;
                }
                .editor-content p {
                  margin: 10px 0;
                  line-height: 1.6;
                  color: #1C1C1C;
                }
                .editor-content img {
                  max-width: 100%;
                  border-radius: 8px;
                  border: 1px solid rgba(0, 0, 0, 0.06);
                  margin: 12px 0;
                  max-height: 320px;
                  object-contain: fit;
                }
              `,
                }}
              />

              <div
                ref={editorRef}
                contentEditable={true}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                className="editor-content w-full p-4 text-[13px] outline-none border-none min-h-[450px] max-h-[600px] overflow-y-auto bg-transparent select-text prose max-w-none focus:outline-none"
                style={{ minHeight: "450px" }}
              />
            </div>
            {errors.content && (
              <p className="text-red-500 text-[12px] mt-[5px] font-normal animate-in fade-in slide-in-from-top-1 duration-150">
                {errors.content}
              </p>
            )}
          </div>
        </div>

        <SidebarSettings
          status={status}
          setStatus={setStatus}
          visibility={visibility}
          setVisibility={setVisibility}
          category={category}
          setCategory={setCategory}
          featuredImage={featuredImage}
          setFeaturedImage={setFeaturedImage}
          onPublish={handleConfirm}
          errors={errors}
        />
      </div>
      <input
        type="file"
        ref={editorImageInputRef}
        onChange={handleEditorImageChange}
        accept="image/*"
        className="hidden"
      />
    </Modal>
  );
};

export default AddModal;
