import { Container, Stack, Typography } from '@mui/material';
import './App.css';
import { Start } from './components/Start';
import { useQuestionsStore } from './store/questions';
import { Game } from './components/Game';

function App() {
  const questions = useQuestionsStore((state) => state.questions);

  return (
    <>
      <main>
        <Container maxWidth='sm'>
          <Stack
            direction='row'
            gap={2}
            alignItems='center'
            justifyContent='center'>
            <Typography
              variant='h2'
              component='h1'>
              Quizz App
            </Typography>
          </Stack>

          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Game />}
        </Container>
      </main>
    </>
  );
}

export default App;
