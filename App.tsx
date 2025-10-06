import React, { useState, useEffect, useCallback } from 'react';
import VoteCard from './components/VoteCard';
import ResultsBar from './components/ResultsBar';
import TimerDisplay from './components/TimerDisplay';
import HostControls from './components/HostControls';
import SettingsPanel from './components/SettingsPanel';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useLanguage } from './contexts/LanguageContext';
import type { ThemeColors, VoteOption } from './types';
import { DEFAULT_TIMER_DURATION, INITIAL_THEME } from './constants';

const MORANDI_PALETTE = [
  '#9A8C98', // Muted purple/grey
  '#A3B18A', // Sage green
  '#B98B73', // Dusty terracotta
  '#6D6875', // Slate grey
  '#E5989B', // Muted pink
  '#7E938D', // Dusty teal
  '#B5838D', // Rose brown
  '#585123', // Olive green
];

const getNewOptionColor = (numOptions: number) => {
  // Cycle through the palette to avoid repeating colors too soon
  return MORANDI_PALETTE[numOptions % MORANDI_PALETTE.length];
};

const App: React.FC = () => {
  const { t, language } = useLanguage();

  const [options, setOptions] = useState<VoteOption[]>(() => [
    { id: `option-${Date.now()}-1`, name: 'Option A', votes: 12, color: '#5F7161' },
    { id: `option-${Date.now()}-2`, name: 'Option B', votes: 8, color: '#4C516D' },
  ]);
  const [timer, setTimer] = useState(DEFAULT_TIMER_DURATION);
  const [timerDuration, setTimerDuration] = useState(DEFAULT_TIMER_DURATION);
  const [isVotingOpen, setIsVotingOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeColors>(INITIAL_THEME);

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  useEffect(() => {
    let interval: number | undefined;
    if (isVotingOpen && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isVotingOpen) {
      setIsVotingOpen(false);
    }
    return () => clearInterval(interval);
  }, [isVotingOpen, timer]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleVote = useCallback((optionId: string) => {
    if (!isVotingOpen) return;
    setOptions(prevOptions => 
      prevOptions.map(option => 
        option.id === optionId ? { ...option, votes: option.votes + 1 } : option
      )
    );
  }, [isVotingOpen]);

  const handleReset = useCallback(() => {
    setOptions(prevOptions => 
      prevOptions.map(option => ({ ...option, votes: 0 }))
    );
    setTimer(timerDuration);
    setIsVotingOpen(true);
  }, [timerDuration]);

  const handleExtend = useCallback(() => {
    setTimer((prev) => prev + 10);
    if (!isVotingOpen && timer <= 0) {
        setIsVotingOpen(true);
    }
  }, [isVotingOpen, timer]);

  const handlePauseToggle = useCallback(() => {
    if (timer > 0) {
      setIsVotingOpen(prev => !prev);
    }
  }, [timer]);

  const handleThemeChange = useCallback((newTheme: Partial<ThemeColors>) => {
    setTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
  }, []);

  const handleAddOption = useCallback(() => {
    const newOption: VoteOption = {
      id: `option-${Date.now()}`,
      name: `${t('newOptionDefaultName')} ${options.length + 1}`,
      votes: 0,
      color: getNewOptionColor(options.length),
    };
    setOptions(prev => [...prev, newOption]);
  }, [options.length, t]);

  const handleUpdateOption = useCallback((id: string, newValues: Partial<VoteOption>) => {
    setOptions(prev => prev.map(opt => opt.id === id ? { ...opt, ...newValues } : opt));
  }, []);

  const handleDeleteOption = useCallback((id: string) => {
    if (options.length <= 2) return; // Prevent deleting below 2 options
    setOptions(prev => prev.filter(opt => opt.id !== id));
  }, [options.length]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-500"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <LanguageSwitcher />
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">{t('title')}</h1>
        <p className="text-lg text-gray-400 mb-6">{t('subtitle')}</p>
        
        <div className="mb-8">
            <TimerDisplay seconds={timer} isVotingOpen={isVotingOpen} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {options.map(option => (
            <VoteCard 
              key={option.id}
              label={option.name} 
              onVote={() => handleVote(option.id)} 
              disabled={!isVotingOpen} 
              color={option.color} 
            />
          ))}
        </div>
        
        <div className="w-full bg-black/20 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-left">{t('resultsTitle')}</h2>
            {options.map(option => {
              const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
              return (
                <ResultsBar 
                  key={option.id}
                  label={option.name} 
                  votes={option.votes} 
                  percentage={percentage} 
                  color={option.color} 
                  votesSuffix={t('votesSuffix')} 
                />
              );
            })}
        </div>
      </main>

      <HostControls
        onReset={handleReset}
        onExtend={handleExtend}
        onToggleSettings={() => setIsSettingsOpen(true)}
        onPauseToggle={handlePauseToggle}
        isVotingOpen={isVotingOpen}
        isTimerFinished={timer <= 0}
        theme={theme}
      />
      
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onThemeChange={handleThemeChange}
        options={options}
        onAddOption={handleAddOption}
        onUpdateOption={handleUpdateOption}
        onDeleteOption={handleDeleteOption}
      />
    </div>
  );
};

export default App;