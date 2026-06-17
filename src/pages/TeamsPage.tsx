import { useState, useMemo } from 'react';
import {
  Users, Trophy, Swords, Medal, Search, ChevronRight,
  UserPlus, TrendingUp, TrendingDown, Minus, X,
  Calendar, Target, CheckCircle, AlertCircle
} from 'lucide-react';
import { TEAMS } from '@/lib/mock-data';
import { cn, formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import type { Team } from '@/types';

function TeamDetailsModal({ team, onClose }: { team: Team; onClose: () => void }) {
  const winRate = team.wins + team.losses > 0
    ? ((team.wins / (team.wins + team.losses)) * 100).toFixed(1)
    : '0.0';

  return (
    <Modal isOpen onClose={onClose} title={team.name} size="lg">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-card border border-border overflow-hidden shrink-0">
            <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-heading font-bold">{team.name}</h3>
              {team.recruiting && <Badge variant="success" size="sm">Recruiting</Badge>}
            </div>
            <p className="text-sm text-muted">[{team.tag}]</p>
          </div>
        </div>

        <p className="text-sm text-gray-300">{team.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card variant="default" padding="sm" className="text-center">
            <Users className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <p className="text-lg font-bold font-heading">{team.members}</p>
            <p className="text-xs text-muted">Members</p>
          </Card>
          <Card variant="default" padding="sm" className="text-center">
            <Trophy className="w-4 h-4 text-gold-400 mx-auto mb-1" />
            <p className="text-lg font-bold font-heading">{team.wins}</p>
            <p className="text-xs text-muted">Wins</p>
          </Card>
          <Card variant="default" padding="sm" className="text-center">
            <Swords className="w-4 h-4 text-red-400 mx-auto mb-1" />
            <p className="text-lg font-bold font-heading">{team.losses}</p>
            <p className="text-xs text-muted">Losses</p>
          </Card>
          <Card variant="default" padding="sm" className="text-center">
            <Medal className="w-4 h-4 text-gold-400 mx-auto mb-1" />
            <p className="text-lg font-bold font-heading">#{team.rank}</p>
            <p className="text-xs text-muted">Rank</p>
          </Card>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted mb-2">Win Rate</h4>
          <div className="w-full bg-surface rounded-full h-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-gold-500 transition-all"
              style={{ width: `${winRate}%` }}
            />
          </div>
          <p className="text-xs text-muted mt-1">{winRate}% win rate ({team.wins}W / {team.losses}L)</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted">
          <Calendar className="w-4 h-4" />
          <span>Created {new Date(team.createdDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted mb-2">Requirements</h4>
          <div className="space-y-1.5">
            {team.requirements.map((req, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="primary" fullWidth>Apply to Join</Button>
          <Button variant="secondary" fullWidth>View on Discord</Button>
        </div>
      </div>
    </Modal>
  );
}

export function TeamsPage() {
  const [search, setSearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const recruitingTeams = useMemo(() => TEAMS.filter(t => t.recruiting), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return TEAMS;
    const q = search.toLowerCase();
    return TEAMS.filter(
      t => t.name.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q) || t.leader.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-green-400 to-gold-400 bg-clip-text text-transparent">
              Teams
            </h1>
            <p className="text-muted mt-1">Browse and join active teams on BhukkadSMP</p>
          </div>
          <Button variant="primary" icon={<UserPlus className="w-4 h-4" />}>Create Team</Button>
        </div>

        <div className="mb-8">
          <Input
            placeholder="Search teams by name, tag, or leader..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((team, i) => {
            const winRate = team.wins + team.losses > 0
              ? Math.round((team.wins / (team.wins + team.losses)) * 100)
              : 0;

            return (
              <Card
                key={team.id}
                variant="default"
                hover
                padding="md"
                className="animate-slide-up cursor-pointer group"
                style={{ animationDelay: `${i * 75}ms` }}
                onClick={() => setSelectedTeam(team)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-card border border-border overflow-hidden shrink-0">
                    <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-heading font-bold text-base truncate">{team.name}</h3>
                      {team.recruiting && <Badge variant="success" size="sm">Recruiting</Badge>}
                    </div>
                    <p className="text-xs text-muted">[{team.tag}]</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-green-400 transition-colors shrink-0 mt-1" />
                </div>

                <p className="text-sm text-gray-400 mt-3 line-clamp-2">{team.description}</p>

                <div className="flex items-center gap-4 mt-4 text-xs text-muted">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{team.members}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-gold-400" />
                    <span>{team.wins}W / {team.losses}L</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Medal className="w-3.5 h-3.5" />
                    <span>#{team.rank}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted mb-1">
                    <span>Win Rate</span>
                    <span>{winRate}%</span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-1.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-gold-500 transition-all"
                      style={{ width: `${winRate}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <Card variant="default" padding="lg" className="text-center">
            <Users className="w-12 h-12 text-muted mx-auto mb-3" />
            <h3 className="text-lg font-heading font-bold mb-1">No teams found</h3>
            <p className="text-sm text-muted">Try a different search term</p>
          </Card>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-heading font-bold mb-2">Recruiting Teams</h2>
          <p className="text-muted mb-6">Teams actively looking for new members</p>
          {recruitingTeams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recruitingTeams.map((team, i) => (
                <Card
                  key={team.id}
                  variant="gradient"
                  hover
                  padding="md"
                  className="animate-slide-up cursor-pointer border-green-500/20"
                  style={{ animationDelay: `${i * 100}ms` }}
                  onClick={() => setSelectedTeam(team)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border overflow-hidden shrink-0">
                      <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-sm truncate">{team.name}</h3>
                        <Badge variant="success" size="sm">Open</Badge>
                      </div>
                      <p className="text-xs text-muted">[{team.tag}]</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{team.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{team.members}</span>
                    <span className="flex items-center gap-1"><Target className="w-3 h-3" />{team.requirements.length} reqs</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {team.requirements.slice(0, 2).map((req, j) => (
                      <Badge key={j} variant="default" size="sm">{req}</Badge>
                    ))}
                    {team.requirements.length > 2 && (
                      <Badge variant="info" size="sm">+{team.requirements.length - 2} more</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="default" padding="md" className="text-center">
              <p className="text-muted">No teams currently recruiting</p>
            </Card>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-heading font-bold mb-2">Team Stats Comparison</h2>
          <p className="text-muted mb-6">See how all teams stack up against each other</p>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Rank</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Team</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Members</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Wins</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Losses</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Points</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {[...TEAMS]
                    .sort((a, b) => a.rank - b.rank)
                    .map((team, i) => {
                      const winRate = team.wins + team.losses > 0
                        ? Math.round((team.wins / (team.wins + team.losses)) * 100)
                        : 0;
                      return (
                        <tr
                          key={team.id}
                          className="border-b border-border/50 hover:bg-white/5 transition-colors animate-slide-up cursor-pointer"
                          style={{ animationDelay: `${i * 50}ms` }}
                          onClick={() => setSelectedTeam(team)}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-muted">#{team.rank}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-card border border-border overflow-hidden shrink-0">
                                <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{team.name}</p>
                                <p className="text-xs text-muted">[{team.tag}]</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-sm">{team.members}</td>
                          <td className="px-4 py-3 text-right text-sm text-green-400">{team.wins}</td>
                          <td className="px-4 py-3 text-right text-sm text-red-400">{team.losses}</td>
                          <td className="px-4 py-3 text-right text-sm text-gold-400 font-medium">{formatNumber(team.points)}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 bg-surface rounded-full h-1.5">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-gold-500"
                                  style={{ width: `${winRate}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{winRate}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {selectedTeam && (
          <TeamDetailsModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
        )}
      </div>
    </div>
  );
}
