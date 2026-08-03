import React from "react";
import Image from "next/image";

interface NoteCardProps {
  image?: string | null;
  title?: string;
  description?: string;
  authorName?: string;
  authorAvatar?: string;
  readTime?: string;
}

const NoteCard = ({
  image = "/images/work_efficiency_blog.png",
  title = "Optimizing Workflow Processes for Maximum Efficiency",
  description = "Understand the importance of optimizing workflow processes to enhance efficiency...",
  authorName = "Joel Keneley",
  authorAvatar = "/images/joel_keneley.png",
  readTime = "4 Min Read",
}: NoteCardProps) => {
  return (
    <div className="w-full bg-white rounded-[20px] p-1.5 border border-[rgba(0,0,0,0.1)]">
      <div className="relative w-full aspect-[1.58] overflow-hidden rounded-[20px] bg-neutral-50">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 border border-dashed border-neutral-200 text-neutral-400">
            <svg
              className="w-10 h-10 mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9 2.9m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className="text-[12px] font-medium">No Image</span>
          </div>
        )}
      </div>
      <div className="mt-5 flex-1 flex flex-col">
        <div className="px-4">
          <h3 className="text-[16px] font-medium">{title}</h3>
          <p className="mt-1 text-[14px] text-neutral-500 leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>
        </div>
        <div className="my-4 border-t border-dotted border-neutral-200 w-full" />
        <div className="flex items-center justify-between mt-auto px-4 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 overflow-hidden rounded-full bg-neutral-100">
              {authorAvatar ? (
                <Image
                  src={authorAvatar}
                  alt={authorName}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-600 text-xs font-semibold uppercase">
                  {authorName.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-[14px] font-medium text-neutral-700">
              {authorName}
            </span>
          </div>
          <div className="bg-[#f5f5f5] px-3 py-1.5 rounded-lg">
            <span className="text-[12px] font-medium text-neutral-600 leading-none">
              {readTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
