import { useEffect, useState } from 'react';
import { ArrowRight, Clock3, RefreshCw, ServerOff, ShieldCheck } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import './Home.css';
import './BackendError.css';

const HERO_TITLE = 'Maintenance';
const TYPING_SPEED_MS = 62;

export function BackendError() {
    const [typedCount, setTypedCount] = useState(0);

    useEffect(() => {
        setTypedCount(0);
        const timer = window.setInterval(() => {
            setTypedCount((prev) => {
                if (prev >= HERO_TITLE.length) {
                    window.clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, TYPING_SPEED_MS);

        return () => window.clearInterval(timer);
    }, []);

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="home-min-shell min-h-screen antialiased">
            <div className="home-min-top">
                <Header />

                <main className="maintenance-min-main">
                    <section className="maintenance-min-hero" aria-label="Maintenance en cours">
                        <p className="home-min-kicker">Statut du service</p>
                        <h1 className="home-min-title">
                            {HERO_TITLE.slice(0, typedCount).split('').map((char, index) => (
                                <span
                                    key={`${char}-${index}`}
                                    className={`home-min-letter ${index === typedCount - 1 && typedCount < HERO_TITLE.length ? 'is-fresh' : ''}`}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                            <span className="home-min-cursor" aria-hidden="true" />
                        </h1>
                        <p className="home-min-lead">{"Oikonomia est momentan\u00E9ment indisponible pendant une intervention technique."}</p>
                        <p className="home-min-sublead">{"En local, cela signifie g\u00E9n\u00E9ralement que le backend n'est pas lanc\u00E9 sur le port 3001. D\u00E9marrez-le puis actualisez la page."}</p>

                        <div className="maintenance-min-pill" role="status" aria-live="polite">
                            <ServerOff className="h-4 w-4" />
                            <span>Interruption temporaire du backend</span>
                        </div>

                        <div className="home-min-actions maintenance-min-actions">
                            <button type="button" onClick={handleRefresh} className="home-min-cta-primary">
                                Actualiser
                                <RefreshCw className="h-4 w-4" />
                            </button>
                            <a href="/" className="home-min-cta-secondary">
                                Retour \u00E0 l'accueil
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </section>

                    <section className="maintenance-min-grid" aria-label="Informations de maintenance">
                        <article className="maintenance-min-card maintenance-min-card-primary">
                            <div className="maintenance-min-card-head">
                                <div className="maintenance-min-icon-wrap">
                                    <ServerOff className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="maintenance-min-card-kicker">Maintenance en cours</p>
                                    <h2 className="maintenance-min-card-title">{"Le service revient d\u00E8s que l'infrastructure est stable."}</h2>
                                </div>
                            </div>

                            <p className="maintenance-min-card-lead">{"Aucun compte ni aucune progression ne sont r\u00E9initialis\u00E9s. Une fois le backend relanc\u00E9, un simple rafra\u00EEchissement suffit."}</p>

                            <div className="maintenance-min-status-list">
                                <div className="maintenance-min-status-item">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>{"Aucune action n'est requise de votre c\u00F4t\u00E9."}</span>
                                </div>
                                <div className="maintenance-min-status-item">
                                    <Clock3 className="h-4 w-4" />
                                    <span>{"Vous pouvez simplement actualiser dans quelques instants."}</span>
                                </div>
                            </div>
                        </article>

                        <article className="maintenance-min-card">
                            <p className="maintenance-min-card-kicker">Pendant ce temps</p>
                            <h2 className="maintenance-min-card-title">{"Ce qu'il faut retenir"}</h2>

                            <ul className="maintenance-min-note-list">
                                <li>{"La maintenance concerne le service applicatif, pas vos donn\u00E9es."}</li>
                                <li>{"La page publique reste align\u00E9e avec le design actuel du site."}</li>
                                <li>{"D\u00E8s que le backend revient, l'acc\u00E8s aux cours est r\u00E9tabli normalement."}</li>
                            </ul>
                        </article>
                    </section>
                </main>
            </div>

            <Footer className="mt-0 border-t" />
        </div>
    );
}
