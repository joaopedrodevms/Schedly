import { CalendarIcon, GlobeIcon, ZapIcon, BellIcon, SmartphoneIcon, ShieldIcon } from "lucide-react"

export function FeaturesSection() {
    const features = [
        {
            icon: CalendarIcon,
            title: "Sincronização Inteligente",
            description: "Sincronize automaticamente com Google Calendar, Outlook e outros aplicativos de calendário"
        },
        {
            icon: GlobeIcon,
            title: "Fuso Horário Automático",
            description: "Detecção e conversão automática de fuso horário para equipes e clientes globais"
        },
        {
            icon: ZapIcon,
            title: "Agendamento Instantâneo",
            description: "Atualizações em tempo real da disponibilidade com confirmação imediata"
        },
        {
            icon: BellIcon,
            title: "Notificações Inteligentes",
            description: "Lembretes por e-mail para você e seus participantes"
        },
        {
            icon: SmartphoneIcon,
            title: "Otimizado para Mobile",
            description: "Experiência perfeita em qualquer dispositivo - desktop, tablet ou celular"
        },
        {
            icon: ShieldIcon,
            title: "Privacidade em Primeiro Lugar",
            description: "Seus dados de calendário permanecem privados. Vemos apenas a disponibilidade"
        }
    ];

    return (
        <section id="features" className="py-24 bg-background/50">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-6 mb-20">
                    <h2 className="text-4xl font-bold text-foreground tracking-tight">
                        Tudo que você precisa para agendar melhor
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Recursos poderosos projetados para tornar o agendamento simples para você e conveniente para todos
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative p-8 rounded-2xl transition-all duration-300 hover:bg-accent/10"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>

                            <h3 className="text-xl font-medium text-foreground mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 