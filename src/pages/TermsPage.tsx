import { Link } from 'react-router-dom';
import { FileText, CheckCircle, AlertTriangle, CreditCard, Scale, RefreshCw, MessageSquare, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const TERMS_SECTIONS = [
  {
    id: 'acceptance',
    label: 'Acceptance of Terms',
    icon: FileText,
    items: [
      { title: 'Agreement', description: 'By accessing or using BhukkadSMP\'s website, game server, Discord server, or any related services, you agree to be bound by these Terms of Service.' },
      { title: 'Age Requirement', description: 'You must be at least 13 years old to use our services. If you are between 13 and 18, you must have parental consent.' },
      { title: 'Changes', description: 'We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of the new terms.' },
    ],
  },
  {
    id: 'accounts',
    label: 'Account Registration',
    icon: CheckCircle,
    items: [
      { title: 'Account Creation', description: 'You must provide accurate and complete information when creating an account. You may not create multiple accounts to evade punishments.' },
      { title: 'Account Security', description: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.' },
      { title: 'Account Sharing', description: 'Account sharing is permitted at your own risk. The account owner is responsible for all actions taken on the account.' },
      { title: 'Termination', description: 'We reserve the right to suspend or terminate accounts that violate these terms or server rules, without refund.' },
    ],
  },
  {
    id: 'purchases',
    label: 'Purchases & Refunds',
    icon: CreditCard,
    items: [
      { title: 'All Sales Final', description: 'All purchases made on the BhukkadSMP store are final and non-refundable unless otherwise stated.' },
      { title: 'Chargebacks', description: 'Disputing a legitimate charge (chargeback) will result in immediate account suspension and permanent ban from all services.' },
      { title: 'Delivery', description: 'Purchased items, ranks, keys, and crates are delivered automatically after payment confirmation. If delivery fails, contact support.' },
      { title: 'Pricing', description: 'Prices are subject to change at any time. Price changes do not affect already completed purchases.' },
      { title: 'No Real-World Value', description: 'In-game items, ranks, and currency have no real-world monetary value and cannot be exchanged for real currency.' },
    ],
  },
  {
    id: 'conduct',
    label: 'User Conduct',
    icon: AlertTriangle,
    items: [
      { title: 'Rules Compliance', description: 'You must follow all server rules posted at /rules while using our services.' },
      { title: 'Prohibited Activities', description: 'Exploiting bugs, using cheats/hacks, automated bots, or any unauthorized third-party software is strictly forbidden.' },
      { title: 'Harassment', description: 'Harassment, threats, hate speech, and any form of abuse toward other players or staff will not be tolerated.' },
      { title: 'Intellectual Property', description: 'You may not copy, reproduce, or distribute our website content, branding, or server software without permission.' },
    ],
  },
  {
    id: 'liability',
    label: 'Limitation of Liability',
    icon: Scale,
    items: [
      { title: 'Service Availability', description: 'Our services are provided "as is" without warranty. We do not guarantee uninterrupted or error-free service.' },
      { title: 'Data Loss', description: 'We are not responsible for any data loss, including loss of in-game items, ranks, or progress due to server issues or maintenance.' },
      { title: 'Damages', description: 'We shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.' },
      { title: 'Server Downtime', description: 'We reserve the right to perform maintenance, updates, or shutdowns at any time without prior notice.' },
    ],
  },
  {
    id: 'modifications',
    label: 'Modifications to Terms',
    icon: RefreshCw,
    items: [
      { title: 'Updates', description: 'We may update these terms at any time. Updates will be posted on this page with an updated "Last updated" date.' },
      { title: 'Notification', description: 'Significant changes may be announced via our Discord server or through email notifications.' },
      { title: 'Continued Use', description: 'Your continued use of our services after any changes constitutes acceptance of the modified terms.' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact Information',
    icon: MessageSquare,
    items: [
      { title: 'Discord', description: 'Join our Discord server for support and inquiries regarding these terms.' },
      { title: 'Email', description: 'For legal inquiries, contact us at legal@bhukkadsmp.fun.' },
      { title: 'Response Time', description: 'We aim to respond to all inquiries within 5-7 business days.' },
    ],
  },
];

export function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            <FileText className="w-4 h-4" />
            Terms of Service
          </div>
          <h1 className="font-heading text-3xl font-bold text-gradient">Terms of Service</h1>
          <p className="text-muted max-w-xl mx-auto">
            Last updated: June 2026. Please read these terms carefully before using BhukkadSMP services.
          </p>
        </div>

        <div className="grid gap-6">
          {TERMS_SECTIONS.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} variant="default" className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-semibold">{section.label}</h2>
                    <p className="text-xs text-muted">{section.items.length} items</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-surface/50 hover:bg-surface transition-colors">
                      <CheckCircle className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                        <p className="text-xs text-muted mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <Card variant="highlight" padding="md" className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <Scale className="w-6 h-6 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Have questions about our terms?</p>
              <p className="text-sm text-muted">If you have any questions about these terms, join our Discord or contact us via email.</p>
            </div>
          </div>
          <Link to="/support">
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-stone-950 font-semibold rounded-lg transition-colors text-sm">
              Contact Support
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
