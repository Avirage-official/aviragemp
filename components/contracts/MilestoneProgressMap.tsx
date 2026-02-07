"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, XCircle, AlertCircle } from "lucide-react";

type MilestoneStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";

type Milestone = {
  id: string;
  title: string;
  description?: string;
  deliverables: string[];
  status: MilestoneStatus;
  amount: number;
  currency: string;
  dueDate?: Date | string;
  completedAt?: Date | string;
  orderIndex: number;
};

interface MilestoneProgressMapProps {
  milestones: Milestone[];
  onMilestoneClick?: (milestone: Milestone) => void;
}

export function MilestoneProgressMap({ milestones, onMilestoneClick }: MilestoneProgressMapProps) {
  // Sort milestones by order index
  const sortedMilestones = [...milestones].sort((a, b) => a.orderIndex - b.orderIndex);

  const totalAmount = milestones.reduce((sum, m) => sum + m.amount, 0);
  const completedAmount = milestones
    .filter(m => m.status === "COMPLETED")
    .reduce((sum, m) => sum + m.amount, 0);

  const progress = totalAmount > 0 ? (completedAmount / totalAmount) * 100 : 0;

  if (milestones.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-8">
        <div className="text-center">
          <Circle className="mx-auto mb-3 h-12 w-12 text-slate-600" />
          <p className="text-sm text-slate-400">No milestones defined yet</p>
          <p className="mt-1 text-xs text-slate-500">Add milestones to track project progress</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Milestone Timeline</h3>
          <p className="text-sm text-slate-400">Project checkpoints & payment triggers</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {Math.round(progress)}%
          </div>
          <div className="text-xs text-slate-400">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 overflow-hidden rounded-full bg-slate-700/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          />
        </div>
      </div>

      {/* Milestone Timeline */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700" />

        {/* Milestones */}
        <div className="space-y-6">
          {sortedMilestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              index={index}
              total={sortedMilestones.length}
              onClick={onMilestoneClick}
            />
          ))}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg bg-slate-800/50 p-4">
        <div className="text-center">
          <div className="text-lg font-bold text-white">
            ${completedAmount.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Paid</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-white">
            ${(totalAmount - completedAmount).toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Remaining</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-white">
            ${totalAmount.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Total</div>
        </div>
      </div>
    </div>
  );
}

function MilestoneCard({
  milestone,
  index,
  total,
  onClick,
}: {
  milestone: Milestone;
  index: number;
  total: number;
  onClick?: (milestone: Milestone) => void;
}) {
  const statusConfig = {
    COMPLETED: {
      icon: CheckCircle2,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      glowColor: "shadow-green-500/20",
    },
    IN_PROGRESS: {
      icon: Clock,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      glowColor: "shadow-blue-500/20",
    },
    PENDING: {
      icon: Circle,
      color: "text-slate-400",
      bgColor: "bg-slate-500/10",
      borderColor: "border-slate-500/20",
      glowColor: "shadow-slate-500/10",
    },
    BLOCKED: {
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      glowColor: "shadow-red-500/20",
    },
  };

  const config = statusConfig[milestone.status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-16"
    >
      {/* Icon */}
      <div className="absolute left-0 top-0">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full border ${config.borderColor} ${config.bgColor} ${config.glowColor} shadow-lg backdrop-blur-sm`}
        >
          <Icon className={`h-6 w-6 ${config.color}`} />
        </div>
      </div>

      {/* Content Card */}
      <motion.button
        onClick={() => onClick?.(milestone)}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full rounded-xl border ${config.borderColor} ${config.bgColor} p-4 text-left transition-all hover:shadow-lg ${config.glowColor}`}
      >
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-white">{milestone.title}</h4>
            {milestone.description && (
              <p className="mt-1 text-sm text-slate-400 line-clamp-2">
                {milestone.description}
              </p>
            )}
          </div>
          <div className="ml-4 text-right">
            <div className="text-lg font-bold text-white">
              ${milestone.amount.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">{milestone.currency}</div>
          </div>
        </div>

        {/* Deliverables */}
        {milestone.deliverables.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {milestone.deliverables.slice(0, 3).map((deliverable, idx) => (
              <span
                key={idx}
                className="rounded-full bg-slate-700/50 px-2 py-0.5 text-xs text-slate-300"
              >
                {deliverable}
              </span>
            ))}
            {milestone.deliverables.length > 3 && (
              <span className="rounded-full bg-slate-700/50 px-2 py-0.5 text-xs text-slate-400">
                +{milestone.deliverables.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Dates */}
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
          {milestone.dueDate && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>
                Due: {new Date(milestone.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {milestone.completedAt && (
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-400" />
              <span>
                Completed: {new Date(milestone.completedAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="mt-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full ${config.bgColor} px-2 py-0.5 text-xs font-medium ${config.color}`}
          >
            <div className={`h-1.5 w-1.5 rounded-full ${config.color.replace('text-', 'bg-')}`} />
            {milestone.status.replace('_', ' ')}
          </span>
        </div>
      </motion.button>

      {/* Connector to next milestone */}
      {index < total - 1 && (
        <div className="absolute left-6 top-12 h-6 w-0.5 bg-gradient-to-b from-slate-600 to-transparent" />
      )}
    </motion.div>
  );
}
