import type { ChatMessage } from '@/types/chat';
import { getUser } from './users';

export const CHANNEL_MESSAGES: Record<string, ChatMessage[]> = {
  general: [
    { id: 'g1', channelId: 'general', role: 'user', type: 'text', content: 'Good morning team! Reminder: standup at 10am', sender: getUser('liming'), timestamp: '9:00 AM' },
    { id: 'g2', channelId: 'general', role: 'user', type: 'text', content: 'Got it, will be there 👍', sender: getUser('jack'), timestamp: '9:05 AM' },
    { id: 'g3', channelId: 'general', role: 'user', type: 'text', content: 'Can we also discuss the Q2 planning?', sender: getUser('sarah'), timestamp: '9:15 AM' },
    { id: 'g4', channelId: 'general', role: 'user', type: 'text', content: 'Sure, let\'s add it to the agenda', sender: getUser('liming'), timestamp: '9:20 AM' },
    { id: 'g5', channelId: 'general', role: 'user', type: 'text', content: '刚刚和客户确认了，Q2 的预算批下来了', sender: getUser('chenlei'), timestamp: '9:30 AM' },
    { id: 'g6', channelId: 'general', role: 'user', type: 'text', content: 'Nice! 那我们可以开始排期了', sender: getUser('me'), timestamp: '9:41 AM' },
    { id: 'g7', channelId: 'general', role: 'user', type: 'text', content: '我整理了一份排期表，稍后发到 #product 频道', sender: getUser('sarah'), timestamp: '9:50 AM' },
  ],

  'flow-contract': [
    {
      id: 'c0', channelId: 'flow-contract', role: 'assistant', type: 'action', content: '已为你创建沟通群聊：',
      action: {
        id: 'a0', type: 'create_group', label: '创建群聊',
        description: '已拉通技术侧相关人员，用于项目需求对齐和进度同步。',
        state: 'executed', groupName: 'Flow 改版需求对齐群',
        members: [getUser('me'), { ...getUser('chenlei'), role: '技术' }, { ...getUser('jack'), name: '刘洋', role: '前端' }],
        timestamp: '10:20 AM',
      },
      timestamp: '10:20 AM', isConfirmed: true,
    },
    { id: 'c1', channelId: 'flow-contract', role: 'user', type: 'text', content: '这个工作的进度目前到底怎么样了？', sender: getUser('me'), timestamp: '10:25 AM' },
    { id: 'c2', channelId: 'flow-contract', role: 'assistant', type: 'text', content: '目前总体进度为 68%。关键路径上的『法务审核』环节停滞在 12%，已导致后续市场投放计划顺延 48 小时。其他环节如设计、技术研发均处于正常状态。', timestamp: '10:25 AM' },
    { id: 'c3', channelId: 'flow-contract', role: 'assistant', type: 'text', content: '已过去 48 小时，王总仍未回复催办邮件。要不要我再发一条微信消息催一下？或者帮你预约一个电话？', timestamp: '10:26 AM', isProactive: true },
    { id: 'c4', channelId: 'flow-contract', role: 'user', type: 'text', content: '发邮件吧', sender: getUser('me'), timestamp: '10:27 AM' },
    {
      id: 'c5', channelId: 'flow-contract', role: 'assistant', type: 'action', content: '已为你准备好邮件催办草案：',
      action: {
        id: 'a1', type: 'nudge', label: '发送邮件', state: 'proposed',
        description: '收件人：wang.zong@startech.cn\n主题：关于合同 CT-2026-0847 的签署确认\n\n王总您好，关于 Q1 Branding 项目的法务审核...',
        recipient: 'wang.zong@startech.cn',
        subject: '合同 CT-2026-0847 签署确认',
        body: '王总您好，\n上周发送的合作合同（编号 CT-2026-0847），请您在方便时审阅并完成签署。如有条款需要沟通，请随时联系我们。\n谢谢！',
        timestamp: '10:27 AM',
      },
      timestamp: '10:27 AM',
    },
  ],

  'design-system': [
    { id: 'ds1', channelId: 'design-system', role: 'assistant', type: 'text', content: '组件盘点已完成，共梳理 86 个组件。其中 23 个存在 Figma 与代码实现不一致，14 个缺少暗色模式适配。建议尽快拉通相关人员进行走查。', timestamp: '11:00 AM' },
    { id: 'ds2', channelId: 'design-system', role: 'user', type: 'text', content: '好的，先建个群把相关人拉进来', sender: getUser('me'), timestamp: '11:05 AM' },
    {
      id: 'ds3', channelId: 'design-system', role: 'assistant', type: 'action', content: '已为你准备好群聊创建方案：',
      action: {
        id: 'a2', type: 'create_group', label: '创建群聊', state: 'proposed',
        description: 'Hi all，本群用于 Design System 组件走查协作。本次审核共涉及 86 个组件，重点关注 Figma 与代码实现不一致 (23个) 和暗色模式适配 (14个)。走查计划将于群内同步，请大家留意。',
        groupName: 'Design System Audit 走查群',
        members: [getUser('me'), getUser('chenlei'), getUser('wangfang'), getUser('liming')],
        timestamp: '11:06 AM',
      },
      timestamp: '11:06 AM',
    },
  ],

  'flow-q1': [
    { id: 'q1', channelId: 'flow-q1', role: 'assistant', type: 'text', content: 'Q1 Sales Forecast 任务已启动。我已向 Jack（华东区）和 Zhanghua（华南区）发送了数据收集请求邮件，要求他们在本周五前提交各自区域的 Q1 销售数据。', timestamp: '9:15 AM' },
    {
      id: 'q2', channelId: 'flow-q1', role: 'assistant', type: 'action', content: '已为你发送数据收集邮件：',
      action: {
        id: 'a3', type: 'send_email', label: '发送邮件', state: 'executed',
        description: '收件人：jack@company.cn, zhanghua@company.cn\n主题：Q1 销售数据收集 — 请于周五前提交',
        recipient: 'jack@company.cn, zhanghua@company.cn',
        subject: 'Q1 销售数据收集 — 请于周五前提交',
        timestamp: '9:16 AM',
      },
      timestamp: '9:16 AM', isConfirmed: true,
    },
    { id: 'q3', channelId: 'flow-q1', role: 'assistant', type: 'text', content: 'Zhanghua 已提交华南区数据，整体增长 12%，符合预期。但 Jack 的华东区数据尚未收到，已超过截止时间 24 小时。', timestamp: '2:30 PM', isProactive: true },
    { id: 'q4', channelId: 'flow-q1', role: 'user', type: 'text', content: 'Jack 那边什么情况？催一下', sender: getUser('me'), timestamp: '2:35 PM' },
    { id: 'q5', channelId: 'flow-q1', role: 'assistant', type: 'text', content: '已向 Jack 发送催办消息。根据他上次回复，华东区本季度有几个大客户合同还在确认中，可能需要额外 1 天整理数据。', timestamp: '2:36 PM' },
    { id: 'q6', channelId: 'flow-q1', role: 'assistant', type: 'text', content: '要不要我先用华南区数据和历史趋势生成一版初步预测？等 Jack 数据到了再更新。', timestamp: '2:37 PM', isProactive: true },
  ],

  product: [
    { id: 'p1', channelId: 'product', role: 'user', type: 'text', content: 'Q2 roadmap draft is ready, please review before Friday', sender: getUser('sarah'), timestamp: '2:00 PM' },
    { id: 'p2', channelId: 'product', role: 'user', type: 'text', content: 'I\'ll add the marketing timeline to it', sender: getUser('lisa'), timestamp: '2:15 PM' },
    { id: 'p3', channelId: 'product', role: 'user', type: 'text', content: '关于 AI 功能的优先级，我们是不是要先对齐一下？', sender: getUser('liming'), timestamp: '3:00 PM' },
    { id: 'p4', channelId: 'product', role: 'user', type: 'text', content: 'Agreed. 我觉得 workflow automation 先做', sender: getUser('me'), timestamp: '3:20 PM' },
    { id: 'p5', channelId: 'product', role: 'user', type: 'text', content: '那我先把 PRD 里这部分补充完整，明天发出来大家看看', sender: getUser('sarah'), timestamp: '3:35 PM' },
    { id: 'p6', channelId: 'product', role: 'user', type: 'text', content: '好的，辛苦 Sarah 🙏', sender: getUser('liming'), timestamp: '3:40 PM' },
  ],

  engineering: [
    { id: 'e1', channelId: 'engineering', role: 'user', type: 'text', content: '大家注意一下，今天下午 3 点有个线上环境的发布', sender: getUser('chenlei'), timestamp: '10:00 AM' },
    { id: 'e2', channelId: 'engineering', role: 'user', type: 'text', content: '收到，我这边的 PR 已经 merge 了', sender: getUser('jack'), timestamp: '10:15 AM' },
    { id: 'e3', channelId: 'engineering', role: 'user', type: 'text', content: 'CI pipeline 跑通了吗？昨天好像有个 flaky test', sender: getUser('liming'), timestamp: '10:30 AM' },
    { id: 'e4', channelId: 'engineering', role: 'user', type: 'text', content: '修了，是 timeout 的问题，已经调大了阈值', sender: getUser('chenlei'), timestamp: '10:45 AM' },
    { id: 'e5', channelId: 'engineering', role: 'user', type: 'text', content: '另外前端构建时间优化了 40%，CI 快了不少', sender: getUser('me'), timestamp: '4:20 PM' },
  ],

  design: [
    { id: 'd1', channelId: 'design', role: 'user', type: 'text', content: '新版首页的设计稿已经更新到 Figma 了，大家看一下', sender: getUser('wangfang'), timestamp: '11:00 AM' },
    { id: 'd2', channelId: 'design', role: 'user', type: 'text', content: '整体方向不错，但 CTA 按钮的颜色可以再大胆一点', sender: getUser('lisa'), timestamp: '11:30 AM' },
    { id: 'd3', channelId: 'design', role: 'user', type: 'text', content: '同意，另外 mobile 端的间距需要再调一下', sender: getUser('sarah'), timestamp: '12:00 PM' },
    { id: 'd4', channelId: 'design', role: 'user', type: 'text', content: '好的我下午改，新的 icon set 已经上传到 Figma 了', sender: getUser('wangfang'), timestamp: '2:10 PM' },
    { id: 'd5', channelId: 'design', role: 'user', type: 'text', content: '赞！icon 风格统一多了 👍', sender: getUser('me'), timestamp: '2:30 PM' },
  ],

  'flow-product-strategy': [
    { id: 'ps1', channelId: 'flow-product-strategy', role: 'assistant', type: 'text', content: '已向 Sarah 发送竞品分析框架文档，包含市场定位、功能对比、定价策略三个维度的分析模板。', timestamp: '3:00 PM' },
    { id: 'ps2', channelId: 'flow-product-strategy', role: 'user', type: 'text', content: 'Sarah 那边有反馈了吗？', sender: getUser('me'), timestamp: '4:30 PM' },
    { id: 'ps3', channelId: 'flow-product-strategy', role: 'assistant', type: 'text', content: 'Sarah 已完成 3/5 的竞品分析，预计明天可以全部提交。目前已完成的部分显示，主要竞品在 AI 工作流方面的投入明显加大。', timestamp: '4:31 PM' },
    { id: 'ps4', channelId: 'flow-product-strategy', role: 'assistant', type: 'text', content: '要不要我先基于已有的 3 份竞品数据生成一版初步策略建议？这样可以提前和管理层沟通方向。', timestamp: '4:32 PM', isProactive: true },
  ],

  'flow-resume-screening': [
    { id: 'rs1', channelId: 'flow-resume-screening', role: 'assistant', type: 'text', content: '已从 3 个招聘渠道收集到 42 份简历，岗位为高级前端工程师。正在进行 AI 初筛，基于技术栈匹配度、项目经验和工作年限三个维度评分。', timestamp: '9:00 AM' },
    { id: 'rs2', channelId: 'flow-resume-screening', role: 'user', type: 'text', content: '筛选进度怎么样了？', sender: getUser('me'), timestamp: '10:30 AM' },
    { id: 'rs3', channelId: 'flow-resume-screening', role: 'assistant', type: 'text', content: '已完成 28/42 份简历初筛。目前有 8 位候选人评分超过 85 分，其中 3 位有大厂背景且 React/TypeScript 经验丰富。', timestamp: '10:31 AM' },
    { id: 'rs4', channelId: 'flow-resume-screening', role: 'assistant', type: 'text', content: '发现一位候选人曾在竞品公司负责类似产品的前端架构，是否要优先标记？', timestamp: '10:32 AM', isProactive: true },
    { id: 'rs5', channelId: 'flow-resume-screening', role: 'user', type: 'text', content: '好的，优先标记，筛完了给我一份 top 10 的列表', sender: getUser('me'), timestamp: '10:35 AM' },
    { id: 'rs6', channelId: 'flow-resume-screening', role: 'assistant', type: 'text', content: '收到，会在筛选完成后生成 Top 10 候选人报告，包含每位候选人的核心亮点和推荐理由。预计 30 分钟内完成。', timestamp: '10:36 AM' },
  ],

  'flow-onboarding': [
    { id: 'ob1', channelId: 'flow-onboarding', role: 'assistant', type: 'text', content: '新员工入职清单已生成，包含 IT 账号开通、硬件配置、门禁申请、培训安排等 12 项待办。', timestamp: '2:00 PM' },
    { id: 'ob2', channelId: 'flow-onboarding', role: 'user', type: 'text', content: '账号开通进展如何？', sender: getUser('me'), timestamp: '3:00 PM' },
    { id: 'ob3', channelId: 'flow-onboarding', role: 'assistant', type: 'text', content: '邮箱和 Slack 已开通，GitHub 权限已提交 IT 审批（预计今天内完成）。Figma 需要 Lisa 确认 license 是否还有空余。', timestamp: '3:01 PM' },
    { id: 'ob4', channelId: 'flow-onboarding', role: 'assistant', type: 'text', content: '要不要我现在就发消息给 Lisa 确认 Figma license？', timestamp: '3:02 PM', isProactive: true },
    { id: 'ob5', channelId: 'flow-onboarding', role: 'user', type: 'text', content: '好的，顺便问一下培训室周一是否可用', sender: getUser('me'), timestamp: '3:05 PM' },
    { id: 'ob6', channelId: 'flow-onboarding', role: 'assistant', type: 'text', content: '已发消息给 Lisa。同时查了培训室预约系统，周一上午 A301 可用，要帮你预约吗？', timestamp: '3:06 PM' },
  ],

  'flow-vendor-review': [
    { id: 'vr1', channelId: 'flow-vendor-review', role: 'assistant', type: 'text', content: '已收到 3 份供应商合同，分别来自 CloudTech、DataPipe 和 SecureNet。正在进行 AI 条款分析，重点关注付款条件、SLA 保障和数据安全。', timestamp: '10:00 AM' },
    { id: 'vr2', channelId: 'flow-vendor-review', role: 'assistant', type: 'text', content: 'CloudTech 合同初步分析完成，发现 2 个风险点：1）数据所有权条款模糊；2）SLA 中缺少故障赔偿标准。建议法务重点审核。', timestamp: '11:20 AM', isProactive: true },
    { id: 'vr3', channelId: 'flow-vendor-review', role: 'user', type: 'text', content: '其他两份合同呢？', sender: getUser('me'), timestamp: '11:30 AM' },
    { id: 'vr4', channelId: 'flow-vendor-review', role: 'assistant', type: 'text', content: 'DataPipe 分析完成，条款整体规范，仅建议将付款周期从 Net 15 协商至 Net 30。SecureNet 正在分析中，预计 1 小时内完成。', timestamp: '11:31 AM' },
    { id: 'vr5', channelId: 'flow-vendor-review', role: 'user', type: 'text', content: '好的，全部分析完后帮我生成一份对比表格', sender: getUser('me'), timestamp: '11:35 AM' },
    { id: 'vr6', channelId: 'flow-vendor-review', role: 'assistant', type: 'text', content: '收到，会生成三家供应商的对比矩阵，包含价格、SLA、数据安全、风险评级等维度。', timestamp: '11:36 AM' },
  ],

  'flow-weekly-report': [
    { id: 'wr1', channelId: 'flow-weekly-report', role: 'assistant', type: 'text', content: '已从 Tanka、GitHub、Figma 等工具中采集本周数据。涉及 8 个活跃项目，共完成 23 个任务节点。', timestamp: '9:30 AM' },
    { id: 'wr2', channelId: 'flow-weekly-report', role: 'assistant', type: 'text', content: '周报草稿生成中。初步发现本周整体完成率为 78%，较上周提升 6%。Contract Follow-up 项目进度偏慢，建议在周报中标注风险。', timestamp: '9:35 AM', isProactive: true },
    { id: 'wr3', channelId: 'flow-weekly-report', role: 'user', type: 'text', content: '草稿好了吗？', sender: getUser('me'), timestamp: '9:50 AM' },
    { id: 'wr4', channelId: 'flow-weekly-report', role: 'assistant', type: 'text', content: '草稿已生成，共分为"本周进展"、"风险项"、"下周计划"三个板块。要我发给你预览吗？', timestamp: '9:51 AM' },
    { id: 'wr5', channelId: 'flow-weekly-report', role: 'user', type: 'text', content: '发吧，我看看再调整', sender: getUser('me'), timestamp: '9:55 AM' },
    { id: 'wr6', channelId: 'flow-weekly-report', role: 'assistant', type: 'text', content: '周报已发送到你的邮箱。另外上周管理层反馈希望增加「团队效能指标」板块，要不要在本次周报中加上？', timestamp: '9:56 AM', isProactive: true },
  ],

  'dm-wangfang': [
    { id: 'dwf1', channelId: 'dm-wangfang', role: 'user', type: 'text', content: 'Wang Fang，首页的 icon 更新好了吗？', sender: getUser('me'), timestamp: '1:00 PM' },
    { id: 'dwf2', channelId: 'dm-wangfang', role: 'user', type: 'text', content: '在做了，下午应该能传上去', sender: getUser('wangfang'), timestamp: '1:15 PM' },
    { id: 'dwf3', channelId: 'dm-wangfang', role: 'user', type: 'text', content: '好的，传完了跟我说一声', sender: getUser('me'), timestamp: '1:20 PM' },
    { id: 'dwf4', channelId: 'dm-wangfang', role: 'user', type: 'text', content: '新的 icon set 已经上传到 Figma 了', sender: getUser('wangfang'), timestamp: '2:10 PM' },
  ],

  'dm-liming': [
    { id: 'dlm1', channelId: 'dm-liming', role: 'user', type: 'text', content: 'Li Ming，AI 功能的优先级你那边怎么看？', sender: getUser('me'), timestamp: '9:00 AM' },
    { id: 'dlm2', channelId: 'dm-liming', role: 'user', type: 'text', content: '我觉得 workflow automation 可以先做，用户反馈最多的就是这块', sender: getUser('liming'), timestamp: '9:20 AM' },
    { id: 'dlm3', channelId: 'dm-liming', role: 'user', type: 'text', content: '行，那我们先推这个方向', sender: getUser('me'), timestamp: '9:30 AM' },
    { id: 'dlm4', channelId: 'dm-liming', role: 'user', type: 'text', content: '我整理了一份排期表，稍后发给你', sender: getUser('liming'), timestamp: '9:50 AM' },
  ],

  'dm-jack': [
    { id: 'dj1', channelId: 'dm-jack', role: 'user', type: 'text', content: 'Hey Jack, Q1 数据整理得怎么样了？', sender: getUser('me'), timestamp: '3:00 PM' },
    { id: 'dj2', channelId: 'dm-jack', role: 'user', type: 'text', content: '快好了！还有几个客户的确认在等', sender: getUser('jack'), timestamp: '3:30 PM' },
    { id: 'dj3', channelId: 'dm-jack', role: 'user', type: 'text', content: '明天下午之前应该能全部搞定', sender: getUser('jack'), timestamp: '4:00 PM' },
    { id: 'dj4', channelId: 'dm-jack', role: 'user', type: 'text', content: 'OK 辛苦了，搞定了直接发我', sender: getUser('me'), timestamp: '4:05 PM' },
    { id: 'dj5', channelId: 'dm-jack', role: 'user', type: 'text', content: '没问题 👌', sender: getUser('jack'), timestamp: '4:06 PM' },
  ],

  'dm-sarah': [
    { id: 'ds_1', channelId: 'dm-sarah', role: 'user', type: 'text', content: 'Sarah，竞品分析的框架文档我发你了', sender: getUser('me'), timestamp: 'Yesterday' },
    { id: 'ds_2', channelId: 'dm-sarah', role: 'user', type: 'text', content: '收到，我已经做了 3/5 了', sender: getUser('sarah'), timestamp: 'Yesterday' },
    { id: 'ds_3', channelId: 'dm-sarah', role: 'user', type: 'text', content: '剩下两个今天能搞定', sender: getUser('sarah'), timestamp: 'Today 9:00 AM' },
    { id: 'ds_4', channelId: 'dm-sarah', role: 'user', type: 'text', content: '好的 不急，质量优先', sender: getUser('me'), timestamp: 'Today 9:15 AM' },
  ],

  'dm-lisa': [
    { id: 'dl1', channelId: 'dm-lisa', role: 'user', type: 'text', content: 'Lisa，App Store 的截图能帮忙看一下吗？', sender: getUser('me'), timestamp: '2:00 PM' },
    { id: 'dl2', channelId: 'dm-lisa', role: 'user', type: 'text', content: '好的，今天下班前给你反馈', sender: getUser('lisa'), timestamp: '2:15 PM' },
    { id: 'dl3', channelId: 'dm-lisa', role: 'user', type: 'text', content: '看了一下，第三张和第五张的文案需要调整，其他都 OK', sender: getUser('lisa'), timestamp: '5:30 PM' },
    { id: 'dl4', channelId: 'dm-lisa', role: 'user', type: 'text', content: '收到，我改完再发你确认', sender: getUser('me'), timestamp: '5:35 PM' },
  ],
};
