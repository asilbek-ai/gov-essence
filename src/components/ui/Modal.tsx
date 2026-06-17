import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { type ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  footer?: ReactNode;
}

const SIZES = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

export function Modal({ open, onClose, title, children, size = "md", footer }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className={`w-full ${SIZES[size]} max-h-[90vh] overflow-hidden rounded-3xl bg-card shadow-strong`}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h3 className="text-lg font-bold">{title}</h3>
                <button onClick={onClose} className="rounded-lg p-2 transition hover:bg-muted" aria-label="close">
                  <FiX className="size-4" />
                </button>
              </div>
            )}
            <div className="max-h-[calc(90vh-8rem)] overflow-y-auto p-6">{children}</div>
            {footer && <div className="border-t border-border bg-muted/30 px-6 py-3">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
