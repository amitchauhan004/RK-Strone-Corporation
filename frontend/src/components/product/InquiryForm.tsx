import { useState } from 'react';

interface Props {
  productId: string;
  productName: string;
}

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
      const payload = {
        name,
        email,
        phone,
        message: `Inquiry about ${productName} (id: ${productId})\n\n${message}`,
      };

      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <div className="mt-12">
      <h2 className="text-2xl font-heading font-bold mb-4">Ask a Question</h2>
      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          required
          value={name}
          onChange={e=>setName(e.target.value)}
          placeholder="Your name"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          required
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          required
          value={phone}
          onChange={e=>setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <div />
        <textarea
          required
          value={message}
          onChange={e=>setMessage(e.target.value)}
          placeholder="Your question"
          className="w-full border rounded-md px-3 py-2 col-span-1 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <div className="col-span-1 sm:col-span-2">
          <button type="submit" className="inline-flex items-center justify-center px-4 py-2 bg-accent text-white rounded-md" disabled={status==='sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
          </button>
          {status === 'sent' && <span className="ml-3 text-success">Sent — we will contact you soon.</span>}
          {status === 'error' && <span className="ml-3 text-destructive">Failed to send. Try again later.</span>}
        </div>
      </form>
    </div>
  );
}
