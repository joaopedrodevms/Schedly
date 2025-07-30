import { CalendarIcon } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-background/50 py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Marca */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                                <CalendarIcon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-xl font-medium">Scheduly</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            A maneira mais simples de agendar reuniões sem trocas infinitas de e-mails.
                        </p>
                        <div className="flex items-center gap-4">
                            {/* Ícones de redes sociais podem ser adicionados aqui */}
                        </div>
                    </div>

                    {/* Produto */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-medium text-foreground">Produto</h4>
                        <nav className="space-y-4 text-sm">
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Recursos</a>
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Preços</a>
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Integrações</a>
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">API</a>
                        </nav>
                    </div>

                    {/* Empresa */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-medium text-foreground">Empresa</h4>
                        <nav className="space-y-4 text-sm">
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Sobre</a>
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Blog</a>
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Carreiras</a>
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Contato</a>
                        </nav>
                    </div>

                    {/* Suporte */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-medium text-foreground">Suporte</h4>
                        <nav className="space-y-4 text-sm">
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Central de Ajuda</a>
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Documentação</a>
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Status</a>
                            <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors duration-200">Segurança</a>
                        </nav>
                    </div>
                </div>

                <div className="border-t mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
                    <div>
                        © 2025 Scheduly. Todos os direitos reservados.
                    </div>
                    <nav className="flex items-center gap-8">
                        <a href="#" className="hover:text-foreground transition-colors duration-200">Política de Privacidade</a>
                        <a href="#" className="hover:text-foreground transition-colors duration-200">Termos de Serviço</a>
                        <a href="#" className="hover:text-foreground transition-colors duration-200">Cookies</a>
                    </nav>
                </div>
            </div>
        </footer>
    )
} 