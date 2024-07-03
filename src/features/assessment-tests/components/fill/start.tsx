import { dataFaker } from '@/app/(authenticated)/assessment-tests/[id]/page'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { useSearchParams } from 'next/navigation'

export default function StartComponent() {
  const searchParams = useSearchParams()

  const page = searchParams.get('page')
  console.log('🚀 ~ StartComponent ~ page:', page)

  return (
    <TabsContent value="0">
      <Card>
        <CardContent className="space-y-2">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mt-2 text-3xl font-extrabold">{dataFaker.name}</div>
            <div className="mt-2 text-2xl font-bold">{dataFaker.subject}</div>
            <div className="mt-2 p-8 text-lg font-bold">{dataFaker.year}</div>

            <Button type="button">Start</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
