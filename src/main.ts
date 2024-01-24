/**
 * sdk向工具页面发送的消息类型
 */
export enum MessageType2Web {
  /** 客户端信息 */
  clientInfo = 'clientInfo',
  /**  切换 “暗黑模式” 开关 */
  switchDark = 'switchDark',
  /** 修改主题颜色配置 */
  changeTheme = 'changeTheme'
}

/**
 * 工具页面向sdk发送的消息类型：
 */
export enum MessageType2Sdk {
  /** 连接成功 */
  connected = 'connected',
  /** 客户端信息验证失败 */
  verifySuccess = 'verifySuccess',
  /** 客户端信息验证失败 */
  verifyFail = 'verifyFail',
  /** 工具加载完毕 */
  ready = 'ready'
}

/**
 * sdk与工具通讯的消息类型:
 */
export const MessageType = { ...MessageType2Web, ...MessageType2Sdk }
/**
 * sdk与工具通讯的消息类型:
 */
export type MessageType = MessageType2Sdk | MessageType2Web

/** sdk 向 工具页面发送的 {@link MessageEvent#data | 数据} */
export type MessageData2Web<Type extends MessageType2Web = MessageType2Web> = {
  /** 事件类型 */
  type: Type
  /** 客户端密钥 */
  key: string
} & (
  | {
      /** 事件类型 */
      type: MessageType2Web.clientInfo
      /** 工具选项，`type` 为 {@link MessageType2Web.clientInfo} 时有效 */
      options?: ToolOptions
    }
  | {
      /** 事件类型 */
      type: MessageType2Web.changeTheme
      /**
       * 主题配置，`type` 为 {@link MessageType2Web.changeTheme} 时有效，
       * 为 `undefined` 时表示使用默认主题颜色，默认主题颜色配置 {@link DEFAULT_THEME}
       */
      theme?: ToolTheme
    }
  | {
      /** 事件类型 */
      type: Exclude<
        MessageType2Web,
        MessageType2Web.clientInfo | MessageType2Web.switchDark
      >
      /** 工具选项，`type` 为 {@link MessageType2Web.clientInfo} 时有效 */
      options?: undefined
      /**
       * 主题配置，`type` 为 {@link MessageType2Web.changeTheme} 时有效，
       * 为 `undefined` 时表示使用默认主题颜色，默认主题颜色配置 {@link DEFAULT_THEME}
       */
      theme?: undefined
    }
)

/** {@link MessageType | sdk与工具通讯的消息类型} 和 发送事件数据 的 map */
export type MessageTypeDataMap<Type extends MessageType> = {
  [Key in Type]: Key extends MessageType2Web
    ? MessageData2Web<Key>
    : Key extends MessageType2Sdk
      ? MessageData2Sdk<Key>
      : never
}

/** 工具页面向sdk 发送的 {@link MessageEvent#data | 数据} */
export type MessageData2Sdk<Type extends MessageType2Sdk = MessageType2Sdk> = {
  /** 事件类型 */
  type: Type
} & (
  | {
      /** 事件类型 */
      type: MessageType2Sdk.verifyFail
      /** 错误信息，`type` 为{@link MessageType2Sdk.verifyFail} 有效 */
      error: string
    }
  | {
      /** 事件类型 */
      type: Exclude<MessageType2Sdk, MessageType2Sdk.verifyFail>
      /** 错误信息，`type` 为{@link MessageType2Sdk.verifyFail} 有效 */
      error?: undefined
    }
)

/** sdk与工具通讯的 {@link MessageEvent#data | 数据} 类型 */
export type MessageData = MessageData2Web | MessageData2Sdk

/** 工具类型 */
export enum ToolType {
  /** 视频转音频 */
  video2Audio = 'video2Audio'
}

/**
 * 工具路由路径
 */
export enum ToolRoutePath {
  /** 音视频转文字 */
  video2Audio = '/video2audio'
}

/** 工具主题颜色配置 */
export type ToolTheme = {
  /** 黑暗模式 */
  isDark?: boolean
  /**
   * 根据该颜色生成主题。支持数字数值颜色和十六进制字符串格式的颜色，
   * 接受带或不带前缀 `#` 的字符串，以及使用 3、6 或 8 个十六进制字
   * 符表示颜色的字符串。
   */
  sourceColor?: string | number
}

/** 工具选项 */
export type ToolOptions = {
  /** 主题颜色配置，为 `undefined` 时使用 {@link DEFAULT_THEME} */
  theme?: ToolTheme
}

/** 默认主题颜色配置 */
export const DEFAULT_THEME = {
  sourceColor: '#415f91',
  isDark: false
}
