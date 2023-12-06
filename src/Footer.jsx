import { Button } from '@mui/material';
import { useQuestionsStore } from './store/questions';

export function Footer() {
  const reset = useQuestionsStore((state) => state.reset);
  const questions = useQuestionsStore((state) => state.questions);

  let correct = 0;
  let incorrect = 0;
  let unAnswered = 0;

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer == null) unAnswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });
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
