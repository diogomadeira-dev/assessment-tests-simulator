import dynamic from 'next/dynamic'

const AssessmentTests = () => {
  const Editor = dynamic(() => import('@/components/tiptap'), { ssr: false })

  return (
    <div>
      <h2>AssessmentTests</h2>

      <Editor />
    </div>
  )
}

export default AssessmentTests
