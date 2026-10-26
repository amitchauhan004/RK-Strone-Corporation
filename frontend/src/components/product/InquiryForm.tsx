import { useState } from 'react';

interface Props {
  productId: string;
  productName: string;
}

import { API_URL } from '@/config/api';

export default function InquiryForm({ productId, productName }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const form = {
        name,
        email,
        phone,
        source: 'Product Catalog Details',
        productName: productName,
        projectType: `Product Inquiry: ${productName}`,
        message: `Inquiry about ${productName} (id: ${productId})\n\n${message}`,
      };

      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setName(''); setEmail(''); setPhone(''); setMessage('');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="text-[11px] font-semibold text-stone-700 block uppercase mb-1">Name *</label>
          <input
            required
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Your full name"
            className="w-full border border-stone-300 rounded-none px-3.5 py-2.5 text-xs bg-stone-50/50 focus:outline-none focus:border-stone-950"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-stone-700 block uppercase mb-1">Email *</label>
          <input
            required
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="yourname@gmail.com"
            className="w-full border border-stone-300 rounded-none px-3.5 py-2.5 text-xs bg-stone-50/50 focus:outline-none focus:border-stone-950"
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="text-[11px] font-semibold text-stone-700 block uppercase mb-1">Phone / WhatsApp Number *</label>
          <input
            required
            type="tel"
            value={phone}
            onChange={e=>setPhone(e.target.value)}
            placeholder="+91 94147 84562"
            className="w-full border border-stone-300 rounded-none px-3.5 py-2.5 text-xs bg-stone-50/50 focus:outline-none focus:border-stone-950"
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="text-[11px] font-semibold text-stone-700 block uppercase mb-1">Your Requirements / Dimensions (Optional)</label>
          <textarea
            rows={3}
            value={message}
            onChange={e=>setMessage(e.target.value)}
            placeholder="Mention your required dimensions, site location, or any specific carvings..."
            className="w-full border border-stone-300 rounded-none px-3.5 py-2.5 text-xs bg-stone-50/50 focus:outline-none focus:border-stone-950"
          />
        </div>
        <div className="col-span-1 sm:col-span-2 pt-1 flex items-center gap-3">
          <button 
            type="submit" 
            className="inline-flex items-center justify-center px-6 py-3 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-none cursor-pointer transition-colors" 
            disabled={status==='sending'}
          >
            {status === 'sending' ? 'Submitting...' : 'Send Inquiry for Best Price'}
          </button>
          {status === 'sent' && <span className="text-xs text-emerald-700 font-semibold">✓ Inquiry sent! Our craftsman will contact you shortly.</span>}
          {status === 'error' && <span className="text-xs text-rose-600 font-semibold">Failed to send. Please call or WhatsApp us directly.</span>}
        </div>
      </form>
    </div>
  );
}
