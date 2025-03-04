"use client"

import Button from "./GetStartedButton"
import { motion} from "framer-motion"
import { ArrowRight, CheckCircle, Clock, Sparkles, Zap } from "lucide-react"
import { useRef } from "react"

export default function Hero() {
  const ref = useRef(null)
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   })
//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const features = [
    { icon: <Zap className="w-4 h-4" />, text: "AI-powered roasts" },
    { icon: <Clock className="w-4 h-4" />, text: "Smart deadline tracking" },
    { icon: <CheckCircle className="w-4 h-4" />, text: "Zero excuses" },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0 max-w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 rotate-45 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2">
          <div className="absolute inset-0 -rotate-45 bg-gradient-to-r from-secondary/20 to-primary/20 blur-3xl" />
        </div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 py-12">
          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/4 top-1/4 w-12 h-12 rounded-xl border bg-background/50 backdrop-blur-sm hidden lg:block"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-1/4 bottom-1/3 w-8 h-8 rounded-lg border bg-background/50 backdrop-blur-sm hidden lg:block"
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <span className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium group cursor-pointer hover:bg-primary/10 transition-colors">
              <span className="group-hover:scale-110 transition-transform">🚀</span>
              <span className="mx-2">Your Personal Task Enforcer</span>
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.div>

          {/* Main heading with sparkles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Sparkles className="absolute -left-12 -top-6 w-8 h-8 text-primary/50" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Welcome to{" "}
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  RoasTodo
                </span>
                <motion.span
                  className="absolute -inset-1 rounded-lg bg-primary/10"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Subheading with gradient underline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground relative"
          >
            <span className="relative">
              Zero tolerance when it comes to unfinished tasks.
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
            </span>
            <br />
            Get roasted by AI when you miss deadlines.
          </motion.p>

          {/* Features list with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mx-auto max-w-2xl"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-background/50 border rounded-full px-4 py-1.5 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
              >
                {feature.icon}
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button text="Get Started" />
          </motion.div>

          {/* Preview window with parallax effect */}
          {/* <motion.div
            style={{ y }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="relative mx-auto max-w-3xl mt-16 group"
          > */}
            {/* <div className="rounded-xl border bg-card/50 shadow-2xl backdrop-blur-sm overflow-hidden transition-shadow hover:shadow-primary/10"> */}
              {/* Window controls with hover animation */}
              {/* <div className="relative h-10 border-b bg-muted/50">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 group-hover:animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 group-hover:animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 group-hover:animate-pulse" />
                </div>
              </div> */}
              
              {/* Mock content with shimmer effect */}
              {/* <div className="p-6">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative h-14 rounded-lg bg-muted/50 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 w-full h-full"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                          transform: "translateX(-100%)",
                        }}
                        animate={{ x: ["0%", "200%"] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div> */}
            {/* </div> */}
          {/* </motion.div> */}
        </div>
      </div>
    </main>
  )
}