import { motion } from "framer-motion";
import { FaInbox } from "react-icons/fa";
import type { ReactNode } from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function EmptyState({
  icon = <FaInbox className="size-12 text-muted-foreground/50" />,
  title = "Hech narsa topilmadi",
  description,
  action,
}: { icon?: ReactNode; title?: string; description?: string; action?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-muted/30 px-8 py-16 text-center"
    >
      <div className="rounded-full bg-muted p-5">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </motion.div>
  );
}

export function PageLoading() {
  return (
    <div className="grid place-items-center py-24">
      <div className="relative size-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
      </div>
    </div>
  );
}
