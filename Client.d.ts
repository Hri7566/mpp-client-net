import type { EventEmitter } from "events";

declare interface Tag {
    text: string;
    color: string;
}

declare interface User {
    _id: string; // user id
    name: string;
    color: string;
    tag?: Tag;
}

declare interface Participant extends User {
    id: string; // participant id (same as user id on mppclone)
}

declare type ChannelSettings = {
    color: string;
    crownsolo: boolean;
    chat: boolean;
    visible: boolean;
    limit: number;
} & Partial<{
    color2: string;
    lobby: boolean;
    owner_id: string;
    "lyrical notes": boolean;
    "no cussing": boolean;
    noindex: boolean;
}>;

declare type ChannelSettingValue = Partial<string | number | boolean>;

declare type NoteLetter = `a` | `b` | `c` | `d` | `e` | `f` | `g`;
declare type NoteOctave = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

declare interface Note {
    n: `${NoteLetter}${NoteOctave}`;
    d: number;
    v: number;
    s?: 1;
}

declare type Notification = Partial<{
    duration: number;
    class: string;
    id: string;
    title: string;
    text: string;
    html: string;
    target: string;
}>;

declare type CustomTarget = {
    global?: boolean;
} & (
    | {
          mode: "subscribed";
      }
    | {
          mode: "ids";
          ids: string[];
      }
    | {
          mode: "id";
          id: string;
      }
);

declare interface Crown {
    userId: string;
    partcipantId?: string;
    time: number;
    startPos: {
        x: number;
        y: number;
    };
    endPos: {
        x: number;
        y: number;
    };
}

declare interface ChannelInfo {
    banned?: boolean;
    count: number;
    id: string;
    _id: string;
    crown?: Crown;
    settings: ChannelSettings;
}

declare class Client extends EventEmitter {
    public uri: string;
    public ws: WebSocket | undefined;
    public serverTimeOffset: number;
    public user: User | undefined;
    public participantId: string | undefined;
    public ppl: Record<string, Participant>;
    public connectionTime: number;
    public connectionAttempts: number;
    public desiredChannelId: string | undefined;
    public desiredChannelSettings: ChannelSettings | undefined;
    public pingInterval: number | undefined;
    public canConnect: boolean;
    public noteBuffer: OutgoingMPPEvents["n"][];
    public noteBufferTime: number;
    public noteFlushInterval: number | undefined;
    public permissions: Record<any, unknown>;
    public ["🐈"]: number;
    public loginInfo: unknown | undefined;
    public token: string;

    constructor(uri: string, token: string);

    public isSupported(): boolean;
    public isConnected(): boolean;
    public isConnecting(): boolean;

    public start(): void;
    public stop(): void;
    protected connect(): void;

    protected bindEventListeners(): void;

    public send(raw: string): void;
    public sendArray<Event extends keyof OutgoingMPPEvents>(arr: Event[]): void;
    public setChannel(id: string, set?: Partial<ChannelSettings>): void;

    public offlineChannelSettings: ChannelSettings;

    public getChannelSetting(key: string): ChannelSettings[];
    public setChannelSettings(settings: ChannelSettings): void;

    public offlineParticipant: Participant;

    public getOwnParticipant(): Participant;
    public setParticipants(ppl: Participant[]): void;
    public countParticipants(): number;
    public participantUpdate(update: Participant): void;
    public participantMoveMouse(update: Participant): void;
    public removeParticipant(id: string): void;
    public findParticipantById(id: string): void;

    public isOwner(): boolean;
    public preventsPlaying(): boolean;
    public receiveServerTime(time: number, echo: number): void;
    public startNote(note: string, vel: number): void;
    public stopNote(note: string): void;
    public sendPing(): void;
    public setLoginInfo(loginInfo: any): void;

    public on<Event extends keyof IncomingMPPEvents>(
        event: Event,
        listener: IncomingMPPEvents[Event]
    ): this;

    public emit<Event extends keyof IncomingMPPEvents>(
        event: Event,
        ...args: Parameters<IncomingMPPEvents[Event]>
    ): boolean;
}

export default Client;

declare interface IncomingMPPEvents {
    a: (msg: { m: "a"; a: string; p: Participant; t: number }) => void;
    b: (msg: { m: "b"; code: string }) => void;
    c: (msg: { m: "c"; c: IncomingMPPEvents["a"][] }) => void;
    ch: (msg: { m: "ch"; p: string; ch: ChannelInfo }) => void;
    custom: (msg: { m: "custom"; data: any; p: string }) => void;
    hi: (msg: {
        m: "hi";
        t: number;
        u: User;
        permissions: any;
        token?: any;
        accountInfo: any;
    }) => void;
    ls: (msg: { m: "ls"; c: boolean; u: ChannelInfo[] }) => void;
    m: (msg: { m: "m"; x: number; y: number; id: string }) => void;
    n: (msg: { m: "n"; t: number; n: Note[]; p: string }) => void;
    notification: (msg: {
        duration?: number;
        class?: string;
        id?: string;
        title?: string;
        text?: string;
        html?: string;
        target?: string;
    }) => void;
    nq: (msg: {
        m: "nq";
        allowance: number;
        max: number;
        maxHistLen: number;
    }) => void;
    p: (
        msg: {
            m: "p";
            x: number;
            y: number;
        } & Participant
    ) => void;
    t: (msg: { m: "t"; t: number; e: number }) => void;
}

declare interface OutgoingMPPEvents {
    a: (msg: { m: "a"; message: string }) => void;
    bye: (msg: { m: "bye" }) => void;
    ch: (msg: { m: "ch"; _id: string; set: ChannelSettings }) => void;
    chown: (msg: { m: "chown"; id?: string }) => void;
    chset: (msg: { m: "chset"; set: ChannelSettings }) => void;
    custom: (msg: { m: "custom"; data: any; target: CustomTarget }) => void;
    devices: (msg: { m: "devices"; list: any[] }) => void;
    dm: (msg: { m: "dm"; message: string; _id: string }) => void;
    hi: (msg: {
        m: "hi";
        token?: string;
        login?: { type: string; code: string };
        code?: string;
    }) => void;
    kickban: (msg: { m: "kickban"; _id: string; ms: number }) => void;
    m: (msg: { m: "m"; x?: string | number; y?: string | number }) => void;
    "-custom": (msg: { m: "-custom" }) => void;
    "-ls": (msg: { m: "-ls" }) => void;
    n: (msg: { m: "n"; t: number; n: Note[] }) => void;
    "+custom": (msg: { m: "+custom" }) => void;
    "+ls": (msg: { m: "+ls" }) => void;
    t: (msg: { m: "t"; e: number }) => void;
    unban: (msg: { m: "unban"; _id: string }) => void;
    userset: (msg: {
        m: "userset";
        set: { name?: string; color?: string };
    }) => void;
    setcolor: (msg: { m: "setcolor"; color: string; _id: string }) => void;
    setname: (msg: { m: "setname"; name: string; _id: string }) => void;
}

export { OutgoingMPPEvents, IncomingMPPEvents };
