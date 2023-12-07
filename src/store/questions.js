import { create } from 'zustand';
import confetti from 'canvas-confetti';
import { persist } from 'zustand/middleware';

export const useQuestionsStore = create(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,
        language: '',

        fetchQuestions: async (limit) => {
          const { language } = get();
          const res = await fetch(
            `https://adriane121000.github.io/javascript-quizz/${language}.json`
          );
          const json = await res.json();

          const questions = json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
          set({ questions });
        },

        selectAnswer: (questionId, answerIndex) => {
          const { questions } = get();
          // clonar el objeto con structuredClone
          const newQuestions = structuredClone(questions);
          // encontrar el indice de la pregunta
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          // obtener la info de la pregunta
          const questionInfo = newQuestions[questionIndex];
          // comprueba si el usuario a seleccionado la respuesta correcta
          const isCorrect = questionInfo.correctAnswer === answerIndex;

          if (isCorrect) confetti();

          // cambiar esta informacion en la copia de la pregunta
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrect,
            userSelectedAnswer: answerIndex,
          };
          // actualiza el estado
          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;

          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion });
          }
        },

        reset: () => {
          set({ currentQuestion: 0, questions: [] });
        },

        selectLanguage: (language) => {
          set({ language: language });
        },
      };
    },
    {
      name: 'questions',
    }
  )
);
