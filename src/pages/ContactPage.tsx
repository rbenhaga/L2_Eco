import { motion } from 'framer-motion';
import { Mail, MessageSquare, HelpCircle, Bug, Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackgroundBlobs } from '../components/layout/BackgroundBlobs';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'support',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'support', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen antialiased relative" data-theme="light">
      <BackgroundBlobs />
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <section className="py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
                Contactez-nous
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Une question, un problème ou une suggestion ? Notre équipe est là pour vous aider.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-black/5 p-8"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                  Envoyez-nous un message
                </h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Message envoyé !</h3>
                    <p className="text-slate-600">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900"
                        placeholder="jean@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Sujet</label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900"
                      >
                        <option value="support">Support technique</option>
                        <option value="bug">Signaler un bug</option>
                        <option value="feature">Suggestion</option>
                        <option value="billing">Facturation</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 resize-none"
                        placeholder="Décrivez votre demande..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Envoyer
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Contact Info */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-black/5 p-8"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact rapide</h3>
                  <div className="space-y-4">
                    <a href="mailto:support@revp2.com" className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                      <Mail className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-slate-900">Email</p>
                        <p className="text-sm text-slate-600">support@revp2.com</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <MessageSquare className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-900">Temps de réponse</p>
                        <p className="text-sm text-slate-600">Sous 24-48h ouvrées</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-black/5 p-8"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Nous contacter pour</h3>
                  <div className="space-y-3">
                    {[
                      { icon: HelpCircle, label: 'Support', desc: 'Questions sur votre compte' },
                      { icon: Bug, label: 'Bug', desc: 'Signaler un problème' },
                      { icon: Lightbulb, label: 'Suggestion', desc: 'Proposer une amélioration' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                        <item.icon className="w-5 h-5 text-indigo-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-slate-900">{item.label}</p>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
