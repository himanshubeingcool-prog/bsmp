import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Gavel, AlertTriangle, Clock, ArrowLeft, Send, CheckCircle } from 'lucide-react';

const PUNISHMENT_TYPES = ['Ban', 'Mute', 'Warn', 'Kick', 'IP Ban', 'Blacklist'];

export function AppealPage() {
  const { addToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    punishmentType: '',
    reason: '',
    evidence: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.punishmentType || !form.reason || !form.email) {
      addToast('error', 'Please fill in all required fields');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setSubmitted(true);
    addToast('success', 'Appeal submitted successfully');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-gradient">Appeal Submitted</h1>
          <p className="text-muted">
            Your appeal has been received and will be reviewed by our staff team. You will be notified via email once a decision has been made.
          </p>
          <Card variant="default" padding="md" className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gold-400">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Processing Time</span>
            </div>
            <p className="text-sm text-muted">
              Appeals are typically reviewed within 24–72 hours. Please do not submit multiple appeals as this may delay the process.
            </p>
          </Card>
          <div className="flex gap-3 justify-center">
            <Link to="/">
              <Button variant="primary">Return Home</Button>
            </Link>
            <Link to="/support">
              <Button variant="ghost">Support Center</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            <Gavel className="w-4 h-4" />
            Punishment Appeal
          </div>
          <h1 className="font-heading text-3xl font-bold text-gradient">Appeal a Punishment</h1>
          <p className="text-muted max-w-lg mx-auto">
            If you believe you were unfairly punished or would like to request a second chance, fill out the form below.
          </p>
        </div>

        <Card variant="default" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Minecraft Username *"
              placeholder="Your in-game username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            />

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Punishment Type *</label>
              <select
                value={form.punishmentType}
                onChange={e => setForm(f => ({ ...f, punishmentType: e.target.value }))}
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
              >
                <option value="" disabled>Select punishment type</option>
                {PUNISHMENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Reason for Appeal *</label>
              <textarea
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 resize-y min-h-[120px]"
                placeholder="Explain why you believe the punishment should be removed or reduced..."
                value={form.reason}
                onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Evidence</label>
              <textarea
                className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 resize-y min-h-[80px]"
                placeholder="Provide any evidence that supports your appeal (screenshots, video links, etc.)"
                value={form.evidence}
                onChange={e => setForm(f => ({ ...f, evidence: e.target.value }))}
              />
            </div>

            <Input
              label="Email Address *"
              type="email"
              placeholder="We'll notify you at this email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />

            <Card variant="glass" padding="sm" className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gold-400">Important Notes</p>
                <ul className="text-xs text-muted mt-1 space-y-1 list-disc list-inside">
                  <li>Filing a false appeal may result in additional penalties.</li>
                  <li>Appeals are reviewed in the order they are received.</li>
                  <li>Do not submit multiple appeals — this will not speed up the process.</li>
                </ul>
              </div>
            </Card>

            <Button type="submit" fullWidth loading={loading} icon={<Send className="w-4 h-4" />}>
              Submit Appeal
            </Button>
          </form>
        </Card>

        <div className="text-center">
          <Link to="/support" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-green-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Support Center
          </Link>
        </div>
      </div>
    </div>
  );
}
