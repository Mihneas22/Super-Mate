'use client';

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AppLayout } from '@/components/AppLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/context/AuthContext'
import { 
  Play, 
  Plus, 
  BarChart3, 
  ArrowRight,
  BookOpen,
  Calculator,
  FunctionSquare,
  Grid3X3
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

// Mock data - replace with API calls
const categories = [
  { 
    id: 'analiza', 
    name: 'Analiza matematica', 
    icon: FunctionSquare, 
    progress: 65, 
    total: 20, 
    completed: 13,
    color: 'bg-chart-1'
  },
  { 
    id: 'algebra', 
    name: 'Algebra', 
    icon: Calculator, 
    progress: 40, 
    total: 15, 
    completed: 6,
    color: 'bg-chart-2'
  },
  { 
    id: 'functii', 
    name: 'Functii', 
    icon: BookOpen, 
    progress: 80, 
    total: 18, 
    completed: 14,
    color: 'bg-chart-3'
  },
  { 
    id: 'matrici', 
    name: 'Matrici', 
    icon: Grid3X3, 
    progress: 25, 
    total: 12, 
    completed: 3,
    color: 'bg-chart-4'
  },
]

const lastExercise = {
  id: '1',
  title: 'Derivata functiei compuse',
  category: 'Analiza matematica',
  step: 2,
  totalSteps: 5,
}

export default function DashboardPage() {
  const { user } = useAuth()

  const totalCompleted = categories.reduce((sum, cat) => sum + cat.completed, 0)
  const totalExercises = categories.reduce((sum, cat) => sum + cat.total, 0)
  const overallProgress = Math.round((totalCompleted / totalExercises) * 100)

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-8"
        >
          {/* Welcome Header */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Buna, {user?.name?.split(' ')[0] || 'Student'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Continua antrenamentul pentru BAC la matematica
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            variants={fadeInUp}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Continue Last Exercise */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Play className="size-4 text-primary" />
                  Continua ultimul exercitiu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium mb-1">{lastExercise.title}</p>
                <p className="text-xs text-muted-foreground mb-3">{lastExercise.category}</p>
                <div className="flex items-center gap-3 mb-3">
                  <Progress value={(lastExercise.step / lastExercise.totalSteps) * 100} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground">
                    {lastExercise.step}/{lastExercise.totalSteps}
                  </span>
                </div>
                <Link to={`/exercise/${lastExercise.id}`}>
                  <Button className="w-full gap-2" size="sm">
                    Continua
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* New Training */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Plus className="size-4 text-primary" />
                  Antrenament nou
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Alege o categorie si rezolva un exercitiu nou
                </p>
                <Link to="/exercises">
                  <Button variant="outline" className="w-full gap-2 bg-transparent" size="sm">
                    Vezi exercitii
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Your Progress */}
            <Card className="hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="size-4 text-primary" />
                  Progresul tau
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-3xl font-bold text-primary">{overallProgress}%</div>
                  <div className="text-sm text-muted-foreground">
                    <p>{totalCompleted} exercitii rezolvate</p>
                    <p>din {totalExercises} total</p>
                  </div>
                </div>
                <Link to="/progress">
                  <Button variant="ghost" className="w-full gap-2" size="sm">
                    Vezi detalii
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Categories */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Categorii de exercitii</h2>
              <Link to="/exercises">
                <Button variant="ghost" size="sm" className="gap-1">
                  Vezi toate
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Link key={category.id} to={`/exercises?category=${category.id}`}>
                    <Card className="hover:shadow-md transition-all hover:border-primary/50 cursor-pointer h-full">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className={`size-12 rounded-xl ${category.color} flex items-center justify-center shrink-0`}>
                            <Icon className="size-6 text-card" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold mb-1">{category.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {category.completed} din {category.total} exercitii
                            </p>
                            <div className="flex items-center gap-3">
                              <Progress value={category.progress} className="flex-1 h-2" />
                              <Badge variant="secondary" className="shrink-0">
                                {category.progress}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </motion.div>

          {/* Encouragement */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <CardDescription className="text-foreground text-center text-base">
                  Continua tot asa! Esti pe drumul cel bun spre o nota mare la BAC.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
