import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeEuro,
  Bell,
  BookOpen,
  FileText,
  GraduationCap,
  Home,
  Newspaper,
  LogOut,
  Menu,
  Sparkles,
  User as UserIcon,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "../ThemeToggle";
import { resolveCourseEntryPath } from "../../utils/courseEntryPath";

const SITE_NAME = "Oikonomia";
const TYPE_SPEED_MS = 62;

const dropdownAnimation = {
  initial: { opacity: 0, y: -8, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.96 },
  transition: { duration: 0.15, ease: [0.33, 1, 0.68, 1] as const },
};

export function Header() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, signOut } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const typedName = SITE_NAME.slice(0, typedCount);
  const isInApp = /^\/s[34](?:\/|$)/i.test(location.pathname);
  const showNotifications = false;

  const navLinks = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "Programme", href: "/programme", icon: BookOpen },
    { label: "Oiko News", href: "/oiko-news", icon: Newspaper },
    { label: "Tarifs", href: "/pricing", icon: BadgeEuro },
  ] as const;

  const notifications = [
    { id: 1, subject: "Microéconomie", chapter: "Ch. 3 - Équilibre du consommateur", time: "Il y a 2h", subjectKey: "micro" as const },
    { id: 2, subject: "Macroéconomie", chapter: "Ch. 5 - Modèle IS-LM", time: "Il y a 5h", subjectKey: "macro" as const },
    { id: 3, subject: "Statistiques", chapter: "Ch. 2 - Lois de probabilité", time: "Hier", subjectKey: "stats" as const },
  ];

  const subjectColors: Record<"macro" | "micro" | "stats" | "socio", string> = {
    macro: "var(--color-macro)",
    micro: "var(--color-micro)",
    stats: "var(--color-stats)",
    socio: "var(--color-socio)",
  };

  const isPublicNavActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isNotifOpen || isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isNotifOpen, isUserMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNotifOpen(false);
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    setTypedCount(0);
    const timer = window.setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= SITE_NAME.length) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, TYPE_SPEED_MS);

    return () => window.clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const handleOpenCourses = async () => {
    if (!user?.uid) return;

    const targetPath = await resolveCourseEntryPath(user.uid, apiUrl);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    navigate(targetPath);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b glass-premium"
      style={{
        borderColor: "var(--glass-border)",
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
              style={{ color: "var(--color-accent)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <GraduationCap className="h-7 w-7" />
              <span className="text-base font-semibold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                <span className="relative inline-block align-baseline" style={{ minWidth: `${SITE_NAME.length}ch` }}>
                  <span aria-hidden="true" className="invisible select-none">{SITE_NAME}</span>
                  <span className="absolute left-0 top-0 whitespace-nowrap">
                    {typedName.split("").map((char, index) => (
                      <span
                        key={`${char}-${index}`}
                        style={{
                          color:
                            index === typedCount - 1 && typedCount < SITE_NAME.length
                              ? "var(--color-accent)"
                              : "var(--color-text-primary)",
                        }}
                      >
                        {char}
                      </span>
                    ))}
                    <span aria-hidden="true" style={{ marginLeft: "0.08em", color: "var(--color-accent)" }}>
                      |
                    </span>
                  </span>
                </span>
              </span>
            </button>

            <nav className="hidden sm:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isPublicNavActive(link.href);
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => navigate(link.href)}
                    className="relative text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 inline-flex items-center gap-1.5"
                    style={{
                      color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      background: "transparent",
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="public-nav-underline"
                        className="absolute left-2 right-2 -bottom-0.5 h-0.5 rounded-full"
                        style={{ background: "var(--color-accent)" }}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            {user && (
              <button
                type="button"
                onClick={() => { void handleOpenCourses(); }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150"
                style={{ color: "var(--color-text-secondary)", border: "1px solid var(--color-border-default)" }}
              >
                <BookOpen className="h-4 w-4" />
                Mes cours
              </button>
            )}

            {showNotifications && (
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-2 rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  style={{ color: "var(--color-text-secondary)" }}
                  aria-label="Notifications"
                  aria-expanded={isNotifOpen}
                  aria-haspopup="true"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full" style={{ background: "var(--color-accent)" }} />}
                </button>

                <AnimatePresence>
                  {isNotifOpen && (
                    <motion.div
                      {...dropdownAnimation}
                      className="fixed sm:absolute top-14 sm:top-full inset-x-4 sm:inset-x-auto sm:right-0 mt-2 w-auto sm:w-80 max-w-sm rounded-xl overflow-hidden"
                      style={{
                        background: "var(--color-bg-raised)",
                        boxShadow: "var(--shadow-lg)",
                        border: "1px solid var(--color-border-default)",
                      }}
                      role="menu"
                    >
                      <div className="p-3 border-b" style={{ borderColor: "var(--color-border-default)" }}>
                        <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                          Nouveautés
                        </h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                          <button
                            key={notif.id}
                            type="button"
                            className="w-full text-left p-3 transition-colors duration-150 border-b last:border-0"
                            style={{ borderColor: "var(--color-border-default)" }}
                            onClick={() => setIsNotifOpen(false)}
                            role="menuitem"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center"
                                style={{
                                  backgroundColor: `color-mix(in srgb, ${subjectColors[notif.subjectKey]} 10%, transparent)`,
                                  color: subjectColors[notif.subjectKey],
                                }}
                              >
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium" style={{ color: subjectColors[notif.subjectKey] }}>
                                  {notif.subject}
                                </p>
                                <p className="text-sm font-medium mt-0.5" style={{ color: "var(--color-text-primary)" }}>
                                  {notif.chapter}
                                </p>
                                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                                  {notif.time}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {loading ? (
              <div className="h-8 w-8 rounded-full animate-pulse" style={{ background: "var(--color-bg-overlay)" }} />
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label="Menu utilisateur"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 rounded-full border-2"
                      style={{ borderColor: "color-mix(in srgb, var(--color-accent) 20%, transparent)" }}
                    />
                  ) : (
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center border-2"
                      style={{
                        background: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                        borderColor: "color-mix(in srgb, var(--color-accent) 20%, transparent)",
                      }}
                    >
                      <UserIcon className="h-4 w-4" style={{ color: "var(--color-accent)" }} />
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      {...dropdownAnimation}
                      className="absolute top-full right-0 mt-2 w-56 rounded-xl overflow-hidden"
                      style={{
                        background: "var(--color-bg-raised)",
                        boxShadow: "var(--shadow-lg)",
                        border: "1px solid var(--color-border-default)",
                      }}
                      role="menu"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigate(user.subscriptionTier === "premium" ? "/subscription" : "/pricing");
                        }}
                        className="w-full p-3 border-b transition-colors duration-150 text-left"
                        style={{ borderColor: "var(--color-border-default)" }}
                        role="menuitem"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate" style={{ color: "var(--color-text-primary)" }}>
                              {user.displayName}
                            </p>
                            <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
                              {user.email}
                            </p>
                          </div>
                          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "var(--color-bg-overlay)", color: "var(--color-text-secondary)" }}>
                            {user.subscriptionTier === "premium" ? "PREMIUM" : "FREE"}
                          </span>
                        </div>
                      </button>

                      <div className="p-2 space-y-1">
                        {user.subscriptionTier !== "premium" && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              navigate("/pricing");
                            }}
                            className="w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-2"
                            style={{ background: "linear-gradient(to right, var(--color-accent), var(--color-micro))", color: "var(--color-accent-foreground)" }}
                            role="menuitem"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            Passer à Premium
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150"
                          style={{ color: "var(--color-text-secondary)" }}
                          role="menuitem"
                        >
                          <LogOut className="h-4 w-4" />
                          Déconnexion
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-lg active:scale-[0.98] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ background: "var(--color-accent)", color: "var(--color-accent-foreground)", boxShadow: "var(--shadow-sm)" }}
                >
                  Connexion
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="sm:hidden p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                  style={{ color: "var(--color-text-secondary)" }}
                  aria-label="Connexion"
                >
                  <UserIcon className="h-5 w-5" />
                </button>
              </>
            )}

            {!isInApp && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="sm:hidden overflow-hidden border-t"
            style={{ borderColor: "var(--color-border-default)", background: "var(--color-bg-raised)" }}
          >
            <nav className="px-4 py-3 space-y-1 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isPublicNavActive(link.href);
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => {
                      navigate(link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium px-3 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2 w-full"
                    style={{
                      color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      background: "transparent",
                      textDecorationLine: active ? "underline" : "none",
                      textDecorationColor: "var(--color-accent)",
                      textDecorationThickness: "2px",
                      textUnderlineOffset: "0.3em",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}













