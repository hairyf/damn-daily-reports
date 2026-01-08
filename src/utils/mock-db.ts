// 生成日期的辅助函数
function getDateString(daysAgo: number): string {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

// 模拟异步延迟
function delay(ms = 100) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 数据库条目类型
export interface DatabaseItem {
  id?: number
  source: 'git' | 'clickup' | 'slack' | 'gmail' | 'alimail'
  date: string
  content: string
  created_at?: string
  updated_at?: string
}

// Mock 数据库数据
const mockDatabaseItems: DatabaseItem[] = [
  {
    id: 1,
    source: 'git',
    date: getDateString(0),
    content: '修复了用户登录页面的验证逻辑问题，优化了错误提示信息',
    created_at: `${getDateString(0)}T09:00:00`,
    updated_at: `${getDateString(0)}T09:00:00`,
  },
  {
    id: 2,
    source: 'clickup',
    date: getDateString(0),
    content: '完成了新功能模块的设计评审，确定了技术实现方案',
    created_at: `${getDateString(0)}T10:30:00`,
    updated_at: `${getDateString(0)}T10:30:00`,
  },
  {
    id: 4,
    source: 'git',
    date: getDateString(1),
    content: '合并了 feature/user-profile 分支，添加了用户资料编辑功能',
    created_at: `${getDateString(1)}T14:20:00`,
    updated_at: `${getDateString(1)}T14:20:00`,
  },
  {
    id: 5,
    source: 'clickup',
    date: getDateString(1),
    content: '更新了项目进度，当前完成度 75%，预计下周完成剩余功能',
    created_at: `${getDateString(1)}T15:45:00`,
    updated_at: `${getDateString(1)}T15:45:00`,
  },
  {
    id: 6,
    source: 'slack',
    date: getDateString(1),
    content: '团队讨论了下个迭代的计划，确定了优先级和分工',
    created_at: `${getDateString(1)}T16:30:00`,
    updated_at: `${getDateString(1)}T16:30:00`,
  },
  {
    id: 8,
    source: 'git',
    date: getDateString(2),
    content: '重构了数据访问层，提升了代码可维护性和性能',
    created_at: `${getDateString(2)}T10:15:00`,
    updated_at: `${getDateString(2)}T10:15:00`,
  },
  {
    id: 10,
    source: 'clickup',
    date: getDateString(3),
    content: '完成了 API 文档的编写，已提交给前端团队进行对接',
    created_at: `${getDateString(3)}T13:20:00`,
    updated_at: `${getDateString(3)}T13:20:00`,
  },
  {
    id: 11,
    source: 'git',
    date: getDateString(3),
    content: '添加了单元测试，覆盖率达到 85%，提升了代码质量',
    created_at: `${getDateString(3)}T14:45:00`,
    updated_at: `${getDateString(3)}T14:45:00`,
  },
  {
    id: 13,
    source: 'slack',
    date: getDateString(4),
    content: '分享了新技术栈的学习心得，团队讨论热烈',
    created_at: `${getDateString(4)}T10:00:00`,
    updated_at: `${getDateString(4)}T10:00:00`,
  },
  {
    id: 14,
    source: 'git',
    date: getDateString(4),
    content: '优化了数据库查询，减少了响应时间，提升了用户体验',
    created_at: `${getDateString(4)}T11:30:00`,
    updated_at: `${getDateString(4)}T11:30:00`,
  },
  {
    id: 16,
    source: 'clickup',
    date: getDateString(5),
    content: '完成了代码审查，提出了几处优化建议，已反馈给开发者',
    created_at: `${getDateString(5)}T09:45:00`,
    updated_at: `${getDateString(5)}T09:45:00`,
  },
  {
    id: 18,
    source: 'git',
    date: getDateString(6),
    content: '修复了生产环境的紧急 bug，已部署热修复版本',
    created_at: `${getDateString(6)}T08:30:00`,
    updated_at: `${getDateString(6)}T08:30:00`,
  },
  {
    id: 19,
    source: 'slack',
    date: getDateString(6),
    content: '协调了跨部门合作，解决了资源分配问题',
    created_at: `${getDateString(6)}T10:20:00`,
    updated_at: `${getDateString(6)}T10:20:00`,
  },
  {
    id: 20,
    source: 'gmail',
    date: getDateString(0),
    content: '收到客户关于产品功能的咨询邮件，已回复并提供详细说明',
    created_at: `${getDateString(0)}T08:15:00`,
    updated_at: `${getDateString(0)}T08:15:00`,
  },
  {
    id: 21,
    source: 'gmail',
    date: getDateString(1),
    content: '收到供应商的合作提案邮件，需要进一步评估和讨论',
    created_at: `${getDateString(1)}T11:20:00`,
    updated_at: `${getDateString(1)}T11:20:00`,
  },
  {
    id: 22,
    source: 'alimail',
    date: getDateString(1),
    content: '收到阿里云关于服务器维护的通知邮件，已安排相应准备工作',
    created_at: `${getDateString(1)}T09:30:00`,
    updated_at: `${getDateString(1)}T09:30:00`,
  },
  {
    id: 23,
    source: 'gmail',
    date: getDateString(2),
    content: '收到团队成员的工作汇报邮件，项目进展顺利',
    created_at: `${getDateString(2)}T14:10:00`,
    updated_at: `${getDateString(2)}T14:10:00`,
  },
  {
    id: 24,
    source: 'alimail',
    date: getDateString(2),
    content: '收到阿里云账单通知，本月云服务费用在预算范围内',
    created_at: `${getDateString(2)}T16:45:00`,
    updated_at: `${getDateString(2)}T16:45:00`,
  },
  {
    id: 25,
    source: 'gmail',
    date: getDateString(3),
    content: '收到会议邀请邮件，已确认参加下周的技术分享会',
    created_at: `${getDateString(3)}T10:00:00`,
    updated_at: `${getDateString(3)}T10:00:00`,
  },
  {
    id: 26,
    source: 'alimail',
    date: getDateString(4),
    content: '收到阿里云安全提醒邮件，已检查并更新了安全配置',
    created_at: `${getDateString(4)}T13:20:00`,
    updated_at: `${getDateString(4)}T13:20:00`,
  },
  {
    id: 27,
    source: 'gmail',
    date: getDateString(5),
    content: '收到客户反馈邮件，对产品新功能表示满意',
    created_at: `${getDateString(5)}T15:30:00`,
    updated_at: `${getDateString(5)}T15:30:00`,
  },
  {
    id: 28,
    source: 'alimail',
    date: getDateString(5),
    content: '收到阿里云产品更新通知，新功能已上线可用',
    created_at: `${getDateString(5)}T11:15:00`,
    updated_at: `${getDateString(5)}T11:15:00`,
  },
  {
    id: 29,
    source: 'gmail',
    date: getDateString(7),
    content: '收到合作伙伴的商务合作邮件，已安排会议进一步沟通',
    created_at: `${getDateString(7)}T09:45:00`,
    updated_at: `${getDateString(7)}T09:45:00`,
  },
]

// 保留用于未来添加新数据项
// let nextDatabaseId = 21

export async function getAllDatabaseItems(): Promise<DatabaseItem[]> {
  await delay()
  return [...mockDatabaseItems].sort((a, b) => {
    if (!a.date || !b.date)
      return 0
    return b.date.localeCompare(a.date)
  })
}

export async function getDatabaseItemById(id: number): Promise<DatabaseItem | null> {
  await delay()
  return mockDatabaseItems.find(item => item.id === id) || null
}

export async function searchDatabaseItems(query: string, source?: string): Promise<DatabaseItem[]> {
  await delay()
  let results = mockDatabaseItems.filter((item) => {
    const text = item.content.toLowerCase()
    return text.includes(query.toLowerCase())
  })

  if (source) {
    results = results.filter(item => item.source === source)
  }

  return results.sort((a, b) => {
    if (!a.date || !b.date)
      return 0
    return b.date.localeCompare(a.date)
  })
}

// ----------------------------------------------------------------------
// Source Config Storage
// ----------------------------------------------------------------------

export type SourceType = 'git' | 'other' // extensible

export interface SourceConfig {
  id?: number
  type: SourceType
  name: string
  config: Record<string, any>
  created_at?: string
  updated_at?: string
}

let mockSources: SourceConfig[] = []
let nextSourceId = 1

export async function createSource(source: Omit<SourceConfig, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  await delay()
  const newSource: SourceConfig = {
    ...source,
    id: nextSourceId++,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockSources.push(newSource)
  return newSource.id!
}

export async function getSources(): Promise<SourceConfig[]> {
  await delay()
  return [...mockSources]
}
