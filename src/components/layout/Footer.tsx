import { ArrowRight, Coffee, GraduationCap } from "lucide-react";

const SITE_NAME = "Οἰκονομία";

export function Footer() {
    return (
        <footer className="mt-12 sm:mt-20 bg-white/60 backdrop-blur-sm border-t border-black/5">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Main footer content */}
                <div className="py-10 sm:py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-4">
                        <div className="flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5">
                            <GraduationCap className="h-7 w-7 sm:h-9 sm:w-9 text-indigo-600" />
                            <span className="text-lg sm:text-xl font-semibold text-slate-900">{SITE_NAME}</span>
                        </div>
                        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 max-w-[30ch]">
                            Fiches de synthèse et QCM pour réussir ta licence d'économie à Richter.
                        </p>
                        <a
                            href="/#programme"
                            className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                        >
                            Voir le programme
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    {/* Programme */}
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-5 text-slate-900">Programme</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            <li><span className="text-xs sm:text-sm text-slate-400">L1 · Bientôt</span></li>
                            <li><a href="/#programme" className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors">Licence 2</a></li>
                            <li><span className="text-xs sm:text-sm text-slate-400">L3 · Bientôt</span></li>
                        </ul>
                    </div>

                    {/* Semestre 3 */}
                    <div className="col-span-1 md:col-span-3">
                        <h4 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-5 text-slate-900">Semestre 3</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            <li><a href="/micro" className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors">Microéconomie</a></li>
                            <li><a href="/macro" className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors">Macroéconomie</a></li>
                            <li><a href="/stats" className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors">Statistiques</a></li>
                            <li><a href="/socio" className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors">Sociologie</a></li>
                        </ul>
                    </div>

                    {/* Semestre 4 */}
                    <div className="col-span-1 md:col-span-3">
                        <h4 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-5 text-slate-900">Semestre 4</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            <li><a href="/micro" className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors">Microéconomie</a></li>
                            <li><a href="/macro" className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors">Macroéconomie</a></li>
                            <li><a href="/stats" className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors">Statistiques</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors">Management</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-5 sm:py-6 border-t border-black/5">
                    {/* Legal Links */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
                        <a href="/legal" className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors">
                            Mentions légales
                        </a>
                        <span className="text-slate-300">•</span>
                        <a href="/privacy" className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors">
                            Confidentialité
                        </a>
                        <span className="text-slate-300">•</span>
                        <a href="/terms" className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors">
                            CGU
                        </a>
                        <span className="text-slate-300">•</span>
                        <a href="/contact" className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors">
                            Contact
                        </a>
                        <span className="text-slate-300">•</span>
                        <a href="/faq" className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors">
                            FAQ
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <p className="text-xs sm:text-sm text-slate-500">
                            © 2026 {SITE_NAME}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 inline-flex items-center gap-1.5 sm:gap-2">
                            Fait avec <Coffee className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" /> pour les étudiants de Richter
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
