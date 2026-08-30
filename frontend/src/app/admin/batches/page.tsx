'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockBatches, Batch } from '@/lib/mockData';
import { 
  Layers, 
  Download,
  PlusCircle,
  Receipt
} from 'lucide-react';

export default function AdminBatchesPage() {
  const { t, lang } = useLanguage();
  const [batchesList] = useState<Batch[]>(mockBatches);
  const [selectedBatchForInvoice, setSelectedBatchForInvoice] = useState<Batch>(mockBatches[0]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  return (
    <div className="admin-batches-page-wrapper">
      <div className="page-header-clean glass-card">
        <div className="header-icon-box">
          <Layers size={28} className="text-emerald-400" aria-hidden="true" />
        </div>
        <div>
          <h2>{t('admin.batches_title')}</h2>
          <p className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Course fee tier configuration, 2 free trial allocations & 18% educational GST invoicing under SAC 999293'
              : 'बॅच शुल्क संरचना, २ मोफत डेमो वाटप व SAC ९९९२९३ अंतर्गत १८% शैक्षणिक GST इनव्हॉइस निर्मिती'}
          </p>
        </div>
      </div>

      {/* Batches Table & Pricing Editor */}
      <div className="batches-table-card glass-card">
        <div className="card-header-clean">
          <h4>
            {lang === 'en' ? `Active Academic Batches (${batchesList.length})` : `सक्रिय शैक्षणिक बॅचेस (${batchesList.length})`}
          </h4>
          <button type="button" className="btn btn-primary btn-sm">
            <PlusCircle size={14} aria-hidden="true" />
            <span>{lang === 'en' ? 'Create New Batch' : 'नवीन बॅच तयार करा'}</span>
          </button>
        </div>

        <div className="batches-table-wrapper">
          <table className="custom-table" aria-label={lang === 'en' ? 'Active Academic Batches pricing table' : 'सक्रिय शैक्षणिक बॅचेस किंमत सारणी'}>
            <caption className="sr-only">{lang === 'en' ? 'Active Academic Batches with pricing and GST invoice actions' : 'सक्रिय शैक्षणिक बॅचेस किंमत व GST पावती सारणी'}</caption>
            <thead>
              <tr>
                <th scope="col">{lang === 'en' ? 'Batch Title' : 'बॅच नाव (Batch Title)'}</th>
                <th scope="col">{lang === 'en' ? 'Standard' : 'इयत्ता (Standard)'}</th>
                <th scope="col">{lang === 'en' ? 'Fee (INR)' : 'किंमत (Fee INR)'}</th>
                <th scope="col">{lang === 'en' ? 'Enrolled Students' : 'नोंदणीकृत विद्यार्थी'}</th>
                <th scope="col">{lang === 'en' ? 'Trial Demos' : 'मोफत डेमो'}</th>
                <th scope="col">{lang === 'en' ? 'GST Invoice' : 'GST इनव्हॉइस'}</th>
              </tr>
            </thead>
            <tbody>
              {batchesList.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div className="font-bold text-sm text-slate-100">
                      {lang === 'en' ? b.titleEn : b.titleMr}
                    </div>
                    <div className="text-xs text-slate-400">{b.targetExam}</div>
                  </td>
                  <td>
                    <span className="badge badge-primary">{b.standard}</span>
                  </td>
                  <td>
                    <div className="font-bold text-sm text-emerald-400" style={{ fontVariantNumeric: 'tabular-nums' }}>₹{b.price.toLocaleString(lang === 'en' ? 'en-IN' : 'mr-IN')}</div>
                    <div className="text-xs text-slate-500 line-through" style={{ fontVariantNumeric: 'tabular-nums' }}>₹{b.originalPrice.toLocaleString(lang === 'en' ? 'en-IN' : 'mr-IN')}</div>
                  </td>
                  <td>
                    <div className="font-bold text-sm text-slate-100" style={{ fontVariantNumeric: 'tabular-nums' }}>{b.studentsCount.toLocaleString(lang === 'en' ? 'en-IN' : 'mr-IN')}</div>
                  </td>
                  <td>
                    <span className="badge badge-saffron">
                      {lang === 'en' ? '2 Free Demos' : '२ मोफत डेमो सक्रिय'}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBatchForInvoice(b);
                        setShowInvoiceModal(true);
                      }}
                      className="btn btn-secondary btn-sm"
                    >
                      <Receipt size={13} aria-hidden="true" />
                      <span>{lang === 'en' ? 'GST Invoice' : 'GST पावती'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GST Tax Invoice Modal */}
      {showInvoiceModal && (
        <div className="modal-backdrop">
          <div className="invoice-modal glass-card">
            <div className="invoice-paper">
              <div className="invoice-head">
                <div>
                  <h3 className="text-lg font-bold text-blue-900">
                    {lang === 'en' ? 'MahaShiksha Digital EdTech Pvt. Ltd.' : 'महा-शिक्षा डिजिटल कोचिंग प्रा. लि.'}
                  </h3>
                  <p className="text-xs text-slate-600"><span translate="no">GSTIN: 27AABCM9942P1Z4</span> • SAC: 999293 (Educational Coaching Services)</p>
                  <p className="text-xs text-slate-600">Pune, Maharashtra - 411038</p>
                </div>
                <div className="text-right">
                  <span className="badge badge-success">
                    {lang === 'en' ? 'TAX INVOICE' : 'कर बीजक (TAX INVOICE)'}
                  </span>
                  <div className="text-xs font-bold mt-1 text-slate-800" translate="no">#MS-INV-2026-8942</div>
                  <div className="text-xs text-slate-500" translate="no">
                    {lang === 'en' ? `Date: ${new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(2026, 7, 30))}` : `दिनांक: ${new Intl.DateTimeFormat('mr-IN', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(2026, 7, 30))}`}
                  </div>
                </div>
              </div>

              <hr className="my-3 border-slate-300" />

              <div className="invoice-student-details text-xs text-slate-800 mb-3">
                <div><strong>{lang === 'en' ? 'Student Name:' : 'विद्यार्थ्याचे नाव:'}</strong> Rohan Desai (MS-STU-2026-9042)</div>
                <div><strong>{lang === 'en' ? 'Address / Region:' : 'पत्ता:'}</strong> Ratnagiri, Konkan Division, Maharashtra</div>
                <div><strong>{lang === 'en' ? 'Payment Method:' : 'पेमेंट पद्धत:'}</strong> Razorpay UPI (Ref: pay_N9923841)</div>
              </div>

              <table className="invoice-items-table text-xs text-slate-800 w-full mb-3" aria-label="Invoice line items">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th scope="col" className="p-2">{lang === 'en' ? 'Description' : 'तपशील (Description)'}</th>
                    <th scope="col" className="p-2">SAC</th>
                    <th scope="col" className="p-2 text-right">{lang === 'en' ? 'Amount (INR)' : 'रक्कम (INR)'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">{lang === 'en' ? selectedBatchForInvoice.titleEn : selectedBatchForInvoice.titleMr}</td>
                    <td className="p-2">999293</td>
                    <td className="p-2 text-right">₹{Math.round(selectedBatchForInvoice.price / 1.18)}</td>
                  </tr>
                  <tr>
                    <td className="p-2">CGST (9%)</td>
                    <td className="p-2">-</td>
                    <td className="p-2 text-right">₹{Math.round((selectedBatchForInvoice.price * 0.09) / 1.18)}</td>
                  </tr>
                  <tr>
                    <td className="p-2">SGST (9%) - Maharashtra</td>
                    <td className="p-2">-</td>
                    <td className="p-2 text-right">₹{Math.round((selectedBatchForInvoice.price * 0.09) / 1.18)}</td>
                  </tr>
                  <tr className="font-bold border-t border-slate-300">
                    <td className="p-2" colSpan={2}>{lang === 'en' ? 'Total Paid Amount:' : 'एकूण भरलेले शुल्क (Total Paid):'}</td>
                    <td className="p-2 text-right text-blue-900 text-sm">₹{selectedBatchForInvoice.price}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center text-xs text-slate-500 mt-4">
                {lang === 'en' ? 'This is a computer generated tax invoice. No signature required.' : 'हे संगणकीय कर बीजक आहे. स्वाक्षरीची आवश्यकता नाही.'}
              </div>
            </div>

            <div className="modal-actions mt-4 flex gap-3">
              <button type="button" onClick={() => setShowInvoiceModal(false)} className="btn btn-secondary flex-1">
                {lang === 'en' ? 'Close' : 'बंद करा (Close)'}
              </button>
              <button type="button" onClick={() => alert(lang === 'en' ? 'GST Invoice PDF downloaded!' : 'GST इनव्हॉइस PDF डाउनलोड सुरू झाली!')} className="btn btn-primary flex-1">
                <Download size={14} aria-hidden="true" />
                <span>{lang === 'en' ? 'Download PDF' : 'PDF डाउनलोड करा'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-batches-page-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .page-header-clean {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border-left: 4px solid var(--brand-emerald);
        }
        .header-icon-box {
          padding: 12px;
          background: rgba(16, 185, 129, 0.18);
          border-radius: var(--radius-md);
        }
        .page-header-clean h2 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .batches-table-card {
          padding: 24px;
        }
        .card-header-clean {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .card-header-clean h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
        }
        .batches-table-wrapper {
          overflow-x: auto;
        }
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .custom-table th {
          text-align: left;
          padding: 12px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-subtle);
        }
        .custom-table td {
          padding: 14px 12px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
        }
        .invoice-modal {
          max-width: 580px;
          width: 100%;
          padding: 24px;
          background: var(--bg-surface-1);
        }
        .invoice-paper {
          background: #ffffff;
          color: #0f172a;
          padding: 24px;
          border-radius: var(--radius-md);
        }
        .invoice-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
      `}</style>
    </div>
  );
}
