import React from 'react';
import type { ThemeColors } from '../types';
import { SettingsIcon, ResetIcon, ExtendIcon, PauseIcon, PlayIcon } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface HostControlsProps {
  onReset: () => void;
  onExtend: () => void;
  onToggleSettings: () => void;
  onPauseToggle: () => void;
  isVotingOpen: boolean;
  isTimerFinished: boolean;
  theme: ThemeColors;
}

const ControlButton: React.FC<{ 
  onClick: () => void; 
  children: React.ReactNode; 
  bgColor: string; 
  hoverColor: string;
  disabled?: boolean;
}> = ({ onClick, children, bgColor, hoverColor, disabled = false }) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const effectiveBgColor = disabled ? '#4b5563' : (isHovering ? hoverColor : bgColor);
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovering(!disabled && true)}
      onMouseLeave={() => setIsHovering(false)}
      className="flex-1 flex items-center justify-center px-4 py-3 text-white font-semibold rounded-md shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      style={{ backgroundColor: effectiveBgColor }}
    >
      {children}
    </button>
  );
};


const HostControls: React.FC<HostControlsProps> = ({ onReset, onExtend, onToggleSettings, onPauseToggle, isVotingOpen, isTimerFinished, theme }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-2xl p-4 mt-8 bg-black/20 rounded-lg shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-center space-x-2 sm:space-x-4">
        <ControlButton onClick={onReset} bgColor={theme.primary} hoverColor={`${theme.primary}CC`}>
          <ResetIcon className="w-5 h-5 mr-2" />
          {t('resetButton')}
        </ControlButton>
        <ControlButton onClick={onPauseToggle} bgColor="#A4B7C6" hoverColor="#8FA6B5" disabled={isTimerFinished}>
            {isVotingOpen ? (
                <>
                    <PauseIcon className="w-5 h-5 mr-2" />
                    {t('pauseButton')}
                </>
            ) : (
                <>
                    <PlayIcon className="w-5 h-5 mr-2" />
                    {t('resumeButton')}
                </>
            )}
        </ControlButton>
        <ControlButton onClick={onExtend} bgColor={theme.accent} hoverColor={`${theme.accent}CC`}>
          <ExtendIcon className="w-5 h-5 mr-2" />
          {t('extendButton')}
        </ControlButton>
        <ControlButton onClick={onToggleSettings} bgColor="#8C9A77" hoverColor="#7A8865">
          <SettingsIcon className="w-5 h-5 mr-2" />
          {t('settingsButton')}
        </ControlButton>
      </div>
    </div>
  );
};

export default HostControls;