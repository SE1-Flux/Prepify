import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { uploadMaterial, fetchDemoMaterial } from '../services/api';

export default function UploadModal({ isOpen, onClose, onMaterialLoaded }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [textInput, setTextInput] = useState('');
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' | 'text'
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      if (!title) {
        setTitle(selected.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      setProcessingStep('1/3 Extracting text from document with pdf-parse...');
      
      const formData = new FormData();
      if (activeTab === 'pdf') {
        if (!file) throw new Error('Please select a PDF file first.');
        formData.append('file', file);
      } else {
        if (!textInput.trim()) throw new Error('Please enter some study notes.');
        formData.append('text', textInput);
      }
      formData.append('title', title || 'My Study Material');

      setProcessingStep('2/3 Synthesizing study guide, flashcards & quizzes with Gemini AI...');
      const response = await uploadMaterial(formData);

      setProcessingStep('3/3 Saving synthesized pack to MongoDB...');
      setTimeout(() => {
        setLoading(false);
        onMaterialLoaded(response.data);
        onClose();
      }, 600);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to process document.');
      setLoading(false);
    }
  };

  const handleLoadDemo = async () => {
    setError(null);
    setLoading(true);
    setProcessingStep('Loading sample Biology Lecture 04 prototype pack...');
    try {
      const res = await fetchDemoMaterial();
      setTimeout(() => {
        setLoading(false);
        onMaterialLoaded(res.data);
        onClose();
      }, 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-700 transition-colors"
          disabled={loading}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-primary-700 font-extrabold text-[10px] tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Study Synthesizer</span>
          </div>
          <h3 className="font-extrabold text-2xl text-neutral-900">
            Import your study notes
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            Upload course slides, syllabus, or notes. Prepify automatically structures flashcards, summaries, and quizzes.
          </p>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex bg-neutral-100 p-1 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('pdf')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'pdf' ? 'bg-white text-primary-700 shadow-sm' : 'text-neutral-600'
            }`}
          >
            PDF / Slides
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'text' ? 'bg-white text-primary-700 shadow-sm' : 'text-neutral-600'
            }`}
          >
            Paste Text Notes
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 text-xs font-medium rounded-xl p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Material Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Biology Lecture 04: Cell Biology"
              className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 text-sm focus:border-primary-600 focus:outline-none"
              disabled={loading}
            />
          </div>

          {activeTab === 'pdf' ? (
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Upload File (.pdf)
              </label>
              <div className="border-2 border-dashed border-neutral-300 hover:border-primary-500 rounded-2xl p-6 text-center cursor-pointer transition-colors relative bg-neutral-50/50">
                <input
                  type="file"
                  accept=".pdf,text/plain"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  disabled={loading}
                />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  {file ? (
                    <div>
                      <p className="font-bold text-sm text-neutral-900">{file.name}</p>
                      <p className="text-xs text-neutral-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-sm text-neutral-800">
                        Click to upload or drag & drop PDF
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Supported: PDFs, lecture handouts, lecture transcripts
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Paste Lecture Content / Notes
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={5}
                placeholder="Paste key points, definitions, or textbook excerpt here..."
                className="w-full p-3 rounded-xl border border-neutral-300 text-sm focus:border-primary-600 focus:outline-none"
                disabled={loading}
              />
            </div>
          )}

          {loading && (
            <div className="mb-4 bg-primary-50 border border-primary-100 rounded-xl p-3 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-primary-600 animate-spin shrink-0" />
              <p className="text-xs font-semibold text-primary-800 leading-tight">
                {processingStep}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading || (activeTab === 'pdf' && !file && !title)}
              className="w-full h-12 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Synthesize Study Pack</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleLoadDemo}
              disabled={loading}
              className="w-full h-11 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-primary-600" />
              <span>Or explore sample "Biology Lecture 04: Cell Biology"</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
