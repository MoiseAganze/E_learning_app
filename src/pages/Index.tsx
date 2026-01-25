import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  GraduationCap,
  Heart,
  Globe,
  ChevronRight,
  CheckCircle,
  Monitor,
  Smartphone,
  Brain,
  MessageCircle,
  FileText,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DynamicNavigation } from "@/components/DynamicNavigation";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <motion.nav
        className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg"
              >
                <GraduationCap className="h-6 w-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 leading-tight">
                  KCS
                </span>
                <span className="text-xs text-primary font-medium">
                  Plateforme de Gestion Éducative
                </span>
              </div>
            </motion.div>

            {/* Menu mobile amélioré */}
            <div className="md:hidden">
              <motion.button
                className="p-2 rounded-md text-gray-600 hover:text-primary"
                whileTap={{ scale: 0.95 }}
              ></motion.button>
            </div>

            <motion.div
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { href: "#fonctionnalites", text: "Fonctionnalités" },
                { href: "#apropos", text: "À propos" },
                { href: "#contact", text: "Contact" },
              ].map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-primary transition-colors relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {link.text}
                </motion.a>
              ))}
              <DynamicNavigation />
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="mb-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-white hover:bg-primary/20 inline-block border border-primary/20">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="inline-block mr-2"
                  >
                    ✨
                  </motion.span>
                  Excellence Éducative Chrétienne
                </Badge>
              </motion.div>

              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Gestion Moderne et
                </motion.span>
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Centralisée
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-gray-600 mt-6 leading-relaxed max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                La plateforme de gestion éducative complète de Kinshasa Christian School.
                Une solution moderne qui centralise tous les aspects de notre institution :
                administration, enseignement, suivi des élèves et communication avec les parents.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/connexion">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow px-6 sm:px-8"
                    >
                      <span className="hidden sm:inline">
                        Commencer maintenant
                      </span>
                      <span className="sm:hidden">Commencer</span>
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 mt-8 text-sm text-gray-500 justify-center lg:justify-start flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {[
                  { icon: CheckCircle, text: "100% Sécurisé" },
                  { icon: CheckCircle, text: "Support Dédié" },
                  { icon: CheckCircle, text: "Accès 24/7" },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                  >
                    <item.icon className="h-4 w-4 text-green-500" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              className="relative order-first lg:order-last"
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                className="bg-gradient-to-br from-primary via-blue-600 to-accent rounded-2xl p-6 sm:p-8 text-white shadow-2xl"
                whileHover={{ scale: 1.02, rotateY: -2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {[
                    {
                      icon: Users,
                      number: "2,500+",
                      label: "Élèves",
                      delay: 0.1,
                    },
                    {
                      icon: BookOpen,
                      number: "180+",
                      label: "Enseignants",
                      delay: 0.2,
                    },
                    {
                      icon: GraduationCap,
                      number: "95+",
                      label: "Classes actives",
                      delay: 0.3,
                    },
                    {
                      icon: Heart,
                      number: "100%",
                      label: "Numérique",
                      delay: 0.4,
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="bg-white/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 backdrop-blur-sm border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + stat.delay }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 + stat.delay }}
                      >
                        <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-1 sm:mb-2" />
                      </motion.div>
                      <motion.div
                        className="text-lg sm:text-xl md:text-2xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 + stat.delay }}
                      >
                        {stat.number}
                      </motion.div>
                      <motion.div
                        className="text-xs sm:text-sm opacity-90 leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.1 + stat.delay }}
                      >
                        {stat.label}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Effet de particules flottantes */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-6 left-6 w-1 h-1 bg-white/30 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="fonctionnalites"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Avantages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment notre plateforme transforme la gestion de Kinshasa Christian School
              en offrant des outils modernes et efficaces pour chaque membre de notre communauté.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Administration",
                description: "Gestion centralisée de l'établissement",
                color: "blue",
              },
              {
                icon: Users,
                title: "Enseignants",
                description: "Outils pédagogiques performants",
                color: "green",
              },
              {
                icon: BookOpen,
                title: "Élèves",
                description: "Apprentissage interactif moderne",
                color: "purple",
              },
              {
                icon: Heart,
                title: "Parents",
                description: "Suivi en temps réel",
                color: "orange",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div
                      className={`inline-flex p-3 rounded-lg mb-3 mx-auto bg-${feature.color}-100`}
                    >
                      <feature.icon
                        className={`h-6 w-6 text-${feature.color}-600`}
                      />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm sm:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Vision : Excellence & Innovation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Kinshasa Christian School s'engage à offrir une éducation de qualité supérieure
                en combinant nos valeurs chrétiennes avec les technologies les plus modernes.
                Cette plateforme centralise tous nos processus pour une gestion efficace et transparente.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    icon: Globe,
                    text: "Gestion centralisée complète",
                  },
                  { icon: Smartphone, text: "Accessible partout, tout le temps" },
                  { icon: Monitor, text: "Interface intuitive et moderne" },
                  { icon: Brain, text: "Suivi intelligent des performances" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4 items-stretch">
                {[
                  {
                    icon: MessageCircle,
                    title: "Communication",
                    description: "Messagerie intégrée pour toute la communauté KCS",
                    gradient: "from-blue-500 to-blue-600",
                    delay: 0.1,
                  },
                  {
                    icon: FileText,
                    title: "Ressources",
                    description: "Bibliothèque complète de contenus pédagogiques",
                    gradient: "from-green-500 to-green-600",
                    delay: 0.2,
                  },
                  {
                    icon: Calendar,
                    title: "Planning",
                    description: "Emplois du temps et calendrier scolaire",
                    gradient: "from-purple-500 to-purple-600",
                    delay: 0.3,
                  },
                  {
                    icon: Brain,
                    title: "Analyses",
                    description: "Tableaux de bord et statistiques en temps réel",
                    gradient: "from-orange-500 to-orange-600",
                    delay: 0.4,
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: feature.delay }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="h-full"
                  >
                    <Card
                      className={`bg-gradient-to-br ${feature.gradient} text-white h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300`}
                    >
                      <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col h-full">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: feature.delay + 0.2,
                          }}
                          viewport={{ once: true }}
                        >
                          <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-2 sm:mb-3 md:mb-4" />
                        </motion.div>
                        <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base leading-tight">
                          {feature.title}
                        </h3>
                        <p className="text-xs opacity-90 flex-1 leading-snug">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Rejoignez l'Excellence de KCS
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Connectez-vous dès maintenant pour accéder à tous les outils de gestion
              et d'apprentissage de Kinshasa Christian School.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/connexion">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all font-semibold"
                >
                  Se connecter
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold leading-tight">
                    KINSHASA CHRISTIAN SCHOOL
                  </span>
                  <span className="text-xs text-gray-400">
                    Excellence Éducative
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Former les leaders de demain avec des valeurs chrétiennes
                et une éducation moderne de qualité supérieure.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Plateforme</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Administration
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Enseignants
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Élèves
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Parents
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>📧 contact@kcs.cd</p>
                <p>📞 +243 81 234 5678</p>
                <p>📍 Kinshasa, RD Congo</p>
                <p className="mt-4 text-sm">
                  Lundi - Vendredi: 7h30 - 16h00
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 pb-20 sm:pb-5 text-center text-gray-400">
            <p>
              &copy; 2024 Kinshasa Christian School. Tous droits réservés.
            </p>
            <p className="mt-2 text-sm">
              Excellence • Innovation • Valeurs Chrétiennes
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
