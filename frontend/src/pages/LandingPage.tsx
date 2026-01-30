'use client';

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  BookOpen, 
  CheckCircle2, 
  Zap, 
  Target,
  ArrowRight,
  GraduationCap
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="size-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">BAC Mate</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Conectare</Button>
            </Link>
            <Link to="/register">
              <Button>Incepe acum</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Zap className="size-4" />
              Antrenament inteligent pentru BAC
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance"
            >
              Pregateste-te pentru BAC la matematica cu incredere
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty max-w-2xl mx-auto"
            >
              Exercitii tip BAC, rezolvare ghidata pe pasi si feedback instant. 
              Invata in ritmul tau, fara stres.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Incepe antrenamentul
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Vezi cum functioneaza
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <Card className="overflow-hidden shadow-xl border-2">
              <CardContent className="p-0">
                <div className="bg-muted/50 px-6 py-4 border-b flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="size-3 rounded-full bg-destructive/60" />
                    <div className="size-3 rounded-full bg-warning/60" />
                    <div className="size-3 rounded-full bg-success/60" />
                  </div>
                  <span className="text-sm text-muted-foreground">Exercitiu: Analiza matematica</span>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <p className="text-muted-foreground text-sm mb-2">Problema</p>
                    <p className="text-lg font-medium">
                      Fie functia f: R → R, f(x) = x³ - 3x + 2. Demonstrati ca f este strict crescatoare pe intervalul [1, +∞).
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                      <div className="size-6 rounded-full bg-success flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="size-4 text-success-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-success">Pasul 1 - Corect!</p>
                        <p className="text-sm text-muted-foreground">f'(x) = 3x² - 3</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-muted rounded-lg border">
                      <div className="size-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary-foreground">2</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-2">Pasul 2: Analizeaza semnul derivatei pentru x ≥ 1</p>
                        <div className="h-10 bg-background border rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">De ce BAC Mate?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              O platforma creata special pentru elevii care se pregatesc pentru Bacalaureat
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <BookOpen className="size-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Exercitii tip BAC</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Exercitii structurate exact ca la examen, din toate categoriile: 
                    analiza, algebra, functii si matrici.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="size-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Rezolvare ghidata</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Fiecare exercitiu este impartit in pasi clari. 
                    Inveti sa gandesti metodic, pas cu pas.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Zap className="size-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Feedback instant</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Afla imediat daca raspunsul tau este corect. 
                    Primesti explicatii clare pentru fiecare pas.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pregatit sa incepi?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Alatura-te sutelor de elevi care se pregatesc eficient pentru BAC la matematica
            </p>
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Creeaza cont gratuit
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="size-4 text-primary-foreground" />
            </div>
            <span className="font-medium">BAC Mate</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Antrenament inteligent pentru BAC la matematica
          </p>
        </div>
      </footer>
    </div>
  )
}
