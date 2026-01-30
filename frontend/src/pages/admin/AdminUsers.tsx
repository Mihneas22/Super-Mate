'use client';

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  UserX,
  UserCheck,
  RotateCcw,
  MoreVertical
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
const mockUsers = [
  {
    id: '1',
    name: 'Ana Popescu',
    email: 'ana.popescu@email.com',
    status: 'active',
    exercisesCompleted: 28,
    totalExercises: 65,
    averageScore: 8.2,
    lastActivity: '2024-01-15 14:30',
    createdAt: '2023-09-01',
  },
  {
    id: '2',
    name: 'Mihai Ionescu',
    email: 'mihai.ionescu@email.com',
    status: 'active',
    exercisesCompleted: 42,
    totalExercises: 65,
    averageScore: 7.8,
    lastActivity: '2024-01-15 12:15',
    createdAt: '2023-10-15',
  },
  {
    id: '3',
    name: 'Elena Marinescu',
    email: 'elena.m@email.com',
    status: 'inactive',
    exercisesCompleted: 15,
    totalExercises: 65,
    averageScore: 6.5,
    lastActivity: '2024-01-10 09:00',
    createdAt: '2023-11-20',
  },
  {
    id: '4',
    name: 'Alexandru Popa',
    email: 'alex.popa@email.com',
    status: 'active',
    exercisesCompleted: 55,
    totalExercises: 65,
    averageScore: 9.1,
    lastActivity: '2024-01-15 16:45',
    createdAt: '2023-08-15',
  },
  {
    id: '5',
    name: 'Maria Stanescu',
    email: 'maria.s@email.com',
    status: 'disabled',
    exercisesCompleted: 8,
    totalExercises: 65,
    averageScore: 5.2,
    lastActivity: '2024-01-05 11:20',
    createdAt: '2023-12-01',
  },
]

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState(mockUsers)

  const filteredUsers = users.filter((user) => {
    if (searchQuery && 
        !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !user.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  const handleDisableUser = (id: string) => {
    // TODO: Implement with backend API
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: 'disabled' } : u
    ))
  }

  const handleEnableUser = (id: string) => {
    // TODO: Implement with backend API
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: 'active' } : u
    ))
  }

  const handleResetProgress = (id: string) => {
    // TODO: Implement with backend API
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, exercisesCompleted: 0, averageScore: 0 } : u
    ))
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
          <motion.div variants={fadeInUp}>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Utilizatori</h1>
            <p className="text-muted-foreground mt-1">
              Gestioneaza conturile utilizatorilor
            </p>
          </motion.div>

          {/* Search */}
          <motion.div variants={fadeInUp}>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Cauta dupa nume sau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Results count */}
          <motion.div variants={fadeInUp}>
            <p className="text-sm text-muted-foreground">
              {filteredUsers.length} utilizatori gasiti
            </p>
          </motion.div>

          {/* Users Table */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-sm">Utilizator</th>
                        <th className="text-left p-4 font-medium text-sm">Status</th>
                        <th className="text-left p-4 font-medium text-sm">Progres</th>
                        <th className="text-left p-4 font-medium text-sm">Scor mediu</th>
                        <th className="text-left p-4 font-medium text-sm">Ultima activitate</th>
                        <th className="text-right p-4 font-medium text-sm">Actiuni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => {
                        const progress = Math.round((user.exercisesCompleted / user.totalExercises) * 100)
                        
                        return (
                          <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-sm font-medium text-primary">
                                    {user.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge 
                                variant={
                                  user.status === 'active' ? 'success' : 
                                  user.status === 'inactive' ? 'warning' : 
                                  'destructive'
                                }
                                className="text-xs"
                              >
                                {user.status === 'active' ? 'Activ' : 
                                 user.status === 'inactive' ? 'Inactiv' : 
                                 'Dezactivat'}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3 min-w-[150px]">
                                <Progress value={progress} className="flex-1 h-2" />
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {user.exercisesCompleted}/{user.totalExercises}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`font-medium ${
                                user.averageScore >= 8 ? 'text-success' :
                                user.averageScore >= 6 ? 'text-warning' :
                                'text-destructive'
                              }`}>
                                {user.averageScore.toFixed(1)}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">
                              {user.lastActivity}
                            </td>
                            <td className="p-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon-sm">
                                    <MoreVertical className="size-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {user.status === 'disabled' ? (
                                    <DropdownMenuItem onClick={() => handleEnableUser(user.id)}>
                                      <UserCheck className="size-4 mr-2" />
                                      Activeaza cont
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem 
                                      onClick={() => handleDisableUser(user.id)}
                                      className="text-destructive focus:text-destructive"
                                    >
                                      <UserX className="size-4 mr-2" />
                                      Dezactiveaza cont
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem onClick={() => handleResetProgress(user.id)}>
                                    <RotateCcw className="size-4 mr-2" />
                                    Reseteaza progres
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredUsers.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Nu am gasit utilizatori care sa corespunda cautarii.
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
