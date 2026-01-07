import fs from 'node:fs'

const API_TOKEN = 'pk_107434022_CBJI8QPR49ASYXM9IPM3ARAACC0VDC61'
const TEAM_ID = '9018728668'
const USER_ID = '107434022'

async function getMyClosedTasks() {
  const startOfDay = new Date()
  startOfDay.setHours(12, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)
  // 构建查询参数
  const params = new URLSearchParams({
    include_closed: 'true',
    subtasks: 'true',
    date_updated_gt: startOfDay.getTime().toString(), // 完成时间大于今天 0 点
  })

  // ClickUp 要求数组类的参数格式为 assignees[]=id，需要手动追加或按以下方式添加
  params.append('assignees[]', USER_ID)

  const url = `https://api.clickup.com/api/v2/team/${TEAM_ID}/task?${params.toString()}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': API_TOKEN,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()

    fs.writeFileSync('__test-clickup-task-data.json', JSON.stringify(data, null, 2))

    console.log(`成功获取 ${data.tasks.length} 条已完成任务：`)
    data.tasks.forEach((task) => {
      console.log(`${task.status.status}: ${task.name}`)
    //   console.log(`
    //     Task ID: ${task.id}
    //     List Name: ${task.list.name}
    //     Task Name: ${task.name}
    //     Task Status: ${task.status.status}`)
    })
  }
  catch (error) {
    console.error('获取任务时出错:', error.message)
  }
}

getMyClosedTasks()
