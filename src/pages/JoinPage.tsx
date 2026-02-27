/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Lightbulb, 
  Rocket, 
  Microscope, 
  HelpCircle, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  Upload,
  ExternalLink,
  Loader
} from 'lucide-react';
import { PATHS } from '../constants';
import { AppPath, PathDefinition, FormSection, FormField } from '../types';
import { NXForm } from '../components/NXForm';
import { joinAPI } from '../api';
import SEO from '../components/SEO';
import "./Formindex.css";
const IconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
  Microscope: <Microscope className="w-6 h-6" />,
  HelpCircle: <HelpCircle className="w-6 h-6" />,
};

export default function join() {
  const [selectedPath, setSelectedPath] = useState<AppPath>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>('');

  const currentPathDef = useMemo(() => 
    PATHS.find(p => p.id === selectedPath), 
  [selectedPath]);

  const handleInputChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await joinAPI.saveSubmission(selectedPath!, formData);
      
      if (response.success) {
        console.log('Form submitted successfully:', response);
        setSubmissionId(response.submissionId);
        setIsSubmitted(true);
      } else {
        alert('Error submitting form: ' + response.message);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setSelectedPath(null);
    setFormData({});
    setIsSubmitted(false);
    setSubmissionId('');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-nx-navy flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-nx-teal p-8 sm:p-12 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full text-center border border-nx-steel/50 backdrop-blur-xl"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-nx-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-nx-cyan/20">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-nx-cyan" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-nx-white mb-4">Application Received!</h2>
          <p className="text-nx-gray text-sm sm:text-base mb-4">
            Thank you for your interest in the NX Ecosystem. Our team will review your details and get back to you soon.
          </p>
          {submissionId && (
            <div className="bg-nx-navy/30 rounded-lg p-3 mb-6">
              <p className="text-[10px] text-nx-gray uppercase tracking-widest mb-1">Submission ID</p>
              <p className="text-nx-cyan font-mono text-sm">{submissionId}</p>
            </div>
          )}
          <button 
            onClick={reset}
            className="w-full py-3 sm:py-4 bg-nx-cyan text-nx-navy rounded-xl font-bold hover:bg-white transition-all active:scale-95"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nx-navy text-nx-white font-sans selection:bg-nx-cyan selection:text-nx-navy relative overflow-x-hidden">
      <SEO 
        title="Join the Ecosystem" 
        description="Join the NX Research ecosystem. Choose your path: Venture Building, Strategic Innovation, or Ecosystem Development."
      />
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-0">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00f2ff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-nx-navy/60 backdrop-blur-xl border-b border-nx-steel/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={reset}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-nx-cyan rounded-lg sm:rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.3)]">
              <span className="text-nx-navy font-black text-lg sm:text-xl">NX</span>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-nx-white">Ecosystem</span>
          </div>
          {selectedPath && (
            <button 
              onClick={() => setSelectedPath(null)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-nx-gray hover:text-nx-cyan transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Change Path</span>
              <span className="xs:hidden">Back</span>
            </button>
          )}
        </div>
      </header>

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!selectedPath ? (
              <motion.div
                key="selector"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-10 sm:mb-16">
                  <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-nx-white leading-tight"
                  >
                    Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-nx-cyan to-blue-400">Path</span>
                  </motion.h1>
                  <p className="text-base sm:text-xl text-nx-gray max-w-2xl mx-auto font-medium">
                    Select the area that best fits your current goals and interests within the NX ecosystem.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {PATHS.map((path, idx) => (
                    <motion.button
                      key={path.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => setSelectedPath(path.id as AppPath)}
                      className="group relative bg-nx-teal/40 backdrop-blur-sm p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-nx-steel/50 shadow-xl hover:shadow-nx-cyan/5 hover:border-nx-cyan/50 transition-all text-left flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 h-full active:scale-[0.98]"
                    >
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-nx-muted rounded-xl sm:rounded-2xl flex items-center justify-center sm:mb-6 group-hover:bg-nx-cyan group-hover:text-nx-navy transition-all text-nx-cyan border border-nx-steel/30">
                        {IconMap[path.icon]}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg sm:text-2xl font-bold sm:mb-3 text-nx-white">{path.label}</h3>
                        <p className="hidden sm:block text-sm sm:text-base text-nx-gray mb-8 leading-relaxed">{path.description}</p>
                        <div className="flex items-center gap-2 text-[10px] sm:text-sm font-bold uppercase tracking-widest text-nx-steel group-hover:text-nx-cyan transition-colors">
                          <span className="sm:inline">Get Started</span> <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              currentPathDef && (
                <NXForm
                  currentPathDef={currentPathDef}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  IconMap={IconMap}
                />
              )
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="py-8 sm:py-12 border-t border-nx-steel/20 bg-nx-navy/80 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-nx-gray text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} NX Research Ecosystem. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

