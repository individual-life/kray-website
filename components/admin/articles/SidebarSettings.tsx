import React, { useRef, useState, useEffect } from "react";

const categories = [
  "Technology",
  "Design",
  "Database",
  "Development",
  "Tutorial",
];

interface SidebarSettingsProps {
  status: string;
  setStatus: (value: string) => void;
  visibility: string;
  setVisibility: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  featuredImage: string | null;
  setFeaturedImage: (value: string | null) => void;
  onPublish: () => void;
  errors?: {
    featuredImage?: string;
  };
}

export const SidebarSettings = ({
  status,
  setStatus,
  visibility,
  setVisibility,
  category,
  setCategory,
  featuredImage,
  setFeaturedImage,
  onPublish,
  errors,
}: SidebarSettingsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFeaturedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-[24%] min-w-[260px] flex flex-col gap-y-5 select-none">
      <div className="flex flex-col rounded-[10px]">
        <div className="pb-[5px]">
          <label className=" text-[14px] font-normal">Featured Image </label>
          <span className="text-(--color-orange)">*</span>
        </div>
        <div
          className={`relative w-full aspect-video rounded-lg overflow-hidden border transition-colors duration-200 ${
            errors?.featuredImage ? "border-red-500" : "border-transparent"
          }`}
        >
          {featuredImage ? (
            <div className="w-full h-full group relative">
              <img
                src={featuredImage}
                alt="Featured preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-x-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white hover:bg-neutral-50 text-black text-[11px] font-medium px-3.5 py-1.5 rounded-[8px] shadow cursor-pointer transition-all z-10"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFeaturedImage(null);
                  }}
                  className="bg-black hover:bg-neutral-800 text-white text-[11px] font-medium px-3.5 py-1.5 rounded-[8px] shadow cursor-pointer transition-all z-10"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`w-full h-full border-2 border-dashed ${
                errors?.featuredImage
                  ? "border-red-500"
                  : "border-[rgba(0,0,0,0.1)]"
              } rounded-[8px] flex flex-col items-center justify-center text-center p-5 select-none relative transition-colors duration-200`}
            >
              <svg
                className="w-8 h-8 text-[rgba(0,0,0,0.3)] mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              <span className="text-[12px] text-[rgba(0,0,0,0.7)] font-medium">
                Drag & drop image
              </span>
              <span className="text-[10px] text-[rgba(0,0,0,0.4)] mt-0.5">
                or click to upload (16:9 ratio)
              </span>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>
          )}
        </div>
        {errors?.featuredImage && (
          <p className="text-red-500 text-[12px] mt-[5px] font-normal animate-in fade-in slide-in-from-top-1 duration-150">
            {errors.featuredImage}
          </p>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="flex flex-col">
        <div className="pb-[5px]">
          <label className=" text-[14px] font-normal">Categories & Tags </label>
          <span className="text-(--color-orange)">*</span>
        </div>
        <div className="flex flex-col gap-y-1.5">
          <div className="relative w-full" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full text-left px-3 py-2 rounded-[8px] border border-[rgba(0,0,0,0.1)] outline-none text-[13px] bg-white text-black cursor-pointer pr-8 focus:border-black/30 transition-all flex items-center justify-between"
            >
              <span>{category}</span>
            </button>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[rgba(0,0,0,0.4)]">
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {isOpen && (
              <div className="absolute left-0 right-0 mt-1.5 py-1.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-50 overflow-hidden">
                {categories.map((cat) => {
                  const isSelected = cat === category;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-[13px] transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-[rgba(236,84,41,0.08)] text-(--color-orange) font-medium"
                          : "text-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.04)]"
                      }`}
                    >
                      <span>{cat}</span>
                      {isSelected && (
                        <svg
                          className="w-3.5 h-3.5 text-(--color-orange)"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSettings;
