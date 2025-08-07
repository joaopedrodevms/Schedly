import { CardHeader } from "@/components/ui/card"
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/ui/stepper"
import { SCHEDULE_STEPS } from "../constants"

interface ScheduleHeaderProps {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    steps: typeof SCHEDULE_STEPS;
}

export function ScheduleHeader({ currentStep, setCurrentStep, steps }: ScheduleHeaderProps) {
    return (
        <CardHeader>
            <Stepper value={currentStep} onValueChange={setCurrentStep}>
                {steps.map(({ step, title }) => (
                    <StepperItem
                        key={step}
                        step={step}
                        className="relative flex-1 flex-col!"
                        disabled={currentStep === 3}
                    >
                        <StepperTrigger className="flex-col gap-3 rounded">
                            <StepperIndicator />
                            <div className="space-y-0.5 px-2">
                                <StepperTitle>{title}</StepperTitle>
                            </div>
                        </StepperTrigger>
                        {step < steps.length && (
                            <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                        )}
                    </StepperItem>
                ))}
            </Stepper>
        </CardHeader>
    )
}