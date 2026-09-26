import React from 'react';
import DUTemplate from './templates/DUTemplate';
import VITTemplate from './templates/VITTemplate';
import VVITTemplate from './templates/VVITTemplate';
import VignanTemplate from './templates/VignanTemplate';

export default function CollegeTemplateResolver({ collegeId, collegeName, student }: { collegeId: string, collegeName?: string, student?: any }) {
  switch (collegeId) {
    case 'delhi':
      return <DUTemplate student={student} collegeName={collegeName} />;
    case 'vit':
      return <VITTemplate student={student} collegeName={collegeName} />;
    case 'vvit':
      return <VVITTemplate student={student} collegeName={collegeName} />;
    case 'vignan':
    default:
      return <VignanTemplate student={student} collegeName={collegeName} />;
  }
}
