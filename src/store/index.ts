import defaultSettings from "../settings.json";

export interface GlobalState {
  settings?: typeof defaultSettings;
  userInfo?: {
    id?: string;
    name?: string;
    avatar?: string;
    job?: string;
    organization?: string;
    location?: string;
    email?: string;
    permissions: Record<string, string[]>;
  };
  menu?;
}

const initialState: GlobalState = {
  settings: defaultSettings,
  userInfo: {
    permissions: {}
  }
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case "update-settings": {
      const { settings } = action.payload;
      return {
        ...state,
        settings
      };
    }
    case "update-userInfo": {
      const { userInfo = initialState.userInfo, userLoading } = action.payload;
      return {
        ...state,
        userLoading,
        userInfo
      };
    }
    case "update-userMenu": {
      const { menu } = action.payload;
      return {
        ...state,
        menu
      };
    }
    default:
      return state;
  }
}
