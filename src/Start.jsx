import { Button } from '@mui/material';
import { useQuestionsStore } from './store/questions';

export function Start() {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(10);
  };
  return (
    <Button
      onClick={handleClick}
      variant='contained'>
      Empezar!
    </Button>
  );
}
