'use client';

import { motion } from 'framer-motion'
import { AppLayout } from '../components/AppLayout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  BookOpen,
  Calculator,
  FunctionSquare,
  Grid3X3,
  Star,
  Flame
} from 'lucide-react'

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

// Mock progress data - replace with API calls
const mockProgress = {
  totalExercises: 45,
  completedExercises: 28,
  averageScore: 7.8,
  streak: 5,
  totalTime: '12h 35min',
  categories: [
    { 
      id: 'analiza', 
      name: 'Analiza matematica', 
      icon: FunctionSquare,
      completed: 14, 
      total: 20, 
      avgScore: 8.2,
      color: 'bg-chart-1'
    },
    { 
      id: 'algebra', 
      name: 'Algebra', 
      icon: Calculator,
      completed: 6, 
      total: 12, 
      avgScore: 7.5,
      color: 'bg-chart-2'
    },
    { 
      id: 'functii', 
      name: 'Functii', 
      icon: BookOpen,
      completed: 5, 
      total: 8, 
      avgScore: 8.0,
      color: 'bg-chart-3'
    },
    { 
      id: 'matrici', 
      name: 'Matrici', 
      icon: Grid3X3,
      completed: 3, 
      total: 5, 
      avgScore: 6.8,
      color: 'bg-chart-4'
    },
  ],
  weakAreas: [
    { topic: 'Integrala definita', category: 'Analiza', accuracy: 45 },
    { topic: 'Determinanti 3x3', category: 'Matrici', accuracy: 52 },
    { topic: 'Ecuatii trigonometrice', category: 'Algebra', accuracy: 58 },
  ],
  strongAreas: [
    { topic: 'Derivata functiei compuse', category: 'Analiza', accuracy: 92 },
    { topic: 'Limite de functii', category: 'Analiza', accuracy: 88 },
    { topic: 'Functia compusa', category: 'Functii', accuracy: 85 },
  ],
  recentActivity: [
    { date: 'Astazi', exercises: 3, avgScore: 8.5 },
    { date: 'Ieri', exercises: 4, avgScore: 7.8 },
    { date: 'Acum 2 zile', exercises: 2, avgScore: 8.0 },
    { date: 'Acum 3 zile', exercises: 5, avgScore: 7.2 },
  ],
}

export default function ProgressPage() {
  const overallProgress = Math.round((mockProgress.completedExercises / mockProgress.totalExercises) * 100)

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Progresul tau</h1>
            <p className="text-muted-foreground mt-1">
              Urmareste evolutia ta in pregatirea pentru BAC
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={fadeInUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Trophy className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockProgress.completedExercises}</p>
                    <p className="text-sm text-muted-foreground">Exercitii rezolvate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Star className="size-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockProgress.averageScore}</p>
                    <p className="text-sm text-muted-foreground">Scor mediu</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Flame className="size-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockProgress.streak} zile</p>
                    <p className="text-sm text-muted-foreground">Serie curenta</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-chart-4/10 flex items-center justify-center">
                    <Calendar className="size-6 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockProgress.totalTime}</p>
                    <p className="text-sm text-muted-foreground">Timp total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Overall Progress */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progres general</CardTitle>
                <CardDescription>
                  Ai completat {overallProgress}% din toate exercitiile disponibile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={overallProgress} className="h-4 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {mockProgress.completedExercises} din {mockProgress.totalExercises} exercitii
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Categories Progress */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progres pe categorii</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockProgress.categories.map((category) => {
                  const Icon = category.icon
                  const progress = Math.round((category.completed / category.total) * 100)
                  
                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`size-10 rounded-lg ${category.color} flex items-center justify-center`}>
                            <Icon className="size-5 text-card" />
                          </div>
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Scor mediu: {category.avgScore}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{progress}%</p>
                          <p className="text-xs text-muted-foreground">
                            {category.completed}/{category.total}
                          </p>
                        </div>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Strengths and Weaknesses */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Weak Areas */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="size-5 text-warning" />
                    Zone de imbunatatit
                  </CardTitle>
                  <CardDescription>
                    Concentreaza-te pe aceste subiecte pentru rezultate mai bune
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockProgress.weakAreas.map((area, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{area.topic}</p>
                        <p className="text-xs text-muted-foreground">{area.category}</p>
                      </div>
                      <Badge variant="default">{area.accuracy}%</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Strong Areas */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="size-5 text-success" />
                    Puncte forte
                  </CardTitle>
                  <CardDescription>
                    Esti aproape de stapanire in aceste domenii!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockProgress.strongAreas.map((area, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{area.topic}</p>
                        <p className="text-xs text-muted-foreground">{area.category}</p>
                      </div>
                      <Badge variant="secondary">{area.accuracy}%</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activitate recenta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProgress.recentActivity.map((day, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <BookOpen className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{day.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {day.exercises} exercitii rezolvate
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{day.avgScore}</p>
                        <p className="text-xs text-muted-foreground">scor mediu</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Encouragement */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <p className="text-lg font-medium text-foreground">
                  Continua tot asa! Esti pe drumul cel bun spre succes la BAC!
                </p>
                <p className="text-muted-foreground mt-2">
                  Cu ritmul actual, vei fi pregatit pentru examen in curand.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
