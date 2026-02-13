'use client';

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AdminLayout } from '../../components/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Users, 
  Plus,
  ArrowRight,
  FunctionSquare,
  Calculator,
  Grid3X3,
  TrendingUp
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
const mockStats = {
  totalExercises: 65,
  activeExercises: 58,
  draftExercises: 7,
  totalUsers: 234,
  activeToday: 45,
  categoryCounts: [
    { name: 'Analiza matematica', count: 22, icon: FunctionSquare, color: 'bg-chart-1' },
    { name: 'Algebra', count: 18, icon: Calculator, color: 'bg-chart-2' },
    { name: 'Functii', count: 15, icon: BookOpen, color: 'bg-chart-3' },
    { name: 'Matrici', count: 10, icon: Grid3X3, color: 'bg-chart-4' },
  ]
}

export default function AdminDashboard() {
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
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard Admin</h1>
              <p className="text-muted-foreground mt-1">
                Gestioneaza platforma BAC Mate
              </p>
            </div>
            <Link to="/admin/exercises/new">
              <Button className="gap-2">
                <Plus className="size-4" />
                Adauga exercitiu
              </Button>
            </Link>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={fadeInUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockStats.totalExercises}</p>
                    <p className="text-sm text-muted-foreground">Exercitii totale</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <TrendingUp className="size-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockStats.activeExercises}</p>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-chart-4/10 flex items-center justify-center">
                    <Users className="size-6 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockStats.totalUsers}</p>
                    <p className="text-sm text-muted-foreground">Utilizatori</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Users className="size-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockStats.activeToday}</p>
                    <p className="text-sm text-muted-foreground">Activi astazi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeInUp} className="grid gap-4 sm:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">Gestionare exercitii</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Adauga, editeaza sau sterge exercitii din platforma.
                </p>
                <Link to="/admin/exercises">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    Gestioneaza exercitii
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">Gestionare utilizatori</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Vezi si gestioneaza conturile utilizatorilor.
                </p>
                <Link to="/admin/users">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    Gestioneaza utilizatori
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Exercises by Category */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exercitii pe categorii</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {mockStats.categoryCounts.map((category) => {
                    const Icon = category.icon
                    return (
                      <div 
                        key={category.name}
                        className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg"
                      >
                        <div className={`size-10 rounded-lg ${category.color} flex items-center justify-center`}>
                          <Icon className="size-5 text-card" />
                        </div>
                        <div>
                          <p className="text-xl font-bold">{category.count}</p>
                          <p className="text-xs text-muted-foreground">{category.name}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
