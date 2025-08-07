import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="flex flex-col items-center gap-2">
                        <span className="text-8xl font-bold text-primary">404</span>
                        <span className="text-2xl">Página não encontrada</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                    <p>Desculpe, a página que você está procurando não existe ou foi movida.</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button 
                        onClick={() => navigate("/")}
                    >
                        Voltar para o início
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}