import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  me,
  logout,
  changePassword,
  adminListNews,
  deleteNews,
  adminListPublications,
  deletePublication,
  syncPublications,
  adminListTeam,
  deleteMember,
} from '../../api/admin';
import { Button, Modal, Input } from './widgets';
import { NewsForm } from './NewsForm';
import { PublicationForm } from './PublicationForm';
import { TeamMemberForm } from './TeamMemberForm';

const TABS = [
  { id: 'news', label: 'News' },
  { id: 'publications', label: 'Publications' },
  { id: 'team', label: 'Team' },
];

const CATEGORY_LABEL = { pi: 'PI', staff: 'Staff', student: 'Student', alumni: 'Alumni' };

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('news');
  const [username, setUsername] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // { item } or { item: null } for new
  const [showPassword, setShowPassword] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');

  useEffect(() => {
    me().then((d) => setUsername(d.username)).catch(() => {});
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const fetcher =
        tab === 'news' ? adminListNews : tab === 'publications' ? adminListPublications : adminListTeam;
      setRows(await fetcher());
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  const doLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    const deleter =
      tab === 'news' ? deleteNews : tab === 'publications' ? deletePublication : deleteMember;
    await deleter(id);
    load();
  };

  const closeForm = () => setEditing(null);
  const onSaved = () => {
    setEditing(null);
    load();
  };

  const doSync = async () => {
    setSyncing(true);
    setSyncMsg('');
    try {
      const r = await syncPublications();
      setSyncMsg(`OpenAlex: ${r.added} added, ${r.updated} updated (${r.total} total).`);
      load();
    } catch (err) {
      setSyncMsg(err?.response?.data?.detail || 'Sync failed.');
    } finally {
      setSyncing(false);
    }
  };

  const renderForm = () => {
    if (!editing) return null;
    const props = { item: editing.item, onClose: closeForm, onSaved };
    if (tab === 'news') return <NewsForm {...props} />;
    if (tab === 'publications') return <PublicationForm {...props} />;
    return <TeamMemberForm {...props} />;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-xl font-bold">Arai Lab Admin</h1>
          <div className="flex items-center gap-3 text-sm">
            {username && <span className="text-neutral-400">Signed in as {username}</span>}
            <a href="/" target="_blank" rel="noreferrer" className="text-orange-400 hover:text-orange-300">
              View site ↗
            </a>
            <Button variant="ghost" onClick={() => setShowPassword(true)}>Change password</Button>
            <Button variant="secondary" onClick={doLogout}>Log out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-neutral-800">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 -mb-px border-b-2 font-medium transition-colors ${
                tab === t.id
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <p className="text-neutral-400 text-sm">
            {loading ? 'Loading…' : `${rows.length} item(s)`}
            {syncMsg && <span className="ml-3 text-orange-400">{syncMsg}</span>}
          </p>
          <div className="flex items-center gap-2">
            {tab === 'publications' && (
              <Button variant="secondary" onClick={doSync} disabled={syncing}>
                {syncing ? 'Syncing…' : 'Sync from OpenAlex'}
              </Button>
            )}
            <Button onClick={() => setEditing({ item: null })}>
              + Add {tab === 'news' ? 'news' : tab === 'publications' ? 'publication' : 'member'}
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between gap-4 px-4 py-3 border-b border-neutral-800 last:border-0 hover:bg-neutral-900/60"
            >
              <div className="min-w-0">
                {tab === 'news' && (
                  <>
                    <div className="text-xs text-orange-400">{row.date}</div>
                    <div className="truncate text-neutral-200">{row.title?.EN}</div>
                  </>
                )}
                {tab === 'publications' && (
                  <>
                    <div className="truncate text-neutral-200">{row.title?.EN}</div>
                    <div className="text-xs text-neutral-500">
                      {row.journal} {row.year ? `· ${row.year}` : ''} {row.category ? `· ${row.category}` : ''}
                    </div>
                  </>
                )}
                {tab === 'team' && (
                  <>
                    <div className="text-neutral-200">
                      {row.name?.EN}{' '}
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400">
                        {CATEGORY_LABEL[row.category] || row.category}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500 truncate">{row.position?.EN}</div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="secondary" onClick={() => setEditing({ item: row })}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(row.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {!loading && rows.length === 0 && (
            <div className="px-4 py-10 text-center text-neutral-500">No items yet.</div>
          )}
        </div>
      </main>

      {renderForm()}
      {showPassword && <ChangePasswordModal onClose={() => setShowPassword(false)} />}
    </div>
  );
};

const ChangePasswordModal = ({ onClose }) => {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    setMsg('');
    if (next.length < 6) {
      setMsg('New password must be at least 6 characters.');
      return;
    }
    setSaving(true);
    try {
      await changePassword(current, next);
      setMsg('Password updated.');
      setCurrent('');
      setNext('');
    } catch (err) {
      setMsg(err?.response?.data?.detail || 'Could not change password.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Change password"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button onClick={submit} disabled={saving}>{saving ? 'Saving…' : 'Update'}</Button>
        </>
      }
    >
      {msg && <div className="text-sm text-orange-400">{msg}</div>}
      <Input label="Current password" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
      <Input label="New password" type="password" value={next} onChange={(e) => setNext(e.target.value)} />
    </Modal>
  );
};
