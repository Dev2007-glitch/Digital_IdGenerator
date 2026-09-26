import React from 'react';

export default function VITTemplate({ student, collegeName }: { student: any, collegeName?: string }) {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl bg-[#f0f0f0] shadow-lg font-sans border-2 border-gray-300">
      
      {/* Header */}
      <div className="h-[20%] w-full bg-white flex flex-col justify-center border-b-[3px] border-gray-800">
        <div className="flex items-center px-2">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-sm overflow-hidden p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/vit-logo.png" alt="VIT Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="text-3xl font-black text-black font-serif tracking-widest">
              VIT
            </div>
            <div className="text-[7px] font-bold text-center leading-tight mt-1">
              Vellore Institute of Technology<br/>
              (Deemed to be University under section 3 of UGC Act, 1956)
            </div>
            <div className="text-[10px] font-black uppercase mt-1 tracking-widest">
              CHENNAI CAMPUS
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[80%] flex flex-col items-center relative z-10 pt-8 pb-4">
        
        {/* Photo Container */}
        <div className="border-[2px] border-gray-300 w-[140px] h-[170px] bg-white flex items-center justify-center overflow-hidden mb-6 shadow-sm">
          {student?.photoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={student.photoUrl} alt="Student" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 font-semibold text-sm">[ PHOTO ]</div>
          )}
        </div>
        
        {/* Text Details */}
        <div className="w-full bg-white py-2 flex flex-col items-center shadow-sm">
          <div className="text-[#0a3a82] font-bold text-[18px] text-center w-full truncate px-2">
            {student?.name || "[ STUDENT NAME ]"}
          </div>
          <div className="text-black font-extrabold text-[16px] text-center mt-1">
            {student?.studentId || "[ STUDENT ID ]"}
          </div>
        </div>

        {/* Footer Role */}
        <div className="mt-auto w-full bg-[#1b3691] py-3 text-center rounded-b-xl border-t border-[#122461]">
          <div className="text-white font-black text-[20px] uppercase tracking-wider">
            {student?.role || "HOSTELLER"}
          </div>
        </div>
      </div>
    </div>
  );
}
