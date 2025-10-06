import React from 'react';
import type { ThemeColors, VoteOption } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeColors;
  onThemeChange: (newTheme: Partial<ThemeColors>) => void;
  options: VoteOption[];
  onAddOption: () => void;
  onUpdateOption: (id: string, newValues: Partial<VoteOption>) => void;
  onDeleteOption: (id: string) => void;
}

const ColorInput: React.FC<{ label: string; value: string; onChange: (color: string) => void }> = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between">
        <label className="text-gray-300">{label}</label>
        <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-24 h-8 p-1 bg-gray-700 border border-gray-600 rounded cursor-pointer"
        />
    </div>
);

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
    isOpen, 
    onClose, 
    theme, 
    onThemeChange,
    options,
    onAddOption,
    onUpdateOption,
    onDeleteOption 
}) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const canDelete = options.length > 2;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <div 
        className="bg-gray-800/80 border border-gray-700 text-white p-6 rounded-lg shadow-2xl w-full max-w-md" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t('settingsTitle')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>
        
        {/* Vote Options Section */}
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">{t('voteOptionsTitle')}</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {options.map((option) => (
                    <div key={option.id} className="grid grid-cols-[1fr_auto_auto] gap-3 items-center bg-gray-900/50 p-2 rounded-lg">
                        <input
                            type="text"
                            value={option.name}
                            onChange={(e) => onUpdateOption(option.id, { name: e.target.value })}
                            className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white"
                            aria-label={`${t('optionNameLabel')} for ${option.name}`}
                        />
                        <input
                            type="color"
                            value={option.color}
                            onChange={(e) => onUpdateOption(option.id, { color: e.target.value })}
                            className="w-16 h-8 p-0 border-none rounded cursor-pointer"
                            aria-label={`${t('optionColorLabel')} for ${option.name}`}
                        />
                        <button
                            onClick={() => onDeleteOption(option.id)}
                            disabled={!canDelete}
                            className="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded text-white disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors font-bold text-lg"
                            aria-label={`${t('deleteOptionButton')} ${option.name}`}
                        >
                          &times;
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={onAddOption}
                className="w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold transition-colors"
            >
                {t('addOptionButton')}
            </button>
        </div>

        <hr className="border-gray-600 my-6" />

        {/* General Appearance Section */}
        <div>
            <h3 className="text-xl font-semibold mb-4">{t('appearanceTitle')}</h3>
            <div className="space-y-4">
                <ColorInput 
                    label={t('backgroundColor')} 
                    value={theme.background}
                    onChange={(color) => onThemeChange({ background: color })}
                />
                <ColorInput 
                    label={t('primaryButtonColor')} 
                    value={theme.primary}
                    onChange={(color) => onThemeChange({ primary: color })}
                />
                 <ColorInput 
                    label={t('accentColor')} 
                    value={theme.accent}
                    onChange={(color) => onThemeChange({ accent: color })}
                />
            </div>
        </div>

        <div className="mt-8 text-center">
            <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold transition-colors"
            >
                {t('closeButton')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
