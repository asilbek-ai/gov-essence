import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

const ICONS = {
  success: FiCheckCircle, error: FiAlertCircle, info: FiInfo, warning: FiAlertTriangle,
};

const VARIANT_STYLES = {
  success: "from-emerald-500 to-green-600 text-white",
  error: "from-rose-500 to-red-600 text-white",
  info: "from-blue-500 to-indigo-600 text-white",
  warning: "from-amber-500 to-orange-600 text-white",
};

export function ToastViewport() {
  const { toasts, dismissToast } = useApp();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-auto sm:right-4 sm:top-20 sm:items-end">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.variant];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl bg-gradient-to-br ${VARIANT_STYLES[t.variant]} p-4 shadow-strong backdrop-blur-xl`}
            >
              <Icon className="mt-0.5 size-5 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold leading-snug">{t.title}</div>
                {t.description && <div className="mt-1 text-xs opacity-90">{t.description}</div>}
              </div>
              <button onClick={() => dismissToast(t.id)} className="shrink-0 rounded-full p-1 transition hover:bg-white/20" aria-label="close">
                <FiX className="size-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
