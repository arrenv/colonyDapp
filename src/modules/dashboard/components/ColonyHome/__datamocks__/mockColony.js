/* @flow */
/* eslint-disable max-len */

import MockUser from '~users/UserProfile/__datamocks__/mockUser';

import type { UserRecord } from '~types/UserRecord';
import type { ColonyType } from '~types/colony';

export const mockColony: ColonyType = {
  address: '0x1afb213afa8729fa7908154b90e256f1be70989a',
  avatar:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMjU2IgogICBoZWlnaHQ9IjI1NiIKICAgdmlld0JveD0iMCAwIDY3LjczMzMzMiA2Ny43MzMzMzUiCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzEwMzAiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTIuMiAoNWMzZTgwZCwgMjAxNy0wOC0wNikiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImNvbG9ueS10YW5ncmFtLWV4cG9ydC5zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxMDI0IiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0iYmFzZSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSIwLjk4OTk0OTQ5IgogICAgIGlua3NjYXBlOmN4PSIyMy4zMjE4NDEiCiAgICAgaW5rc2NhcGU6Y3k9IjEwMi4wMjYyOCIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICB1bml0cz0icHgiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9ImZhbHNlIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMzg0MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIyMTIzIgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIC8+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMTAyNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMjI5LjI2NjY2KSI+CiAgICA8ZwogICAgICAgaWQ9ImxvZ29zIgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC4zMTMyOTAxNSwwLDAsMC4zMTMyOTAxNSwyLjY5NDI5NTYsMjMyLjcwMzQ2KSIKICAgICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MC44NDQ1MzEyNCI+CiAgICAgIDxjaXJjbGUKICAgICAgICAgY3g9Ijk5LjQ0OTk5NyIKICAgICAgICAgY3k9IjU2Ljc3OTk5OSIKICAgICAgICAgcj0iMTMuNyIKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMjg0YjtzdHJva2Utd2lkdGg6MC44NDQ1MzEyNCIKICAgICAgICAgaWQ9ImNpcmNsZTkzMSIgLz4KICAgICAgPGNpcmNsZQogICAgICAgICBjeD0iOTkuNDQ5OTk3IgogICAgICAgICBjeT0iMTM3LjQ4IgogICAgICAgICByPSIxMy43IgogICAgICAgICBzdHlsZT0iZmlsbDojMDAyODRiO3N0cm9rZS13aWR0aDowLjg0NDUzMTI0IgogICAgICAgICBpZD0iY2lyY2xlOTMzIiAvPgogICAgICA8Y2lyY2xlCiAgICAgICAgIGN4PSIxMzkuODUwMDEiCiAgICAgICAgIGN5PSI5Ny4wODAwMDIiCiAgICAgICAgIHI9IjEzLjciCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDI4NGI7c3Ryb2tlLXdpZHRoOjAuODQ0NTMxMjQiCiAgICAgICAgIGlkPSJjaXJjbGU5MzUiIC8+CiAgICAgIDxjaXJjbGUKICAgICAgICAgY3g9IjU5LjE1MDAwMiIKICAgICAgICAgY3k9Ijk3LjA4MDAwMiIKICAgICAgICAgcj0iMTMuNyIKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMjg0YjtzdHJva2Utd2lkdGg6MC44NDQ1MzEyNCIKICAgICAgICAgaWQ9ImNpcmNsZTkzNyIgLz4KICAgICAgPHJlY3QKICAgICAgICAgeD0iODMuOTQ5OTk3IgogICAgICAgICB5PSI4MS41ODAwMDIiCiAgICAgICAgIHdpZHRoPSIzMSIKICAgICAgICAgaGVpZ2h0PSIzMSIKICAgICAgICAgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1LDk5LjQ1Mzg2Niw5Ny4wODQ4NikiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDI4NGI7c3Ryb2tlLXdpZHRoOjAuODQ0NTMxMjQiCiAgICAgICAgIGlkPSJyZWN0OTM5IiAvPgogICAgICA8cG9seWdvbgogICAgICAgICBwb2ludHM9IjE0Ny41NSw3Mi4zOCAxMjQuMTUsNzIuMzggMTI0LjE1LDQ4Ljg4ICIKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMjg0YjtzdHJva2Utd2lkdGg6MC44NDQ1MzEyNCIKICAgICAgICAgaWQ9InBvbHlnb245NDEiIC8+CiAgICAgIDxwb2x5Z29uCiAgICAgICAgIHBvaW50cz0iNzQuNzUsNDguOTggNzQuNzUsNzIuMzggNTEuMzUsNzIuMzggIgogICAgICAgICBzdHlsZT0iZmlsbDojMDAyODRiO3N0cm9rZS13aWR0aDowLjg0NDUzMTI0IgogICAgICAgICBpZD0icG9seWdvbjk0MyIgLz4KICAgICAgPHBvbHlnb24KICAgICAgICAgcG9pbnRzPSI1MS4zNSwxMjEuNzggNzQuNzUsMTIxLjc4IDc0Ljc1LDE0NS4xOCAiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDI4NGI7c3Ryb2tlLXdpZHRoOjAuODQ0NTMxMjQiCiAgICAgICAgIGlkPSJwb2x5Z29uOTQ1IiAvPgogICAgICA8cG9seWdvbgogICAgICAgICBwb2ludHM9IjEyNC4xNSwxNDUuMTggMTI0LjE1LDEyMS43OCAxNDcuNTUsMTIxLjc4ICIKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMjg0YjtzdHJva2Utd2lkdGg6MC44NDQ1MzEyNCIKICAgICAgICAgaWQ9InBvbHlnb245NDciIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K',
  name: 'The Meta Colony',
  ensName: 'meta',
  description:
    // eslint-disable-next-line max-len
    'The Meta colony is responsible for building the colony protoco, JS library, and dApp. Contribute to our open source work to gain reputation, earn tokens, and help create the future of work',
  website: 'https://colony.io',
  guideline: 'http://colony.io/guidelines',
  version: '1.2.3',
  id: '1',
};

export const mockColonyOwners: Array<UserRecord> = [MockUser];

export const mockColonyAdmins: Array<UserRecord> = [
  MockUser,
  MockUser,
  MockUser,
  MockUser,
  MockUser,
];
