import { useEffect, useState } from 'react';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  ownerId?: string;
}

interface Props {
  productId: string;
}

export default function Reviews({ productId }: Props) {
  const storageKey = `reviews_${productId}`;
  const clientKey = 'rk_client_id';
  const getClientId = () => {
    try {
      let id = localStorage.getItem(clientKey);
      if (!id) {
        if (typeof crypto !== 'undefined' && (crypto as any).randomUUID) {
          id = (crypto as any).randomUUID();
        } else {
          id = Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
        }
        localStorage.setItem(clientKey, id);
      }
      return id;
    } catch (e) {
      return 'unknown';
    }
  };
  const clientId = getClientId();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:5000';
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products/${productId}/reviews`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Review[] = await res.json();
        if (!cancelled) setReviews(data);
      } catch (err) {
        console.error('Could not load reviews from server, falling back to localStorage', err);
        try {
          const raw = localStorage.getItem(storageKey);
          if (raw && !cancelled) setReviews(JSON.parse(raw));
        } catch (e) {
          console.error('Could not load reviews from localStorage', e);
        }
      }
    };
    load();
    return () => { cancelled = true; };
  }, [storageKey, productId]);

  const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:5000';

  // Keep a lightweight local cache so UI updates instantly when offline
  const saveLocalCache = (next: Review[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (e) { /* ignore */ }
    setReviews(next);
  };

  const addOrUpdateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !rating) return;

    if (editingId) {
      // update on server
      try {
        const res = await fetch(`${API_BASE}/api/reviews/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name || 'Anonymous', rating, text, ownerId: clientId }),
        });
        if (!res.ok) throw new Error('Failed to update');
        const updated: Review = await res.json();
        const next = reviews.map(r => r.id === editingId ? updated : r);
        saveLocalCache(next);
        setEditingId(null);
      } catch (err) {
        console.error('Update failed, updating locally', err);
        const next = reviews.map(r => r.id === editingId ? ({ ...r, name: name || 'Anonymous', rating, text, date: new Date().toISOString(), ownerId: r.ownerId }) : r);
        saveLocalCache(next);
        setEditingId(null);
      }
    } else {
      // create on server
      try {
        const res = await fetch(`${API_BASE}/api/products/${productId}/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name || 'Anonymous', rating, text, ownerId: clientId }),
        });
        if (!res.ok) throw new Error('Failed to create');
        const created: Review = await res.json();
        const next = [created, ...reviews];
        saveLocalCache(next);
      } catch (err) {
        console.error('Create failed, saving locally', err);
        const r: Review = {
          id: Date.now().toString(),
          name: name || 'Anonymous',
          rating,
          text,
          date: new Date().toISOString(),
          ownerId: clientId,
        };
        saveLocalCache([r, ...reviews]);
      }
    }

    setName('');
    setText('');
    setRating(5);
  };

  const startEdit = (r: Review) => {
    // only owner may edit (if ownerId exists)
    if (r.ownerId && r.ownerId !== clientId) return;
    setEditingId(r.id);
    setName(r.name);
    setRating(r.rating);
    setText(r.text);
    // scroll to form optional
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setRating(5);
    setText('');
  };

  const deleteReview = async (id: string) => {
    const target = reviews.find(r => r.id === id);
    if (!target) return;
    if (target.ownerId && target.ownerId !== clientId) return;
    if (!window.confirm('Delete this review?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId: clientId }),
      });
      if (!res.ok) throw new Error('Delete failed');
      const next = reviews.filter(r => r.id !== id);
      saveLocalCache(next);
    } catch (err) {
      console.error('Delete failed, removing locally', err);
      const next = reviews.filter(r => r.id !== id);
      saveLocalCache(next);
    }
  };

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-12">
        <h2 className="text-2xl font-heading font-bold mb-4">Ratings & Reviews</h2>
        <div className="mb-4">
          <div className="text-4xl font-bold text-accent">{avg ? avg.toFixed(1) : '—'}</div>
          <div className="text-sm text-muted-foreground">based on {reviews.length} review(s)</div>
        </div>

        <form onSubmit={addOrUpdateReview} className="space-y-3 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <select
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
            >
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} star{r>1?'s':''}</option>)}
            </select>
          </div>

          <textarea
            className="w-full border rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Write your review"
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <div className="flex gap-3">
            <button className="flex-1 px-3 py-2 bg-accent text-white rounded-md hover:opacity-95 text-base font-medium" type="submit">{editingId ? 'Update Review' : 'Add Review'}</button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="px-3 py-2 border rounded-md">Cancel</button>
            )}
          </div>
        </form>

        <div>
          {reviews.length === 0 && <div className="text-muted-foreground">No reviews yet. Be the first!</div>}

          {reviews.length > 0 && (
            <div>
              <div className={`space-y-4 p-2 ${expanded ? '' : 'max-h-96 overflow-y-auto'} border rounded-md bg-white`}> 
                {reviews.map(r => (
                  <div key={r.id} className="p-4 border rounded-md bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-sm text-muted-foreground">{new Date(r.date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-accent">{'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}</div>
                        {r.ownerId === clientId && (
                          <>
                            <button onClick={() => startEdit(r)} className="px-2 py-1 border rounded-md text-sm">Edit</button>
                            <button onClick={() => deleteReview(r.id)} className="px-2 py-1 border rounded-md text-sm text-destructive">Delete</button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-foreground">{r.text}</div>
                  </div>
                ))}
              </div>

              {reviews.length > 6 && (
                <div className="mt-3 text-center">
                  <button onClick={() => setExpanded(e => !e)} className="px-4 py-2 border rounded-md">
                    {expanded ? 'Show less' : 'Show more'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
}
