import { Button } from '@mui/material';
import { useQuestionsData } from '../hooks/useQuestionsData';
import { useQuestionsStore } from '../store/questions';

export function Footer() {
  const reset = useQuestionsStore((state) => state.reset);
  const { correct, incorrect, unAnswered } = useQuestionsData();

  return (
    <>
      <footer style={{ marginTop: '16px' }}>
        <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❗ ${unAnswered} sin responder`}</strong>
        <div style={{ marginTop: '16px' }}>
          <Button onClick={reset}>Resetear Juego</Button>
        </div>
      </footer>
    </>
  );
}
