import React from 'react';

export default function DUTemplate({ student }: { student?: Record<string, string> }) {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl bg-white shadow-lg font-sans flex border-2 border-gray-200">
      
      {/* Left Blue Column */}
      <div className="w-[35%] h-full bg-[#1e73be] flex flex-col items-center pt-8 px-4 text-white">
        <div className="w-[100px] h-[120px] bg-white rounded-xl overflow-hidden flex items-center justify-center border-4 border-white shadow-md mb-6">
          {student?.photoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={student.photoUrl} alt="Student" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 font-semibold text-xs">[ PHOTO ]</div>
          )}
        </div>
        
        <div className="w-full text-[11px] font-bold mb-1">Name:</div>
        <div className="w-full text-[13px] font-bold mb-3 truncate">{student?.name || "[ NAME ]"}</div>
        
        <div className="w-full text-[11px] font-bold mb-1">Program:</div>
        <div className="w-full text-[13px] font-bold mb-3 truncate">{student?.course || "[ PROGRAM ]"}</div>
      </div>

      {/* Right White Column */}
      <div className="w-[65%] h-full relative bg-white pt-6 pl-4 pr-6 pb-20">
        
        {/* Header Logo & Name */}
        <div className="flex items-start mb-6">
          <div className="w-14 h-14 bg-transparent flex items-center justify-center mr-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/du-logo.png" alt="DU Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col pt-1">
            <div className="text-[20px] font-serif text-[#0e4b8f] font-bold uppercase tracking-wide">
              DELHI UNIVERSITY
            </div>
            <div className="text-[12px] font-serif text-[#0e4b8f] font-semibold">
              Lady Shri Ram College for Women
            </div>
          </div>
        </div>

        {/* Student Name */}
        <div className="mb-4">
          <div className="text-[22px] font-black text-black leading-tight">
            {student?.name || "[ STUDENT NAME ]"}
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 gap-1.5 text-[14px]">
          <div className="flex">
            <span className="font-semibold text-gray-800 w-24">Student ID:</span>
            <span className="font-semibold text-black flex-1">{student?.studentId || "[ STUDENT ID ]"}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-800 w-24">Program:</span>
            <span className="font-semibold text-black flex-1">{student?.course || "[ PROGRAM ]"}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-800 w-24">Issue Date:</span>
            <span className="font-semibold text-black flex-1">[ ISSUE DATE ]</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-800 w-24">Valid Thru:</span>
            <span className="font-semibold text-black flex-1">{student?.validUntil || "[ VALID THROUGH ]"}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
