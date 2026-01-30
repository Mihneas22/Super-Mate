'use client';

import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Trophy,
  Target,
  GraduationCap
} from 'lucide-react'

// Mock result data - replace with API calls
const mockResult = {
  exerciseId: '1',
  exerciseTitle: 'Monotonia functiei',
  category: 'Analiza matematica',
  difficulty: 'mediu',
  totalSteps: 3,
  correctSteps: 2,
  incorrectSteps: 1,
  score: 8.5,
  maxScore: 10,
  timeSpent: '12:45',
  feedback: 'Ai demonstrat o intelegere buna a conceptelor de derivata si monotonie. Continua sa exersezi analiza semnului derivatei pentru a-ti consolida cunostintele.',
  stepResults: [
    { 
      index: 0, 
      instruction: 'Calculeaza derivata functiei', 
      isCorrect: true, 
      userAnswer: 'f\'(x) = 3x² - 3',
      attempts: 1
    },
    { 
      index: 1, 
      instruction: 'Analizeaza semnul derivatei', 
      isCorrect: false, 
      userAnswer: 'f\'(x) > 0 pentru orice x',
      correctAnswer: 'f\'(x) >= 0 pentru x >= 1 deoarece 3x² - 3 = 3(x² - 1) >= 0 cand x >= 1',
      attempts: 2
    },
    { 
      index: 2, 
      instruction: 'Formuleaza concluzia', 
      isCorrect: true, 
      userAnswer: 'Deoarece f\'(x) >= 0 pentru x >= 1, functia f este crescatoare pe [1, +∞)',
      attempts: 1
    },
  ],
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function ResultPage() {
  const { id } = useParams()
  
  const scorePercentage = (mockResult.score / mockResult.maxScore) * 100
  const isExcellent = scorePercentage >= 90
  const isGood = scorePercentage >= 70 && scorePercentage < 90
  const isPassing = scorePercentage >= 50 && scorePercentage < 70

  const getScoreColor = () => {
    if (isExcellent) return 'text-success'
    if (isGood) return 'text-chart-3'
    if (isPassing) return 'text-warning'
    return 'text-destructive'
  }

  const getScoreMessage = () => {
    if (isExcellent) return 'Excelent!'
    if (isGood) return 'Foarte bine!'
    if (isPassing) return 'Bine!'
    return 'Mai exerseaza!'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link to="/exercises" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowRight className="size-4 rotate-180" />
            Inapoi la exercitii
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-6"
        >
          {/* Score Card */}
          <motion.div variants={fadeInUp}>
            <Card className="overflow-hidden">
              <div className={`h-2 ${isExcellent ? 'bg-success' : isGood ? 'bg-chart-3' : isPassing ? 'bg-warning' : 'bg-destructive'}`} />
              <CardContent className="p-6 sm:p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-4"
                >
                  <div className={`size-20 mx-auto rounded-full flex items-center justify-center ${
                    isExcellent ? 'bg-success/10' : isGood ? 'bg-chart-3/10' : isPassing ? 'bg-warning/10' : 'bg-destructive/10'
                  }`}>
                    <Trophy className={`size-10 ${getScoreColor()}`} />
                  </div>
                </motion.div>
                
                <h1 className="text-3xl font-bold mb-2">{getScoreMessage()}</h1>
                <p className="text-muted-foreground mb-6">{mockResult.exerciseTitle}</p>
                
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <div>
                    <p className={`text-4xl font-bold ${getScoreColor()}`}>
                      {mockResult.score}
                    </p>
                    <p className="text-sm text-muted-foreground">din {mockResult.maxScore} puncte</p>
                  </div>
                  <div className="w-px h-12 bg-border hidden sm:block" />
                  <div>
                    <p className="text-4xl font-bold text-foreground">
                      {mockResult.correctSteps}/{mockResult.totalSteps}
                    </p>
                    <p className="text-sm text-muted-foreground">pasi corecti</p>
                  </div>
                  <div className="w-px h-12 bg-border hidden sm:block" />
                  <div>
                    <p className="text-4xl font-bold text-foreground">
                      {mockResult.timeSpent}
                    </p>
                    <p className="text-sm text-muted-foreground">timp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feedback */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="size-5 text-primary" />
                  Feedback personalizat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {mockResult.feedback}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step by Step Results */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="size-5 text-primary" />
                  Detalii pe pasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockResult.stepResults.map((step, index) => (
                  <div
                    key={step.index}
                    className={`p-4 rounded-lg border ${
                      step.isCorrect ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`size-6 rounded-full flex items-center justify-center shrink-0 ${
                        step.isCorrect ? 'bg-success' : 'bg-destructive'
                      }`}>
                        {step.isCorrect ? (
                          <CheckCircle2 className="size-4 text-success-foreground" />
                        ) : (
                          <XCircle className="size-4 text-destructive-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-medium">Pasul {index + 1}</span>
                          <Badge variant={step.isCorrect ? 'success' : 'destructive'} className="text-xs">
                            {step.isCorrect ? 'Corect' : 'Incorect'}
                          </Badge>
                          {step.attempts > 1 && (
                            <span className="text-xs text-muted-foreground">
                              ({step.attempts} incercari)
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{step.instruction}</p>
                        <div className="p-2 bg-background rounded text-sm font-mono">
                          {step.userAnswer}
                        </div>
                        {!step.isCorrect && step.correctAnswer && (
                          <div className="mt-2 p-2 bg-success/10 rounded text-sm">
                            <p className="text-xs text-muted-foreground mb-1">Raspuns corect:</p>
                            <p className="text-success">{step.correctAnswer}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/exercise/${id}`}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-transparent">
                <RotateCcw className="size-4" />
                Reincearca exercitiul
              </Button>
            </Link>
            <Link to="/exercises">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Exercitiu nou
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
