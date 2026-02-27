import { createBrowserRouter } from 'react-router';
import { AppShell } from '@/components/layout/app-shell';
import { ChatPage } from '@/features/chat/chat-page';
import { FlowPage } from '@/features/flow/flow-page';
import { FlowBoardPage } from '@/features/flow/flow-board-page';
import { FlowDetailPage } from '@/features/flow/flow-detail-page';
import { LinkPage } from '@/features/link/link-page';
import { DesignSystemPage } from '@/features/design-system/design-system-page';
import { ProfilePage } from '@/features/profile/profile-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <FlowPage />,
      },
      {
        path: 'flow',
        element: <FlowPage />,
        children: [
          {
            path: ':flowId',
            element: <FlowDetailPage />,
          },
        ],
      },
      {
        path: 'flow/board',
        element: <FlowBoardPage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
        children: [
          { path: ':channelId', element: null },
        ],
      },
      {
        path: 'link',
        element: <LinkPage />,
      },
    ],
  },
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]);
