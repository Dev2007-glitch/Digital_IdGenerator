"use client";

import { useState, useRef } from "react";
import {
  Fingerprint, Upload, Download, ArrowLeft, RefreshCw, QrCode, FileText, CheckCircle,
  ShieldCheck, HelpCircle, LogOut, ChevronRight, User, Settings2
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CollegeTemplateResolver from "@/components/CollegeTemplateResolver";

const collegeTemplates: Record<string, { id: string; name: string; image: string; layout: "horizontal" | "vertical" }> = {
  vvit: {
    id: "vvit",
    name: "VVIT",
    image: "/templates/vvit.png",
    layout: "vertical"
  },
  vit: {
    id: "vit",
    name: "VIT",
    image: "/templates/vit.png",
    layout: "vertical"
  },
  vignan: {
    id: "vignan",
    name: "Vignan's University",
    image: "/templates/vignan.png",
    layout: "horizontal"
  },
  delhi: {
    id: "delhi",
    name: "Delhi University",
    image: "/templates/du.png",
    layout: "horizontal"
  }
};

const QUICK_COLLEGES = [
  { id: "vvit", label: "VVIT Guntur" },
  { id: "vit", label: "VIT University" },
  { id: "delhi", label: "Delhi University" },
  { id: "vignan", label: "Vignan (VFSTR)" }
];

export default function GenerateDashboard() {
  const [activeTab, setActiveTab] = useState("generate");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    collegeId: "vignan",
    customCollegeName: "",
    name: "",
    studentId: "",
    email: "",
    contact: "",
    department: "",
    course: "",
    academicYear: "",
    batch: "",
    validUntil: "",
    photoUrl: ""
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyResult, setVerifyResult] = useState<"YES" | "NO" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleVerify = () => {
    if (!verifyInput.trim()) {
      setVerifyResult(null);
      return;
    }
    if (formData.studentId && verifyInput.trim() === formData.studentId) {
      setVerifyResult("YES");
    } else {
      setVerifyResult("NO");
    }
  };

  const selectedCollege = collegeTemplates[formData.collegeId] || collegeTemplates["vignan"];
  const displayCollegeName = formData.collegeId === "other" && formData.customCollegeName ? formData.customCollegeName : selectedCollege.name;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, photoUrl: url });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const captureCard = async (scale = 3) => {
    if (!cardRef.current) return null;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      scale: scale,
      useCORS: true,
      backgroundColor: "#ffffff"
    });
    return canvas.toDataURL("image/png");
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    showToast("Preparing PDF...");
    try {
      const imgData = await captureCard(3);
      if (!imgData) throw new Error("Capture failed");

      const jsPDF = (await import("jspdf")).jsPDF;
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const cardWidth = 85.6;
      const cardHeight = 139.8;
      const x = (pdfWidth - cardWidth) / 2;
      const y = 40;

      pdf.addImage(imgData, 'PNG', x, y, cardWidth, cardHeight);
      pdf.save(`${formData.name.replace(/\s+/g, '-') || "Student"}-Digital-ID.pdf`);
      showToast("ID Card downloaded successfully.");
    } catch (error) {
      showToast("Error generating PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPNG = async () => {
    setIsDownloading(true);
    showToast("Preparing Image...");
    try {
      const imgData = await captureCard(3);
      if (!imgData) throw new Error("Capture failed");

      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${formData.name.replace(/\s+/g, '-') || "Student"}-Digital-ID.png`;
      link.click();

      showToast("ID Card downloaded successfully.");
    } catch (error) {
      showToast("Error generating PNG.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden selection:bg-white selection:text-black">

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-white text-black px-6 py-3 rounded-full font-medium shadow-2xl flex items-center space-x-2"
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SIDEBAR */}
      <div className="w-72 border-r border-white/10 flex flex-col bg-[#050505] shrink-0">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">IDStream <span className="font-light text-white/60">Studio</span></span>
          </Link>
        </div>

        <div className="flex-1 px-4 py-2 overflow-y-auto flex flex-col">
          <div className="mb-6">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-2 mb-3">Institution Suite</h3>
            <div className="flex items-center space-x-2 px-2 text-xs text-white/60 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Live workspace</span>
            </div>

            <nav className="flex flex-col space-y-1">
              <button onClick={() => setActiveTab("generate")} className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all ${activeTab === "generate" ? "bg-white/10 text-white border border-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Create your ID</span>
              </button>

              <button onClick={() => setActiveTab("verify")} className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all ${activeTab === "verify" ? "bg-white/10 text-white border border-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Verify a card</span>
              </button>

              <button onClick={() => setActiveTab("help")} className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all ${activeTab === "help" ? "bg-white/10 text-white border border-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Help center</span>
              </button>
            </nav>
          </div>

          <div className="mt-auto space-y-4 pb-4">
            {/* User Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                  DE
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Devi</span>
                  <span className="text-[10px] text-white/50">devi@student.edu</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1">
                  <RefreshCw className="w-3 h-3" />
                  <span>Switch</span>
                </button>
                <Link href="/" className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-red-400 hover:text-red-300 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1">
                  <LogOut className="w-3 h-3" />
                  <span>Log out</span>
                </Link>
              </div>
            </div>

            {/* Secure Banner */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-white/80">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold">Private & Secure</span>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed">
                Data renders directly in your browser. No personal information is sent to servers.
              </p>
            </div>

            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Motion</span>
              <div className="w-6 h-3 bg-white/20 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full bg-[#080808]">

        {/* Top Navbar */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#050505]">
          <div className="flex items-center space-x-2 text-xs font-medium text-white/40">
            <span>IDStream</span>
            <span>/</span>
            <span className="text-white">ID Studio</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-xs text-white/60">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Template: STANDARD</span>
            </div>
            <Link href="/" className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-red-400 transition-colors">
              <LogOut className="w-3 h-3" />
              <span>Log out</span>
            </Link>
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
              ID
            </div>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "generate" && (
            <div className="max-w-[1400px] mx-auto p-8 md:p-12">

              {/* Header Title */}
              <div className="mb-12 flex justify-between items-end">
                <div className="max-w-2xl">
                  <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Smart College ID Generator</h3>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
                    Your institution, <br />
                    <span className="text-white/60 font-light">exact digital structure.</span>
                  </h1>
                  <p className="text-sm text-white/50 leading-relaxed max-w-xl">
                    Type any college name (e.g. VVIT, VIT, Delhi University, Vignan) to instantly load that college&apos;s exact ID card structure and layout.
                  </p>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center space-x-2 text-xs font-medium">
                    <Settings2 className="w-4 h-4 text-white/60" />
                    <span>{(step / 4 * 100)}% ready</span>
                  </div>
                  <button className="text-xs font-medium text-white/40 hover:text-white underline underline-offset-4">Reduce motion</button>
                </div>
              </div>

              {/* Two Column Dashboard */}
              <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* LEFT COLUMN: FORM STEPPER */}
                <div className="w-full lg:w-[45%] flex flex-col">

                  {/* Stepper Progress Header */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-8 text-xs font-bold text-white/60 uppercase tracking-widest">
                      <span>Step 0{step} / 04</span>
                      <span className="text-white">{(step / 4 * 100)}% completed</span>
                    </div>

                    <div className="relative flex justify-between text-center">
                      <div className="absolute top-4 left-0 w-full h-[1px] bg-white/10 -z-10" />
                      <div className="absolute top-4 left-0 h-[1px] bg-white -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }} />

                      {[
                        { num: 1, label: "Institution & College" },
                        { num: 2, label: "Personal details" },
                        { num: 3, label: "Academic & batch" },
                        { num: 4, label: "Photo & generate" }
                      ].map(s => (
                        <div key={s.num} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-3 transition-colors ${step >= s.num ? "bg-white text-black" : "bg-[#111] text-white/40 border border-white/10"}`}>
                            0{s.num}
                          </div>
                          <span className={`text-[10px] w-20 ${step >= s.num ? "text-white font-medium" : "text-white/40"}`}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Form Body */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col min-h-[400px]">
                    <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">
                      0{step} / {step === 1 ? "INSTITUTION & COLLEGE" : step === 2 ? "PERSONAL DETAILS" : step === 3 ? "ACADEMIC INFORMATION" : "FINAL REVIEW"}
                    </h4>

                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight">Which college do you attend?</h2>
                        <p className="text-sm text-white/50">Type your college name or click a quick template above. The card structure adapts dynamically.</p>

                        <div className="flex flex-wrap gap-3 mb-2">
                          {QUICK_COLLEGES.map(c => (
                            <button
                              key={c.id}
                              onClick={() => setFormData({ ...formData, collegeId: c.id })}
                              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${formData.collegeId === c.id ? "bg-white text-black" : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"}`}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-white/60 mb-2">College ID Database</label>
                            <select
                              name="collegeId"
                              value={formData.collegeId}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-white/40 transition-all text-white text-sm"
                            >
                              {Object.entries(collegeTemplates).map(([id, c]) => (
                                <option key={id} value={id}>{c.name}</option>
                              ))}
                            </select>
                          </div>

                          {formData.collegeId === "other" && (
                            <div>
                              <label className="block text-xs font-medium text-white/60 mb-2">Custom College Name</label>
                              <input type="text" name="customCollegeName" value={formData.customCollegeName} onChange={handleChange} className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-white/40 transition-all text-sm" placeholder="Enter full college name" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight">Who are you?</h2>
                        <p className="text-sm text-white/50">Enter the primary details that will be verified on the ID.</p>

                        <div className="space-y-5">
                          <div>
                            <label className="block text-xs font-medium text-white/60 mb-2">Full Legal Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-white/40 transition-all text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-white/60 mb-2">Student ID / Roll Number</label>
                            <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} placeholder="e.g. STU-2024-0001" className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-white/40 transition-all text-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-white/60 mb-2">Email Address</label>
                              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@edu.com" className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-white/40 transition-all text-sm" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-white/60 mb-2">Contact No.</label>
                              <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="+1 234 567 8900" className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-white/40 transition-all text-sm" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight">Academic Details</h2>
                        <p className="text-sm text-white/50">Specify your course, department, and valid timeline.</p>

                        <div className="space-y-5">
                          <div>
                            <label className="block text-xs font-medium text-white/60 mb-2">Program / Degree</label>
                            <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="e.g. B.Tech, B.A. (Hons)" className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-white/40 transition-all text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-white/60 mb-2">Department / Specialization</label>
                            <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Computer Science" className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-white/40 transition-all text-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-white/60 mb-2">Batch / Year</label>
                              <input type="text" name="academicYear" value={formData.academicYear} onChange={handleChange} placeholder="2023 - 2027" className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-white/40 transition-all text-sm" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-white/60 mb-2">Valid Until</label>
                              <input type="date" name="validUntil" value={formData.validUntil} onChange={handleChange} className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-white/40 transition-all text-sm [color-scheme:dark]" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight">Final Details</h2>
                        <p className="text-sm text-white/50">Upload a professional portrait photo to complete your ID.</p>

                        <div className="space-y-5">
                          <div>
                            <label className="block text-xs font-medium text-white/60 mb-2">Profile Photo</label>
                            <div className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 hover:border-white/50 rounded-xl transition-colors bg-[#111] cursor-pointer overflow-hidden group">
                              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                              {formData.photoUrl ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                              ) : (
                                <div className="flex flex-col items-center pointer-events-none text-white/40">
                                  <Upload className="w-8 h-8 mb-3" />
                                  <span className="text-sm font-medium mb-1">Click to upload photo</span>
                                  <span className="text-[10px] uppercase tracking-widest">JPG, PNG up to 2MB</span>
                                </div>
                              )}
                              {formData.photoUrl && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                  <span className="bg-black/80 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Change Photo</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="mt-auto pt-8 flex justify-between items-center">
                      {step > 1 ? (
                        <button onClick={() => setStep(s => Math.max(1, s - 1))} className="px-6 py-3 text-sm font-bold text-white/60 hover:text-white transition-colors">
                          Back
                        </button>
                      ) : <div />}

                      {step < 4 ? (
                        <button onClick={() => setStep(s => Math.min(4, s + 1))} className="px-8 py-3 bg-white text-black rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center space-x-2">
                          <span>Continue</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button onClick={handleDownloadPDF} disabled={isDownloading} className="px-8 py-3 bg-white text-black rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center space-x-2 disabled:opacity-50">
                          {isDownloading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                          <span>Generate & Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: LIVE CARD PREVIEW */}
                <div className="w-full lg:w-[55%] flex flex-col bg-[#050505] border border-[#222222] rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[600px] shadow-2xl">
                  <div className="flex justify-between items-start mb-16 relative z-10">
                    <div>
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center space-x-2 mb-2">
                        <span>LIVE COLLEGE CARD STRUCTURE</span>
                      </h4>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">
                        {displayCollegeName}
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="px-4 py-2.5 border border-[#333333] bg-[#0A0A0A] hover:bg-[#111111] rounded-xl text-xs font-semibold text-white transition-colors flex items-center space-x-2 shadow-sm"
                    >
                      <RefreshCw className="w-4 h-4 text-white/80" />
                      <span>Show {isFlipped ? "front" : "back"}</span>
                    </button>
                  </div>

                  <div className="flex-1 flex items-center justify-center relative z-10 perspective-1000">
                    <motion.div
                      className={`w-full relative preserve-3d cursor-pointer transition-shadow duration-500 ${selectedCollege.layout === 'horizontal' ? 'max-w-[480px] aspect-[100/63]' : 'max-w-[340px] aspect-[63/100]'}`}
                      animate={{
                        rotateY: isFlipped ? 180 : 0,
                        rotateZ: isFlipped ? -2 : 3, // Slight rotation for floating effect matching screenshot
                        y: [-5, 5, -5]
                      }}
                      transition={{
                        rotateY: { duration: 0.6, type: "spring", stiffness: 200, damping: 20 },
                        rotateZ: { duration: 0.6, type: "spring" },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      onClick={() => setIsFlipped(!isFlipped)}
                      style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))" }}
                    >
                      <div ref={cardRef} className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white text-black flex flex-col relative" style={{ backfaceVisibility: 'hidden' }}>

                        {!isFlipped ? (
                          /* FRONT */
                          <div className="w-full h-full relative z-10 bg-transparent rounded-2xl shadow-inner overflow-hidden">
                            <CollegeTemplateResolver collegeId={selectedCollege.id} collegeName={displayCollegeName} student={formData} />
                          </div>
                        ) : (
                          /* BACK FACE */
                          <div className="flex flex-col h-full bg-white relative z-10" style={{ transform: 'rotateY(180deg)' }}>
                            <div className="h-10 bg-black/5 w-full mt-6" />
                            <div className="p-6 flex-1 flex flex-col">
                              <h2 className="text-[10px] font-black uppercase tracking-widest text-center leading-tight mb-6 border-b border-black/10 pb-4">
                                {displayCollegeName}
                              </h2>

                              <div className="space-y-4 flex-grow">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-[6px] uppercase tracking-widest text-black/50 font-bold">Email</p>
                                    <p className="text-[9px] font-bold truncate">{formData.email || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="text-[6px] uppercase tracking-widest text-black/50 font-bold">Contact</p>
                                    <p className="text-[9px] font-bold">{formData.contact || "N/A"}</p>
                                  </div>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                  <p className="text-[6px] uppercase tracking-widest text-blue-800/60 font-bold mb-1">Instructions</p>
                                  <p className="text-[7px] text-blue-900 leading-relaxed font-medium">
                                    This card is property of the institution. If found, please return to the administration office. Use of this card is subject to college regulations.
                                  </p>
                                </div>
                              </div>

                              <div className="mt-auto flex justify-between items-end pt-6">
                                <div className="flex flex-col">
                                  <p className="text-[6px] uppercase tracking-widest text-black/40 font-bold mb-1">Authorization</p>
                                  <div className="w-20 h-6 border-b border-black text-[8px] font-[cursive] flex items-end justify-center pb-1 text-black/60">
                                    Authorized Signatory
                                  </div>
                                </div>
                                <div className="flex flex-col items-center bg-black/5 p-2 rounded-lg">
                                  {formData.studentId ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                                        selectedCollege.id === 'vignan' ? `https://vignan.ac.in/` :
                                          selectedCollege.id === 'vvit' ? `https://www.vvitguntur.com/` :
                                            selectedCollege.id === 'vit' ? `https://vtop.vit.ac.in/vtop/initialProcess?student=${formData.studentId}` :
                                              selectedCollege.id === 'delhi' ? `https://du.ac.in/student/${formData.studentId}` :
                                                `https://${selectedCollege.id}.edu/portal/verify/${formData.studentId}`
                                      )}`}
                                      alt="QR Code"
                                      className="w-16 h-16 mb-2 mix-blend-multiply"
                                    />
                                  ) : (
                                    <QrCode className="w-16 h-16 text-black mb-2" />
                                  )}
                                  <p className="text-[5px] font-bold uppercase tracking-widest">Verify</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-[#333333] relative z-10 mt-12">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-[#A0A0A0]">
                      <div className="w-2 h-2 rounded-full bg-white/80" />
                      <span>Live {formData.collegeId.toUpperCase()} layout</span>
                    </div>
                    <button onClick={handleDownloadPDF} disabled={isDownloading} className="flex items-center space-x-2 text-xs font-bold text-white hover:text-[#A0A0A0] transition-colors disabled:opacity-50 bg-transparent">
                      {isDownloading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === "verify" && (
            <div className="max-w-[1400px] mx-auto p-8 md:p-12 h-full flex flex-col justify-center max-w-4xl">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Institution Credential Verification</h3>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-[1.1]">
                Verify a <span className="text-indigo-400">Digital ID.</span>
              </h1>
              <p className="text-sm md:text-base text-white/60 leading-relaxed mb-12">
                Confirm student registration status using the ID number printed on their card.
              </p>

              <div className="bg-white text-black rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl mb-12">
                <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-black/60 mb-2">Student Roll / Registration Number</label>
                    <input
                      type="text"
                      value={verifyInput}
                      onChange={(e) => {
                        setVerifyInput(e.target.value);
                        setVerifyResult(null);
                      }}
                      placeholder="e.g. 22BQ1A4720, 16BIS0090, 241FA04B57"
                      className="w-full px-4 py-4 bg-white border border-indigo-400/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all text-sm placeholder:text-black/30 font-medium"
                    />
                  </div>
                  <button 
                    onClick={handleVerify}
                    className="w-full md:w-auto px-8 py-4 bg-[#111] hover:bg-black text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 mt-4 md:mt-6 whitespace-nowrap"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Verify Credential</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                {verifyResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 p-4 rounded-xl font-bold flex items-center space-x-3 ${verifyResult === "YES" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
                    {verifyResult === "YES" ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-sm">Verification Successful: YES</div>
                          <div className="text-xs font-medium text-green-700/70 mt-0.5">This credential is valid and active in the system.</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-5 h-5 text-red-600" />
                        <div>
                          <div className="text-sm">Verification Failed: NO</div>
                          <div className="text-xs font-medium text-red-700/70 mt-0.5">We could not find this credential in the active database.</div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </div>

              <button onClick={() => setActiveTab("generate")} className="flex items-center space-x-2 text-xs font-bold text-white/60 hover:text-white transition-colors">
                <ArrowLeft className="w-3 h-3" />
                <span>Return to ID studio</span>
              </button>
            </div>
          )}

          {activeTab === "help" && (
            <div className="max-w-[1400px] mx-auto p-8 md:p-12 h-full flex flex-col justify-center">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Campuspass Support</h3>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-[1.1] max-w-3xl">
                Make your ID <span className="text-indigo-400">work for you.</span>
              </h1>
              <p className="text-sm md:text-base text-white/60 leading-relaxed mb-16 max-w-2xl">
                Build your credential in four small steps, then let the card do the explaining.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl">
                <div className="bg-white text-black p-8 rounded-3xl shadow-xl flex flex-col">
                  <span className="text-sm font-bold text-indigo-500 font-mono mb-8">01</span>
                  <h3 className="text-lg font-bold mb-3">Type College Name</h3>
                  <p className="text-xs text-black/60 leading-relaxed">
                    Type VVIT, VIT, Delhi University, or Vignan to load their exact structure.
                  </p>
                </div>

                <div className="bg-white text-black p-8 rounded-3xl shadow-xl flex flex-col">
                  <span className="text-sm font-bold text-indigo-500 font-mono mb-8">02</span>
                  <h3 className="text-lg font-bold mb-3">Enter Details & Photo</h3>
                  <p className="text-xs text-black/60 leading-relaxed">
                    Fill in your name, roll number, department, and candidate photo.
                  </p>
                </div>

                <div className="bg-white text-black p-8 rounded-3xl shadow-xl flex flex-col">
                  <span className="text-sm font-bold text-indigo-500 font-mono mb-8">03</span>
                  <h3 className="text-lg font-bold mb-3">Download & Share</h3>
                  <p className="text-xs text-black/60 leading-relaxed">
                    Download a high-resolution printable PDF or verified digital card.
                  </p>
                </div>
              </div>

              <button onClick={() => setActiveTab("generate")} className="w-fit px-8 py-4 bg-[#111] hover:bg-black text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 border border-white/10">
                <span>Open ID Studio</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
