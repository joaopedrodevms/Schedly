import { XIcon, CheckIcon } from "lucide-react"

export function ComparisonSection() {
    return (
        <section className="py-24 bg-background/50">
            <div className="container mx-auto px-4">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                </div>
                <div className="text-center space-y-6 mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary/90">
                        Chega de pesadelos com agendamentos
                    </h2>
                    <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto">
                        Todos já passamos por isso - infinitas trocas de e-mails apenas para encontrar um horário que funcione para todos
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    {/* Modo Antigo */}
                    <div className="space-y-8 group">
                        <div className="flex items-center gap-4 transition-all duration-300 group-hover:translate-x-2">
                            <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center shadow-sm">
                                <XIcon className="w-6 h-6 text-destructive" />
                            </div>
                            <h3 className="text-2xl font-semibold text-foreground/90">Modo Tradicional</h3>
                        </div>

                        <div className="space-y-3">
                            {[
                                "Múltiplas trocas de e-mails indo e voltando",
                                "Verificação manual da disponibilidade de todos",
                                "Confusão com fusos horários e erros",
                                "Agendamentos duplicados e conflitos de horários",
                                "Tempo perdido com coordenação em vez de trabalho"
                            ].map((problem, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300
                                    hover:bg-destructive/5 hover:shadow-sm border border-destructive/10 hover:border-destructive/20"
                                >
                                    <XIcon className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground/90">{problem}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modo Schedly */}
                    <div className="space-y-8 group">
                        <div className="flex items-center gap-4 transition-all duration-300 group-hover:translate-x-2">
                            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center shadow-sm">
                                <CheckIcon className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-semibold text-foreground/90">Modo Schedly</h3>
                        </div>

                        <div className="space-y-3">
                            {[
                                "Compartilhe um link e pronto",
                                "Sua disponibilidade atualiza automaticamente",
                                "Conversão automática de fuso horário",
                                "Sem mais agendamentos duplicados",
                                "Foque no que importa - seu trabalho"
                            ].map((solution, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300
                                    hover:bg-green-500/5 hover:shadow-sm border border-green-500/10 hover:border-green-500/20"
                                >
                                    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground/90">{solution}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 