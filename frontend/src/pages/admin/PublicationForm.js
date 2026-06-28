import React, { useState } from 'react';
import { createPublication, updatePublication } from '../../api/admin';
import { Modal, Input, Textarea, Select, Button } from './widgets';

const IMPACT_OPTIONS = ['', 'Very High', 'High', 'Medium', 'Low'];

export const PublicationForm = ({ item, onClose, onSaved }) => {
  const [form, setForm] = useState({
    titleEN: item?.title?.EN || '',
    titleJP: item?.title?.JP || '',
    authors: item?.authors || '',
    journal: item?.journal || '',
    volume: item?.volume || '',
    issue: item?.issue || '',
    pages: item?.pages || '',
    year: item?.year != null ? String(item.year) : '',
    doi: item?.doi || '',
    abstractEN: item?.abstract?.EN || '',
    abstractJP: item?.abstract?.JP || '',
    category: item?.category || '',
    type: item?.type || 'Peer-Reviewed',
    citations: item?.citations != null ? String(item.citations) : '0',
    impact: item?.impact || '',
    link: item?.link || '',
    sort_order: item?.sort_order != null ? String(item.sort_order) : '0',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    setError('');
    if (!form.titleEN) {
      setError('English title is required.');
      return;
    }
    setSaving(true);
    const payload = {
      title: { EN: form.titleEN, JP: form.titleJP },
      authors: form.authors,
      journal: form.journal,
      volume: form.volume,
      issue: form.issue,
      pages: form.pages,
      year: form.year ? parseInt(form.year, 10) : null,
      doi: form.doi,
      abstract: { EN: form.abstractEN, JP: form.abstractJP },
      category: form.category,
      type: form.type,
      citations: parseInt(form.citations, 10) || 0,
      impact: form.impact,
      link: form.link,
      sort_order: parseInt(form.sort_order, 10) || 0,
    };
    try {
      if (item?.id) await updatePublication(item.id, payload);
      else await createPublication(payload);
      onSaved();
    } catch (err) {
      setError(err?.response?.data?.detail || 'Save failed.');
      setSaving(false);
    }
  };

  return (
    <Modal
      title={item ? 'Edit publication' : 'Add publication'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
        </>
      }
    >
      {error && <div className="text-sm text-red-400">{error}</div>}
      <Textarea label="Title (English)" rows={2} value={form.titleEN} onChange={set('titleEN')} />
      <Textarea label="Title (Japanese)" rows={2} value={form.titleJP} onChange={set('titleJP')} />
      <Textarea label="Authors" rows={2} value={form.authors} onChange={set('authors')} placeholder="K. Arai, ..." />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Journal" value={form.journal} onChange={set('journal')} />
        <Input label="Year" value={form.year} onChange={set('year')} placeholder="2024" />
        <Input label="Volume" value={form.volume} onChange={set('volume')} />
        <Input label="Issue" value={form.issue} onChange={set('issue')} />
        <Input label="Pages" value={form.pages} onChange={set('pages')} />
        <Input label="DOI" value={form.doi} onChange={set('doi')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Category" value={form.category} onChange={set('category')} placeholder="Quantum Sensing" />
        <Input label="Type" value={form.type} onChange={set('type')} placeholder="Peer-Reviewed" />
        <Input label="Citations" value={form.citations} onChange={set('citations')} />
        <Select label="Impact" value={form.impact} onChange={set('impact')}>
          {IMPACT_OPTIONS.map((o) => (
            <option key={o} value={o}>{o || '—'}</option>
          ))}
        </Select>
      </div>
      <Input label="Link" value={form.link} onChange={set('link')} placeholder="https://doi.org/…" />
      <Textarea label="Abstract (English)" rows={3} value={form.abstractEN} onChange={set('abstractEN')} />
      <Textarea label="Abstract (Japanese)" rows={3} value={form.abstractJP} onChange={set('abstractJP')} />
      <Input label="Display order (lower = first)" value={form.sort_order} onChange={set('sort_order')} />
    </Modal>
  );
};
