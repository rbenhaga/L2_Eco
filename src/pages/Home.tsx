import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    TrendingUp,
    BarChart3,
    Users,
    PieChart,
    ArrowRight,
    BookOpen,
    Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Types ---
interface SubjectCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    available: boolean;
    semester: 2 | 3;
    color: string; // Token-based color class (e.g., "bg-blue-500")
}

// --- Mock Data (Ideally moved to a separate file later) ---
const subjects: SubjectCardProps[] = [
    {
        title: "Macroéconomie",
        description: "IS-LM, WS-PS, AS-AD",
        icon: <TrendingUp size={20} />,
        href: "/macro",
        available: true,
        semester: 2,
        color: "bg-blue-500"
    },
    {
        title: "Microéconomie",
        description: "Consommateur & Producteur",
        icon: <PieChart size={20} />,
        href: "/micro",
        available: true,
        semester: 2,
        color: "bg-emerald-500"
    },
    {
        title: "Statistiques",
        description: "Probas & Variables Aléatoires",
        icon: <BarChart3 size={20} />,
        href: "/stats",
        available: true,
        semester: 2,
        color: "bg-cyan-500"
    },
    {
        title: "Sociologie",
        description: "Théories Sociologiques",
        icon: <Users size={20} />,
        href: "/socio",
        available: true,
        semester: 2,
        color: "bg-violet-500"
    }
];

function ResumeCard() {
    const [lastChapter, setLastChapter] = useState<{ title: string; href: string; timestamp: number } | null>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('last_chapter');
            if (stored) {
                setLastChapter(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to parse last_chapter", e);
        }
    }, []);

    if (!lastChapter) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white dark:bg-card border border-border rounded-xl p-4 shadow-sm flex items-center justify-between gap-4 group hover:border-primary/50 transition-all"
        >
            <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Clock size={20} />
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reprendre votre lecture</p>
                    <p className="text-sm font-medium text-foreground truncate">{lastChapter.title}</p>
                </div>
            </div>
            <Link
                to={lastChapter.href}
                className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 shrink-0 px-3 py-1.5 rounded-md hover:bg-primary/5 transition-colors"
            >
                Continuer <ArrowRight size={14} />
            </Link>
        </motion.div>
    );
}

function CompactSubjectCard({ title, description, icon, href, available, color }: SubjectCardProps) {
    if (!available) return null; // Or render disabled state if needed, but per density spec, simple is better.

    return (
        <Link to={href} className="group relative flex flex-col p-5 rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${color} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-foreground`}>
                    {/* Color handling: using text color relative to bg token might be tricky without full classes. 
               Let's simplify: Use the prop 'color' for bg, and text-primary or white.
               Actually spec said: "Icon (Top Left, colored background token)" */}
                    <div className={`text-${color.replace('bg-', '')}`}>
                        {icon}
                    </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={16} className="text-muted-foreground" />
                </div>
            </div>

            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground leading-snug line-clamp-2">{description}</p>

            {/* Micro-progress / Footer could go here if we had real stats. For now, clean. */}
            {/* <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
         <span>4 Chapitres</span>
      </div> */}
        </Link>
    );
}

export function Home() {
    const [semester, setSemester] = useState<2 | 3>(2);
    const filteredSubjects = subjects.filter(sub => sub.semester === semester);

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Resume Section (Conditional) */}
            <ResumeCard />

            {/* Main Grid Section */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Mes Modules</h2>
                    <div className="flex p-0.5 bg-muted rounded-lg border border-border">
                        {[2, 3].map(s => (
                            <button
                                key={s}
                                onClick={() => setSemester(s as 2 | 3)}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${semester === s ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                S{s}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    key={semester}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {filteredSubjects.length > 0 ? (
                        filteredSubjects.map(sub => (
                            <CompactSubjectCard key={sub.title} {...sub} />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center border border-dashed border-border rounded-xl bg-muted/30">
                            <p className="text-sm text-muted-foreground">Semestre 3 bientôt disponible.</p>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Secondary Section (Quick Actions / Revision Tools placeholder) */}
            <section>
                <h2 className="text-lg font-semibold text-foreground mb-4">Outils de Révision</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Placeholder Cards */}
                    <div className="p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary"><BookOpen size={16} /></div>
                        <div>
                            <p className="text-sm font-medium">Annales Corrigées</p>
                            <p className="text-xs text-muted-foreground">Sujets 2023-2024</p>
                        </div>
                    </div>
                    {/* Add more later */}
                </div>
            </section>
        </div>
    );
}
