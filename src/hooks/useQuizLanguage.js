import { useState } from 'react';

export function useQuizLanguage() {
  const [language, setLanguage] = useState('');

  return { language, setLanguage };
}
