import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  dataService,
  SubscriptionPlan,
  Subscription,
} from "@/services/dataService";
import { authService } from "@/services/authService";
import {
  CreditCard,
  Calendar,
  CheckCircle,
  AlertCircle,
  Star,
  Crown,
  Shield,
  Zap,
  TrendingUp,
} from "lucide-react";

export default function Abonnements() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser?.schoolId) {
        const [plansData, subscriptionData] = await Promise.all([
          dataService.getAllPlans(),
          dataService.getSubscriptionBySchool(currentUser.schoolId),
        ]);
        setPlans(plansData);
        setCurrentSubscription(subscriptionData);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les données d'abonnement",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId: string) => {
    try {
      setUpgrading(true);
      const currentUser = authService.getCurrentUser();
      if (currentUser?.schoolId) {
        await dataService.updateSubscription(currentUser.schoolId, planId);
        await loadData();
        toast({
          title: "Abonnement mis à jour",
          description: "Votre abonnement a été mis à jour avec succès",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour l'abonnement",
      });
    } finally {
      setUpgrading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency === "XOF" ? "XOF" : "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "basic":
        return <Shield className="w-6 h-6" />;
      case "standard":
        return <Star className="w-6 h-6" />;
      case "premium":
        return <Crown className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case "basic":
        return "border-gray-200 bg-white";
      case "standard":
        return "border-blue-200 bg-blue-50";
      case "premium":
        return "border-purple-200 bg-purple-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  const getCurrentPlan = () => {
    if (!currentSubscription) return null;
    return plans.find((p) => p.id === currentSubscription.planId);
  };

  const getSubscriptionProgress = () => {
    if (!currentSubscription) return 0;
    const start = new Date(currentSubscription.startDate);
    const end = new Date(currentSubscription.endDate);
    const now = new Date();
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  const getDaysRemaining = () => {
    if (!currentSubscription) return 0;
    const end = new Date(currentSubscription.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  if (loading) {
    return (
      <DashboardLayout userType="ecole">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const currentPlan = getCurrentPlan();

  return (
    <DashboardLayout userType="ecole">
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Abonnements</h1>
          <p className="text-gray-600 mt-1">
            Gérez votre abonnement et choisissez le plan adapté à vos besoins
          </p>
        </div>

        {/* Abonnement actuel */}
        {currentSubscription && currentPlan && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-6 h-6 mr-2" />
                Abonnement actuel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-600 text-white rounded-lg">
                      {getPlanIcon(currentPlan.id)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Plan {currentPlan.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatPrice(currentPlan.price, currentPlan.currency)}
                        /mois
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`${
                      currentSubscription.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {currentSubscription.status === "active"
                      ? "Actif"
                      : "Inactif"}
                  </Badge>
                </div>

                <div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Période d'abonnement</span>
                      <span>{getDaysRemaining()} jours restants</span>
                    </div>
                    <Progress value={getSubscriptionProgress()} />
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {new Date(
                          currentSubscription.startDate,
                        ).toLocaleDateString()}
                      </span>
                      <span>
                        {new Date(
                          currentSubscription.endDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Montant total</span>
                    <span className="font-medium">
                      {formatPrice(currentSubscription.totalAmount, "XOF")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Montant payé</span>
                    <span className="text-green-600 font-medium">
                      {formatPrice(currentSubscription.paidAmount, "XOF")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Montant restant</span>
                    <span className="text-orange-600 font-medium">
                      {formatPrice(currentSubscription.remainingAmount, "XOF")}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Plans disponibles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Plans disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${getPlanColor(plan.id)} ${
                  currentPlan?.id === plan.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {plan.id === "premium" && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-4 rounded-full ${
                        plan.id === "basic"
                          ? "bg-gray-100"
                          : plan.id === "standard"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                      }`}
                    >
                      {getPlanIcon(plan.id)}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(plan.price, plan.currency)}
                    <span className="text-sm font-normal text-gray-600">
                      /mois
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Jusqu'à {plan.maxStudents} élèves
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Fonctionnalités incluses :
                      </h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Limitations :
                        </h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start">
                              <AlertCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">
                                {limitation}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {currentPlan?.id === plan.id ? (
                    <Button disabled className="w-full">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Plan actuel
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className={`w-full ${
                            plan.id === "premium"
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                              : ""
                          }`}
                          variant={
                            plan.id === "premium" ? "default" : "outline"
                          }
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {currentPlan ? "Changer de plan" : "Choisir ce plan"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Confirmer le changement de plan
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">
                            Êtes-vous sûr de vouloir passer au plan{" "}
                            <strong>{plan.name}</strong> ?
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span>Nouveau prix mensuel :</span>
                              <span className="font-semibold">
                                {formatPrice(plan.price, plan.currency)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Nombre d'élèves max :</span>
                              <span className="font-semibold">
                                {plan.maxStudents}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <Button
                              onClick={() => handleUpgrade(plan.id)}
                              disabled={upgrading}
                              className="flex-1"
                            >
                              {upgrading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Mise à jour...
                                </>
                              ) : (
                                <>
                                  <Zap className="w-4 h-4 mr-2" />
                                  Confirmer
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Historique de facturation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Historique de facturation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Facture Mars 2024
                  </h3>
                  <p className="text-sm text-gray-600">
                    Plan Premium - 01/03/2024 au 31/03/2024
                  </p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 mb-2">
                    Payée
                  </Badge>
                  <p className="text-sm font-medium">600 000 XOF</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Facture Avril 2024
                  </h3>
                  <p className="text-sm text-gray-600">
                    Plan Premium - 01/04/2024 au 30/04/2024
                  </p>
                </div>
                <div className="text-right">
                  <Badge className="bg-orange-100 text-orange-800 mb-2">
                    En attente
                  </Badge>
                  <p className="text-sm font-medium">600 000 XOF</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
