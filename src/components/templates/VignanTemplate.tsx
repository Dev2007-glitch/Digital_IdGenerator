import React from 'react';

export default function VignanTemplate({ student }: { student?: Record<string, string> }) {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl bg-[#f8f9fa] shadow-lg font-sans border border-gray-300">
      
      {/* Header */}
      <div className="h-[80px] w-full bg-white flex items-center justify-center border-b-4 border-[#33508a]">
        <div className="w-[250px] h-full py-1 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/vignan-logo.png" alt="Vignan Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="flex h-[200px] relative z-10 w-full">
        
        {/* Left Side: Photo and "STUDENT" text */}
        <div className="w-[40%] h-full flex items-center pl-6 py-4">
          <div className="border-[2px] border-gray-300 w-[110px] h-[140px] bg-white flex items-center justify-center overflow-hidden shadow-sm relative z-20">
            {student?.photoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={student.photoUrl} alt="Student" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 font-semibold text-xs">[ PHOTO ]</div>
            )}
          </div>
          
          <div className="absolute left-[135px] top-0 bottom-0 flex items-center z-10">
            <div className="transform -rotate-90 text-[26px] font-light text-[#33508a] tracking-[10px] translate-y-[10px]">
              STUDENT
            </div>
          </div>
        </div>
        
        {/* Right Side: Details */}
        <div className="w-[60%] h-full flex flex-col justify-center pl-10 pr-4 space-y-3 relative">
          
          <div className="text-[#1a365d] font-bold text-[18px] uppercase">
            {student?.name || "[ STUDENT NAME ]"}
          </div>
          <div className="text-[#1a365d] font-bold text-[20px]">
            {student?.studentId || "[ STUDENT ID ]"}
          </div>
          <div className="text-[#1a365d] font-bold text-[16px] uppercase">
            {student?.course ? student.course : "[ COURSE ]"}
            {student?.section ? ` Sec - ${student.section}` : " [ SECTION ]"}
          </div>
          <div className="text-[#1a365d] font-bold text-[18px]">
            {student?.academicYear ? student.academicYear : "[ BATCH ]"}
          </div>

          {/* Bottom Right Elements */}
          <div className="absolute bottom-2 right-4 flex flex-col items-center">
             <div className="text-[#1a7f5a] font-signature text-xl h-8 flex items-end">[ SIGNATURE ]</div>
             <div className="text-[12px] font-semibold text-gray-700">Registrar</div>
          </div>
        </div>
      </div>
      
      {/* Decorative corner background */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border-[15px] border-dashed border-gray-300 opacity-30 pointer-events-none" />
    </div>
  );
}
