import { Button } from "@/components/ui/button"
import { ArrowRightIcon, CalendarIcon } from "lucide-react"
import { Link } from "react-router-dom"

export function CtaSection() {
    return (
        <section className="py-32 bg-gradient-to-b from-background/50 to-primary/5 relative overflow-hidden">
            {/* Elementos decorativos de fundo */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center space-y-12 max-w-3xl mx-auto">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                            Pronto para simplificar seus agendamentos?
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Junte-se a milhares de profissionais que abandonaram as trocas infinitas de e-mails.
                            Comece seu período gratuito hoje.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                        >
                            <CalendarIcon className="w-5 h-5 mr-2" />
                            <Link to="/register">Começar Gratuitamente</Link>
                            <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground">
                        <span className="flex items-center">
                            <span className="mr-2 text-primary">✓</span>
                            Grátis
                        </span>
                        <span className="flex items-center">
                            <span className="mr-2 text-primary">✓</span>
                            Sem cartão de crédito
                        </span>
                        <span className="flex items-center">
                            <span className="mr-2 text-primary">✓</span>
                            Configuração em 2 minutos
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
} 