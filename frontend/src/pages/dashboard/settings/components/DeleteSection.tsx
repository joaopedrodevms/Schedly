import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircleIcon, Trash2Icon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteSection() {
    return (
        <Card className="border-destructive/50">
            <CardHeader className="border-b border-destructive/20">
                <div className="flex items-center gap-2 text-destructive">
                    <AlertCircleIcon className="h-5 w-5" />
                    <CardTitle>Zona de Perigo</CardTitle>
                </div>
                <CardDescription className="text-destructive/80 mt-2">
                    Uma vez excluída, sua conta não poderá ser recuperada. Esta ação é irreversível.
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button 
                            variant="destructive" 
                            className="w-full sm:w-auto"
                            size={"sm"}
                        >
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Apagar conta
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
                                e removerá seus dados de nossos servidores.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={() => {
                                    // TODO: Implementar lógica de exclusão da conta
                                    console.log("Conta excluída");
                                }}
                            >
                                Excluir conta
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    );
}