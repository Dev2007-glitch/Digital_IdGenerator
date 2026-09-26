import React from 'react';
import DUTemplate from './templates/DUTemplate';
import VITTemplate from './templates/VITTemplate';
import VVITTemplate from './templates/VVITTemplate';
import VignanTemplate from './templates/VignanTemplate';

export default function CollegeTemplateResolver({ collegeId, student }: { collegeId: string, student?: Record<string, string> }) {
  switch (collegeId) {
    case 'delhi':
      return <DUTemplate student={student} />;
    case 'vit':
      return <VITTemplate student={student} />;
    case 'vvit':
      return <VVITTemplate student={student} />;
    case 'vignan':
    default:
      return <VignanTemplate student={student} />;
  }
}
