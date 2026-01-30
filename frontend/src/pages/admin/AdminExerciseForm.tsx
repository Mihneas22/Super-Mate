'use client';

import React from "react"

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MixedContent } from '@/components/MathRenderer'
import { 
  ArrowLeft, 
  Plus, 
  Trash2,
  Eye,
  Save,
  GripVertical
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

interface Step {
  id: string
  type: string
  instruction: string
  expectedValue: string
  correctFeedback: string
  incorrectFeedback: string
  hint: string
}

export default function AdminExerciseForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    category: '',
    difficulty: '',
    problemStatement: '',
    status: 'draft',
  })

  const [steps, setSteps] = useState<Step[]>([
    {
      id: '1',
      type: 'derivata',
      instruction: '',
      expectedValue: '',
      correctFeedback: 'Corect! Ai calculat corect.',
      incorrectFeedback: 'Nu este corect. Verifica calculele.',
      hint: '',
    }
  ])

  const [isPreview, setIsPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addStep = () => {
    setSteps(prev => [...prev, {
      id: String(Date.now()),
      type: '',
      instruction: '',
      expectedValue: '',
      correctFeedback: 'Corect!',
      incorrectFeedback: 'Nu este corect.',
      hint: '',
    }])
  }

  const removeStep = (id: string) => {
    setSteps(prev => prev.filter(s => s.id !== id))
  }

  const updateStep = (id: string, field: keyof Step, value: string) => {
    setSteps(prev => prev.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Submit to backend API
    // const data = { ...formData, steps }
    // if (isEditing) {
    //   await adminApi.updateExercise(id!, data)
    // } else {
    //   await adminApi.createExercise(data)
    // }

    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    navigate('/admin/exercises')
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4">
            <Link to="/admin/exercises">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {isEditing ? 'Editeaza exercitiu' : 'Adauga exercitiu nou'}
              </h1>
              <p className="text-muted-foreground text-sm">
                {isEditing ? 'Modifica detaliile exercitiului' : 'Completeaza formularul pentru a crea un exercitiu nou'}
              </p>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informatii de baza</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titlu exercitiu</Label>
                    <Input
                      id="title"
                      placeholder="ex: Derivata functiei compuse"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Tip exercitiu</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(v) => setFormData(prev => ({ ...prev, type: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteaza tipul" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="calculati">Calculati</SelectItem>
                          <SelectItem value="demonstrati">Demonstrati</SelectItem>
                          <SelectItem value="rezolvati">Rezolvati</SelectItem>
                          <SelectItem value="determinati">Determinati</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Categorie</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteaza categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analiza">Analiza matematica</SelectItem>
                          <SelectItem value="algebra">Algebra</SelectItem>
                          <SelectItem value="functii">Functii</SelectItem>
                          <SelectItem value="matrici">Matrici</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Nivel dificultate</Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(v) => setFormData(prev => ({ ...prev, difficulty: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteaza nivelul" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usor">Usor</SelectItem>
                          <SelectItem value="mediu">Mediu</SelectItem>
                          <SelectItem value="greu">Greu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(v) => setFormData(prev => ({ ...prev, status: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Activ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problem">Enunt problema (suporta LaTeX: $...$ sau $$...$$)</Label>
                    <textarea
                      id="problem"
                      placeholder="ex: Fie functia $f: \mathbb{R} \to \mathbb{R}$, $f(x) = x^3 - 3x + 2$..."
                      value={formData.problemStatement}
                      onChange={(e) => setFormData(prev => ({ ...prev, problemStatement: e.target.value }))}
                      className="w-full min-h-[120px] px-4 py-3 rounded-lg border bg-card text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                    {formData.problemStatement && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-2">Previzualizare:</p>
                        <MixedContent content={formData.problemStatement} />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Steps */}
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Pasi rezolvare</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={addStep} className="gap-2 bg-transparent">
                    <Plus className="size-4" />
                    Adauga pas
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {steps.map((step, index) => (
                    <div key={step.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="size-4 text-muted-foreground" />
                          <Badge variant="secondary">Pasul {index + 1}</Badge>
                        </div>
                        {steps.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => removeStep(step.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Tip pas</Label>
                          <Select
                            value={step.type}
                            onValueChange={(v) => updateStep(step.id, 'type', v)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecteaza" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="derivata">Derivata</SelectItem>
                              <SelectItem value="semn">Analiza semn</SelectItem>
                              <SelectItem value="calcul">Calcul</SelectItem>
                              <SelectItem value="concluzie">Concluzie</SelectItem>
                              <SelectItem value="demonstratie">Demonstratie</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Valoare asteptata (pentru validare)</Label>
                          <Input
                            placeholder="Raspunsul corect"
                            value={step.expectedValue}
                            onChange={(e) => updateStep(step.id, 'expectedValue', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Instructiune pas (suporta LaTeX)</Label>
                        <Input
                          placeholder="ex: Calculeaza derivata functiei $f(x)$"
                          value={step.instruction}
                          onChange={(e) => updateStep(step.id, 'instruction', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Indiciu (optional)</Label>
                        <Input
                          placeholder="ex: Foloseste regula derivarii"
                          value={step.hint}
                          onChange={(e) => updateStep(step.id, 'hint', e.target.value)}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Feedback corect</Label>
                          <Input
                            placeholder="Mesaj pentru raspuns corect"
                            value={step.correctFeedback}
                            onChange={(e) => updateStep(step.id, 'correctFeedback', e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Feedback incorect</Label>
                          <Input
                            placeholder="Mesaj pentru raspuns gresit"
                            value={step.incorrectFeedback}
                            onChange={(e) => updateStep(step.id, 'incorrectFeedback', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreview(!isPreview)}
                className="gap-2"
              >
                <Eye className="size-4" />
                {isPreview ? 'Ascunde previzualizare' : 'Previzualizare'}
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <span className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Se salveaza...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    {isEditing ? 'Salveaza modificarile' : 'Creeaza exercitiu'}
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
