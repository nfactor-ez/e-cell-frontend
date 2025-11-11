"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function ConceptioPage() {
  const [pitchDeckFile, setPitchDeckFile] = useState<File | null>(null);
  const [pitchVideoFile, setPitchVideoFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    teamName: "",
    teamLeaderName: "",
    email: "",
    contactNumber: "",
    college: "",
    yearOfStudy: "",
    teamMembers: [{ name: "", yearOfStudy: "" }],
  });

  const [message, setMessage] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 🌈 Parallax Lighting Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 100;
      const y = (e.clientY / innerHeight - 0.5) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  type MemberField = "name" | "yearOfStudy";

  const handleMemberChange = (index: number, field: MemberField, value: string) => {
    const updated = [...form.teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, teamMembers: updated }));
  };

  const ALLOWED_COLLEGES = [
    "MIT Manipal",
    "MAHE Manipal",
    "KMC Manipal",
    "MCODS Manipal",
    "Manipal College of Nursing",
    "Welcomgroup Graduate School of Hotel Administration",
    "Manipal Academy of Banking",
    "Manipal Institute of Technology Bengaluru",
  ] as const;


  const addMember = () => {
    if (form.teamMembers.length < 4) {
      setForm((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: "", yearOfStudy: "" }],
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          supportingFiles: {
            pitchDeckUrl: "https://example.com/pitchdeck.pdf", // temporary placeholder
            pitchVideoUrl: "https://example.com/video.mp4", // same here
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Submission successful!");
        console.log("Server response:", data);
      } else {
        setMessage(`❌ Error: ${data.message || "Something went wrong"}`);
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("❌ Failed to connect to the server");
    }
    setPitchDeckFile(null);
    setPitchVideoFile(null);

  };


  return (
    <main>
      <div className="relative min-h-screen flex items-center justify-center bg-[#0b0b0d] overflow-hidden py-20 px-4">
        {/*Glowing Gradient Background */}
        <div className="absolute inset-0">
          <div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-r from-[#FF5E5E] via-[#FFD464] to-[#E23C64] opacity-30 blur-[140px] animate-slowFloat"
            style={{
              transform: `translate(${mousePos.x / 8}px, ${mousePos.y / 8}px)`,
            }}
          ></div>
          <div
            className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-r from-[#B0183D] via-[#FF5E5E] to-[#FFD464] opacity-25 blur-[130px] animate-slowFloatReverse"
            style={{
              transform: `translate(${mousePos.x / -10}px, ${mousePos.y / 10}px)`,
            }}
          ></div>
          <div
            className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-[#FFD464] via-[#FF5E5E] to-[#E23C64] opacity-20 blur-[160px] animate-slowPulse"
            style={{
              transform: `translate(${mousePos.x / 12}px, ${mousePos.y / -12}px)`,
            }}
          ></div>
        </div>

        {/*Form Container */}
        <div className="relative z-10 w-full max-w-3xl form-container">
          <img
            src="/transparent-logo.webp"
            alt="Logo"
            className="w-20 h-20 align-center mx-auto mb-4"
          />
          <h1
            className="text-4xl md:text-5xl font-extrabold text-center mb-3 bg-gradient-to-r 
             from-[#FFD464] via-[#FF5E5E] to-[#E23C64]
             bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,94,94,0.3)]"
          >
            Conceptiō – Ideathon ‘26
          </h1>

          <p className="text-center text-[#FCEDD8] mb-10 font-medium">
            Organized by <span className="font-semibold text-[#FFD464]">E-Cell MIT, Manipal</span>
            <br />
            Submit your startup idea to get mentorship, feedback & a chance to win prizes!
          </p>
          <h2 className="text-2xl font-bold text-[#FFD464] mb-4">Team Information</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/*Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Team Name *</label>
                <input
                  type="text"
                  name="teamName"
                  value={form.teamName}
                  onChange={handleChange}
                  placeholder="Team Innovators"
                  className="form-input glow-focus"
                  required
                />
              </div>
              <div>
                <label className="form-label">Full Name (Team Leader) *</label>
                <input
                  type="text"
                  name="teamLeaderName"
                  value={form.teamLeaderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input glow-focus"
                  required
                />
              </div>
              <div>
                <label className="form-label">Email ID *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john.mitmpl2025@learner.manipal.edu"
                  className="form-input glow-focus"
                  required
                />
              </div>
              <div>
                <label className="form-label">Contact Number *</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="form-input glow-focus"
                  required
                />
              </div>
              <div>
                <label className="form-label">College *</label>
                <select
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  className="form-input glow-focus"
                  required
                >
                  <option value="">Select College</option>
                  {ALLOWED_COLLEGES.map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Year of Study (Leader) *</label>
                <select
                  name="yearOfStudy"
                  value={form.yearOfStudy}
                  onChange={handleChange}
                  className="form-input glow-focus"
                  required
                >
                  <option value="">Select Year</option>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Team Members */}
            {/* ---------------------------
   Team Members (heading + list + button)
   --------------------------- */}
            <div>
              {/* Heading with centered small help text */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-[#FFD464] leading-none">Team Members</h2>
                  <span className="text-sm text-[#FFD464]/85 leading-none">
                    (Optional, max 3 additional members)
                  </span>
                </div>
                {/* Add button placed at the right - dashed rounded style like your screenshot */}
                {form.teamMembers.length < 3 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-xl
                   border-2 border-dashed border-[#FFD464]/35
                   bg-[#FFD464]/10 hover:bg-[#FFD464]/30
                   text-[#FFD464] font-semibold
                   transition-all duration-200
                   shadow-[inset_0_0_0_1px_rgba(255,214,100,0.03)]"
                  >
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-lg bg-transparent border border-[#FFD464]/40">
                      +
                    </span>
                    <span>Add Team Member</span>
                  </button>
                )}
              </div>

              {/* Members list */}
              <div className="space-y-3">
                {form.teamMembers.map((member, i) => (
                  <div key={i} className="relative grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                    <input
                      type="text"
                      placeholder={`Member ${i + 2} Name (e.g. Jane Doe)`}
                      value={member.name}
                      onChange={(e) => handleMemberChange(i, "name", e.target.value)}
                      className="form-input glow-focus"
                    />
                    <select
                      value={member.yearOfStudy}
                      onChange={(e) => handleMemberChange(i, "yearOfStudy", e.target.value)}
                      className="form-input glow-focus"
                    >
                      <option value="">Year of Study</option>
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>

                    {/* Delete button for added members (i > 0) — positioned to the right, not overlapping */}
                    {i > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            teamMembers: prev.teamMembers.filter((_, idx) => idx !== i),
                          }))
                        }
                        className="absolute right-[-2.75rem] top-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                      >
                        <img
                          src="/trash.svg"
                          alt="Delete"
                          className="w-12 h-12 opacity-80 hover:opacity-100 transition trash-icon"
                        />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>


            {/* File Upload */}
            <div>
              <h2 className="text-2xl font-bold text-[#FFD464] mb-4 ">Submission Files</h2>
              <div className="space-y-6">
                <div>
                  <label className="form-label">Pitch Deck (PDF/PPT) *</label>

                  <label className={`custom-upload mt-2 mb-2 cursor-pointer ${pitchDeckFile ? "selected" : ""}`}>
                    <img src="/upload.svg" alt="Upload" className="w-5 h-5 mr-2" />
                    {pitchDeckFile ? "File Selected: " + pitchDeckFile.name : "Upload File"}
                    <input
                      type="file"
                      accept=".pdf,.ppt,.pptx"
                      className="hidden"
                      onChange={(e) => setPitchDeckFile(e.target.files?.[0] || null)}
                    />
                  </label>

                  {pitchDeckFile && (
                    <p className="text-xs text-green-400 mt-1">
                      ✅ {pitchDeckFile.name} selected
                    </p>
                  )}

                  <p className="text-xs text-[#FFD464]/70 mt-1">
                    File size limit: 100MB | Allowed types: PDF, PPT
                  </p>
                </div>


                <div>
                  <label className="form-label">Pitch Deck Explainer Video *</label>

                  <label className={`custom-upload mt-2 mb-2 cursor-pointer ${pitchVideoFile ? "selected" : ""}`}>

                    <img src="/upload.svg" alt="Upload" className="w-5 h-5 mr-2" />
                    {pitchVideoFile ? "File Selected: " + pitchVideoFile.name : "Upload File"}
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => setPitchVideoFile(e.target.files?.[0] || null)}
                    />
                  </label>

                  {pitchVideoFile && (
                    <p className="text-xs text-green-400 mt-1">
                      ✅ {pitchVideoFile.name} selected
                    </p>
                  )}

                  <p className="text-xs text-[#FFD464]/70 mt-1">
                    File size limit: 100MB | Allowed types: Video
                  </p>
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-6 rounded-xl font-semibold text-lg bg-gradient-to-r from-[#E23C64] to-[#B0183D] text-white hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,94,94,0.4)] transition"
            >
              Submit
            </button>

            {message && (
              <p className="text-center text-[#FFD464] mt-4 font-medium">{message}</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
