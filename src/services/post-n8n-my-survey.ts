import { fetch } from '@tauri-apps/plugin-http'

export interface PostN8nMeSurveyParams {
  version: string
  personalization_survey_submitted_at: string
  personalization_survey_n8n_version: string
}

export async function postN8nMeSurvey(params: PostN8nMeSurveyParams) {
  const response = await fetch(`${N8N_API_URL}/rest/me/survey`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return response.json()
}
