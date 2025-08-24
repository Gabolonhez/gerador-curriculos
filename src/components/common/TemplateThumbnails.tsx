import React from 'react';
import { TemplateKey } from '../../components/ResumePreview';
import ThumbnailMap from './TemplateThumbnailsData';

export default function TemplateThumbnails({ keyName }: { keyName: TemplateKey }) {
  return <div className="template-thumb" aria-hidden>{ThumbnailMap[keyName]}</div>;
}
