import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Subject {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

interface ProgrammeSectionProps {
  title: string;
  subjects: Subject[];
  delay?: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function ProgrammeSection({ title, subjects, delay = 0 }: ProgrammeSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      <div
        className="rounded-xl bg-white p-8"
        style={{
          border: "1px solid var(--color-border-default)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-6 pb-4"
          style={{
            color: "var(--color-text-primary)",
            borderBottom: "1px solid var(--color-border-default)",
          }}
        >
          {title}
        </h3>
        <div className="space-y-1">
          {subjects.map((subject) => (
            <a
              key={subject.name}
              href={subject.href}
              className="group flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-150"
              style={{
                color: "var(--color-text-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-surface-overlay)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: `color-mix(in srgb, ${subject.color} 8%, transparent)`,
                  color: subject.color,
                }}
              >
                {subject.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {subject.name}
                </h4>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                  {subject.description}
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
                style={{ color: "var(--color-border-soft)" }}
              />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
