"use client";

import React, { useState, useEffect, useRef } from "react";
import { Task } from "@/type/kray-todo/Task";
import { TaskService } from "@/lib/services/kray-todo/task";
import { PenIcon } from "@/public/icons/PenIcon";
import { EraserIcon } from "@/public/icons/EraserIcon";
import { HandIcon } from "@/public/icons/HandIcon";
import { NoteIcon } from "@/public/icons/NoteIcon";
import { TextIcon } from "@/public/icons/TextIcon";
import { TrashIcon } from "@/public/icons/TrashIcon";
import Modal from "../../common/Modal";

interface Point {
  x: number;
  y: number;
}
interface Line {
  points: Point[];
  color: string;
  width: number;
  isEraser?: boolean;
}
interface StickyNote {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: number;
  fontFamily?: string;
  type?: "note" | "text" | "image";
  imageUrl?: string;
  locked?: boolean;
  width?: number;
  height?: number;
}
interface BoardData {
  lines: Line[];
  notes: StickyNote[];
}

const COLORS = [
  "#1e1e1e",
  "#9ca3af",
  "#d8b4fe",
  "#a855f7",
  "#3b82f6",
  "#60a5fa",
  "#fbbf24",
  "#f97316",
  "#059669",
  "#4ade80",
  "#fb7185",
  "#ef4444",
];

const FONT_FAMILIES = [
  { label: "Sans", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Mono", value: "monospace" },
  { label: "Cursive", value: "cursive" },
];

const FONT_SIZES = [12, 14, 16, 18, 20, 24];

const AutoResizeTextArea = ({
  note,
  updateNoteText,
  isFocused,
  setIsFocused,
  tool,
}: {
  note: StickyNote;
  updateNoteText: (id: string, text: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  tool: string;
}) => {
  const textStyle: React.CSSProperties = {
    fontWeight: note.bold ? "bold" : "normal",
    fontStyle: note.italic ? "italic" : "normal",
    textDecoration: note.underline ? "underline" : "none",
    fontSize: `${note.fontSize ?? 14}px`,
    fontFamily: note.fontFamily ?? "sans-serif",
    color: note.type === "text" ? note.color : "rgba(0,0,0,0.8)",
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isFocused && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div
      className={`relative ${note.type === "text" ? "min-w-max" : "w-full flex-1 min-h-[135px]"} grid`}
    >
      <div
        className={`invisible whitespace-pre col-start-1 row-start-1 ${note.type === "text" ? "w-auto p-2" : "w-full p-[15px] pt-[5px] max-h-[285px]"} overflow-hidden`}
        style={textStyle}
        aria-hidden="true"
      >
        {note.text ? note.text + " " : "Type here..."}
      </div>
      <textarea
        ref={textareaRef}
        value={note.text}
        onChange={(e) => updateNoteText(note.id, e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        readOnly={
          tool !== (note.type || "note") ||
          (note.type === "text" && tool !== "text") ||
          (note.type !== "text" && tool !== "note")
        }
        placeholder={
          note.type === "text" ? "Type here..." : "Type your thoughts here..."
        }
        className={`col-start-1 row-start-1 w-0 min-w-full h-full bg-transparent border-none outline-none resize-none ${note.type === "text" ? "overflow-hidden" : isFocused ? "overflow-y-auto" : "overflow-hidden"} placeholder-[rgba(0,0,0,0.4)] ${note.type === "text" ? "p-2" : "p-[15px] pt-[5px]"} custom-scrollbar`}
        style={textStyle}
        rows={1}
      />
    </div>
  );
};

const WhiteBoard = () => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tool, setTool] = useState<"pen" | "note" | "text" | "eraser" | "pan">(
    "pen",
  );
  const [lines, setLines] = useState<Line[]>([]);
  const [notes, setNotes] = useState<StickyNote[]>([]);

  const [penColor, setPenColor] = useState(COLORS[0]);
  const [penWidth, setPenWidth] = useState(3);

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [clipboardNote, setClipboardNote] = useState<StickyNote | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    noteId: string;
  } | null>(null);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null);
  const [resizingNoteId, setResizingNoteId] = useState<string | null>(null);
  const [focusedNoteId, setFocusedNoteId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const interactionRef = useRef<{
    type: "pan" | "drag" | "resize" | "draw";
    startX: number;
    startY: number;
    initialData: any;
  } | null>(null);

  const [lastPointerPos, setLastPointerPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef(notes);
  const linesRef = useRef(lines);

  useEffect(() => {
    notesRef.current = notes;
    linesRef.current = lines;
  }, [notes, lines]);
  const noteDragStartPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const fetchActiveTask = () => {
      const tasks = TaskService.getTasks();
      const inProgress = tasks.find((t) => t.status.name === "In Progress");
      setActiveTask(inProgress || null);
    };

    fetchActiveTask();
    window.addEventListener("kray_todo_tasks_updated", fetchActiveTask);
    return () =>
      window.removeEventListener("kray_todo_tasks_updated", fetchActiveTask);
  }, []);

  useEffect(() => {
    if (activeTask) {
      const saved = localStorage.getItem(`kray_board_${activeTask.id}`);
      if (saved) {
        try {
          const data = JSON.parse(saved) as BoardData;
          setLines(data.lines || []);
          setNotes(data.notes || []);
        } catch (e) {
          console.error(e);
        }
      } else {
        setLines([]);
        setNotes([]);
      }
    } else {
      setLines([]);
      setNotes([]);
    }
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [activeTask]);

  const saveData = (newLines: Line[], newNotes: StickyNote[]) => {
    if (activeTask) {
      localStorage.setItem(
        `kray_board_${activeTask.id}`,
        JSON.stringify({
          lines: newLines,
          notes: newNotes,
        }),
      );
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawCanvas();
    };

    const drawCanvas = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(zoom, 0, 0, zoom, pan.x, pan.y);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const drawLine = (line: Line) => {
        if (line.points.length === 0) return;
        ctx.beginPath();

        if (line.isEraser) {
          ctx.globalCompositeOperation = "destination-out";
          ctx.lineWidth = line.width || 20;
          ctx.strokeStyle = "rgba(0,0,0,1)";
        } else {
          ctx.globalCompositeOperation = "source-over";
          ctx.lineWidth = line.width;
          ctx.strokeStyle = line.color;
        }

        ctx.moveTo(line.points[0].x, line.points[0].y);
        line.points.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      };

      lines.forEach(drawLine);
      if (currentLine) drawLine(currentLine);

      ctx.globalCompositeOperation = "source-over";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawCanvas();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [lines, currentLine, activeTask, zoom, pan]);

  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    const screenX = clientX - rect.left;
    const screenY = clientY - rect.top;
    return {
      x: (screenX - pan.x) / zoom,
      y: (screenY - pan.y) / zoom,
    };
  };

  const handlePointerDownCanvas = (e: React.MouseEvent | React.TouchEvent) => {
    if (!activeTask) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const canvas = canvasRef.current;
    let elementUnder = null;
    if (canvas) {
      const originalPointerEvents = canvas.style.pointerEvents;
      canvas.style.pointerEvents = "none";
      elementUnder = document.elementFromPoint(clientX, clientY);
      canvas.style.pointerEvents = originalPointerEvents;
    }

    let isResizeHandle = false;
    let targetNoteId = null;
    let current = elementUnder;
    while (current && current !== document.body) {
      if (current instanceof HTMLElement) {
        if (current.dataset.resizeHandle === "true") {
          isResizeHandle = true;
        }
        if (current.dataset.noteId) {
          targetNoteId = current.dataset.noteId;
          break;
        }
      }
      current = current.parentElement;
    }

    if (isResizeHandle && targetNoteId) {
      const targetNote = notes.find((n) => n.id === targetNoteId);
      if (targetNote && !targetNote.locked) {
        const noteW =
          targetNote.width || (targetNote.type === "image" ? 300 : 200);
        const noteH =
          targetNote.height || (targetNote.type === "image" ? 200 : 150);
        setResizingNoteId(targetNoteId);
        setSelectedNoteId(targetNoteId);
        interactionRef.current = {
          type: "resize",
          startX: clientX,
          startY: clientY,
          initialData: {
            width: noteW,
            height: noteH,
            fontSize: targetNote.fontSize || 14,
          },
        };
        return;
      }
    }

    setSelectedNoteId(null);
    setContextMenu(null);

    const pos = getMousePos(e);

    if (tool === "pan") {
      e.preventDefault();
      setIsPanning(true);
      interactionRef.current = {
        type: "pan",
        startX: clientX,
        startY: clientY,
        initialData: { ...pan },
      };
      return;
    }

    if (tool === "note") {
      e.preventDefault();
      const newNote: StickyNote = {
        id: Date.now().toString(),
        x: pos.x,
        y: pos.y,
        text: "",
        color: "#fef08a",
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      saveData(lines, updatedNotes);
      setFocusedNoteId(newNote.id);
      return;
    }

    if (tool === "text") {
      e.preventDefault();
      const newNote: StickyNote = {
        id: Date.now().toString(),
        x: pos.x,
        y: pos.y,
        text: "",
        color: "#1e1e1e", // Default black for text
        type: "text",
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      saveData(lines, updatedNotes);
      setSelectedNoteId(newNote.id);
      setFocusedNoteId(newNote.id);
      return;
    }

    if (tool === "pen" || tool === "eraser") {
      setIsDrawing(true);
      interactionRef.current = {
        type: "draw",
        startX: clientX,
        startY: clientY,
        initialData: null,
      };
      setCurrentLine({
        color: tool === "eraser" ? "rgba(0,0,0,1)" : penColor,
        width: tool === "eraser" ? 20 : penWidth,
        isEraser: tool === "eraser",
        points: [pos],
      });
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    const rect = canvas.getBoundingClientRect();
    const boardX = (clientX - rect.left - pan.x) / zoom;
    const boardY = (clientY - rect.top - pan.y) / zoom;

    // Find the note containing this coordinate, from top-most (last rendered) to bottom-most
    const clickedNote = [...notes].reverse().find((note) => {
      const noteW =
        note.width ||
        (note.type === "image" ? 300 : note.type === "text" ? 100 : 200);
      const noteH =
        note.height ||
        (note.type === "image" ? 200 : note.type === "text" ? 50 : 150);
      return (
        boardX >= note.x &&
        boardX <= note.x + noteW &&
        boardY >= note.y &&
        boardY <= note.y + noteH
      );
    });

    if (clickedNote) {
      setSelectedNoteId(clickedNote.id);
      setContextMenu({
        x: clientX,
        y: clientY,
        noteId: clickedNote.id,
      });
    }
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!interactionRef.current) return;

      let clientX, clientY;
      if ("touches" in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const { type, startX, startY, initialData } = interactionRef.current;
      const dx = (clientX - startX) / zoom;
      const dy = (clientY - startY) / zoom;

      if (type === "pan") {
        const dxRaw = clientX - startX;
        const dyRaw = clientY - startY;
        setPan({ x: initialData.x + dxRaw, y: initialData.y + dyRaw });
        return;
      }

      if (type === "resize" && resizingNoteId) {
        setNotes((prevNotes) =>
          prevNotes.map((n) => {
            if (n.id === resizingNoteId) {
              if (n.type === "text") {
                const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
                return {
                  ...n,
                  fontSize: Math.max(8, initialData.fontSize + delta * 0.4),
                };
              }
              if (n.type === "image") {
                const aspectRatio = initialData.width / initialData.height;
                let newWidth = initialData.width + dx;
                let newHeight = newWidth / aspectRatio;

                if (Math.abs(dy) > Math.abs(dx)) {
                  newHeight = initialData.height + dy;
                  newWidth = newHeight * aspectRatio;
                }

                if (newWidth < 50) {
                  newWidth = 50;
                  newHeight = newWidth / aspectRatio;
                }
                if (newHeight < 50) {
                  newHeight = 50;
                  newWidth = newHeight * aspectRatio;
                }

                return {
                  ...n,
                  width: newWidth,
                  height: newHeight,
                };
              }
              return {
                ...n,
                width: Math.max(50, initialData.width + dx),
                height: Math.max(20, initialData.height + dy),
              };
            }
            return n;
          }),
        );
        return;
      }

      if (type === "drag" && draggingNoteId) {
        setNotes((prevNotes) =>
          prevNotes.map((n) =>
            n.id === draggingNoteId
              ? { ...n, x: initialData.x + dx, y: initialData.y + dy }
              : n,
          ),
        );
        return;
      }

      if (type === "draw") {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const pos = {
          x: (clientX - rect.left - pan.x) / zoom,
          y: (clientY - rect.top - pan.y) / zoom,
        };
        setCurrentLine((prev) =>
          prev ? { ...prev, points: [...prev.points, pos] } : null,
        );
      }
    };

    const handleUp = () => {
      if (!interactionRef.current) return;
      const { type } = interactionRef.current;

      interactionRef.current = null;

      if (type === "pan") {
        setIsPanning(false);
      } else if (type === "drag") {
        setDraggingNoteId(null);
        saveData(linesRef.current, notesRef.current);
      } else if (type === "resize") {
        setResizingNoteId(null);
        saveData(linesRef.current, notesRef.current);
      } else if (type === "draw") {
        const finalLine = currentLineRef.current || currentLine;
        if (finalLine) {
          setLines((prev) => {
            const updated = [...prev, finalLine];
            saveData(updated, notesRef.current);
            return updated;
          });
        }
        setCurrentLine(null);
        setIsDrawing(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [zoom, pan, resizingNoteId, draggingNoteId]);

  const currentLineRef = useRef<Line | null>(null);
  useEffect(() => {
    currentLineRef.current = currentLine;
  }, [currentLine]);

  const handleNoteDragStart = (
    e: React.MouseEvent | React.TouchEvent,
    id: string,
  ) => {
    e.stopPropagation();
    const note = notes.find((n) => n.id === id);
    if (!note || note.locked) return;

    setDraggingNoteId(id);
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    interactionRef.current = {
      type: "drag",
      startX: clientX,
      startY: clientY,
      initialData: { x: note.x, y: note.y },
    };
  };

  const updateNoteText = (id: string, text: string) => {
    setNotes((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, text } : n));
      saveData(linesRef.current, updated);
      return updated;
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      saveData(linesRef.current, updated);
      return updated;
    });
    if (selectedNoteId === id) setSelectedNoteId(null);
    if (focusedNoteId === id) setFocusedNoteId(null);
  };

  const handleClear = () => {
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    setLines([]);
    setNotes([]);
    saveData([], []);
    setShowClearConfirm(false);
  };

  useEffect(() => {
    const handleGlobalClick = () => setContextMenu(null);
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement
      ) {
        return;
      }

      if (selectedNoteId) {
        const note = notes.find((n) => n.id === selectedNoteId);
        if (note) {
          if (e.key === "Delete" || e.key === "Backspace") {
            deleteNote(selectedNoteId);
            setSelectedNoteId(null);
          } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
            setClipboardNote(note);
          } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "x") {
            setClipboardNote(note);
            deleteNote(selectedNoteId);
            setSelectedNoteId(null);
          }
        }
      }

      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "v" &&
        clipboardNote
      ) {
        const newNote: StickyNote = {
          ...clipboardNote,
          id: Date.now().toString(),
          x: clipboardNote.x + 20,
          y: clipboardNote.y + 20,
        };
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        saveData(lines, updatedNotes);
        setSelectedNoteId(newNote.id);
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          if (!blob) continue;

          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            const img = new Image();
            img.onload = () => {
              const canvas = canvasRef.current;
              if (!canvas) return;
              const centerX = (canvas.width / 2 - pan.x) / zoom;
              const centerY = (canvas.height / 2 - pan.y) / zoom;

              let w = img.width;
              let h = img.height;
              const maxW = 500;
              const maxH = 500;

              if (w > maxW) {
                h = h * (maxW / w);
                w = maxW;
              }
              if (h > maxH) {
                w = w * (maxH / h);
                h = maxH;
              }

              const newNote: StickyNote = {
                id: Date.now().toString(),
                x: centerX - w / 2,
                y: centerY - h / 2,
                text: "",
                color: "transparent",
                type: "image",
                imageUrl,
                width: w,
                height: h,
              };

              setNotes((prev) => {
                const updated = [...prev, newNote];
                saveData(linesRef.current, updated);
                return updated;
              });
              setSelectedNoteId(newNote.id);
            };
            img.src = imageUrl;
          };
          reader.readAsDataURL(blob);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("paste", handlePaste);
    };
  }, [selectedNoteId, notes, lines, clipboardNote, pan, zoom]);

  const getCursor = () => {
    if (tool === "pen") {
      const svg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.7566 2.62145C16.5852 0.792851 19.55 0.792851 21.3786 2.62145C23.2072 4.45005 23.2072 7.41479 21.3786 9.24339L11.8933 18.7287C11.3514 19.2706 11.0323 19.5897 10.6774 19.8665C10.2592 20.1927 9.80655 20.4725 9.32766 20.7007C8.92136 20.8943 8.49334 21.037 7.76623 21.2793L4.43511 22.3897L3.63303 22.6571C2.98247 22.8739 2.26522 22.7046 1.78032 22.2197C1.29542 21.7348 1.1261 21.0175 1.34296 20.367L2.72068 16.2338C2.96303 15.5067 3.10568 15.0787 3.29932 14.6724C3.52755 14.1935 3.80727 13.7409 4.13354 13.3226C4.41035 12.9677 4.72939 12.6487 5.27137 12.1067L14.7566 2.62145ZM4.40051 20.8201L7.24203 19.8729C8.03314 19.6092 8.36927 19.4958 8.68233 19.3466C9.06287 19.1653 9.42252 18.943 9.75492 18.6837C10.0284 18.4704 10.2801 18.2205 10.8698 17.6308L18.4393 10.0614C17.6506 9.78321 16.6346 9.26763 15.6835 8.31651C14.7324 7.36538 14.2168 6.34939 13.9387 5.56075L6.36917 13.1302C5.77951 13.7199 5.52959 13.9716 5.3163 14.2451C5.05704 14.5775 4.83476 14.9371 4.65341 15.3177C4.50421 15.6307 4.3908 15.9669 4.12709 16.758L3.17992 19.5995L4.40051 20.8201ZM15.1554 4.34404C15.1896 4.519 15.2474 4.75684 15.3438 5.03487C15.561 5.66083 15.9712 6.48288 16.7442 7.25585C17.5171 8.02881 18.3392 8.43903 18.9651 8.6562C19.2432 8.75266 19.481 8.81046 19.656 8.84466L20.3179 8.18272C21.5607 6.93991 21.5607 4.92492 20.3179 3.68211C19.0751 2.4393 17.0601 2.4393 15.8173 3.68211L15.1554 4.34404Z" fill="${penColor}"/></svg>`;
      return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") 2 22, crosshair`;
    } else if (tool === "eraser") {
      const svg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.0828 19.0632C12.6389 19.5072 12.2399 19.9062 11.8725 20.25H21C21.4142 20.25 21.75 20.5858 21.75 21C21.75 21.4142 21.4142 21.75 21 21.75H9C8.98166 21.75 8.96347 21.7493 8.94546 21.748C8.24156 21.7211 7.64439 21.4169 7.05863 20.97C6.47124 20.5218 5.81539 19.866 5.01269 19.0632L4.93674 18.9873C4.13402 18.1846 3.47815 17.5288 3.03 16.9414C2.56159 16.3274 2.25 15.701 2.25 14.9522C2.25 14.2035 2.56159 13.577 3.03 12.9631C3.47816 12.3757 4.13402 11.7199 4.93674 10.9172L10.9172 4.93674C11.7199 4.13403 12.3757 3.47815 12.9631 3.03C13.577 2.56159 14.2035 2.25 14.9522 2.25C15.701 2.25 16.3274 2.56159 16.9414 3.03C17.5288 3.47816 18.1846 4.13402 18.9873 4.93674L19.0632 5.01269C19.866 5.81539 20.5218 6.47124 20.97 7.05863C21.4384 7.67256 21.75 8.29902 21.75 9.04776C21.75 9.79649 21.4384 10.423 20.97 11.0369C20.5219 11.6243 19.866 12.2801 19.0633 13.0827L13.0828 19.0632ZM11.9399 6.03539C12.7899 5.18538 13.3752 4.60235 13.873 4.22253C14.3535 3.85592 14.6633 3.75 14.9522 3.75C15.2411 3.75 15.551 3.85592 16.0315 4.22253C16.5293 4.60235 17.1146 5.18538 17.9646 6.03539C18.8146 6.88541 19.3977 7.47069 19.7775 7.9685C20.1441 8.449 20.25 8.75886 20.25 9.04776C20.25 9.33665 20.1441 9.64651 19.7775 10.127C19.3977 10.6248 18.8146 11.2101 17.9646 12.0601L13.7713 16.2534L7.74662 10.2287L11.9399 6.03539ZM9.04776 20.25C9.33665 20.25 9.64651 20.1441 10.127 19.7775C10.6248 19.3977 11.2101 18.8146 12.0601 17.9646L12.7107 17.314L6.68596 11.2893L6.03539 11.9399C5.18538 12.7899 4.60235 13.3752 4.22253 13.873C3.85592 14.3535 3.75 14.6633 3.75 14.9522C3.75 15.2411 3.85592 15.551 4.22253 16.0315C4.60235 16.5293 5.18538 17.1146 6.03539 17.9646C6.88541 18.8146 7.47069 19.3977 7.9685 19.7775C8.449 20.1441 8.75886 20.25 9.04776 20.25Z" fill="black"/></svg>`;
      return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") 4 20, cell`;
    } else if (tool === "note") {
      const svg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9426 1.25H12.0574C14.3658 1.24999 16.1748 1.24998 17.5863 1.43975C19.031 1.63399 20.1711 2.03933 21.0659 2.93414C21.9607 3.82895 22.366 4.96897 22.5603 6.41371C22.75 7.82519 22.75 9.63423 22.75 11.9426V15C22.75 19.2802 19.2802 22.75 15 22.75H11.9426C9.63423 22.75 7.82519 22.75 6.41371 22.5603C4.96897 22.366 3.82895 21.9607 2.93414 21.0659C2.03933 20.1711 1.63399 19.031 1.43975 17.5863C1.24998 16.1748 1.24999 14.3658 1.25 12.0574V11.9426C1.24999 9.63423 1.24998 7.82519 1.43975 6.41371C1.63399 4.96897 2.03933 3.82895 2.93414 2.93414C3.82895 2.03933 4.96897 1.63399 6.41371 1.43975C7.82519 1.24998 9.63423 1.24999 11.9426 1.25ZM6.61358 2.92637C5.33517 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33517 2.92637 6.61358C2.75159 7.91356 2.75 9.62177 2.75 12C2.75 14.3782 2.75159 16.0864 2.92637 17.3864C3.09825 18.6648 3.42514 19.4355 3.9948 20.0052C4.56445 20.5749 5.33517 20.9018 6.61358 21.0736C7.91356 21.2484 9.62177 21.25 12 21.25H14.2504C14.2538 19.8837 14.2835 18.9862 14.5314 18.2232C15.1002 16.4726 16.4726 15.1002 18.2232 14.5314C18.9862 14.2835 19.8837 14.2538 21.25 14.2504V12C21.25 9.62177 21.2484 7.91356 21.0736 6.61358C20.9018 5.33517 20.5749 4.56445 20.0052 3.9948C19.4355 3.42514 18.6648 3.09825 17.3864 2.92637C16.0864 2.75159 14.3782 2.75 12 2.75C9.62177 2.75 7.91356 2.75159 6.61358 2.92637ZM21.2053 15.7513C19.8482 15.7571 19.2061 15.7892 18.6867 15.958C17.3928 16.3784 16.3784 17.3928 15.958 18.6867C15.7892 19.2061 15.7571 19.8482 15.7513 21.2053C18.6025 20.8637 20.8637 18.6025 21.2053 15.7513Z" fill="black"/></svg>`;
      return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}") 12 12, crosshair`;
    } else if (tool === "text") {
      return "text";
    } else if (tool === "pan") {
      return isPanning ? "grabbing" : "grab";
    }
    return "default";
  };

  return (
    <div
      className="bg-[#fafafa] h-full w-full rounded-[10px] overflow-hidden relative border border-[rgba(0,0,0,0.1)] select-none"
      ref={containerRef}
      onMouseDown={handlePointerDownCanvas}
      onTouchStart={handlePointerDownCanvas}
      onContextMenu={handleContextMenu}
    >
      {!activeTask ? (
        <div className="flex flex-col items-center justify-center h-full w-full opacity-50 absolute inset-0 z-10 bg-white">
          <svg
            className="w-12 h-12 mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <p className="text-[14px] font-medium text-black">No active task</p>
          <p className="text-[12px] mt-2 text-center px-4">
            Drag a task from the list into the "Drop your task here" box
            <br />
            to start drawing and taking notes.
          </p>
        </div>
      ) : (
        <>
          <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 z-30 flex gap-[10px] bg-white p-[5px] rounded-[10px] shadow-sm border border-[rgba(0,0,0,0.1)] items-center">
            <button
              onClick={() => {
                setTool("pen");
                setSelectedNoteId(null);
              }}
              className={`p-[6px] rounded-[6px] text-[13px] font-medium transition-colors ${tool === "pen" ? "bg-black text-white" : "hover:bg-gray-100 text-black"}`}
            >
              <PenIcon className="size-4" />
            </button>
            <button
              onClick={() => {
                setTool("eraser");
                setSelectedNoteId(null);
              }}
              className={` p-[6px] rounded-[6px] text-[13px] font-medium transition-colors ${tool === "eraser" ? "bg-black text-white" : "hover:bg-gray-100 text-black"}`}
            >
              <EraserIcon className="size-4" />
            </button>
            <button
              onClick={() => {
                setTool("pan");
                setSelectedNoteId(null);
              }}
              className={`p-[6px] rounded-[6px] text-[13px] font-medium transition-colors ${tool === "pan" ? "bg-black text-white" : "hover:bg-gray-100 text-black"}`}
            >
              <HandIcon className="size-4" />
            </button>
            <button
              onClick={() => {
                setTool("note");
                setSelectedNoteId(null);
              }}
              className={`p-[6px] rounded-[6px] text-[13px] font-medium transition-colors ${tool === "note" ? "bg-black text-white" : "hover:bg-gray-100 text-black"}`}
            >
              <NoteIcon className="size-4" />
            </button>
            <button
              onClick={() => {
                setTool("text");
                setSelectedNoteId(null);
              }}
              className={`p-[6px] rounded-[6px] text-[13px] font-medium transition-colors ${tool === "text" ? "bg-black text-white" : "hover:bg-gray-100 text-black"}`}
            >
              <TextIcon className="size-4" />
            </button>
            <button
              onClick={handleClear}
              className="px-[12px] py-[6px] rounded-[6px] text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <TrashIcon className="size-4" />
            </button>
            <div className="w-px h-[20px] bg-gray-200 mx-[2px]"></div>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
              className="px-[8px] py-[4px] rounded-[6px] text-[14px] font-medium hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="text-[12px] font-medium min-w-[35px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}
              className="px-[8px] py-[4px] rounded-[6px] text-[14px] font-medium hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          {selectedNoteId
            ? (() => {
                const selectedNote = notes.find((n) => n.id === selectedNoteId);
                if (!selectedNote || selectedNote.type === "image") return null;
                const updateFormat = (patch: Partial<StickyNote>) => {
                  const updatedNotes = notes.map((n) =>
                    n.id === selectedNoteId ? { ...n, ...patch } : n,
                  );
                  setNotes(updatedNotes);
                  saveData(lines, updatedNotes);
                };
                return (
                  <div
                    className="absolute top-[10px] right-[10px] z-30 flex gap-[8px] bg-white p-[8px] rounded-[10px] shadow-sm border border-[rgba(0,0,0,0.1)] items-center"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <select
                      value={selectedNote.fontFamily ?? "sans-serif"}
                      onChange={(e) =>
                        updateFormat({ fontFamily: e.target.value })
                      }
                      className="text-[12px] border-none outline-none bg-transparent cursor-pointer text-gray-700"
                    >
                      {FONT_FAMILIES.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                    <div className="w-px h-[20px] bg-gray-200"></div>
                    <select
                      value={selectedNote.fontSize ?? 14}
                      onChange={(e) =>
                        updateFormat({ fontSize: Number(e.target.value) })
                      }
                      className="text-[12px] border-none outline-none bg-transparent cursor-pointer text-gray-700 w-[36px]"
                    >
                      {FONT_SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="w-px h-[20px] bg-gray-200"></div>
                    <button
                      onClick={() => updateFormat({ bold: !selectedNote.bold })}
                      className={`w-[26px] h-[26px] rounded-[6px] flex items-center justify-center font-bold text-[14px] transition-colors ${
                        selectedNote.bold
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      B
                    </button>
                    <button
                      onClick={() =>
                        updateFormat({ italic: !selectedNote.italic })
                      }
                      className={`w-[26px] h-[26px] rounded-[6px] flex items-center justify-center italic text-[14px] transition-colors ${
                        selectedNote.italic
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      I
                    </button>
                    <button
                      onClick={() =>
                        updateFormat({ underline: !selectedNote.underline })
                      }
                      className={`w-[26px] h-[26px] rounded-[6px] flex items-center justify-center underline text-[14px] transition-colors ${
                        selectedNote.underline
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      U
                    </button>
                  </div>
                );
              })()
            : (tool === "pen" || tool === "text") && (
                <div className="absolute top-[10px] right-[10px] z-30 flex gap-[10px] bg-white p-[8px] rounded-[10px] shadow-sm border border-[rgba(0,0,0,0.1)] items-center">
                  <div className="flex gap-[4px]">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          selectedNoteId
                            ? null
                            : tool === "text"
                              ? null
                              : setPenColor(color)
                        }
                        onMouseDown={(e) => {
                          if (tool === "text") {
                            setPenColor(color);
                          }
                        }}
                        className={`w-[26px] h-[26px] rounded-[6px] flex items-center justify-center transition-colors ${
                          penColor === color
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className="w-[14px] h-[14px] rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </button>
                    ))}
                  </div>
                  {tool === "pen" && (
                    <>
                      <div className="w-px h-[20px] bg-gray-200 mx-[4px]"></div>
                      <div className="w-[100px] px-[5px] flex items-center">
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={penWidth}
                          onChange={(e) => setPenWidth(Number(e.target.value))}
                          className="w-full h-[4px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

          <canvas
            ref={canvasRef}
            onMouseDown={(e) => {
              e.stopPropagation();
              handlePointerDownCanvas(e);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handlePointerDownCanvas(e);
            }}
            onContextMenu={handleContextMenu}
            className={`absolute inset-0 touch-none z-20 ${
              tool === "pen" || tool === "eraser"
                ? "pointer-events-auto"
                : "pointer-events-none"
            }`}
            style={{ cursor: getCursor() }}
          />
          <div
            className="absolute top-0 left-0 z-10 pointer-events-none origin-top-left"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              width: 0,
              height: 0,
            }}
          >
            {notes.map((note) => (
              <div
                key={note.id}
                data-note-id={note.id}
                className={`absolute ${note.type === "text" || note.type === "image" ? "" : "shadow-md"} rounded-[4px] flex flex-col ${
                  !note.locked &&
                  (tool === "pan" ||
                    (tool === "text" && note.type === "text") ||
                    (tool === "note" && (note.type || "note") === "note") ||
                    note.type === "image")
                    ? "pointer-events-auto"
                    : "pointer-events-none"
                } transition-shadow ${
                  draggingNoteId === note.id
                    ? note.type === "text" || note.type === "image"
                      ? "z-30"
                      : "shadow-xl z-30"
                    : selectedNoteId === note.id
                      ? note.type === "image"
                        ? "z-20"
                        : note.type === "text"
                          ? "z-20 border border-dashed border-[rgba(0,0,0,0.1)]"
                          : "shadow-lg z-20 ring-2 ring-blue-400"
                      : note.type === "text" || note.type === "image"
                        ? "z-10"
                        : "hover:shadow-lg z-10"
                }`}
                style={{
                  left: note.x,
                  top: note.y,
                  backgroundColor:
                    note.type === "text" || note.type === "image"
                      ? "transparent"
                      : note.color,
                  width:
                    note.type === "text"
                      ? "auto"
                      : `${note.width || (note.type === "image" ? 300 : 200)}px`,
                  height:
                    note.type === "text"
                      ? "auto"
                      : `${note.height || (note.type === "image" ? 200 : 150)}px`,
                  minWidth: note.type === "text" ? "fit-content" : "50px",
                  minHeight: note.type === "text" ? "0" : "20px",
                  cursor: note.locked ? "default" : "move",
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setSelectedNoteId(note.id);
                  if (note.locked) return;
                  noteDragStartPos.current = { x: e.clientX, y: e.clientY };
                  handleNoteDragStart(e, note.id);
                }}
                onMouseUp={(e) => {
                  const start = noteDragStartPos.current;
                  if (start) {
                    const dist = Math.hypot(
                      e.clientX - start.x,
                      e.clientY - start.y,
                    );
                    if (dist < 5) {
                      // It was a click, not a drag — focus textarea
                      const ta = e.currentTarget.querySelector("textarea");
                      if (ta) (ta as HTMLTextAreaElement).focus();
                    }
                  }
                  noteDragStartPos.current = null;
                }}
                onTouchStart={(e) => {
                  setSelectedNoteId(note.id);
                  if (note.locked) return;
                  handleNoteDragStart(e, note.id);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedNoteId(note.id);
                  setContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    noteId: note.id,
                  });
                }}
              >
                {note.type !== "text" && note.type !== "image" && (
                  <div
                    className="h-[15px] w-full flex justify-end items-center px-[10px] cursor-move select-none rounded-t-[4px] transition-colors"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      if (note.locked) return;
                      handleNoteDragStart(e, note.id);
                    }}
                    onTouchStart={(e) => {
                      if (note.locked) return;
                      handleNoteDragStart(e, note.id);
                    }}
                  ></div>
                )}
                {note.type === "image" ? (
                  <div className="w-full h-full relative overflow-hidden rounded-[4px]">
                    <img
                      src={note.imageUrl}
                      alt="Pasted content"
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>
                ) : (
                  <AutoResizeTextArea
                    note={note}
                    updateNoteText={updateNoteText}
                    isFocused={focusedNoteId === note.id}
                    setIsFocused={(focused) => {
                      if (focused) {
                        setFocusedNoteId(note.id);
                      } else {
                        setFocusedNoteId((prev) =>
                          prev === note.id ? null : prev,
                        );
                        if (!note.text.trim()) {
                          deleteNote(note.id);
                        }
                      }
                    }}
                    tool={tool}
                  />
                )}
                {selectedNoteId === note.id &&
                  (note.type === "text" || note.type === "image") &&
                  !note.locked && (
                    <div
                      data-resize-handle="true"
                      className="absolute bottom-0 right-0 w-[12px] h-[12px] cursor-nwse-resize z-40 flex items-center justify-center"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setResizingNoteId(note.id);
                        interactionRef.current = {
                          type: "resize",
                          startX: e.clientX,
                          startY: e.clientY,
                          initialData: {
                            width: note.width || 200,
                            height: note.height || 150,
                            fontSize: note.fontSize || 14,
                          },
                        };
                      }}
                    >
                      <div className="w-[6px] h-[6px] border-r-2 border-b-2 border-gray-400"></div>
                    </div>
                  )}
              </div>
            ))}
          </div>

          {contextMenu && (
            <div
              className="fixed z-50 bg-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-100 py-[4px] w-[170px]"
              style={{ left: contextMenu.x, top: contextMenu.y }}
              onContextMenu={(e) => e.preventDefault()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <button
                className="w-full flex justify-between items-center px-[12px] py-[8px] hover:bg-gray-100 text-left text-[12px] text-gray-700"
                onClick={() => {
                  const note = notes.find((n) => n.id === contextMenu.noteId);
                  if (note) {
                    setClipboardNote(note);
                    deleteNote(contextMenu.noteId);
                  }
                  setContextMenu(null);
                }}
              >
                <span>Cut</span>
                <span className="text-[12px] text-gray-400">Ctrl + X</span>
              </button>
              <button
                className="w-full flex justify-between items-center px-[12px] py-[8px] hover:bg-gray-100 text-left text-[12px] text-gray-700"
                onClick={() => {
                  const note = notes.find((n) => n.id === contextMenu.noteId);
                  if (note) setClipboardNote(note);
                  setContextMenu(null);
                }}
              >
                <span>Copy</span>
                <span className="text-[12px] text-gray-400">Ctrl + C</span>
              </button>
              <div className="h-px bg-gray-100 my-[4px]"></div>
              <button
                className="w-full flex justify-between items-center px-[12px] py-[8px] hover:bg-gray-100 text-left text-[12px] text-gray-700"
                onClick={() => {
                  const noteId = contextMenu.noteId;
                  setNotes((prev) => {
                    const updated = prev.map((n) =>
                      n.id === noteId ? { ...n, locked: !n.locked } : n,
                    );
                    saveData(linesRef.current, updated);
                    return updated;
                  });
                  setContextMenu(null);
                }}
              >
                <span>
                  {notes.find((n) => n.id === contextMenu.noteId)?.locked
                    ? "Unlock"
                    : "Lock"}
                </span>
              </button>
              <div className="h-px bg-gray-100 my-[4px]"></div>
              <button
                className="w-full flex justify-between items-center px-[12px] py-[8px] hover:bg-gray-100 text-left text-[12px] text-red-600"
                onClick={() => {
                  deleteNote(contextMenu.noteId);
                  setContextMenu(null);
                }}
              >
                <span>Delete</span>
                <span className="text-[12px] text-gray-400">Del</span>
              </button>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClear}
        mainText="Delete"
        cancelText="Cancel"
        className="w-[420px]"
      >
        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-[60px] h-[60px] bg-red-50 rounded-full flex items-center justify-center mb-6">
            <TrashIcon className="size-8 text-red-500" />
          </div>
          <p className="text-[15px] font-medium text-gray-900 mb-2 leading-relaxed">
            Are you sure you want to clear the whiteboard?
          </p>
          <p className="text-[13px] text-gray-500 leading-relaxed px-4">
            This action will permanently delete all your drawings and notes.
            This cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default WhiteBoard;
