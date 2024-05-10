import type * as Figma from 'figma-js';
import {
    StringTransformer,
    ComponentOutputter,
    PageNode,
    ComponentFilter,
} from './global.js';
import { StyleOutputter, Style } from './styles/index.js';

export type BaseCommandOptions = {
    /**
     * Personal access token.
     * @see: https://www.figma.com/developers/api#access-tokens
     */
    token: string;
    log?: (msg: string) => void;
}

export type ComponentsCommandOptions = {
    /**
     * File to export Components from.
     * The file key can be parsed from any Figma file url: https://www.figma.com/file/:key/:title.
     */
    fileId: string;

    /**
     * A specific version ID to get. Omitting this will get the current version of the file
     * @see https://help.figma.com/hc/en-us/articles/360038006754-View-a-file-s-version-history
     */
    version?: string;

    /**
     * Export only specified node IDs.
     * The `onlyFromPages` option is always ignored when set.
     */
    ids?: string[];

    /** Figma page names or IDs (all pages when not specified) */
    onlyFromPages?: string[];

    /** Filter components to export */
    filterComponent?: ComponentFilter;

    /** Node types to be exported @default ['COMPONENT'] */
    includeTypes?: [Extract<Figma.NodeType, 'COMPONENT' | 'INSTANCE'>, ...Extract<Figma.NodeType, 'COMPONENT' | 'INSTANCE'>[]];

    /** Transformer module name or path */
    transformers?: StringTransformer[];

    /** Outputter module name or path */
    outputters?: ComponentOutputter[];

    /** Concurrency when fetching */
    concurrency?: number;

    /** Maximum number of retries when fetching fails */
    retries?: number;
}

export type StylesCommandOptions = {
    /**
     * File to export Styles from.
     * The file key can be parsed from any Figma file url: https://www.figma.com/file/:key/:title.
     */
    fileId: string;

    /**
     * A specific version ID to get. Omitting this will get the current version of the file
     * @see https://help.figma.com/hc/en-us/articles/360038006754-View-a-file-s-version-history
     */
    version?: string;

    /**
     * Export only specified node IDs.
     * The `onlyFromPages` option is always ignored when set.
     */
    ids?: string[];

    /** Figma page names or IDs (all pages when not specified) */
    onlyFromPages?: string[];

    /** Outputter module name or path */
    outputters?: StyleOutputter[];
}

export type FigmaExportRC = {
    commands: (['styles', StylesCommandOptions] | ['components', ComponentsCommandOptions])[]
}

export type ComponentsCommand = (options: BaseCommandOptions & ComponentsCommandOptions) => Promise<PageNode[]>

export type StylesCommand = (options: BaseCommandOptions & StylesCommandOptions) => Promise<Style[]>
