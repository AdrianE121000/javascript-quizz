import { Box, Button } from '@mui/material';
import { useQuestionsStore } from '../store/questions';

export function Start() {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);
  const selectLanguage = useQuestionsStore((state) => state.selectLanguage);

  const handleClick = (e) => {
    selectLanguage(e.target.innerText.toLowerCase());
    fetchQuestions(10);
  };
  return (
    <>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={handleClick}
          variant='contained'>
          JavaScript
        </Button>
        <Button
          onClick={handleClick}
          variant='contained'>
          Python
        </Button>
      </Box>
    </>
  );
}
