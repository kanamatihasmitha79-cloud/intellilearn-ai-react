import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Cpu,
  RefreshCw,
  Plus,
  FileCode,
  FileCheck,
} from 'lucide-react';
import { LearningMaterial, MaterialConcept, NavPage, StudentProfile } from '../types';
import { TopicBanner } from './TopicBanner';

interface MaterialsViewProps {
  materials: LearningMaterial[];
  activeMaterial: LearningMaterial;
  setActiveMaterial: (m: LearningMaterial) => void;
  onSelectConcept: (concept: MaterialConcept) => void;
  onNavigateTab: (tab: NavPage) => void;
  onAddNewMaterial: (material: LearningMaterial) => void;
  studentProfile?: StudentProfile | null;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  materials,
  activeMaterial,
  setActiveMaterial,
  onSelectConcept,
  onNavigateTab,
  onAddNewMaterial,
  studentProfile,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [materialTitle, setMaterialTitle] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload (PDF, image, text)
  const processUploadedFile = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(null);
    setUploading(true);

    try {
      const fileName = file.name;
      const extension = fileName.split('.').pop()?.toLowerCase() || '';
      let fileType: 'pdf' | 'text' | 'image' | 'notes' = 'text';

      if (['png', 'jpg', 'jpeg', 'webp'].includes(extension)) {
        fileType = fileName.toLowerCase().includes('note') ? 'notes' : 'image';
      } else if (extension === 'pdf') {
        fileType = 'pdf';
      } else {
        fileType = 'text';
      }

      // Convert file to base64 if PDF or Image, or read as text
      if (fileType === 'pdf' || fileType === 'image' || fileType === 'notes') {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64String = (reader.result as string).split(',')[1];
          await sendAnalyzeRequest({
            title: materialTitle || fileName.replace(/\.[^/.]+$/, ''),
            fileType,
            fileName,
            base64Data: base64String,
            mimeType: file.type || (fileType === 'pdf' ? 'application/pdf' : 'image/jpeg'),
          });
        };
        reader.onerror = () => {
          setUploadError('Failed to read file from disk.');
          setUploading(false);
        };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onload = async () => {
          const text = reader.result as string;
          await sendAnalyzeRequest({
            title: materialTitle || fileName.replace(/\.[^/.]+$/, ''),
            fileType: 'text',
            fileName,
            text,
          });
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      setUploadError(err.message || 'File processing failed.');
      setUploading(false);
    }
  };

  const sendAnalyzeRequest = async (payload: any) => {
    try {
      const response = await fetch('/api/materials/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || 'Gemini analysis failed.');
      }

      const data = await response.json();
      if (data.material) {
        onAddNewMaterial(data.material);
        setActiveMaterial(data.material);
        setUploadSuccess(`Successfully analyzed "${data.material.title}"! ${data.material.concepts.length} concepts extracted.`);
        setMaterialTitle('');
        setTextInput('');
        setShowTextInput(false);
      }
    } catch (err: any) {
      console.error('Upload analysis error:', err);
      setUploadError(err.message || 'Error communicating with AI analysis engine.');
    } finally {
      setUploading(false);
    }
  };

  // Quick preset sample loader for judges
  const loadPresetSample = (sampleType: 'photosynthesis' | 'discrete-math') => {
    setUploading(true);
    setUploadError(null);
    if (sampleType === 'photosynthesis') {
      const sampleText = `Cellular Biology: Photosynthesis & Chloroplast Energy Conversion
Photosynthesis is the biological process by which green plants and certain other organisms transform light energy into chemical energy.
Key Equation:
6 CO₂ + 6 H₂O + Light energy → C₆H₁₂O₆ (glucose) + 6 O₂

Phase 1: Light-Dependent Reactions
Occur in the thylakoid membranes of chloroplasts. Chlorophyll absorbs sunlight photons, water molecules are split (photolysis) yielding electrons and oxygen as a byproduct. ATP and NADPH are synthesized to power the dark reactions.

Phase 2: Light-Independent Reactions (Calvin-Benson Cycle)
Occurs in the stroma. Carbon dioxide is captured by the enzyme RuBisCO (carbon fixation) and converted into glyceraldehyde-3-phosphate (G3P), which is then assembled into glucose and complex carbohydrates.

Prerequisites: Basic atomic bonding, ATP energy currency, chloroplast structure.
Difficult Concepts: Photophosphorylation chemiosmosis and RuBisCO oxygenase competition (photorespiration).`;

      sendAnalyzeRequest({
        title: 'Photosynthesis & Cellular Energy',
        fileType: 'text',
        fileName: 'Biology_Unit3_Photosynthesis.txt',
        text: sampleText,
      });
    } else {
      const sampleText = `Graph Theory & Network Flows
A graph G = (V, E) comprises a set of vertices V and edges E.
Eulerian Path: A trail in a finite graph that visits every edge exactly once. It exists if and only if exactly zero or two vertices have odd degree.
Hamiltonian Path: A path that visits every vertex exactly once. Determining if a graph has a Hamiltonian path is NP-complete.
Dijkstra's Algorithm: Computes shortest paths from a single source vertex using a priority queue in O((V + E) log V) time.`;

      sendAnalyzeRequest({
        title: 'Graph Theory & Network Algorithms',
        fileType: 'text',
        fileName: 'CS204_Graph_Theory.txt',
        text: sampleText,
      });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="mb-2">
            <TopicBanner
              subject={studentProfile?.subject || 'Computer Science'}
              topic={activeMaterial.mainTopic}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Study Materials: {activeMaterial.mainTopic}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Upload textbooks, PDFs, lecture slides, or photos of handwritten notes for instant Gemini AI structuring.
          </p>
        </div>

        {/* Quick Sample Loaders for Judges */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold hidden md:inline">Quick Test:</span>
          <button
            type="button"
            onClick={() => loadPresetSample('photosynthesis')}
            disabled={uploading}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
          >
            + Load Biology Module
          </button>
          <button
            type="button"
            onClick={() => loadPresetSample('discrete-math')}
            disabled={uploading}
            className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
          >
            + Load Graph Theory
          </button>
        </div>
      </div>

      {/* Upload Box / Zone */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              processUploadedFile(e.dataTransfer.files[0]);
            }
          }}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50'
              : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                processUploadedFile(e.target.files[0]);
              }
            }}
          />

          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
            {uploading ? (
              <RefreshCw className="w-7 h-7 animate-spin text-indigo-600" />
            ) : (
              <UploadCloud className="w-7 h-7" />
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {uploading ? 'Analyzing with Gemini AI 3.8 Flash...' : 'Upload Learning Material'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
            Drag and drop a <strong className="text-slate-700">PDF</strong>,{' '}
            <strong className="text-slate-700">document</strong>, or{' '}
            <strong className="text-slate-700">handwritten notes image</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-xs transition-colors disabled:opacity-50"
            >
              Browse Files
            </button>
            <button
              type="button"
              disabled={uploading}
              onClick={() => setShowTextInput(!showTextInput)}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-300 text-xs sm:text-sm shadow-xs transition-colors"
            >
              {showTextInput ? 'Hide Paste Form' : 'Paste Raw Text'}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-emerald-500" /> PDF & Slides
            </span>
            <span className="flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-blue-500" /> Handwritten Notes
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-amber-500" /> Text & Articles
            </span>
          </div>
        </div>

        {/* Text Paste Fallback Area */}
        {showTextInput && (
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-fade-in">
            <div className="text-xs font-bold text-slate-800">
              Paste Study Text or Lecture Notes:
            </div>
            <input
              type="text"
              placeholder="Module Title (e.g. Organic Chemistry Reactions)"
              value={materialTitle}
              onChange={(e) => setMaterialTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <textarea
              rows={5}
              placeholder="Paste raw notes, definitions, formulas, or syllabus content here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full p-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                disabled={uploading || !textInput.trim()}
                onClick={() =>
                  sendAnalyzeRequest({
                    title: materialTitle || 'Custom Study Notes',
                    fileType: 'text',
                    fileName: 'Custom_Notes.txt',
                    text: textInput,
                  })
                }
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs shadow-xs transition-colors disabled:opacity-50"
              >
                Extract with Gemini AI
              </button>
            </div>
          </div>
        )}

        {/* Success Banner */}
        {uploadSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadSuccess}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                onSelectConcept(activeMaterial.concepts[0]);
                onNavigateTab('learn');
              }}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold text-xs transition-colors"
            >
              Start Learning →
            </button>
          </div>
        )}

        {/* Error Banner */}
        {uploadError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>Uploaded Learning Materials ({materials.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materials.map((mat) => {
            const isCurrent = mat.id === activeMaterial.id;
            return (
              <div
                key={mat.id}
                className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between shadow-xs ${
                  isCurrent
                    ? 'border-indigo-500 ring-2 ring-indigo-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center uppercase border border-indigo-100">
                        {mat.fileType}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-snug">
                          {mat.title}
                        </h3>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{mat.fileName}</span>
                          <span>•</span>
                          <span>{mat.uploadDate}</span>
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Ready
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {mat.summary}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Extracted AI Concepts ({mat.concepts.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {mat.concepts.slice(0, 4).map((concept) => (
                        <button
                          key={concept.id}
                          type="button"
                          onClick={() => {
                            setActiveMaterial(mat);
                            onSelectConcept(concept);
                            onNavigateTab('learn');
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg text-xs font-medium text-slate-700 transition-colors"
                        >
                          {concept.name}
                        </button>
                      ))}
                      {mat.concepts.length > 4 && (
                        <span className="text-xs text-slate-400 self-center px-1">
                          +{mat.concepts.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {mat.subtopics.length} subtopics • {mat.importantDefinitions.length} definitions
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMaterial(mat);
                      onSelectConcept(mat.concepts[0] || null);
                      onNavigateTab('learn');
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Open Understanding</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
