import { motion } from 'motion/react';
import { FileText, Presentation, Globe, Table2, Image, FileBarChart, ExternalLink, Download } from 'lucide-react';
import { Modal } from '@/components/shared/modal';
import type { Artifact, ArtifactType, WorkplanStep } from '@/types/flow';

interface FlowArtifactsModalProps {
  open: boolean;
  onClose: () => void;
  artifacts: Artifact[];
  steps: WorkplanStep[];
  flowTitle: string;
}

const TYPE_CONFIG: Record<ArtifactType, { icon: typeof FileText; label: string; color: string; bg: string }> = {
  document:      { icon: FileText,      label: 'Document',      color: 'text-blue-600',   bg: 'bg-blue-50' },
  presentation:  { icon: Presentation,  label: 'Presentation',  color: 'text-orange-600', bg: 'bg-orange-50' },
  website:       { icon: Globe,         label: 'Website',       color: 'text-emerald-600', bg: 'bg-emerald-50' },
  spreadsheet:   { icon: Table2,        label: 'Spreadsheet',   color: 'text-green-600',  bg: 'bg-green-50' },
  image:         { icon: Image,         label: 'Image',         color: 'text-purple-600', bg: 'bg-purple-50' },
  report:        { icon: FileBarChart,  label: 'Report',        color: 'text-indigo-600', bg: 'bg-indigo-50' },
};

export function FlowArtifactsModal({ open, onClose, artifacts, steps, flowTitle }: FlowArtifactsModalProps) {
  const getStepLabel = (stepId?: number) => {
    if (!stepId) return null;
    const step = steps.find((s) => s.id === stepId);
    return step ? `Step ${stepId}: ${step.label}` : null;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title="Artifacts"
      subtitle={`${artifacts.length} file${artifacts.length !== 1 ? 's' : ''} from ${flowTitle}`}
    >
      <div className="px-3 py-3">
        {artifacts.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-[13px] text-gray-300 font-medium">No artifacts yet</p>
          </div>
        ) : (
          <div className="space-y-1">
            {artifacts.map((artifact, idx) => {
              const config = TYPE_CONFIG[artifact.type];
              const Icon = config.icon;
              const stepLabel = getStepLabel(artifact.stepId);

              return (
                <motion.div
                  key={artifact.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.2 }}
                  className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-[#F2F7FF] transition-colors cursor-pointer group"
                >
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-black truncate">
                        {artifact.name}
                      </span>
                      {artifact.type === 'website' && (
                        <ExternalLink className="w-3 h-3 text-gray-300 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5 truncate">
                      {artifact.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                      {artifact.size && (
                        <span className="text-[10px] text-gray-300 font-medium">{artifact.size}</span>
                      )}
                      {stepLabel && (
                        <span className="text-[10px] text-gray-300 font-medium truncate">· {stepLabel}</span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 pt-1">
                    {artifact.type === 'website' ? (
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#DDE9F6] transition-colors">
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#DDE9F6] transition-colors">
                        <Download className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}
