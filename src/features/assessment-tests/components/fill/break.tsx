import { Card, CardContent } from '@/components/ui/card'
import { PauseCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function BreakComponent() {
  const searchParams = useSearchParams()

  const page = searchParams.get('page')

  return (
    // <TabsContent value="6">
    <Card>
      <CardContent className="space-y-2">
        <div className="flex flex-col items-center justify-center py-12">
          <PauseCircle size={170} className="text-destructive" />
          <div className="mt-2 text-3xl font-extrabold">FIM DA PARTE A</div>
          <div className="mt-2 text-2xl font-bold">
            Não avances até te dizerem para o fazeres.
          </div>
        </div>
      </CardContent>
    </Card>
    // </TabsContent>
  )
}
