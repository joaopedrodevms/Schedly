import { useState, useMemo } from "react"
import { format, parse, isWithinInterval, getDay, addMinutes, isSameDay, isAfter } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ptBR } from "date-fns/locale"
import type { EventAvailabilityDto, EventUnavailabilityDto } from "@/service"

// Converte o dia da semana do JavaScript (0 = Domingo) para o formato da API (0 = Segunda)
const convertJsWeekDayToApiWeekDay = (jsWeekDay: number): number => {
  // Converte do formato JS (0=Domingo) para API (0=Segunda)
  // JS: [0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sab]
  // API: [0=Seg, 1=Ter, 2=Qua, 3=Qui, 4=Sex, 5=Sab, 6=Dom]
  return jsWeekDay === 0 ? 6 : jsWeekDay - 1
}

interface DateTimeSchedulerProps {
  avails: EventAvailabilityDto[]
  notAvailable: EventUnavailabilityDto[]
  durationMinutes: number
  onSelect?: (date: Date, time: string) => void
}

export default function DateTimeScheduler({ avails, notAvailable, durationMinutes, onSelect }: DateTimeSchedulerProps) {
  
  const now = new Date()
  const [date, setDate] = useState<Date>(now)
  const [time, setTime] = useState<string | null>(null)

  // Reseta a seleção de horário quando mudar de dia
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      setTime(null)
      
      // Se o dia selecionado for hoje e houver um horário selecionado,
      // verifica se o horário ainda é válido
      if (time && isSameDay(newDate, now)) {
        const selectedTime = parse(time, "HH:mm", newDate)
        if (!isAfter(selectedTime, now)) {
          setTime(null)
        }
      }
    }
  }

  const generateTimeSlots = (selectedDate: Date, avails: EventAvailabilityDto[], notAvailable: EventUnavailabilityDto[], durationMinutes: number) => {
    const jsWeekDay = getDay(selectedDate)
    const apiWeekDay = convertJsWeekDayToApiWeekDay(jsWeekDay)
    const dayAvailability = avails.find(avail => avail.week_day === apiWeekDay)
    const now = new Date()
    
    if (!dayAvailability) {
      return []
    }

    const slots: { time: string; available: boolean }[] = []
    // Removendo os segundos do formato da hora
    const startTimeStr = dayAvailability.start_time.substring(0, 5) // "09:00:00" -> "09:00"
    const endTimeStr = dayAvailability.end_time.substring(0, 5) // "18:00:00" -> "18:00"
    
    const startTime = parse(startTimeStr, "HH:mm", selectedDate)
    const endTime = parse(endTimeStr, "HH:mm", selectedDate)
    
    let currentSlot = startTime

    let slotsCount = 0
    while (currentSlot < endTime) {
      const slotEnd = addMinutes(currentSlot, durationMinutes)
      const timeString = format(currentSlot, "HH:mm", { locale: ptBR })
      
      // Verificar se o horário está bloqueado
      const isBlocked = notAvailable.some(block => {
        const blockStart = new Date(block.starts_at)
        const blockEnd = new Date(block.ends_at)
        return isWithinInterval(currentSlot, { start: blockStart, end: blockEnd }) ||
               isWithinInterval(slotEnd, { start: blockStart, end: blockEnd })
      })

      // Verificar se o horário é no passado
      const isPast = isSameDay(selectedDate, now) && !isAfter(currentSlot, now)
      
      slots.push({
        time: timeString,
        available: !isBlocked && !isPast
      })
      
      slotsCount++
      currentSlot = slotEnd
    }
    
    return slots
  }

  const timeSlots = useMemo(() => 
    generateTimeSlots(date, avails, notAvailable, durationMinutes),
    [date, avails, notAvailable, durationMinutes]
  )
  
  return (
    <div>
      <div className="rounded-md border">
        <div className="flex max-sm:flex-col">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="p-2 sm:pe-5"
            disabled={[
              { before: now },
              (date) => {
                const jsWeekDay = getDay(date)
                const apiWeekDay = convertJsWeekDayToApiWeekDay(jsWeekDay)
                return !avails.some(avail => avail.week_day === apiWeekDay)
              }
            ]}
          />
          <div className="relative w-full max-sm:h-48">
            <div className="absolute inset-0 py-4 max-sm:border-t">
              <ScrollArea className="h-full sm:border-s">
                <div className="space-y-3">
                  <div className="flex h-5 shrink-0 items-center px-5">
                    <p className="text-sm font-medium text-nowrap">
                      {format(date, "EEEE, d", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                    {timeSlots.map(({ time: timeSlot, available }) => (
                      <Button
                        key={timeSlot}
                        variant={time === timeSlot ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          setTime(timeSlot)
                          if (onSelect) {
                            onSelect(date, timeSlot)
                          }
                        }}
                        disabled={!available}
                      >
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
