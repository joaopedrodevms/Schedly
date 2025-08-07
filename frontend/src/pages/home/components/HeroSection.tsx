import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/theme/theme-provider"
import { ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"

export function HeroSection() {

    const { theme } = useTheme();
    const img = theme === "dark" ? "/assets/calendar-dark.png" : "/assets/calendar-light.png";

    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background to-background/95">
            {/* Gradiente de fundo suave */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Conteúdo à esquerda */}
                    <div className="space-y-12 max-w-xl mx-auto lg:mx-0">
                        <div className="space-y-8">
                            <div 
                                className="inline-flex items-center gap-2.5 px-4 py-2 bg-primary/5 rounded-full text-primary text-sm font-medium 
                                transition-all duration-300 hover:bg-primary/10 hover:scale-[1.02] cursor-default"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/75 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                                </span>
                                Chega de troca de e-mails
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
                                Agende reuniões de forma
                                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent"> automática</span>
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed">
                                Crie seu link personalizado e permita que outros marquem horários com você automaticamente. 
                                Sem mais trocas infinitas de e-mails.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <Button 
                                variant="default" 
                                size="lg" 
                                className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl 
                                transition-all duration-300 hover:translate-y-[-2px]"
                            >
                                
                                <Link to="/register">Começar Gratuitamente</Link>
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="font-semibold text-foreground">5.000+</span>
                                profissionais confiam
                            </div>
                            <div className="h-4 w-px bg-border hidden sm:block"></div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Badge variant={"outline"}>Grátis</Badge>
                            </div>
                        </div>
                    </div>

                    {/* Imagem à direita */}
                    <div className="relative lg:animate-float">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 
                            hover:shadow-3xl hover:translate-y-[-4px] group">
                            <img
                                src={img}
                                alt="Interface do calendário Scheduly"
                                className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-500 
                                group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-60 
                                mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500"></div>
                        </div>
                        
                        {/* Elementos decorativos com blur */}
                        <div className="absolute -z-10 -top-10 -right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl 
                            animate-pulse-slow"></div>
                        <div className="absolute -z-10 -bottom-10 -left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl 
                            animate-pulse-slow [animation-delay:1s]"></div>
                    </div>
                </div>
            </div>
        </section>
    )
} 