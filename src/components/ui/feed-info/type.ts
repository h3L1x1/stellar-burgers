// types.ts
export interface FeedInfoUIProps {
  feed: {
    total: number;
    totalToday: number;
    orders?: any[];
    isLoading?: boolean;
    error?: string | null;
  };
  readyOrders: number[];
  pendingOrders: number[];
}

export interface HalfColumnProps {
  orders: number[];
  title: string;
  textColor?: string;
}

export interface TColumnProps {
  title: string;
  content: number;
}
