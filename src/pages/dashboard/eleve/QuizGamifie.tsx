import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Trophy,
  Star,
  Zap,
  Target,
  Clock,
  Check,
  X,
  Play,
  RotateCcw,
  Award,
  Medal,
  Crown,
  Sparkles,
  BookOpen,
  TrendingUp,
} from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  subject: string;
  level: string;
  duration: number;
  questionCount: number;
  difficulty: "facile" | "moyen" | "difficile";
  xpReward: number;
  badgeReward?: string;
  isCompleted: boolean;
  bestScore?: number;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export default function QuizGamifie() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(5);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const sampleQuizzes: Quiz[] = [
      {
        id: "quiz_001",
        title: "Les fractions et leurs opérations",
        subject: "Mathématiques",
        level: "6ème",
        duration: 15,
        questionCount: 2,
        difficulty: "facile",
        xpReward: 100,
        badgeReward: "fraction_master",
        isCompleted: false,
        questions: [
          {
            id: "q1",
            question: "Quelle est la fraction équivalente à 1/2 ?",
            options: ["2/4", "3/5", "1/3", "4/6"],
            correctAnswer: 0,
            explanation: "2/4 = 1/2 car 2÷2 = 1 et 4÷2 = 2",
            points: 10,
          },
          {
            id: "q2",
            question: "Comment additionne-t-on 1/3 + 1/6 ?",
            options: ["2/9", "1/2", "2/6", "1/9"],
            correctAnswer: 1,
            explanation: "1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2",
            points: 15,
          },
        ],
      },
      {
        id: "quiz_002",
        title: "Géométrie : Les angles",
        subject: "Mathématiques",
        level: "5ème",
        duration: 20,
        questionCount: 8,
        difficulty: "moyen",
        xpReward: 150,
        isCompleted: true,
        bestScore: 85,
        questions: [],
      },
    ];

    const sampleBadges: Badge[] = [
      {
        id: "first_quiz",
        name: "Premier Quiz",
        description: "Terminer votre premier quiz",
        icon: "🎯",
        color: "bg-blue-100 text-blue-800",
        isUnlocked: true,
        unlockedAt: "2024-03-01T10:00:00Z",
      },
      {
        id: "fraction_master",
        name: "Maître des Fractions",
        description: "Réussir le quiz sur les fractions avec 80%+",
        icon: "🔢",
        color: "bg-green-100 text-green-800",
        isUnlocked: false,
      },
      {
        id: "speed_demon",
        name: "Éclair de Rapidité",
        description: "Terminer un quiz en moins de 10 minutes",
        icon: "⚡",
        color: "bg-yellow-100 text-yellow-800",
        isUnlocked: true,
        unlockedAt: "2024-03-05T14:30:00Z",
      },
    ];

    setQuizzes(sampleQuizzes);
    setBadges(sampleBadges);
    setLoading(false);
  };

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(quiz.duration * 60);
    setIsQuizActive(true);
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (!currentQuiz) return;

    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    let newScore = score;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      newScore += currentQuestion.points;
      setScore(newScore);
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      finishQuiz(newScore);
    }
  };

  const finishQuiz = (finalScore: number) => {
    setIsQuizActive(false);
    setShowResults(true);

    const percentage = (finalScore / getTotalPoints()) * 100;
    const newXp = xp + currentQuiz!.xpReward;
    setXp(newXp);

    if (percentage >= 80 && currentQuiz!.badgeReward) {
      unlockBadge(currentQuiz!.badgeReward);
    }

    toast({
      title: "Quiz terminé !",
      description: `Score: ${percentage.toFixed(0)}% - +${currentQuiz!.xpReward} XP`,
    });
  };

  const unlockBadge = (badgeId: string) => {
    setBadges(
      badges.map((badge) =>
        badge.id === badgeId
          ? { ...badge, isUnlocked: true, unlockedAt: new Date().toISOString() }
          : badge,
      ),
    );

    const badge = badges.find((b) => b.id === badgeId);
    if (badge) {
      toast({
        title: "🎉 Nouveau badge débloqué !",
        description: `${badge.icon} ${badge.name}`,
      });
    }
  };

  const getTotalPoints = () => {
    return (
      currentQuiz?.questions.reduce(
        (total, question) => total + question.points,
        0,
      ) || 0
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "facile":
        return "bg-green-100 text-green-800";
      case "moyen":
        return "bg-yellow-100 text-yellow-800";
      case "difficile":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <DashboardLayout userType="eleve">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement des quiz...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isQuizActive && currentQuiz) {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const progress =
      ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

    return (
      <DashboardLayout userType="eleve">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{currentQuiz.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>
                    {Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  <span>{score} pts</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Question {currentQuestionIndex + 1} sur{" "}
                  {currentQuiz.questions.length}
                </span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="bg-white/20" />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold mb-6">
                    {currentQuestion.question}
                  </h2>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedAnswer === index
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                              selectedAnswer === index
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedAnswer === index && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          {option}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="px-8"
                    >
                      {currentQuestionIndex < currentQuiz.questions.length - 1
                        ? "Question suivante"
                        : "Terminer le quiz"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </DashboardLayout>
    );
  }

  if (showResults && currentQuiz) {
    const percentage = (score / getTotalPoints()) * 100;

    return (
      <DashboardLayout userType="eleve">
        <motion.div
          className="max-w-2xl mx-auto space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="text-center">
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-2">Quiz terminé !</h1>
              <p className="text-xl text-gray-600 mb-6">{currentQuiz.title}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {percentage.toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-600">Score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{score}</p>
                  <p className="text-sm text-gray-600">Points</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    +{currentQuiz.xpReward}
                  </p>
                  <p className="text-sm text-gray-600">XP</p>
                </div>
              </div>
              <div className="flex space-x-4 justify-center">
                <Button onClick={() => setShowResults(false)}>
                  Retour aux quiz
                </Button>
                <Button
                  variant="outline"
                  onClick={() => startQuiz(currentQuiz)}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Refaire
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="eleve">
      <div className="space-y-6">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Quiz Gamifiés
            </h1>
            <p className="text-gray-600 mt-1">
              Testez vos connaissances et gagnez des points d'expérience !
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm opacity-90">Niveau</p>
                <p className="text-xl font-bold">{level}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-90">XP</p>
                <p className="text-xl font-bold">{xp.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-90">Badges</p>
                <p className="text-xl font-bold">
                  {badges.filter((b) => b.isUnlocked).length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Mes Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    className={`p-4 rounded-lg text-center ${
                      badge.isUnlocked
                        ? badge.color
                        : "bg-gray-100 text-gray-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    title={badge.description}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <p className="text-xs font-medium">{badge.name}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                    {quiz.isCompleted && (
                      <div className="flex items-center text-green-600">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-xs">Terminé</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">
                    {quiz.title}
                  </h3>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Matière:</span>
                      <span>{quiz.subject}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Niveau:</span>
                      <span>{quiz.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Questions:</span>
                      <span>{quiz.questionCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Durée:</span>
                      <span>{quiz.duration} min</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-purple-600">
                      <Sparkles className="w-3 h-3 mr-1" />
                      <span>+{quiz.xpReward} XP</span>
                    </div>
                    {quiz.bestScore && (
                      <div className="text-sm text-green-600">
                        Meilleur: {quiz.bestScore}%
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => startQuiz(quiz)}
                    className="w-full"
                    variant={quiz.isCompleted ? "outline" : "default"}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {quiz.isCompleted ? "Refaire" : "Commencer"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
