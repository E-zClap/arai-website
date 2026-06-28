import React, { useState } from 'react';
import { createMember, updateMember, uploadTeamImage } from '../../api/admin';
import { Modal, Input, Textarea, Select, Button, Label, linesToArray, arrayToLines } from './widgets';

const CATEGORIES = [
  { value: 'pi', label: 'Principal Investigator' },
  { value: 'staff', label: 'Staff & Postdoc' },
  { value: 'student', label: 'Student' },
  { value: 'alumni', label: 'Alumni' },
];

// Flexible bilingual list sections a member can have.
const DETAIL_GROUPS = [
  { key: 'education', label: 'Education / Academic Background' },
  { key: 'expertise', label: 'Expertise' },
  { key: 'responsibilities', label: 'Responsibilities' },
  { key: 'researchInterests', label: 'Research Interests' },
  { key: 'achievements', label: 'Achievements' },
];

export const TeamMemberForm = ({ item, onClose, onSaved }) => {
  const initDetails = {};
  DETAIL_GROUPS.forEach(({ key }) => {
    initDetails[`${key}EN`] = arrayToLines(item?.[key]?.EN);
    initDetails[`${key}JP`] = arrayToLines(item?.[key]?.JP);
  });

  const [form, setForm] = useState({
    category: item?.category || 'student',
    nameEN: item?.name?.EN || '',
    nameJP: item?.name?.JP || '',
    positionEN: item?.position?.EN || '',
    positionJP: item?.position?.JP || '',
    image: item?.image || '',
    contactEN: item?.contact?.EN || '',
    contactJP: item?.contact?.JP || '',
    website: item?.socialLinks?.website || '',
    googleScholar: item?.socialLinks?.googleScholar || '',
    orcid: item?.socialLinks?.orcid || '',
    periodEN: item?.period?.EN || '',
    periodJP: item?.period?.JP || '',
    sort_order: item?.sort_order != null ? String(item.sort_order) : '0',
    ...initDetails,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onPickImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const { url } = await uploadTeamImage(file);
      setForm((f) => ({ ...f, image: url }));
    } catch (err) {
      setError(err?.response?.data?.detail || 'Image upload failed.');
    } finally {
      setUploading(false);
      e.target.value = ''; // allow re-selecting the same file
    }
  };

  const submit = async () => {
    setError('');
    if (!form.nameEN) {
      setError('English name is required.');
      return;
    }
    setSaving(true);

    const details = {};
    DETAIL_GROUPS.forEach(({ key }) => {
      const EN = linesToArray(form[`${key}EN`]);
      const JP = linesToArray(form[`${key}JP`]);
      if (EN.length || JP.length) details[key] = { EN, JP };
    });

    const hasSocial = form.website || form.googleScholar || form.orcid;
    const hasContact = form.contactEN || form.contactJP;
    const hasPeriod = form.periodEN || form.periodJP;

    const payload = {
      category: form.category,
      name: { EN: form.nameEN, JP: form.nameJP },
      position: { EN: form.positionEN, JP: form.positionJP },
      image: form.image,
      contact: hasContact ? { EN: form.contactEN, JP: form.contactJP } : null,
      socialLinks: hasSocial
        ? {
            website: form.website || null,
            googleScholar: form.googleScholar || null,
            orcid: form.orcid || null,
          }
        : null,
      period: hasPeriod ? { EN: form.periodEN, JP: form.periodJP } : null,
      details,
      sort_order: parseInt(form.sort_order, 10) || 0,
    };

    try {
      if (item?.id) await updateMember(item.id, payload);
      else await createMember(payload);
      onSaved();
    } catch (err) {
      setError(err?.response?.data?.detail || 'Save failed.');
      setSaving(false);
    }
  };

  return (
    <Modal
      title={item ? 'Edit team member' : 'Add team member'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
        </>
      }
    >
      {error && <div className="text-sm text-red-400">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <Select label="Category" value={form.category} onChange={set('category')}>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </Select>
        <Input label="Display order (lower = first)" value={form.sort_order} onChange={set('sort_order')} />
        <Input label="Name (English)" value={form.nameEN} onChange={set('nameEN')} />
        <Input label="Name (Japanese)" value={form.nameJP} onChange={set('nameJP')} />
        <Input label="Position (English)" value={form.positionEN} onChange={set('positionEN')} />
        <Input label="Position (Japanese)" value={form.positionJP} onChange={set('positionJP')} />
      </div>
      <div>
        <Label>Photo</Label>
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0">
            {form.image ? (
              <img
                src={form.image}
                alt="preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <span className="text-neutral-600 text-xs text-center px-2">No image</span>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <label className="inline-block">
              <span className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-medium cursor-pointer inline-block">
                {uploading ? 'Uploading…' : 'Upload photo'}
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={onPickImage}
                disabled={uploading}
              />
            </label>
            <Input
              label="…or image URL / path"
              value={form.image}
              onChange={set('image')}
              placeholder="/team_images/Name.jpg or https://…"
            />
          </div>
        </div>
      </div>

      {form.category === 'alumni' && (
        <div className="grid grid-cols-2 gap-4">
          <Input label="Period (English)" value={form.periodEN} onChange={set('periodEN')} placeholder="Former Member" />
          <Input label="Period (Japanese)" value={form.periodJP} onChange={set('periodJP')} placeholder="元メンバー" />
        </div>
      )}

      <details className="rounded-lg border border-neutral-700 p-4">
        <summary className="cursor-pointer text-neutral-300 font-medium">Contact &amp; links (optional)</summary>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input label="Contact email (EN)" value={form.contactEN} onChange={set('contactEN')} />
          <Input label="Contact email (JP)" value={form.contactJP} onChange={set('contactJP')} />
          <Input label="Website" value={form.website} onChange={set('website')} />
          <Input label="Google Scholar" value={form.googleScholar} onChange={set('googleScholar')} />
          <Input label="ORCID" value={form.orcid} onChange={set('orcid')} />
        </div>
      </details>

      <div className="space-y-4">
        <Label>Detail sections (one item per line)</Label>
        {DETAIL_GROUPS.map(({ key, label }) => (
          <details key={key} className="rounded-lg border border-neutral-700 p-4">
            <summary className="cursor-pointer text-neutral-300 font-medium">
              {label}
              {(form[`${key}EN`] || form[`${key}JP`]) ? ' ●' : ''}
            </summary>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Textarea label="English" rows={4} value={form[`${key}EN`]} onChange={set(`${key}EN`)} />
              <Textarea label="Japanese" rows={4} value={form[`${key}JP`]} onChange={set(`${key}JP`)} />
            </div>
          </details>
        ))}
      </div>
    </Modal>
  );
};
