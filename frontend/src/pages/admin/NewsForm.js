import React, { useState } from 'react';
import { createNews, updateNews } from '../../api/admin';
import { Modal, Input, Textarea, Button } from './widgets';

export const NewsForm = ({ item, onClose, onSaved }) => {
  const [form, setForm] = useState({
    date: item?.date || '',
    titleEN: item?.title?.EN || '',
    titleJP: item?.title?.JP || '',
    link: item?.link || '#',
    tags: (item?.tags || []).join(', '),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    setError('');
    if (!form.date || !form.titleEN) {
      setError('Date and English title are required.');
      return;
    }
    setSaving(true);
    const payload = {
      date: form.date,
      title: { EN: form.titleEN, JP: form.titleJP },
      link: form.link || '#',
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (item?.id) await updateNews(item.id, payload);
      else await createNews(payload);
      onSaved();
    } catch (err) {
      setError(err?.response?.data?.detail || 'Save failed.');
      setSaving(false);
    }
  };

  return (
    <Modal
      title={item ? 'Edit news item' : 'Add news item'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
        </>
      }
    >
      {error && <div className="text-sm text-red-400">{error}</div>}
      <Input label="Date (YYYY-MM-DD)" value={form.date} onChange={set('date')} placeholder="2026-01-31" />
      <Textarea label="Title (English)" rows={2} value={form.titleEN} onChange={set('titleEN')} />
      <Textarea label="Title (Japanese)" rows={2} value={form.titleJP} onChange={set('titleJP')} />
      <Input label="Link" value={form.link} onChange={set('link')} placeholder="https://… or #" />
      <Input label="Tags (comma separated)" value={form.tags} onChange={set('tags')} placeholder="Team, Welcome" />
    </Modal>
  );
};
