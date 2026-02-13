'use client';

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AdminLayout } from '../../components/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Eye
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
    type: 'Calculati',
    category: 'analiza',
    difficulty: 'mediu',
    status: 'active',
    stepsCount: 4,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Monotonia functiei',
    type: 'Demonstrati',
    category: 'analiza',
    difficulty: 'mediu',
    status: 'active',
    stepsCount: 3,
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Determinant matrice 3x3',
    type: 'Calculati',
    category: 'matrici',
    difficulty: 'usor',
    status: 'draft',
    stepsCount: 5,
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    title: 'Limite de functii',
    type: 'Calculati',
    category: 'analiza',
    difficulty: 'usor',
    status: 'active',
    stepsCount: 3,
    createdAt: '2024-01-12',
  },
  {
    id: '5',
    title: 'Inegalitati cu module',
    type: 'Rezolvati',
    category: 'algebra',
    difficulty: 'greu',
    status: 'active',
    stepsCount: 6,
    createdAt: '2024-01-11',
  },
]

const difficultyLabels = {
  usor: 'Usor',
  mediu: 'Mediu',
  greu: 'Greu',
}

const categoryLabels = {
  analiza: 'Analiza',
  algebra: 'Algebra',
  functii: 'Functii',
  matrici: 'Matrici',
}

export default function AdminExercises() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredExercises = mockExercises.filter((exercise) => {
    if (categoryFilter !== 'all' && exercise.category !== categoryFilter) return false
    if (difficultyFilter !== 'all' && exercise.difficulty !== difficultyFilter) return false
    if (statusFilter !== 'all' && exercise.status !== statusFilter) return false
    if (searchQuery && !exercise.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleDelete = (id: string) => {
    // TODO: Implement with backend API
    console.log('Delete exercise:', id)
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Exercitii</h1>
              <p className="text-muted-foreground mt-1">
                Gestioneaza toate exercitiile din platforma
              </p>
            </div>
            <Link to="/admin/exercises/new">
              <Button className="gap-2">
                <Plus className="size-4" />
                Adauga exercitiu
              </Button>
            </Link>
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
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-36">
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

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
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

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
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

          {/* Exercise Table */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-sm">ID</th>
                        <th className="text-left p-4 font-medium text-sm">Titlu</th>
                        <th className="text-left p-4 font-medium text-sm">Tip</th>
                        <th className="text-left p-4 font-medium text-sm">Categorie</th>
                        <th className="text-left p-4 font-medium text-sm">Nivel</th>
                        <th className="text-left p-4 font-medium text-sm">Status</th>
                        <th className="text-left p-4 font-medium text-sm">Pasi</th>
                        <th className="text-right p-4 font-medium text-sm">Actiuni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExercises.map((exercise) => (
                        <tr key={exercise.id} className="border-b last:border-0 hover:bg-muted/30">
                          <td className="p-4 text-sm text-muted-foreground">#{exercise.id}</td>
                          <td className="p-4">
                            <p className="font-medium text-sm">{exercise.title}</p>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="text-xs">
                              {exercise.type}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm">
                            {categoryLabels[exercise.category as keyof typeof categoryLabels]}
                          </td>
                          <td className="p-4">
                            <Badge 
                              variant={
                                exercise.difficulty === 'usor' ? 'default' : 
                                exercise.difficulty === 'mediu' ? 'secondary' : 
                                'destructive'
                              }
                              className="text-xs"
                            >
                              {difficultyLabels[exercise.difficulty as keyof typeof difficultyLabels]}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge 
                              variant={exercise.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {exercise.status === 'active' ? 'Activ' : 'Draft'}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {exercise.stepsCount}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/exercise/${exercise.id}`}>
                                  <Eye className="size-4" />
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon" asChild>
                                <Link to={`/admin/exercises/${exercise.id}`}>
                                  <Edit className="size-4" />
                                </Link>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDelete(exercise.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredExercises.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Nu am gasit exercitii care sa corespunda filtrelor selectate.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
