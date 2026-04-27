import { createBrowserRouter, Navigate } from 'react-router';
import { AppShell } from '@/components/layout/app-shell';
import { RequireAuth } from '@/components/layout/require-auth';
import { LoginPage } from '@/features/auth/login-page';
import { RegisterPage } from '@/features/auth/register-page';
import { ChatPage } from '@/features/chat/chat-page';
import { FlowPage } from '@/features/flow/flow-page';
import { FlowBoardPage } from '@/features/flow/flow-board-page';
import { FlowDetailPage } from '@/features/flow/flow-detail-page';
import { SOPLibraryPage } from '@/features/flow/sop-library-page';
import { FollowUpPage } from '@/features/flow/follow-up-page';
import { AssetsPage } from '@/features/flow/assets-page';
import { MembersPage } from '@/features/chat/components/members-page';
import { LinkPage } from '@/features/link/link-page';
import { DesignSystemPage } from '@/features/design-system/design-system-page';
import { ProfilePage } from '@/features/profile/profile-page';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            index: true,
            element: <Navigate to="/flow/new" replace />,
          },
          {
            path: 'flow',
            element: <FlowPage />,
            children: [
              {
                index: true,
                element: <Navigate to="/flow/new" replace />,
              },
              {
                path: 'sop-library',
                element: <SOPLibraryPage />,
              },
              {
                path: 'follow-up',
                element: <FollowUpPage />,
              },
              {
                path: 'assets',
                element: <AssetsPage />,
              },
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
            path: 'chat/members',
            element: <MembersPage />,
          },
          {
            path: 'link',
            element: <LinkPage />,
          },
        ],
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
