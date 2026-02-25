import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Upload } from 'lucide-react';
import { FormField, PathDefinition } from '../types';

interface NXFormProps {
  currentPathDef: PathDefinition;
  formData: Record<string, any>;
  handleInputChange: (id: string, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  IconMap: Record<string, React.ReactNode>;
}

export const NXForm: React.FC<NXFormProps> = ({
  currentPathDef,
  formData,
  handleInputChange,
  handleSubmit,
  IconMap,
}) => {
  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-nx-teal/60 backdrop-blur-2xl rounded-2xl sm:rounded-[40px] shadow-2xl overflow-hidden border border-nx-steel/50"
    >
      <div className="bg-nx-muted/50 p-5 sm:p-10 text-nx-white border-b border-nx-steel/30">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-nx-cyan/10 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm text-nx-cyan border border-nx-cyan/20">
            {IconMap[currentPathDef?.icon || '']}
          </div>
          <span className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-nx-cyan">
            NX {currentPathDef?.label}
          </span>
        </div>
        <h2 className="text-xl sm:text-4xl font-black mb-1 sm:mb-2">{currentPathDef?.label} Form</h2>
        <p className="text-xs sm:text-lg text-nx-gray font-medium">{currentPathDef?.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-10 space-y-8 sm:space-y-12">
        {currentPathDef?.sections.map((section) => {
          if (section.condition && !section.condition(formData)) {
            return null;
          }

          return (
            <div key={section.id} className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-nx-dusty">
                  {section.title}
                </h3>
                <div className="h-px bg-nx-steel/30 flex-grow" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6">
                {section.fields.map((field) => {
                  if (field.condition && !field.condition(formData)) {
                    return null;
                  }

                  return (
                    <div
                      key={field.id}
                      className={`${
                        field.type === 'textarea' ||
                        field.id === 'fullName' ||
                        field.id === 'email' ||
                        field.id === 'ideaTitle' ||
                        field.id === 'problemStatement' ||
                        field.id === 'solution'
                          ? 'md:col-span-2'
                          : ''
                      } space-y-1.5 sm:space-y-2`}
                    >
                      <label className="block text-xs sm:text-sm font-bold text-nx-white/80">
                        {field.label} {field.required && <span className="text-nx-cyan">*</span>}
                      </label>

                      {renderField(field, formData[field.id], (val) =>
                        handleInputChange(field.id, val)
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="pt-6 sm:pt-10 border-t border-nx-steel/30">
          <button
            type="submit"
            className="w-full py-4 sm:py-5 bg-nx-cyan text-nx-navy rounded-xl sm:rounded-2xl font-black text-base sm:text-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] active:scale-[0.98]"
          >
            Submit Application
          </button>
        </div>
      </form>
    </motion.div>
  );
};

function renderField(field: FormField, value: any, onChange: (val: any) => void) {
  const baseInputClasses =
    'w-full px-4 sm:px-5 py-3 sm:py-4 bg-nx-muted/40 border border-nx-steel/50 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-nx-cyan/10 focus:border-nx-cyan transition-all text-nx-white placeholder:text-nx-gray/50 text-sm sm:text-base';

  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className={`${baseInputClasses} min-h-[100px] sm:min-h-[120px] resize-none`}
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
        />
      );

    case 'select':
      return (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className={baseInputClasses}
        >
          <option value="" className="bg-nx-teal">
            Select an option
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt} className="bg-nx-teal">
              {opt}
            </option>
          ))}
        </select>
      );

    case 'radio':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {field.options?.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-left transition-all flex items-center justify-between text-sm sm:text-base ${
                value === opt
                  ? 'bg-nx-cyan border-nx-cyan text-nx-navy shadow-lg shadow-nx-cyan/10'
                  : 'bg-nx-muted/30 border-nx-steel/50 text-nx-gray hover:border-nx-cyan/30'
              }`}
            >
              <span className="font-bold">{opt}</span>
              {value === opt && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          ))}
        </div>
      );

    case 'multi-select':
      const selected = Array.isArray(value) ? value : [];
      const toggle = (opt: string) => {
        if (selected.includes(opt)) {
          onChange(selected.filter((s) => s !== opt));
        } else {
          onChange([...selected, opt]);
        }
      };
      return (
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {field.options?.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all ${
                selected.includes(opt)
                  ? 'bg-nx-cyan border-nx-cyan text-nx-navy'
                  : 'bg-nx-muted/30 border-nx-steel/50 text-nx-gray hover:border-nx-cyan/30'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      );

    case 'checkbox':
      return (
        <label className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              required={field.required}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg border-2 transition-all flex items-center justify-center ${
                value
                  ? 'bg-nx-cyan border-nx-cyan'
                  : 'bg-nx-muted/30 border-nx-steel/50 group-hover:border-nx-cyan'
              }`}
            >
              {value && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-nx-navy" />}
            </div>
          </div>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-nx-gray group-hover:text-nx-cyan transition-colors">
            {field.label}
          </span>
        </label>
      );

    case 'file':
      return (
        <div className="relative">
          <input
            type="file"
            onChange={(e) => onChange(e.target.files?.[0]?.name)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className={`${baseInputClasses} flex items-center justify-between pointer-events-none`}>
            <span className={value ? 'text-nx-white' : 'text-nx-gray/50 truncate max-w-[80%]'}>
              {value || 'Upload document...'}
            </span>
            <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-nx-gray" />
          </div>
        </div>
      );

    default:
      return (
        <input
          type={field.type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className={baseInputClasses}
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
        />
      );
  }
}
