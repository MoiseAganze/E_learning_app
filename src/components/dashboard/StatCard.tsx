import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  color?: "blue" | "green" | "purple" | "orange" | "red" | "yellow";
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  className?: string;
}

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    gradient: "from-blue-500 to-blue-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    gradient: "from-green-500 to-green-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    gradient: "from-purple-500 to-purple-600",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    gradient: "from-orange-500 to-orange-600",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    gradient: "from-red-500 to-red-600",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    gradient: "from-yellow-500 to-yellow-600",
  },
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color = "blue",
  trend,
  className,
}: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn("", className)}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {trend && (
                  <span
                    className={cn(
                      "text-xs font-medium",
                      trend.direction === "up"
                        ? "text-green-600"
                        : "text-red-600",
                    )}
                  >
                    {trend.direction === "up" ? "+" : "-"}
                    {Math.abs(trend.value)}%
                  </span>
                )}
              </div>
              {description && (
                <p className="text-xs text-gray-500">{description}</p>
              )}
            </div>

            <motion.div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center relative",
                colors.bg,
              )}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className={cn("w-6 h-6", colors.text)} />

              {/* Effet de gradient subtil */}
              <div
                className={cn(
                  "absolute inset-0 rounded-lg opacity-0 hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br",
                  colors.gradient,
                )}
              />
            </motion.div>
          </div>

          {/* Ligne de progression si trend est fourni */}
          {trend && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Progression</span>
                <span
                  className={
                    trend.direction === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {trend.direction === "up" ? "↗" : "↘"}{" "}
                  {Math.abs(trend.value)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <motion.div
                  className={cn(
                    "h-1 rounded-full bg-gradient-to-r",
                    trend.direction === "up"
                      ? "from-green-400 to-green-600"
                      : "from-red-400 to-red-600",
                  )}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(Math.abs(trend.value), 100)}%`,
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}
        </CardContent>

        {/* Effet de survol avec particule */}
        <motion.div
          className="absolute top-2 right-2 w-1 h-1 bg-current rounded-full opacity-30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ color: colors.text.replace("text-", "") }}
        />
      </Card>
    </motion.div>
  );
}
