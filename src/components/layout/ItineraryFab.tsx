/* Floating Itinerary button & modal */
import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { FiMap, FiTrash2, FiDownload, FiFileText, FiX } from "react-icons/fi";
import { useApp } from "@/context/AppContext";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/States";
import jsPDF from "jspdf";

export function ItineraryFab() {
  const { itinerary, removeItinerary, clearItinerary, reorderItinerary, toast } = useApp();
  const [open, setOpen] = useState(false);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(itinerary, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "marshrut.json";
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    toast({ title: "Marshrut yuklab olindi", variant: "success" });
  };
  const exportPdf = () => {
    if (!itinerary.length) return toast({ title: "Marshrut bo'sh", variant: "warning" });
    const doc = new jsPDF();
    doc.setFontSize(18); doc.text("Sayohat marshruti", 14, 18);
    doc.setFontSize(11);
    itinerary.forEach((it, i) => {
      doc.text(`${i + 1}. ${it.name}`, 14, 32 + i * 12);
      doc.setTextColor(100); doc.text(it.desc || "", 18, 38 + i * 12); doc.setTextColor(0);
    });
    doc.save("marshrut.pdf");
    toast({ title: "PDF tayyor", variant: "success" });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-2xl bg-gradient-to-br from-gold to-amber-500 px-4 py-3 text-sm font-bold text-gold-foreground shadow-gold"
      >
        <FiMap className="size-5" />
        Marshrut
        {itinerary.length > 0 && (
          <span className="grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{itinerary.length}</span>
        )}
      </motion.button>

      <Modal open={open} onClose={() => setOpen(false)} title="Sizning marshrutingiz" size="lg" footer={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <button onClick={exportJson} className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/20"><FiDownload className="size-3.5" /> JSON</button>
            <button onClick={exportPdf} className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/20"><FiFileText className="size-3.5" /> PDF</button>
            <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold transition hover:bg-muted/70">🖨 Chop</button>
          </div>
          <button onClick={() => { if (confirm("Marshrutni tozalaysizmi?")) clearItinerary(); }} className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive transition hover:bg-destructive/20"><FiTrash2 className="size-3.5" /> Tozalash</button>
        </div>
      }>
        {!itinerary.length ? (
          <EmptyState title="Marshrutingiz bo'sh" description="Yo'nalishlar bo'limidan 'Sayohatga qo'shish' tugmasini bosing." />
        ) : (
          <Reorder.Group axis="y" values={itinerary} onReorder={reorderItinerary} className="space-y-2">
            <AnimatePresence>
              {itinerary.map((it, i) => (
                <Reorder.Item key={it.id} value={it} className="cursor-grab active:cursor-grabbing">
                  <motion.div layout className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow font-bold text-primary-foreground">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-semibold">{it.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{it.desc}</div>
                    </div>
                    <button onClick={() => removeItinerary(it.id)} className="rounded-lg p-2 text-destructive transition hover:bg-destructive/10"><FiX className="size-4" /></button>
                  </motion.div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
        <p className="mt-4 text-xs text-muted-foreground">Marshrutingiz brauzeringizning xavfsiz xotirasida (LocalStorage) saqlanadi.</p>
      </Modal>
    </>
  );
}
