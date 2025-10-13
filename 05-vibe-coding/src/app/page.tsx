'use client';

import { useState } from 'react';
import { Toggle } from '@/commons/components/toggle';

export default function Home() {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});

  const handleToggleChange = (key: string, checked: boolean) => {
    setToggleStates(prev => ({ ...prev, [key]: checked }));
  };

  const variants = ['primary', 'secondary', 'tertiary'] as const;
  const sizes = ['small', 'medium', 'large'] as const;
  const themes = ['light', 'dark'] as const;

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Toggle 컴포넌트 데모
        </h1>

        {themes.map(theme => (
          <div 
            key={theme}
            className={`mb-12 p-8 rounded-lg ${
              theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
            }`}
          >
            <h2 className={`text-2xl font-semibold mb-6 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {theme === 'light' ? '라이트 테마' : '다크 테마'}
            </h2>

            {variants.map(variant => (
              <div key={variant} className="mb-8">
                <h3 className={`text-xl font-medium mb-4 capitalize ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  {variant} Variant
                </h3>

                <div className="space-y-6">
                  {sizes.map(size => {
                    const key = `${theme}-${variant}-${size}`;
                    return (
                      <div key={size} className="flex items-center gap-4">
                        <div className="w-32">
                          <span className={`text-sm ${
                            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                          }`}>
                            {size}
                          </span>
                        </div>
                        <Toggle
                          checked={toggleStates[key] || false}
                          onChange={(checked) => handleToggleChange(key, checked)}
                          variant={variant}
                          size={size}
                          theme={theme}
                          ariaLabel={`${theme} ${variant} ${size} toggle`}
                        />
                        <span className={`text-sm ${
                          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {toggleStates[key] ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Disabled State */}
            <div className="mt-8">
              <h3 className={`text-xl font-medium mb-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-200'
              }`}>
                Disabled State
              </h3>
              <div className="flex gap-4 items-center">
                <Toggle
                  checked={false}
                  variant="primary"
                  size="medium"
                  theme={theme}
                  disabled
                  ariaLabel="Disabled toggle off"
                />
                <Toggle
                  checked={true}
                  variant="primary"
                  size="medium"
                  theme={theme}
                  disabled
                  ariaLabel="Disabled toggle on"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Interactive Demo */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            인터랙티브 데모
          </h2>
          <div className="flex flex-wrap gap-6">
            {variants.map(variant => 
              sizes.map(size => {
                const key = `interactive-${variant}-${size}`;
                return (
                  <div 
                    key={key}
                    className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded-lg shadow"
                  >
                    <Toggle
                      checked={toggleStates[key] || false}
                      onChange={(checked) => handleToggleChange(key, checked)}
                      variant={variant}
                      size={size}
                      theme="light"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      {variant}-{size}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
