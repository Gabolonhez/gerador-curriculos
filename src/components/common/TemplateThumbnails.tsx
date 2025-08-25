import { TemplateKey } from '../TemplateTypes';
import ThumbnailMap from './TemplateThumbnailsData';

export default function TemplateThumbnails({ keyName }: { keyName: TemplateKey }) {
  return <div className="template-thumb" aria-hidden>{ThumbnailMap[keyName]}</div>;
}
