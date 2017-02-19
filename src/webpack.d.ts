declare module 'webpack' {
	import webpack = require('webpack/lib/webpack');

	export = webpack;
}

declare module 'webpack/lib/webpack' {
	import Compiler = require('webpack/lib/Compiler');
	import ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
	import CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
	import UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

	interface Webpack {
		(options: Webpack.Config, callback: Function): Compiler;

		Compiler: typeof Compiler;
		ContextReplacementPlugin: typeof ContextReplacementPlugin;

		optimize: {
			CommonsChunkPlugin: typeof CommonsChunkPlugin;
			UglifyJsPlugin: typeof UglifyJsPlugin;
		};
	}

	namespace Webpack {
		type Condition = _Condition | _Condition[];
		type _Condition = string | RegExp | ConditionFunction | ConditionObject;
		type ConditionFunction = (input: string) => boolean;
		interface ConditionObject {
			and?: _Condition[];
			exclude?: Condition;
			include?: Condition;
			not?: _Condition;
			or?: _Condition[];
			test?: Condition;
		}

		interface Config {
			entry: string | string[] | { [key: string]: string | string[] };
			output: Output;
			module: Module;
			resolve?: Resolve;
			resolveLoader?: {
				modules?: string[];
				extensions?: string[];
				packageMains?: string[];
				moduleExtensions?: string[];
			};
			devtool?: false | 'eval' | 'cheap-eval-source-map' | 'cheap-source-map' | 'cheap-module-eval-source-map' | 'cheap-module-source-map' | 'eval-source-map' | 'source-map' | 'nosources-source-map' | 'inline-source-map' | 'hidden-source-map';
			context?: string;
			target?: 'async-node' | 'electron-main' | 'electron-renderer' | 'node' | 'node-webkit' | 'web' | 'webworker';
			externals?: { [key: string]: string | string[] | Object } | ((context: string, request: string, callback: Function) => void)[];
			stats?: any;
			plugins?: Plugin[];
		}
		type DevtoolFilenameTemplateFunction = (info: DevtoolFilenameTemplateInfo) => string;
		interface DevtoolFilenameTemplateInfo {
			absoluteResourcePath: string;
			allLoaders: string;
			hash: string;
			id: string;
			loaders: string;
			resource: string;
			resourcePath: string;
		}
		interface Output {
			path: string;
			filename: string;
			publicPath?: string;
			library?: string;
			libraryTarget?: 'var' |	'this' | 'window' | 'global' | 'commonjs' | 'commonjs2' | 'commonjs-module' | 'amd' | 'umd' | 'assign' | 'jsonp';
			pathinfo?: boolean;
			chunkFilename?: string;
			jsonpFunction?: string;
			sourceMapFilename?: string;
			devtoolModuleFilenameTemplate?: string | DevtoolFilenameTemplateFunction;
			devtoolFallbackModuleFilenameTemplate?: string | DevtoolFilenameTemplateFunction;
			umdNamedDefine?: boolean;
			crossOriginLoading?: boolean | 'anonymous' | 'use-credentials';
		}
		interface Module {
			rules: Rule[];
		}
		interface Plugin {
			apply(compiler: Compiler): void;
		}
		interface Resolve {
			alias?: { [key: string]: string; };
			aliasFields?: string[];
			cachePredicate?: (info: { path: string; request: string; }) => boolean;
			descriptionFiles?: string[];
			enforceExtension?: boolean;
			enforceModuleExtension?: boolean;
			extensions?: string[];
			mainFields?: string[];
			mainFiles?: string[];
			modules?: string[];
			plugins?: any[];
			symlinks?: boolean;
			unsafeCache?: boolean | RegExp | RegExp[];
		}
		interface Rule {
			enforce?: 'pre' | 'post';
			exclude?: Condition;
			include?: Condition;
			issuer?: _Condition;
			loader?: string;
			loaders?: (string | UseEntry)[];
			oneOf?: Rule[];
			options?: string | Object;
			resource?: _Condition;
			rules?: Rule[];
			test?: Condition;
			use?: (string | UseEntry)[];
		}
		interface UseEntry {
			loader: string;
			options?: string | Object;
		}
	}

	const webpack: Webpack;

	export = webpack;
}

declare module 'tapable' {
	class Tapable {
		protected _plugins: { [key: string]: Function[] };

		apply(...args: any[]): void;
		plugin(name: string, fn: Function): void;

		protected applyPlugins(name: string, ...args: any[]): void;
		protected applyPluginsWaterfall(name: string, initial: any, ...args: any[]): any;
		protected applyPluginsAsync(name: string, ...args: any[]): void;
		protected applyPluginsBailResult(name: string, ...args: any[]): any;
		protected applyPluginsAsyncWaterfall(name: string, initial: any, callback: (error: Error | null, value: any) => void): void;
		protected applyPluginsAsyncSeries(name: string, ...args: any[]): void;
		protected applyPluginsAsyncSeriesBailResult(name: string, ...args: any[]): void;
		protected applyPluginsParallel(name: string, ...args: any[]): void;
		protected applyPluginsParallelBailResult(name: string, ...args: any[]): void;
	}
	export = Tapable;
}

declare module 'webpack-sources/lib/Source' {
	class Source {
		map(options: any): string;
		size(): number;
		source(): string;
	}

	export = Source;
}

declare module 'webpack/lib/Chunk' {
	import Module = require('webpack/lib/Module');
	import DependenciesBlock = require('webpack/lib/DependenciesBlock');

	class Chunk {
		id: number;
		ids: number[];
		debugId: number;
		name: string;
		modules: Module[];
		chunks: Chunk[];
		parents: Chunk[];
		blocks: DependenciesBlock[];
		origins: Chunk.Origin[];
		files: any[];
		rendered: boolean;

		constructor(name: string, module: Module, loc: any);

		addChunk(chunk: Chunk): boolean;
		addParent(chunk: Chunk): boolean;
		hasRuntime(): boolean;
		isInitial(): boolean;
		hasEntryModule(): boolean;
		addModule(module: Module): boolean;
		removeModule(module: Module): void;
		removeChunk(chunk: Chunk): void;
		removeParent(chunk: Chunk): void;

		addBlock(block: DependenciesBlock): boolean;
		addOrigin(origin: Chunk.Origin): void;

		remove(reason: string): void;

		moveModule(module: Module, other: Chunk): void;
	}

	namespace Chunk {
		interface Origin {
			module: Module;
			loc: any;
			name: string;
		}
	}

	export = Chunk;
}

declare module 'webpack/lib/Compilation' {
	import Tapable = require('tapable');
	import MainTemplate = require('webpack/lib/MainTemplate');
	import Module = require('webpack/lib/Module');
	import Chunk = require('webpack/lib/Chunk');
	import Source = require('webpack-sources/lib/Source');
	import ModuleTemplate = require('webpack/lib/ModuleTemplate');
	import Compiler = require('webpack/lib/Compiler');

	class Compilation extends Tapable {
		mainTemplate: MainTemplate;
		moduleTemplate: ModuleTemplate;

		constructor(compiler: Compiler);

		addModule(module: Module, cacheGroup?: string): Module | boolean;
		buildModule(module: Module, optional: boolean, origin: Module | null, dependencies: any[] | null, callback: (error?: Error) => void): void;
		processModuleDependencies(module: Module, callback: (error?: Error) => void): void;

		plugin(name: 'normal-module-loader', fn: (this: Compilation, loaderContext: any, module: Module) => void): void;
		plugin(name: 'seal', fn: (this: Compilation) => void): void;
		plugin(name: 'optimize', fn: (this: Compilation) => void): void;
		plugin(name: 'optimize-tree', fn: (this: Compilation, chunks: Chunk[], modules: Module[], callback: (error?: Error) => void) => void): void;
		plugin(name: 'optimize-modules', fn: (this: Compilation, modules: Module[]) => any): void;
		plugin(name: 'after-optimize-modules', fn: (this: Compilation, modules: Module[]) => void): void;
		plugin(name: 'optimize-chunks', fn: (this: Compilation, chunks: Chunk[]) => any): void;
		plugin(name: 'after-optimize-chunks', fn: (this: Compilation, chunks: Chunk[]) => void): void;
		plugin(name: 'revive-modules', fn: (this: Compilation, modules: Module[], records: any) => void): void;
		plugin(name: 'optimize-module-order', fn: (this: Compilation, modules: Module[]) => void): void;
		plugin(name: 'optimize-module-ids', fn: (this: Compilation, modules: Module[]) => void): void;
		plugin(name: 'after-optimize-module-ids', fn: (this: Compilation, modules: Module[]) => void): void;
		plugin(name: 'revive-chunks', fn: (this: Compilation, chunks: Chunk[], records: any) => void): void;
		plugin(name: 'optimize-chunk-order', fn: (this: Compilation, chunks: Chunk[]) => void): void;
		plugin(name: 'optimize-chunk-ids', fn: (this: Compilation, chunks: Chunk[]) => void): void;
		plugin(name: 'after-optimize-chunk-ids', fn: (this: Compilation, chunks: Chunk[]) => void): void;
		plugin(name: 'record-modules', fn: (this: Compilation, modules: Module[], records: any) => void): void;
		plugin(name: 'record-chunks', fn: (this: Compilation, chunks: Chunk[], records: any) => void): void;
		plugin(name: 'before-hash', fn: (this: Compilation) => void): void;
		plugin(name: 'after-hash', fn: (this: Compilation) => void): void;
		plugin(name: 'before-chunk-assets', fn: (this: Compilation) => void): void;
		plugin(name: 'additional-chunk-assets', fn: (this: Compilation, chunks: Chunk[]) => void): void;
		plugin(name: 'record', fn: (this: Compilation, compilation: Compilation, records: any) => void): void;
		plugin(name: 'optimize-chunk-assets', fn: (this: Compilation, chunks: Chunk[], callback: (error?: Error) => void) => void): void;
		plugin(name: 'after-optimize-chunk-assets', fn: (this: Compilation, chunks: Chunk[]) => void): void;
		plugin(name: 'optimize-assets', fn: (this: Compilation, assets: { [key: string]: Source }, callback: (error?: Error) => void) => void): void;
		plugin(name: 'after-optimize-assets', fn: (this: Compilation, assets: { [key: string]: Source }) => void): void;
		plugin(name: 'build-module', fn: (this: Compilation, module: Module) => void): void;
		plugin(name: 'succeed-module', fn: (this: Compilation, module: Module) => void): void;
		plugin(name: 'failed-module', fn: (this: Compilation, module: Module, error: Error) => void): void;
		plugin(name: 'module-asset', fn: (this: Compilation, module: Module, file: string) => void): void;
		plugin(name: 'chunk-asset', fn: (this: Compilation, chunk: Chunk, file: string) => void): void;
		plugin(name: 'need-additional-pass', fn: (this: Compilation) => boolean): void;
	}

	export = Compilation;
}

declare module 'webpack/lib/Compiler' {
	import Tapable = require('tapable');
	import Compilation = require('webpack/lib/Compilation');
	import NormalModuleFactory = require('webpack/lib/NormalModuleFactory');
	import ContextModuleFactory = require('webpack/lib/ContextModuleFactory');

	class Compiler extends Tapable {
		options: any;

		run(callback: Function): void;
		runAsChild(callback: Function): void;
		watch(options: any, handler: (error: Error | null, stats: any) => void): Compiler.Watching;

		plugin(name: 'watch-run', fn: (this: Compiler, compiler: Compiler) => void): void;
		plugin(name: 'done', fn: (this: Compiler, stats: any) => void): void;
		plugin(name: 'falied', fn: (this: Compiler, error: Error) => void): void;
		plugin(name: 'invalid', fn: (this: Compiler) => void): void;
		plugin(name: 'run', fn: (this: Compiler, compiler: Compiler) => void): void;
		plugin(name: 'emit', fn: (this: Compiler, compilation: Compilation) => void): void;
		plugin(name: 'after-emit', fn: (this: Compiler, compilation: Compilation) => void): void;
		plugin(name: 'compilation', fn: (this: Compiler, compilation: Compilation, params: Compiler.CompilationParams) => void): void;
		plugin(name: 'normal-module-factory', fn: (this: Compiler, factory: NormalModuleFactory) => void): void;
		plugin(name: 'context-module-factory', fn: (this: Compiler, factory: ContextModuleFactory) => void): void;
		plugin(name: 'compile', fn: (this: Compiler, params: any) => void): void;
		plugin(name: 'make', fn: (this: Compiler, compilation: Compilation) => void): void;
		plugin(name: 'after-compile', fn: (this: Compiler, compilation: Compilation) => void): void;
	}

	namespace Compiler {
		class Watching {
			close(callback: () => void): void;
			invalidate(): void;
			watch(files: any, dirs: any, missing: any): void;
		}
		interface CompilationParams {
			normalModuleFactory: NormalModuleFactory;
			contextModuleFactory: ContextModuleFactory;
			compilationDependencies: any[];
		}
	}

	export = Compiler;
}

declare module 'webpack-sources/lib/ConcatSource' {
	let source: any;
	export = source;
}

declare module 'webpack/lib/ContextModuleFactory' {
	import Tapable = require('tapable');

	class ContextModuleFactory extends Tapable {
	}

	export = ContextModuleFactory;
}

declare module 'webpack/lib/ContextReplacementPlugin' {
	import Compiler = require('webpack/lib/Compiler');

	class ContextReplacementPlugin {
		constructor(resourceRegExp: RegExp, newContentResource?: any, newContentRecursive?: any, newContentRegExp?: any);
		apply(compiler: Compiler): void;
	}
	export = ContextReplacementPlugin;
}

declare module 'webpack/lib/DependenciesBlock' {
	import Dependency = require('webpack/lib/Dependency');
	import DependenciesBlockVariable = require('webpack/lib/DependenciesBlockVariable');
	import * as crypto from 'crypto';

	class DependenciesBlock {
		dependencies: Dependency[];
		blocks: DependenciesBlock[];
		variables: DependenciesBlockVariable[];

		addBlock(block: DependenciesBlock): void;
		addDependency(dependency: Dependency): void;
		addVariable(name: string, expression: string, dependencies?: Dependency[]): void;
		updateHash(hash: crypto.Hash): void;
		disconnect(): void;
		unseal(): void;
		hasDependencies(filter: (dependency: Dependency) => boolean): boolean;
		sortItems(): void;
	}
	export = DependenciesBlock;
}

declare module 'webpack/lib/DependenciesBlockVariable' {
	import Dependency = require('webpack/lib/Dependency');
	import * as crypto from 'crypto';

	class DependenciesBlockVariable {
		name: string;
		expression: string;
		dependencies: Dependency[];

		constructor(name: string, expression: string, dependencies?: Dependency[]);

		updateHash(hash: crypto.Hash): void;
	}

	export = DependenciesBlockVariable;
}

declare module 'webpack/lib/Dependency' {
	import Module = require('webpack/lib/Module');
	import * as crypto from 'crypto';

	class Dependency {
		static compare(a: any, b: any): boolean;

		module: Module;

		isEqualResource(): boolean;
		getReference(): { module: Module; importedNames: boolean; } | null;
		getExports(): string[] | null;
		getWarnings(): string[] | null;
		getErrors(): string[] | null;
		updateHash(hash: crypto.Hash): void;
		disconnect(): void;
		compare(a: any, b: any): boolean;
	}
	export = Dependency;
}

declare module 'webpack/lib/MainTemplate' {
	class MainTemplate {
	}
	export = MainTemplate;
}

declare module 'webpack/lib/Module' {
	import Chunk = require('webpack/lib/Chunk');

	class Module {
		context: any;
		reasons: any[];
		debugId: number;
		lastId: number;
		id: number;
		portableId: number;
		chunks: Chunk[];
		strict: boolean;
		meta: any;

		addChunk(chunk: Chunk): void;
		removeChunk(chunk: Chunk): void;
	}

	export = Module;
}

declare module 'webpack/lib/ModuleTemplate' {
	import Template = require('webpack/lib/Template');
	import Module = require('webpack/lib/Module');
	import Chunk = require('webpack/lib/Chunk');
	import Source = require('webpack-sources/lib/Source');
	import * as crypto from 'crypto';

	class ModuleTemplate extends Template {
		plugin(name: 'module', fn: (this: ModuleTemplate, moduleSource: Source, module: Module, chunk: Chunk, dependencyTemplates: Template[]) => Source): void;
		plugin(name: 'render', fn: (this: ModuleTemplate, moduleSource: Source, module: Module, chunk: Chunk, dependencyTemplates: Template[]) => Source): void;
		plugin(name: 'package', fn: (this: ModuleTemplate, moduleSource: Source, module: Module, chunk: Chunk, dependencyTemplates: Template[]) => Source): void;
		plugin(name: 'hash', fn: (this: ModuleTemplate, hash: crypto.Hash) => void): void;
	}

	export = ModuleTemplate;
}

declare module 'webpack/lib/NormalModule' {
	import Module = require('webpack/lib/Module');
	import Parser = require('webpack/lib/Parser');

	class NormalModule extends Module {
		request: string;
		userRequest: string;
		rawRequest: string;
		parser: Parser;
		resource: string;
		context: any;
		loaders: string[];

		constructor(request: string, userRequest: string, rawRequest: string, loaders: string[], resource: string, parser: Parser);
	}

	export = NormalModule;
}

declare module 'webpack/lib/NormalModuleReplacementPlugin' {
	let normalModuleReplacementPlugin: any;
	export = normalModuleReplacementPlugin;
}

declare module 'webpack/lib/NormalModuleFactory' {
	import Tapable = require('tapable');
	import Parser = require('webpack/lib/Parser');
	import Dependency = require('webpack/lib/Dependency');

	class NormalModuleFactory extends Tapable {
		plugin(name: 'after-resolve', fn: NormalModuleFactory.AfterHandler): void;
		plugin(name: 'before-resolve', fn: NormalModuleFactory.BeforeHandler): void;
		plugin(name: 'parser', fn: (this: NormalModuleFactory, parser: Parser, options: any) => void): void;
		plugin(name: 'resolver', fn: (this: NormalModuleFactory, resolver: NormalModuleFactory.Resolver) => NormalModuleFactory.Resolver): void;
	}
	namespace NormalModuleFactory {
		interface BeforeData {
			contextInfo?: any;
			context: string;
			dependencies?: Dependency[];
			request: string;
		}

		type BeforeHandler = (this: NormalModuleFactory, current: BeforeData, callback: Callback<BeforeData>) => void;

		type Callback<T> = (error?: Error | null, nextValue?: T) => void;

		interface AfterData {
			request: string;
			userRequest: string;
			rawRequest: string;
			loaders: string[];
			resource: string;
			parser: Parser;
		}

		type AfterHandler = (this: NormalModuleFactory, current: AfterData, callback: Callback<AfterData>) => void;

		type Resolver = (data: BeforeData, callback: ResolverCallback) => void;
		type ResolverCallback = (error?: Error | null, value?: AfterData) => void;
	}

	export = NormalModuleFactory;
}

declare module 'webpack/lib/Parser' {
	import Tapable = require('tapable');
	import NormalModule = require('webpack/lib/NormalModule');
	import Module = require('webpack/lib/Module');
	import Compilation = require('webpack/lib/Compilation');

	class Parser extends Tapable {
		state: Parser.NormalModuleState | Parser.ParsedVariableState;
		plugin(name: string, fn: (this: Parser, ...args: any[]) => any): void;
	}

	namespace Parser {
		interface NormalModuleState {
			current: NormalModule;
			module: NormalModule;
			compilation: Compilation;
			options: any;
		}
		interface ParsedVariableState {
			current: {
				addDependency(dep: any): void;
			};
			module: Module;
		}
	}

	export = Parser;
}

declare module 'webpack/lib/Template' {
	import Tapable = require('tapable');

	class Template extends Tapable {
		constructor(options: any);
	}

	export = Template;
}

declare module 'webpack/lib/optimize/CommonsChunkPlugin' {
	import Compiler = require('webpack/lib/Compiler');

	class CommonsChunkPlugin {
		constructor(options: CommonsChunkPlugin.Options);
		apply(compiler: Compiler): void;
	}
	module CommonsChunkPlugin {
		interface Options {
			name?: string;
			names?: string[];
			filename?: string;
			minChunks?: number | Function;
			chunks?: string[];
			children?: boolean;
			async?: boolean | string;
			minSize?: number;
		}
	}
	export = CommonsChunkPlugin;
}

declare module 'webpack/lib/optimize/UglifyJsPlugin' {
	import Compiler = require('webpack/lib/Compiler');

	class UglifyJsPlugin {
		constructor(options?: UglifyJsPlugin.Options);
		apply(compiler: Compiler): void;
	}
	module UglifyJsPlugin {
		interface Options {
		}
	}
	export = UglifyJsPlugin;
}
