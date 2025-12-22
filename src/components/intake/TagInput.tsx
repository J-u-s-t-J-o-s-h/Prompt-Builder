import React from 'react';
import { Plus, X } from 'lucide-react';


interface TagInputProps {
    label: string;
    value: string[];
    onChange: (tags: string[]) => void;
    options?: string[]; // Presets
    allowCustom?: boolean;
}

export function TagInput({ label, value, onChange, options = [], allowCustom = true }: TagInputProps) {
    const [inputValue, setInputValue] = React.useState('');

    const handleAdd = (tag: string) => {
        if (!tag.trim()) return;
        if (value.includes(tag.trim())) return;
        onChange([...value, tag.trim()]);
        setInputValue('');
    };

    const handleRemove = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    const availableOptions = options.filter(opt => !value.includes(opt));

    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{label}</label>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
                {value.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-900/30 text-emerald-400 text-sm border border-emerald-900/50">
                        {tag}
                        <button onClick={() => handleRemove(tag)} className="hover:text-emerald-300">
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>

            {/* Input & Presets */}
            <div className="space-y-2">
                {allowCustom && (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAdd(inputValue);
                                }
                            }}
                            className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-3 py-1.5 text-sm text-neutral-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all placeholder:text-neutral-600"
                            placeholder={`Add ${label.toLowerCase()}...`}
                        />
                        <button
                            onClick={() => handleAdd(inputValue)}
                            className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 rounded transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                )}

                {/* Quick Options */}
                {options.length > 0 && availableOptions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {availableOptions.slice(0, 15).map(opt => (
                            <button
                                key={opt}
                                onClick={() => handleAdd(opt)}
                                className="text-xs px-2 py-0.5 rounded border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200 hover:border-neutral-600 transition-all"
                            >
                                + {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
