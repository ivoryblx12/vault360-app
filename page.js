'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Vault() {
  const [uid, setUid] = useState('');
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const id = data.user?.id ?? '';
      setUid(id);
      if (id) loadList(id);
    })();
  }, []);

  async function loadList(userId) {
    const { data, error } = await supabase
      .storage.from('vault-files')
      .list(userId, { limit: 100, sortBy: { column: 'name', order: 'desc' } });
    if (!error) setItems(data ?? []);
  }

  async function upload() {
    if (!file || !uid) return;
    const path = `${uid}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('vault-files').upload(path, file, { upsert: true });
    if (error) setMsg('Upload failed: ' + error.message);
    else { setMsg('Uploaded ✅'); setFile(null); document.getElementById('file').value=''; loadList(uid); }
  }

  function publicUrl(name) {
    const { data } = supabase.storage.from('vault-files').getPublicUrl(`${uid}/${name}`);
    return data.publicUrl;
  }

  return (
    <div>
      <h2>My Vault</h2>
      {!uid && <p><a href="/login">Sign in</a> to upload.</p>}
      <div style={{marginTop:12}}>
        <input id="file" type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        <button onClick={upload} disabled={!file || !uid} style={{marginLeft:8}}>Upload</button>
        <div style={{marginTop:8}}>{msg}</div>
      </div>
      <hr style={{margin:'16px 0'}}/>
      <h3>Your files</h3>
      {items.length === 0 ? <p>No files yet.</p> :
        <ul>
          {items.map(it => (
            <li key={it.name}><a href={publicUrl(it.name)} target="_blank" rel="noreferrer">{it.name}</a></li>
          ))}
        </ul>
      }
    </div>
  );
}
