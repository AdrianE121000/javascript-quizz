import {
  Stack,
  IconButton,
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useQuestionsStore } from '../store/questions';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew } from '@mui/icons-material';
import { ArrowForwardIos } from '@mui/icons-material';
import { Footer } from './Footer';

const getBackgroundColor = (info, index) => {
  const { userSelectedAnswer, correctAnswer } = info;
  //usuario no ha seleccionado nada todavia
  if (userSelectedAnswer == null) return 'transparent';
  // si ya selecciono pero es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent';
  //si es la solucion correcta
  if (index === correctAnswer) return 'green';
  // si es la seleccion del usuario pero no es la correcta
  if (index === userSelectedAnswer) return 'red';
  // si no es ninguna de las anteriores
  return 'transparent';
};

const Questions = ({ info }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);

  const createHandleClick = (answerIndex) => () => {
    selectAnswer(info.id, answerIndex);
    setTimeout(() => {
      goNextQuestion();
    }, 2000);
  };

  return (
    <Card
      variant='outlined'
      sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}>
      <Typography variant='h5'>{info.question}</Typography>
      <SyntaxHighlighter
        language='javascript'
        style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List
        sx={{ bgcolor: '#333' }}
        disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem
            key={index}
            disablePadding
            divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              sx={{ bgcolor: getBackgroundColor(info, index) }}
              onClick={createHandleClick(index)}>
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export function Game() {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((store) => store.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (store) => store.goPreviousQuestion
  );

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction='row'
        gap={2}
        alignItems='center'
        justifyContent='center'>
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Questions info={questionInfo} />
      <Footer />
    </>
  );
}
