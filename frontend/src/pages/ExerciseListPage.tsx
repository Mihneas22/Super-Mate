'use client';

import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AppLayout } from '@/components/AppLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

// Mock data - replace with API calls
const mockExercises = [
  {
    id: '1',
    title: 'Derivata functiei compuse',
    description: 'Calculati derivata functiei f(x) = sin(x²) si determinati punctele de extrem.',
    category: 'analiza',
    categoryLabel: 'Analiza matematica',
    type: 'Calculati',
    difficulty: 'mediu',
    status: 'in_progress',
    estimatedTime: 15,
  },
  {
    id: '2',
    title: 'Monotonia functiei',
    description: 'Demonstrati ca functia f: R → R, f(x) = x³ - 3x + 2 este strict crescatoare pe [1, +∞).',
    category: 'analiza',
    categoryLabel: 'Analiza matematica',
    type: 'Demonstrati',
    difficulty: 'mediu',
    status: 'not_started',
    estimatedTime: 20,
  },
  {
    id: '3',
    title: 'Determinant matrice 3x3',
    description: 'Calculati determinantul matricei A si verificati daca este inversabila.',
    category: 'matrici',
    categoryLabel: 'Matrici',
    type: 'Calculati',
    difficulty: 'usor',
    status: 'completed',
    estimatedTime: 10,
  },
  {
    id: '4',
    title: 'Limite de functii',
    description: 'Calculati limita functiei f(x) = (x² - 4)/(x - 2) cand x tinde la 2.',
    category: 'analiza',
    categoryLabel: 'Analiza matematica',
    type: 'Calculati',
    difficulty: 'usor',
    status: 'completed',
    estimatedTime: 8,
  },
  {
    id: '5',
    title: 'Inegalitati cu module',
    description: 'Rezolvati inegalitatea |2x - 3| < 5 si reprezentati solutia pe axa numerelor.',
    category: 'algebra',
    categoryLabel: 'Algebra',
    type: 'Rezolvati',
    difficulty: 'usor',
    status: 'not_started',
    estimatedTime: 12,
  },
  {
    id: '6',
    title: 'Integrala definita',
    description: 'Calculati integrala definita a functiei f(x) = x² pe intervalul [0, 2].',
    category: 'analiza',
    categoryLabel: 'Analiza matematica',
    type: 'Calculati',
    difficulty: 'greu',
    status: 'not_started',
    estimatedTime: 25,
  },
  {
    id: '7',
    title: 'Functia compusa',
    description: 'Determinati (f ∘ g)(x) pentru f(x) = 2x + 1 si g(x) = x².',
    category: 'functii',
    categoryLabel: 'Functii',
    type: 'Determinati',
    difficulty: 'usor',
    status: 'completed',
    estimatedTime: 10,
  },
  {
    id: '8',
    title: 'Sistem de ecuatii',
    description: 'Rezolvati sistemul de ecuatii folosind metoda Cramer.',
    category: 'algebra',
    categoryLabel: 'Algebra',
    type: 'Rezolvati',
    difficulty: 'mediu',
    status: 'in_progress',
    estimatedTime: 18,
  },
]

const difficultyColors = {
  usor: 'success',
  mediu: 'warning',
  greu: 'destructive',
} as const

const difficultyLabels = {
  usor: 'Usor',
  mediu: 'Mediu',
  greu: 'Greu',
}

const statusIcons = {
  not_started: Circle,
  in_progress: PlayCircle,
  completed: CheckCircle2,
}

const statusLabels = {
  not_started: 'Neinceput',
  in_progress: 'In lucru',
  completed: 'Rezolvat',
}

export default function ExerciseListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  
  const categoryFilter = searchParams.get('category') || 'all'
  const difficultyFilter = searchParams.get('difficulty') || 'all'
  const typeFilter = searchParams.get('type') || 'all'

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === 'all') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    setSearchParams(newParams)
  }

  const filteredExercises = mockExercises.filter((exercise) => {
    if (categoryFilter !== 'all' && exercise.category !== categoryFilter) return false
    if (difficultyFilter !== 'all' && exercise.difficulty !== difficultyFilter) return false
    if (typeFilter !== 'all' && !exercise.type.toLowerCase().includes(typeFilter.toLowerCase())) return false
    if (searchQuery && !exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !exercise.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

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
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Exercitii</h1>
            <p className="text-muted-foreground mt-1">
              Alege un exercitiu si incepe antrenamentul
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Cauta exercitii..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Select value={categoryFilter} onValueChange={(v) => updateFilter('category', v)}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Categorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="analiza">Analiza</SelectItem>
                  <SelectItem value="algebra">Algebra</SelectItem>
                  <SelectItem value="functii">Functii</SelectItem>
                  <SelectItem value="matrici">Matrici</SelectItem>
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={(v) => updateFilter('difficulty', v)}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="usor">Usor</SelectItem>
                  <SelectItem value="mediu">Mediu</SelectItem>
                  <SelectItem value="greu">Greu</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={(v) => updateFilter('type', v)}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Tip" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="calculati">Calculati</SelectItem>
                  <SelectItem value="demonstrati">Demonstrati</SelectItem>
                  <SelectItem value="rezolvati">Rezolvati</SelectItem>
                  <SelectItem value="determinati">Determinati</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Results count */}
          <motion.div variants={fadeInUp}>
            <p className="text-sm text-muted-foreground">
              {filteredExercises.length} exercitii gasite
            </p>
          </motion.div>

          {/* Exercise List */}
          <motion.div variants={fadeInUp} className="space-y-3">
            {filteredExercises.map((exercise) => {
              const StatusIcon = statusIcons[exercise.status as keyof typeof statusIcons]
              const difficultyColor = difficultyColors[exercise.difficulty as keyof typeof difficultyColors]
              
              return (
                <motion.div key={exercise.id} variants={fadeInUp}>
                  <Link to={`/exercise/${exercise.id}`}>
                    <Card className="hover:shadow-md transition-all hover:border-primary/50 cursor-pointer">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge variant="secondary" className="text-xs">
                                {exercise.categoryLabel}
                              </Badge>
                              <Badge variant={difficultyColor} className="text-xs">
                                {difficultyLabels[exercise.difficulty as keyof typeof difficultyLabels]}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {exercise.type}
                              </Badge>
                            </div>
                            <h3 className="font-semibold mb-1">{exercise.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {exercise.description}
                            </p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="size-3" />
                                ~{exercise.estimatedTime} min
                              </div>
                              <div className={`flex items-center gap-1 ${
                                exercise.status === 'completed' ? 'text-success' :
                                exercise.status === 'in_progress' ? 'text-warning' : ''
                              }`}>
                                <StatusIcon className="size-3" />
                                {statusLabels[exercise.status as keyof typeof statusLabels]}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="shrink-0 hidden sm:flex">
                            <ArrowRight className="size-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}

            {filteredExercises.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Nu am gasit exercitii care sa corespunda filtrelor selectate.
                  </p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery('')
                      setSearchParams(new URLSearchParams())
                    }}
                    className="mt-2"
                  >
                    Reseteaza filtrele
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
