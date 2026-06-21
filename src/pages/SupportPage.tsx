import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { FAQ_DATA } from '@/lib/mock-data';
import {
  HelpCircle, MessageSquare, Ticket, Scale, ChevronDown, Send, ExternalLink,
  ChevronRight, Gavel, FileText, AlertTriangle,
} from 'lucide-react';

const TABS = [
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'rules', label: 'Rules', icon: Scale },
] as const;

type TabId = (typeof TABS)[number]['id'];

const CATEGORIES = ['General', 'Chat', 'PvP', 'Griefing', 'Scamming', 'Building'];

const RULES_DATA: Record<string, { description: string }[]> = {
  General: [
    { description: 'Respect all players and staff members at all times.' },
    { description: 'Use common sense — if you think it might be against the rules, it probably is.' },
    { description: 'No exploiting bugs or glitches. Report them immediately.' },
    { description: 'English only in public chat channels.' },
  ],
  Chat: [
    { description: 'No spamming, excessive caps, or repetitive messages.' },
    { description: 'No advertising other servers or services.' },
    { description: 'No hate speech, discrimination, or harassment.' },
    { description: 'Keep chat appropriate — no NSFW content.' },
  ],
  PvP: [
    { description: 'No killing players at spawn or in safe zones.' },
    { description: 'Respect PvP toggles — do not attack players who have it disabled.' },
    { description: 'No combat logging (logging out during PvP).' },
    { description: 'Crystal PvP is allowed in designated areas only.' },
  ],
  Griefing: [
    { description: 'Griefing is strictly prohibited and will result in an immediate ban.' },
    { description: 'Do not destroy, modify, or steal from others\' builds.' },
    { description: 'Use /claim to protect your builds from griefers.' },
    { description: 'Lava casting and water griefing are not allowed.' },
  ],
  Scamming: [
    { description: 'Scamming other players is strictly forbidden.' },
    { description: 'All trades must be fair and transparent.' },
    { description: 'Bait-and-switch trades are considered scamming.' },
    { description: 'Report scam attempts to staff immediately with evidence.' },
  ],
  Building: [
    { description: 'No inappropriate builds (NSFW, offensive, or political).' },
    { description: 'Respect build distance from other players (minimum 50 blocks).' },
    { description: 'No lag machines or redstone contraptions that cause server lag.' },
    { description: 'Skybases must be at least 100 blocks above ground level.' },
  ],
};

export function SupportPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>('faq');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactLoading, setContactLoading] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');

  const TICKET_CHANNEL_URL = 'https://discord.com/channels/1376377359359410337/1455976745592160470';

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      addToast('error', 'Please fill in all fields');
      return;
    }
    setContactLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setContactLoading(false);
    addToast('success', 'Message sent! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleOpenDiscordTicket = () => {
    if (!ticketSubject) {
      addToast('error', 'Please enter a ticket subject');
      return;
    }
    const message = `**Subject:** ${ticketSubject}${ticketDescription ? `\n**Description:** ${ticketDescription}` : ''}`;
    navigator.clipboard.writeText(message);
    window.open(TICKET_CHANNEL_URL, '_blank', 'noopener');
    addToast('success', 'Discord opened! Your message was copied — paste it in the ticket.');
    setTicketSubject('');
    setTicketDescription('');
  };

  const TabIcon = TABS.find(t => t.id === activeTab)!.icon;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-gradient">Support Center</h1>
          <p className="text-muted mt-2">How can we help you today?</p>
        </div>

        <Card variant="glass" padding="none" className="overflow-hidden">
          <div className="flex border-b border-border">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-cyan-400 bg-cyan-500/5 border-b-2 border-cyan-400'
                      : 'text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'faq' && (
              <div className="space-y-2">
                {FAQ_DATA.map(item => (
                  <div key={item.id} className="border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm font-medium">{item.question}</span>
                      <ChevronDown className={`w-4 h-4 text-muted transition-transform ${openFaq === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === item.id && (
                      <div className="px-4 pb-3 text-sm text-muted border-t border-border pt-3">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <form onSubmit={handleContactSubmit} className="space-y-4 max-w-lg mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Name" placeholder="Your name" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} />
                  <Input label="Email" type="email" placeholder="you@example.com" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <Input label="Subject" placeholder="What's this about?" value={contactForm.subject} onChange={e => setContactForm(f => ({ ...f, subject: e.target.value }))} />
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                  <textarea
                    className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 resize-y min-h-[120px]"
                    placeholder="Describe your issue in detail..."
                    value={contactForm.message}
                    onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <Button type="submit" icon={<Send className="w-4 h-4" />} loading={contactLoading}>
                  Send Message
                </Button>
              </form>
            )}

            {activeTab === 'tickets' && (
              <div className="space-y-6 max-w-lg mx-auto">
                <div className="space-y-4">
                  <Input
                    placeholder="Ticket subject (e.g., I need help with...)"
                    value={ticketSubject}
                    onChange={e => setTicketSubject(e.target.value)}
                  />
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Description (optional)</label>
                    <textarea
                      className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 resize-y min-h-[100px]"
                      placeholder="Describe your issue..."
                      value={ticketDescription}
                      onChange={e => setTicketDescription(e.target.value)}
                    />
                  </div>
                  <Button
                    fullWidth
                    icon={<Ticket className="w-4 h-4" />}
                    onClick={handleOpenDiscordTicket}
                  >
                    Open Ticket in Discord
                  </Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-sm font-semibold text-white mb-3">Punishment Appeal</h3>
                  <p className="text-sm text-muted mb-3">
                    If you've been banned or muted and wish to appeal, please use our appeal system.
                  </p>
                  <Link to="/appeal">
                    <Button variant="gold" icon={<ExternalLink className="w-4 h-4" />}>
                      Submit Appeal
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted">Quick summary of our server rules. View the full rules for details.</p>
                  <Link to="/rules">
                    <Button variant="ghost" size="sm" icon={<FileText className="w-4 h-4" />}>
                      Full Rules
                    </Button>
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {CATEGORIES.map(cat => (
                    <Card key={cat} variant="default" padding="sm" className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
                        <Gavel className="w-4 h-4" />
                        {cat}
                      </div>
                      <ul className="space-y-1">
                        {RULES_DATA[cat].slice(0, 2).map((rule, i) => (
                          <li key={i} className="text-xs text-muted flex items-start gap-1.5">
                            <ChevronRight className="w-3 h-3 mt-0.5 shrink-0 text-gold-500" />
                            {rule.description}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>

                <Card variant="highlight" padding="md" className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Need to appeal a punishment?</p>
                    <p className="text-sm text-muted mt-1">Use our appeal system to submit your case for review.</p>
                    <Link to="/appeal">
                      <Button variant="gold" size="sm" className="mt-2" icon={<ExternalLink className="w-4 h-4" />}>
                        Appeal Here
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
