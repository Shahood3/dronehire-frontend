import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import jobsService from '../../services/jobsService';

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} />
  </svg>
);

const ICONS = {
  location: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
  service:  'M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 0',
  schedule: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  attach:   'M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13',
  check:    'M5 13l4 4L19 7',
  shield:   'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  question: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  plus:     'M12 4v16m8-8H4',
  minus:    'M20 12H4',
  close:    'M6 18L18 6M6 6l12 12',
  chevron:  'M9 5l7 7-7 7',
  gps:      'M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06z',
  upload:   'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
  arrow:    'M10 19l-7-7m0 0l7-7m-7 7h18',
};

const STEPS = [
  { id: 'location',    label: 'Location',     icon: ICONS.location },
  { id: 'service',     label: 'Service',      icon: ICONS.service  },
  { id: 'schedule',    label: 'Scheduling',   icon: ICONS.schedule },
  { id: 'attachments', label: 'Attachments',  icon: ICONS.attach   },
];

const CATEGORIES = [
  'Real Estate Photography', 'Wedding & Events',
  'Construction & Infrastructure', 'Agriculture & Land Survey',
  'Film & Video Production', 'Inspection Services',
  'Mapping & 3D Modeling', 'Search & Rescue',
  'Environmental Monitoring', 'Sports & Action', 'Other',
];

const BUDGET_TYPES = ['Fixed Price', 'Per Hour', 'Per Day', 'Negotiable'];

const FAQ_ITEMS = [
  { q: 'How expensive is drone footage?', a: 'Pricing varies by project complexity, location, and pilot experience. Most jobs range from ₹5,000 to ₹50,000.' },
  { q: 'What info should I provide?',     a: 'Include project details, location, preferred dates, and any specific requirements or equipment needed.' },
  { q: 'How soon will I receive bids?',   a: 'Most jobs receive their first bids within a few hours of posting.' },
  { q: 'When do I pay the pilot?',        a: 'Payment is held securely and released only after your job is completed.' },
  { q: 'Can I pay in-person?',            a: 'All payments are processed through our secure platform for your protection.' },
];

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, required, hint, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}
  </div>
);

const inputCls = 'w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all';

// ─── Step placeholder banner ──────────────────────────────────────────────────
const StepPlaceholder = ({ step }) => {
  const messages = [
    null, // step 0 has real content
    null, // step 1 has real content
    null, // step 2 has real content
    null, // step 3 has real content
  ];
  return messages[step] ? (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon d={STEPS[step].icon} className="w-7 h-7 text-gray-400" />
      </div>
      <p className="text-gray-500 text-sm">{messages[step]}</p>
    </div>
  ) : null;
};

// ─── Step 0: Location ─────────────────────────────────────────────────────────
const StepLocation = ({ data, onChange }) => {
  const [useCoords, setUseCoords] = useState(false);
  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Location</h2>
        <p className="text-sm text-gray-500 mt-0.5">Where will the drone job take place?</p>
      </div>

      <Field label="Job Location" required hint="💡 Include landmarks to help pilots reach you easily">
        <textarea
          name="location"
          value={data.location}
          onChange={onChange}
          rows={3}
          placeholder="Building/Plot Name, Street, Area, City, State, PIN Code"
          className={inputCls + ' resize-none'}
          required
        />
      </Field>

      <button
        type="button"
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              onChange({ target: { name: 'coordinates', value: `${pos.coords.latitude}, ${pos.coords.longitude}` } });
            });
          }
        }}
        className="flex items-center gap-2 px-4 py-2 border border-teal-400 text-teal-600 rounded-lg text-sm hover:bg-teal-50 transition-colors"
      >
        <Icon d={ICONS.gps} className="w-4 h-4" /> Use Current Location
      </button>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setUseCoords(v => !v)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          <Icon d={ICONS.gps} className="w-4 h-4" /> Use Coordinates
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          <Icon d={ICONS.plus} className="w-4 h-4" /> Add Location
        </button>
      </div>

      {useCoords && (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Latitude">
            <input type="text" placeholder="e.g. 19.0760" className={inputCls} />
          </Field>
          <Field label="Longitude">
            <input type="text" placeholder="e.g. 72.8777" className={inputCls} />
          </Field>
        </div>
      )}
    </div>
  );
};

// ─── Step 1: Service ──────────────────────────────────────────────────────────
const StepService = ({ data, onChange }) => (
  <div className="space-y-6">
    <div className="pb-2 border-b border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800">Service Details</h2>
      <p className="text-sm text-gray-500 mt-0.5">Tell us what kind of drone service you need</p>
    </div>

    <Field label="Job Title" required>
      <input
        type="text"
        name="title"
        value={data.title}
        onChange={onChange}
        placeholder="e.g., Real Estate Aerial Photography for Luxury Home"
        className={inputCls}
        required
      />
    </Field>

    <Field label="Category" required>
      <select name="category" value={data.category} onChange={onChange} className={inputCls} required>
        <option value="">Select a category</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </Field>

    <Field label="Project Description" required>
      <textarea
        name="description"
        value={data.description}
        onChange={onChange}
        rows={5}
        placeholder="Describe your project in detail. Include what you need captured, any specific shots or angles, and the purpose..."
        className={inputCls + ' resize-none'}
        required
      />
    </Field>

    <div className="grid grid-cols-2 gap-4">
      <Field label="Budget (₹)" required>
        <input
          type="number"
          name="budget"
          value={data.budget}
          onChange={onChange}
          placeholder="e.g. 15000"
          className={inputCls}
          min={0}
        />
      </Field>
      <Field label="Budget Type">
        <select name="budgetType" value={data.budgetType} onChange={onChange} className={inputCls}>
          {BUDGET_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </Field>
    </div>

    <Field label="Special Requirements" hint="Licenses needed, equipment type, altitude restrictions, etc.">
      <textarea
        name="requirements"
        value={data.requirements}
        onChange={onChange}
        rows={3}
        placeholder="Any specific licenses, drone type, or other requirements..."
        className={inputCls + ' resize-none'}
      />
    </Field>
  </div>
);

// ─── Step 2: Schedule ─────────────────────────────────────────────────────────
const StepSchedule = ({ data, onChange }) => (
  <div className="space-y-6">
    <div className="pb-2 border-b border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800">Scheduling</h2>
      <p className="text-sm text-gray-500 mt-0.5">When would you like the job to be done?</p>
    </div>

    <Field label="Start Date" required>
      <input
        type="date"
        name="startDate"
        value={data.startDate}
        onChange={onChange}
        min={new Date().toISOString().split('T')[0]}
        className={inputCls}
        required
      />
    </Field>

    <Field label="Application Deadline" hint="Leave blank to accept applications until the start date">
      <input
        type="date"
        name="deadline"
        value={data.deadline}
        onChange={onChange}
        min={new Date().toISOString().split('T')[0]}
        max={data.startDate || undefined}
        className={inputCls}
      />
    </Field>

    <Field label="Preferred Time of Day">
      <select name="timePreference" value={data.timePreference || ''} onChange={onChange} className={inputCls}>
        <option value="">No preference</option>
        <option value="morning">Morning (6am – 12pm)</option>
        <option value="afternoon">Afternoon (12pm – 5pm)</option>
        <option value="evening">Evening (5pm – 8pm)</option>
        <option value="flexible">Flexible</option>
      </select>
    </Field>

    <Field label="Estimated Duration">
      <select name="duration" value={data.duration || ''} onChange={onChange} className={inputCls}>
        <option value="">Select duration</option>
        <option value="less_1h">Less than 1 hour</option>
        <option value="1_3h">1 – 3 hours</option>
        <option value="half_day">Half day (4 hrs)</option>
        <option value="full_day">Full day (8 hrs)</option>
        <option value="multi_day">Multiple days</option>
      </select>
    </Field>
  </div>
);

// ─── Step 3: Attachments ──────────────────────────────────────────────────────
const StepAttachments = ({ data, onChange }) => {
  const [files, setFiles] = useState([]);

  const handleFile = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Attachments</h2>
        <p className="text-sm text-gray-500 mt-0.5">Add reference images, maps, or documents (optional)</p>
      </div>

      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-colors">
        <Icon d={ICONS.upload} className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 font-medium">Click to upload or drag & drop</p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
        <input type="file" multiple accept="image/*,.pdf" onChange={handleFile} className="hidden" />
      </label>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 min-w-0">
                <Icon d={ICONS.attach} className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">{f.name}</span>
                <span className="text-xs text-gray-400 flex-shrink-0">({(f.size / 1024).toFixed(0)} KB)</span>
              </div>
              <button type="button" onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500 transition-colors ml-2">
                <Icon d={ICONS.close} className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Field label="Additional Notes" hint="Any other context for the pilot">
        <textarea
          name="notes"
          value={data.notes || ''}
          onChange={onChange}
          rows={3}
          placeholder="Anything else the pilot should know before bidding..."
          className={inputCls + ' resize-none'}
        />
      </Field>
    </div>
  );
};

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
const FaqAccordion = () => {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <Icon d={open === i ? ICONS.minus : ICONS.plus} className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
          </button>
          {open === i && (
            <div className="px-4 pb-3 text-sm text-gray-500 border-t border-gray-100 bg-gray-50">
              <p className="pt-2">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Main Page Component ──────────────────────────────────────────────────────
const PostJobForm = ({ onJobPosted }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', location: '',
    startDate: '', deadline: '', requirements: '',
    budget: '', budgetType: 'Fixed Price', notes: '',
    timePreference: '', duration: '', coordinates: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => navigate('/client/dashboard');

  const canGoNext = () => {
    if (step === 0) return formData.location.trim().length > 0;
    if (step === 1) return formData.title && formData.category && formData.description;
    if (step === 2) return formData.startDate;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < STEPS.length - 1) { setStep(s => s + 1); return; }
    setIsSubmitting(true);
    setError('');
    try {
      const response = await jobsService.createJob(formData);
      onJobPosted && onJobPosted(response.job);
      navigate('/client/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastStep = step === STEPS.length - 1;

  return (
    /* pt-16 accounts for the fixed navbar height */
    <div className="min-h-screen bg-gray-50 pt-16">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icon d={ICONS.arrow} className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-base font-semibold text-gray-800">Post a New Job</h1>
              <p className="text-xs text-gray-400">Step {step + 1} of {STEPS.length} — {STEPS[step].label}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-200 hover:bg-red-50 px-4 py-1.5 rounded-lg transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">

        {/* Left: Form */}
        <div className="flex-1 min-w-0">

          {/* Step tabs */}
          <div className="bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden shadow-sm">
            <div className="flex">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all border-b-2
                    ${i === step
                      ? 'border-teal-500 text-teal-600 bg-teal-50/50'
                      : i < step
                        ? 'border-transparent text-green-600 hover:bg-gray-50 cursor-pointer'
                        : 'border-transparent text-gray-400 cursor-default'
                    }`}
                >
                  {i < step
                    ? <Icon d={ICONS.check} className="w-4 h-4 text-green-500" />
                    : <Icon d={s.icon} className="w-4 h-4" />
                  }
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form card */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">

              {error && (
                <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                  <Icon d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {step === 0 && <StepLocation    data={formData} onChange={handleChange} />}
              {step === 1 && <StepService     data={formData} onChange={handleChange} />}
              {step === 2 && <StepSchedule    data={formData} onChange={handleChange} />}
              {step === 3 && <StepAttachments data={formData} onChange={handleChange} />}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => step > 0 ? setStep(s => s - 1) : handleCancel()}
                  className="px-5 py-2.5 text-sm text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
                >
                  {step === 0 ? 'Cancel' : '← Back'}
                </button>

                <button
                  type="submit"
                  disabled={!canGoNext() || isSubmitting}
                  className="px-7 py-2.5 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-200 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Posting...
                    </>
                  ) : isLastStep ? (
                    <>
                      <Icon d={ICONS.check} className="w-4 h-4" />
                      Post Job
                    </>
                  ) : 'Next →'}
                </button>
              </div>
            </div>
          </form>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? 'w-6 bg-teal-500' : i < step ? 'w-3 bg-teal-300' : 'w-3 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-80 flex-shrink-0 space-y-5">

          {/* Trust & Safety */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Icon d={ICONS.shield} className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-gray-800 text-sm">Trust & Safety Guarantee</h3>
            </div>
            <ul className="space-y-2.5">
              {[
                'All pilots are vetted & checked for required licenses.',
                "Pilot's insurance coverage is publicly displayed.",
                "You won't pay until your job is completed.",
                'We protect you against fraud.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <Icon d={ICONS.check} className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Icon d={ICONS.question} className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-gray-800 text-sm">Frequently Asked Questions</h3>
            </div>
            <FaqAccordion />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostJobForm;