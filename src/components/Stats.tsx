import { Users, Award, TrendingUp, Clock } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Clock,
      value: "50+",
      label: "Años de experiencia"
    },
    {
      icon: Users,
      value: "+100.000",
      label: "Clientes satisfechos"
    },
    {
      icon: TrendingUp,
      value: "Millones €",
      label: "Recuperados para clientes"
    },
    {
      icon: Award,
      value: "100%",
      label: "Dedicación y compromiso"
    }
  ];

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
