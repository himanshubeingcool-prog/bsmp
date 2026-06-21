import { Shield, Mail, Database, Share2, Clock, UserCheck, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const PRIVACY_SECTIONS = [
  {
    id: 'collect',
    label: 'Information We Collect',
    icon: Database,
    items: [
      { title: 'Account Information', description: 'Email address, Minecraft username, Minecraft UUID, and avatar URL when you register or connect via Discord/Google.' },
      { title: 'Payment Data', description: 'We collect transaction IDs and purchase history for store orders. We do not store full payment card details — those are handled by our payment processor.' },
      { title: 'Technical Data', description: 'IP address, browser user agent, and session activity logs for security and moderation purposes.' },
      { title: 'Communications', description: 'Support ticket messages and appeal submissions you send through our platform.' },
    ],
  },
  {
    id: 'usage',
    label: 'How We Use Your Information',
    icon: UserCheck,
    items: [
      { title: 'Account Management', description: 'To create and maintain your account, verify your identity, and provide customer support.' },
      { title: 'Purchases', description: 'To process store transactions, deliver purchased items/ranks in-game, and maintain purchase records.' },
      { title: 'Moderation', description: 'To enforce server rules, investigate reports, and take action against rule violations.' },
      { title: 'Communication', description: 'To respond to support inquiries, appeal submissions, and send account-related notifications.' },
      { title: 'Improvement', description: 'To analyze usage patterns and improve our website, server experience, and services.' },
    ],
  },
  {
    id: 'sharing',
    label: 'Data Sharing',
    icon: Share2,
    items: [
      { title: 'Third-Party Providers', description: 'We share necessary data with Discord (OAuth login data) and Google (OAuth login data) only when you choose to log in through those services.' },
      { title: 'Payment Processors', description: 'Purchase transaction data is shared with our payment gateway to process payments. We never see or store your full payment card numbers.' },
      { title: 'No Data Selling', description: 'We do not sell, rent, or trade your personal information to third parties for marketing purposes.' },
      { title: 'Legal Requirements', description: 'We may disclose information if required by law, court order, or to protect our legal rights.' },
    ],
  },
  {
    id: 'retention',
    label: 'Data Retention',
    icon: Clock,
    items: [
      { title: 'Account Data', description: 'Your account data is retained for as long as your account remains active. You may request deletion at any time.' },
      { title: 'Purchase Records', description: 'Transaction records are retained for financial and legal compliance purposes, typically 6-7 years.' },
      { title: 'Moderation Records', description: 'Punishment and appeal records are retained to maintain server safety and track repeat offenders.' },
      { title: 'Deletion', description: 'Upon account deletion, personal data is removed within 30 days except where legal retention requirements apply.' },
    ],
  },
  {
    id: 'rights',
    label: 'Your Rights',
    icon: Shield,
    items: [
      { title: 'Access', description: 'You have the right to request a copy of the personal data we hold about you.' },
      { title: 'Correction', description: 'You have the right to correct inaccurate or incomplete personal data.' },
      { title: 'Deletion', description: 'You have the right to request deletion of your personal data, subject to legal retention requirements.' },
      { title: 'Objection', description: 'You have the right to object to the processing of your personal data for certain purposes.' },
      { title: 'Data Portability', description: 'You have the right to receive your data in a structured, machine-readable format.' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact Us',
    icon: MessageSquare,
    items: [
      { title: 'Discord', description: 'Join our Discord server and open a support ticket for privacy-related requests.' },
      { title: 'Email', description: 'You can reach us at privacy@bhukkadsmp.fun for data-related inquiries.' },
      { title: 'Response Time', description: 'We aim to respond to all privacy requests within 30 days.' },
    ],
  },
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
            <Shield className="w-4 h-4" />
            Privacy Policy
          </div>
          <h1 className="font-heading text-3xl font-bold text-gradient">Privacy Policy</h1>
          <p className="text-muted max-w-xl mx-auto">
            Last updated: June 2026. This policy explains how BhukkadSMP collects, uses, and protects your personal information.
          </p>
        </div>

        <div className="grid gap-6">
          {PRIVACY_SECTIONS.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} variant="default" className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-semibold">{section.label}</h2>
                    <p className="text-xs text-muted">{section.items.length} items</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-surface/50 hover:bg-surface transition-colors">
                      <Mail className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
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

        <Card variant="highlight" padding="md">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Not affiliated with Mojang Studios</p>
              <p className="text-sm text-muted">BhukkadSMP is a community-run Minecraft server. We are not affiliated with, endorsed by, or associated with Mojang Studios or Microsoft Corporation.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
