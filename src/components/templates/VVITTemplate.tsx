import React from 'react';

export default function VVITTemplate({ student }: { student?: Record<string, string> }) {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl bg-white shadow-lg font-sans border-2 border-gray-200">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[55%] bg-gradient-to-b from-[#f27a75] to-[#d95b57]" />
      <div className="absolute bottom-0 left-0 w-full h-[8%] bg-[#c64d49]" />

      <div className="absolute inset-0 z-10 flex flex-col items-center">
        {/* Photo Container */}
        <div className="mt-8 border-[3px] border-white bg-gray-100 w-[100px] h-[130px] flex flex-col items-center justify-center shadow-md">
          {student?.photoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={student.photoUrl} alt="Student" className="w-full h-full object-cover" />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 font-semibold text-xs">[ PHOTO ]</div>
          )}
        </div>

        {/* Text Details (Top Section) */}
        <div className="mt-4 text-center px-4 w-full">
          <div className="text-white font-bold text-[14px] leading-tight uppercase line-clamp-2">
            {student?.name || "[ STUDENT NAME ]"}
          </div>
          <div className="text-white font-bold text-[12px] mt-1 uppercase">
            {student?.course ? student.course : "[ COURSE ]"}
          </div>
          <div className="text-white font-bold text-[12px] mt-1">
            {student?.academicYear ? student.academicYear : "[ BATCH ]"}
          </div>
        </div>

        {/* Text Details (Bottom Section) */}
        <div className="mt-6 text-center px-4 w-full bg-white pt-2">
          <div className="text-black font-extrabold text-[18px]">
            {student?.studentId || "[ STUDENT ID ]"}
          </div>
          <div className="text-[#3b5998] font-bold text-[10px] mt-1 uppercase">
            [ ADDRESS ]
          </div>
        </div>

        {/* Logo Area */}
        <div className="mt-3 flex flex-col items-center">
          <div className="w-[140px] h-[55px] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/vvit-logo.png" alt="VVIT Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Signature */}
        <div className="mt-2 w-full pr-8 flex justify-end">
          <div className="flex flex-col items-center">
            <div className="text-[#2a7a4d] font-signature text-sm h-6 flex items-end">[ SIGNATURE ]</div>
            <div className="text-[8px] font-bold">Principal</div>
          </div>
        </div>

        {/* Footer Address */}
        <div className="absolute bottom-1 w-full text-center text-white text-[7px] font-bold px-2">
          NAMBUR, GUNTUR, A.P. INDIA - 522508<br/>
          ✆ 0863 228 3338 WWW.VVIT.NET
        </div>
      </div>
    </div>
  );
}
