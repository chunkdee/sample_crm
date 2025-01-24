import { ThemeConfig } from 'antd';

const baseTokens = {
  borderRadius: 8,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: 14,
  colorLink: '#1677ff',
  colorLinkHover: '#69b1ff',
  controlHeight: 36,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  boxShadowSecondary: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

export const lightTheme: ThemeConfig = {
  token: {
    ...baseTokens,
    colorPrimary: '#2563eb',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    colorTextBase: '#1f2937',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBorder: '#e5e7eb',
    controlOutline: '#bfdbfe',
    colorBgLayout: '#f9fafb',
    colorFillSecondary: '#f3f4f6',
  },
  components: {
    Button: {
      controlHeight: 36,
      borderRadius: 6,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    Card: {
      borderRadius: 12,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    Table: {
      borderRadius: 8,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    Input: {
      controlHeight: 36,
      borderRadius: 6,
    },
    Select: {
      controlHeight: 36,
      borderRadius: 6,
    }
  }
};

export const darkTheme: ThemeConfig = {
  token: {
    ...baseTokens,
    colorPrimary: '#60a5fa',
    colorTextBase: '#f3f4f6',
    colorBgContainer: '#1f2937',
    colorBgElevated: '#374151',
    colorBorder: '#374151',
    colorBgLayout: '#111827',
    colorFillSecondary: '#374151',
  },
  components: {
    Button: {
      controlHeight: 36,
      borderRadius: 6,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
      textHoverBg: '#374151',
    },
    Card: {
      borderRadius: 12,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
    },
    Table: {
      borderRadius: 8,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
    },
    Input: {
      controlHeight: 36,
      borderRadius: 6,
    },
    Select: {
      controlHeight: 36,
      borderRadius: 6,
    },
    Menu: {
      itemSelectedBg: '#374151',
      itemHoverBg: '#4b5563',
      itemHoverColor: '#f3f4f6',
      itemSelectedColor: '#60a5fa',
    }
  }
};