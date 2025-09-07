import { TemplateKey } from '../TemplateTypes';

const base = 'w-28 h-18 rounded-lg border bg-white shadow-sm p-2 flex flex-col justify-start';

export const ThumbnailMap: Record<TemplateKey, JSX.Element> = {
  optimized: (
    <div className={`${base}`} aria-hidden>
      <div className="h-3 bg-slate-900 rounded w-3/4 mb-2" />
      <div className="flex-1 space-y-1">
        <div className="h-2 bg-slate-400 rounded w-full" />
        <div className="h-2 bg-slate-300 rounded w-full" />
        <div className="h-2 bg-slate-400 rounded w-5/6" />
      </div>
      <div className="mt-2 flex space-x-2">
        <div className="h-2 bg-slate-900 rounded w-1/4" />
        <div className="h-2 bg-slate-400 rounded w-3/4" />
      </div>
    </div>
  ),
  compact: (
    <div className={`${base}`} aria-hidden>
      <div className="h-3 bg-slate-800 rounded w-1/2 mb-2" />
      <div className="h-2 bg-slate-300 rounded w-full mb-1" />
      <div className="h-2 bg-slate-300 rounded w-full mb-1" />
      <div className="h-2 bg-slate-400 rounded w-4/5 mb-1" />
      <div className="mt-auto text-[10px] text-slate-500">Skills · Experience</div>
    </div>
  ),
  simple: (
    <div className={`${base}`} aria-hidden>
      <div className="h-4 bg-slate-900 rounded w-full mb-2" />
      <div className="h-2 bg-slate-400 rounded w-4/5 mb-1" />
      <div className="h-2 bg-slate-300 rounded w-2/3 mb-1" />
      <div className="mt-auto text-[10px] text-slate-500">Minimal · Clean</div>
    </div>
  )
  ,
  twocolumn: (
    <div className={`${base}`} aria-hidden>
      <div className="h-3 bg-slate-900 rounded w-3/4 mb-2" />
      <div className="flex space-x-2">
        <div className="w-1/3 h-18 bg-slate-100 rounded" />
        <div className="flex-1 h-18 bg-white rounded p-1">
          <div className="h-2 bg-slate-400 rounded w-full mb-1" />
          <div className="h-2 bg-slate-300 rounded w-5/6 mb-1" />
          <div className="h-2 bg-slate-300 rounded w-2/3" />
        </div>
      </div>
    </div>
  )
};

export default ThumbnailMap;
