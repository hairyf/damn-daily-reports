import { useNavigate, useSearchParams } from 'react-router-dom'

function Page() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const reportId = searchParams.get('id') || ''

  async function onCancel() {
    navigate('/report')
  }

  return (
    <ReportEditor
      reportId={reportId}
      onCancel={onCancel}
      showCancel={true}
      onDeleted={() => navigate('/report')}
    />
  )
}

export default Page
