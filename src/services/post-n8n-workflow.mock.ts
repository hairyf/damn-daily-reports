export const postN8nWorkflowParamsMock = {
  name: 'My workflow',
  nodes: [
    {
      parameters: {
        path: '909226a4-e385-44d9-abb1-0d0933f89e86',
        options: {},
      },
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2.1,
      position: [
        0,
        0,
      ],
      id: '83d50ff8-0fc9-483c-834c-15795471b3b1',
      name: 'Webhook',
      webhookId: '909226a4-e385-44d9-abb1-0d0933f89e86',
    },
    {
      parameters: {
        options: {},
      },
      type: '@n8n/n8n-nodes-langchain.agent',
      typeVersion: 3.1,
      position: [
        208,
        0,
      ],
      id: 'fe416c3f-a0b4-4cd0-9788-3dca09da0fbd',
      name: 'AI Agent',
    },
    {
      parameters: {
        options: {},
      },
      type: 'n8n-nodes-base.httpRequestTool',
      typeVersion: 4.3,
      position: [
        352,
        224,
      ],
      id: '052cbe3e-2857-4182-ab68-38a4fb727ff1',
      name: 'HTTP Request',
    },
    {
      parameters: {
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.3,
      position: [
        560,
        0,
      ],
      id: '1bc9b153-f9df-4560-b273-f3cc8bde63b0',
      name: 'HTTP Request1',
    },
    {
      parameters: {},
      type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
      typeVersion: 1.3,
      position: [
        240,
        224,
      ],
      id: '6a7fb7ca-4499-4348-9336-e3babf04407d',
      name: 'Simple Memory',
    },
    {
      parameters: {
        options: {},
      },
      type: '@n8n/n8n-nodes-langchain.lmChatDeepSeek',
      typeVersion: 1,
      position: [
        128,
        224,
      ],
      id: '29692b67-1ae3-4857-b4a0-134336d0f61e',
      name: 'DeepSeek Chat Model',
    },
  ],
  pinData: {},
  connections: {
    'Webhook': {
      main: [
        [
          {
            node: 'AI Agent',
            type: 'main',
            index: 0,
          },
        ],
      ],
    },
    'HTTP Request': {
      ai_tool: [
        [
          {
            node: 'AI Agent',
            type: 'ai_tool',
            index: 0,
          },
        ],
      ],
    },
    'AI Agent': {
      main: [
        [
          {
            node: 'HTTP Request1',
            type: 'main',
            index: 0,
          },
        ],
      ],
    },
    'Simple Memory': {
      ai_memory: [
        [
          {
            node: 'AI Agent',
            type: 'ai_memory',
            index: 0,
          },
        ],
      ],
    },
    'DeepSeek Chat Model': {
      ai_languageModel: [
        [
          {
            node: 'AI Agent',
            type: 'ai_languageModel',
            index: 0,
          },
        ],
      ],
    },
  },
  active: false,
  settings: {
    executionOrder: 'v1',
    availableInMCP: false,
  },
  tags: [],
  versionId: '',
}

export const postN8nWorkflowResultMock = {
  updatedAt: '2026-01-07T08:32:47.826Z',
  createdAt: '2026-01-07T08:32:47.826Z',
  id: 'QqCfjqFbnKdKi0aE',
  name: 'My workflow',
  description: null,
  active: false,
  isArchived: false,
  nodes: [
    {
      parameters: {
        path: '909226a4-e385-44d9-abb1-0d0933f89e86',
        options: {},
      },
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2.1,
      position: [
        0,
        0,
      ],
      id: '83d50ff8-0fc9-483c-834c-15795471b3b1',
      name: 'Webhook',
      webhookId: '909226a4-e385-44d9-abb1-0d0933f89e86',
    },
    {
      parameters: {
        options: {},
      },
      type: '@n8n/n8n-nodes-langchain.agent',
      typeVersion: 3.1,
      position: [
        208,
        0,
      ],
      id: 'fe416c3f-a0b4-4cd0-9788-3dca09da0fbd',
      name: 'AI Agent',
    },
    {
      parameters: {
        options: {},
      },
      type: 'n8n-nodes-base.httpRequestTool',
      typeVersion: 4.3,
      position: [
        352,
        224,
      ],
      id: '052cbe3e-2857-4182-ab68-38a4fb727ff1',
      name: 'HTTP Request',
    },
    {
      parameters: {
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.3,
      position: [
        560,
        0,
      ],
      id: '1bc9b153-f9df-4560-b273-f3cc8bde63b0',
      name: 'HTTP Request1',
    },
    {
      parameters: {},
      type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
      typeVersion: 1.3,
      position: [
        240,
        224,
      ],
      id: '6a7fb7ca-4499-4348-9336-e3babf04407d',
      name: 'Simple Memory',
    },
    {
      parameters: {
        options: {},
      },
      type: '@n8n/n8n-nodes-langchain.lmChatDeepSeek',
      typeVersion: 1,
      position: [
        128,
        224,
      ],
      id: '29692b67-1ae3-4857-b4a0-134336d0f61e',
      name: 'DeepSeek Chat Model',
    },
  ],
  connections: {
    'Webhook': {
      main: [
        [
          {
            node: 'AI Agent',
            type: 'main',
            index: 0,
          },
        ],
      ],
    },
    'HTTP Request': {
      ai_tool: [
        [
          {
            node: 'AI Agent',
            type: 'ai_tool',
            index: 0,
          },
        ],
      ],
    },
    'AI Agent': {
      main: [
        [
          {
            node: 'HTTP Request1',
            type: 'main',
            index: 0,
          },
        ],
      ],
    },
    'Simple Memory': {
      ai_memory: [
        [
          {
            node: 'AI Agent',
            type: 'ai_memory',
            index: 0,
          },
        ],
      ],
    },
    'DeepSeek Chat Model': {
      ai_languageModel: [
        [
          {
            node: 'AI Agent',
            type: 'ai_languageModel',
            index: 0,
          },
        ],
      ],
    },
  },
  settings: {
    executionOrder: 'v1',
    availableInMCP: false,
  },
  staticData: null,
  meta: null,
  pinData: {},
  versionId: 'abc9b00b-f265-46e2-9bad-2c7eac6926c5',
  activeVersionId: null,
  versionCounter: 1,
  triggerCount: 0,
  tags: [],
  parentFolder: null,
  activeVersion: null,
  homeProject: {
    id: 'yGElwmPIkNTo2hKe',
    type: 'personal',
    name: 'Mao wwu710632@gmail.com <wwu710632@gamil.com>',
    icon: null,
  },
  sharedWithProjects: [],
  usedCredentials: [],
  scopes: [
    'workflow:create',
    'workflow:delete',
    'workflow:execute',
    'workflow:execute-chat',
    'workflow:list',
    'workflow:move',
    'workflow:read',
    'workflow:share',
    'workflow:update',
  ],
  checksum: '2b4c790a27d8cf3ae5616b1bbe5b00711d06264f244c52c05eb6973e3b81d947',
}
