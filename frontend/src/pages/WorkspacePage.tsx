'use client';

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { MixedContent } from '../components/MathRenderer'
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Lock,
  Send,
  GraduationCap,
  Lightbulb
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock exercise data - replace with API calls
const mockExercise = {
  id: '1',
  title: 'Monotonia functiei',
  category: 'Analiza matematica',
  difficulty: 'mediu',
  problemStatement: 'Fie functia $f: \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^3 - 3x + 2$. Demonstrati ca $f$ este strict crescatoare pe intervalul $[1, +\\infty)$.',
  steps: [
    {
      index: 0,
      instruction: 'Calculeaza derivata functiei $f(x) = x^3 - 3x + 2$',
      hint: 'Foloseste formula $(x^n)\' = n \\cdot x^{n-1}$',
      inputType: 'math',
      placeholder: 'f\'(x) = ...',
    },
    {
      index: 1,
      instruction: 'Analizeaza semnul derivatei pentru $x \\geq 1$. Ce observi?',
      hint: 'Calculeaza $f\'(1)$ si gandeste-te la forma derivatei',
      inputType: 'math',
      placeholder: 'f\'(x) >= ... pentru x >= 1',
    },
    {
      index: 2,
      instruction: 'Formuleaza concluzia despre monotonia functiei pe $[1, +\\infty)$',
      hint: 'Ce inseamna cand derivata este pozitiva pe un interval?',
      inputType: 'text',
      placeholder: 'Deoarece f\'(x) >= 0 pentru x >= 1, rezulta ca...',
    },
  ],
}

type StepStatus = 'locked' | 'current' | 'correct' | 'incorrect'

interface StepState {
  status: StepStatus
  answer: string
  feedback?: string
}

export default function WorkspacePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [steps, setSteps] = useState<StepState[]>(
    mockExercise.steps.map((_, index) => ({
      status: index === 0 ? 'current' : 'locked',
      answer: '',
    }))
  )
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const currentStepIndex = steps.findIndex(s => s.status === 'current')
  const completedSteps = steps.filter(s => s.status === 'correct').length
  const progress = (completedSteps / mockExercise.steps.length) * 100

  const handleSubmitStep = async () => {
    if (!currentAnswer.trim() || currentStepIndex === -1) return
    
    setIsSubmitting(true)
    
    // TODO: Submit to backend API
    // const response = await exercisesApi.submitStep(id!, currentStepIndex, currentAnswer)
    
    // Simulate API response
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock validation - in real app, this comes from backend
    const isCorrect = Math.random() > 0.3 // 70% chance of correct for demo
    
    setSteps(prev => {
      const newSteps = [...prev]
      newSteps[currentStepIndex] = {
        status: isCorrect ? 'correct' : 'incorrect',
        answer: currentAnswer,
        feedback: isCorrect 
          ? 'Foarte bine! Raspunsul este corect.' 
          : 'Nu este corect. Verifica calculele si incearca din nou.',
      }
      
      // Unlock next step if correct
      if (isCorrect && currentStepIndex < mockExercise.steps.length - 1) {
        newSteps[currentStepIndex + 1] = {
          ...newSteps[currentStepIndex + 1],
          status: 'current',
        }
      }
      
      return newSteps
    })
    
    setCurrentAnswer('')
    setShowHint(false)
    setIsSubmitting(false)
    
    // If all steps completed, navigate to result
    if (isCorrect && currentStepIndex === mockExercise.steps.length - 1) {
      setTimeout(() => {
        navigate(`/result/${id}`)
      }, 1500)
    }
  }

  const handleRetryStep = () => {
    setSteps(prev => {
      const newSteps = [...prev]
      newSteps[currentStepIndex] = {
        status: 'current',
        answer: '',
      }
      return newSteps
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/exercises">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-sm truncate">{mockExercise.title}</h1>
              <p className="text-xs text-muted-foreground">{mockExercise.category}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Progress value={progress} className="w-24 sm:w-32 h-2" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {completedSteps}/{mockExercise.steps.length}
              </span>
            </div>
            <Badge variant={mockExercise.difficulty === 'usor' ? 'default' : mockExercise.difficulty === 'mediu' ? 'secondary' : 'destructive'}>
              {mockExercise.difficulty === 'usor' ? 'Usor' : mockExercise.difficulty === 'mediu' ? 'Mediu' : 'Greu'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Problem Statement */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="size-5 text-primary" />
                Enunt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg leading-relaxed">
                <MixedContent content={mockExercise.problemStatement} />
              </div>
            </CardContent>
          </Card>

          {/* Steps */}
          <div className="space-y-4">
            {mockExercise.steps.map((step, index) => {
              const stepState = steps[index]
              const isLocked = stepState.status === 'locked'
              const isCurrent = stepState.status === 'current'
              const isCorrect = stepState.status === 'correct'
              const isIncorrect = stepState.status === 'incorrect'

              return (
                <motion.div
                  key={step.index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={cn(
                    'transition-all',
                    isLocked && 'opacity-50',
                    isCurrent && 'ring-2 ring-primary/50',
                    isCorrect && 'border-success/50 bg-success/5',
                    isIncorrect && 'border-destructive/50 bg-destructive/5'
                  )}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start gap-4">
                        {/* Step Number */}
                        <div className={cn(
                          'size-8 rounded-full flex items-center justify-center shrink-0 font-medium text-sm',
                          isLocked && 'bg-muted text-muted-foreground',
                          isCurrent && 'bg-primary text-primary-foreground',
                          isCorrect && 'bg-success text-success-foreground',
                          isIncorrect && 'bg-destructive text-destructive-foreground'
                        )}>
                          {isLocked ? (
                            <Lock className="size-4" />
                          ) : isCorrect ? (
                            <CheckCircle2 className="size-5" />
                          ) : isIncorrect ? (
                            <XCircle className="size-5" />
                          ) : (
                            index + 1
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Step Instruction */}
                          <p className="font-medium mb-3">
                            <MixedContent content={step.instruction} />
                          </p>

                          {/* Input / Answer Area */}
                          {!isLocked && (
                            <AnimatePresence mode="wait">
                              {isCurrent && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="space-y-3"
                                >
                                  <div className="flex gap-2">
                                    <Input
                                      value={currentAnswer}
                                      onChange={(e) => setCurrentAnswer(e.target.value)}
                                      placeholder={step.placeholder}
                                      disabled={isSubmitting}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                          e.preventDefault()
                                          handleSubmitStep()
                                        }
                                      }}
                                      className="font-mono"
                                    />
                                    <Button 
                                      onClick={handleSubmitStep}
                                      disabled={!currentAnswer.trim() || isSubmitting}
                                    >
                                      {isSubmitting ? (
                                        <span className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                      ) : (
                                        <Send className="size-4" />
                                      )}
                                    </Button>
                                  </div>
                                  
                                  {/* Hint Toggle */}
                                  <div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setShowHint(!showHint)}
                                      className="text-xs gap-1"
                                    >
                                      <Lightbulb className="size-3" />
                                      {showHint ? 'Ascunde indiciu' : 'Arata indiciu'}
                                    </Button>
                                    <AnimatePresence>
                                      {showHint && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="mt-2 p-3 bg-muted rounded-lg text-sm"
                                        >
                                          <MixedContent content={step.hint} />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </motion.div>
                              )}

                              {(isCorrect || isIncorrect) && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="space-y-3"
                                >
                                  {/* Submitted Answer */}
                                  <div className="p-3 bg-muted rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Raspunsul tau:</p>
                                    <p className="font-mono text-sm">{stepState.answer}</p>
                                  </div>
                                  
                                  {/* Feedback */}
                                  <div className={cn(
                                    'p-3 rounded-lg text-sm',
                                    isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                                  )}>
                                    {stepState.feedback}
                                  </div>
                                  
                                  {/* Retry Button */}
                                  {isIncorrect && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={handleRetryStep}
                                    >
                                      Incearca din nou
                                    </Button>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Completion Message */}
          {completedSteps === mockExercise.steps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="bg-success/10 border-success/30">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="size-12 text-success mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-success mb-2">Felicitari!</h2>
                  <p className="text-muted-foreground mb-4">
                    Ai completat cu succes toate pasii exercitiului.
                  </p>
                  <Button onClick={() => navigate(`/result/${id}`)}>
                    Vezi rezultatul
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
