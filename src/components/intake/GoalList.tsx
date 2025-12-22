import { Plus, X, GripVertical } from 'lucide-react';

interface GoalListProps {
    goals: string[];
    onChange: (goals: string[]) => void;
}

export function GoalList({ goals, onChange }: GoalListProps) {
    const handleChange = (index: number, val: string) => {
        const newGoals = [...goals];
        newGoals[index] = val;
        onChange(newGoals);
    };

    const handleRemove = (index: number) => {
        onChange(goals.filter((_, i) => i !== index));
    };

    const handleAdd = () => {
        onChange([...goals, '']);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Project Goals</label>
                <button
                    onClick={handleAdd}
                    className="text-xs text-emerald-500 hover:text-emerald-400 font-medium flex items-center gap-1"
                >
                    <Plus size={12} /> Add Goal
                </button>
            </div>

            <div className="space-y-2">
                {goals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-2 group">
                        <div className="mt-2 text-neutral-700 cursor-grab active:cursor-grabbing">
                            <GripVertical size={14} />
                        </div>
                        <textarea
                            value={goal}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder="e.g. Validate market demand with minimal spend..."
                            rows={2}
                            className="flex-1 bg-neutral-900 border border-neutral-800 rounded p-2 text-sm text-neutral-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all resize-none placeholder:text-neutral-600"
                        />
                        <button
                            onClick={() => handleRemove(index)}
                            className="mt-1.5 p-1 text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
            {goals.length === 0 && (
                <div
                    onClick={handleAdd}
                    className="border border-dashed border-neutral-800 rounded p-4 text-center text-xs text-neutral-600 hover:text-neutral-400 hover:border-neutral-700 cursor-pointer transition-all"
                >
                    Click to add primary goals
                </div>
            )}
        </div>
    );
}
