export interface Tag {
    text: string;
    color: string;
}

export interface User {
    _id: string; // user id
    name: string;
    color: string;
    tag?: Tag;
}

export interface Participant extends User {
    id: string; // participant id (same as user id on mpp.net)
    afk: boolean;
    vanished?: boolean;
    x: number | string;
    y: number | string;
}

export type ChannelSettings = {
    [key: string]: boolean | number | string;
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
    minOnlineTime: number;
}>;

export interface Vector2 {
    x: string | number;
    y: string | number;
}

export interface Crown {
    participantId?: string;
    userId?: string;

    startPos: Vector2;
    endPos: Vector2;
}

export interface ChannelInfo {
    banned?: boolean;
    count: number;
    id: string;
    _id: string;
    crown?: Crown;
    settings: ChannelSettings;
}

export type NoteLetter = `a` | `b` | `c` | `d` | `e` | `f` | `g`;
export type NoteOctave = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Note {
    n: `${NoteLetter}${NoteOctave}`;
    d?: number;
    v?: number;
    s?: 1;
}

export type LoginType = "discord";

export interface LoginInfo {
    type: LoginType;
    code: string;
}

export interface AccountInfo {
    type: LoginType;
    username: string;
    discriminator: string;
    avatar: string;
}

export interface IncomingEvents {
    a: {
        m: "a";
        a: string;
        p: Participant;
        t: number;

        id: string;
        r?: string;
    };

    b: {
        m: "b";
        code: string;
    };

    bye: {
        m: "bye";
        p: Participant["id"];
    };

    c: {
        m: "c";
        c: IncomingEvents["a"][];
    };

    ch: {
        m: "ch";
        p: string;
        ch: ChannelInfo;
        ppl: Participant[];
    };

    custom: {
        m: "custom";
        data: any;
        p: string;
    };

    dm: {
        m: "dm";
        id: string;
        t: number;
        a: string;
        sender: Participant;
        recipient: Participant;
        r?: string;
    };

    hi: {
        m: "hi";
        t: number;
        e: number;
        u: User;
        permissions: any;
        token?: any;
        accountInfo: any;
        motd?: string;
    };

    ls: {
        m: "ls";
        c: boolean;
        u: ChannelInfo[];
    };

    m: {
        m: "m";
        x: number;
        y: number;
        id: string;
    };

    n: {
        m: "n";
        t: number;
        n: Note[];
        p: string;
    };

    notification: {
        duration?: number;
        class?: string;
        id?: string;
        title?: string;
        text?: string;
        html?: string;
        target?: string;
    };

    nq: {
        m: "nq";
        allowance: number;
        max: number;
        maxHistLen: number;
    };

    p: {
        m: "p";
        x: number;
        y: number;
    } & Participant;

    t: {
        m: "t";
        t: number;
        e?: number;
    };
}

export interface OutgoingEvents {
    a: {
        m: "a";
        message: string;
        reply_to?: string;
    };

    bye: {
        m: "bye";
    };

    ch: {
        m: "ch";
        _id: string;
        set?: Partial<ChannelSettings>;
    };

    chown: {
        m: "chown";
        id?: string;
    };

    chset: {
        m: "chset";
        set: Partial<ChannelSettings & { limit: number | string }>;
    };

    custom: {
        m: "custom";
        data: any;
        target: ({
            mode: "id";
            id: string;
        } | {
            mode: "ids";
            ids: string[];
        } | {
            mode: "subscribed"
        }) & {
            global?: boolean;
        };
    };

    devices: {
        m: "devices";
        list: any[];
    };

    dm: {
        m: "dm";
        message: string;
        _id: string;
    };

    hi: {
        m: "hi";
        token?: string;
        code?: string;
        login?: LoginInfo;
    };

    kickban: {
        m: "kickban";
        _id: string;
        ms: number;
    };

    m: {
        m: "m";
        x?: string | number;
        y?: string | number;
    };

    "-custom": {
        m: "-custom";
    };

    "-ls": {
        m: "-ls";
    };

    n: {
        m: "n";
        t: number;
        n: Note[];
    };

    "+custom": {
        m: "+custom";
    };

    "+ls": {
        m: "+ls";
    };

    t: {
        m: "t";
        e?: number;
    };

    unban: {
        m: "unban";
        _id: string;
    };

    userset: {
        m: "userset";
        set: { name?: string; color?: string };
    };

    setcolor: {
        m: "setcolor";
        color: string;
        _id: string;
    };

    setname: {
        m: "setname";
        name: string;
        _id: string;
    };
}

export interface LocalEvents {
    count: number;
    "participant added": Participant;
    "participant removed": Participant;
    "participant update": Participant;
    status: string;
    disconnect: any;
    wserror: any;
    connect: any;
}

export type EmittableEvents = LocalEvents & IncomingEvents;
