import { IPlugin } from "./pluginTypes";
import fs from "fs";
import path from "path";

export interface PluginLoaderOptions {
  customPluginPaths?: string[];
}

export class PluginLoader {
  private defaultPluginPath: string;
  private metapagePluginPath: string;

  constructor() {
    this.defaultPluginPath = __dirname;
    // Path to metapage plugins relative to the project root
    this.metapagePluginPath = path.join(process.cwd(), "metapage-plugins");
  }

  /**
   * Loads all plugins from both default and metapage plugin directories
   */
  async loadAllPlugins(): Promise<IPlugin[]> {
    const plugins: IPlugin[] = [];

    // Load default plugins first
    const defaultPlugins = await this.loadPluginsFromDirectory(
      this.defaultPluginPath
    );
    plugins.push(...defaultPlugins);

    // Load metapage plugins and append them to the end
    if (fs.existsSync(this.metapagePluginPath)) {
      const metapagePlugins = await this.loadPluginsFromDirectory(
        this.metapagePluginPath
      );
      plugins.push(...metapagePlugins);
    }

    return plugins;
  }

  /**
   * Loads plugins from a specific directory
   */
  private async loadPluginsFromDirectory(dirPath: string): Promise<IPlugin[]> {
    const plugins: IPlugin[] = [];
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      if (
        file.endsWith(".ts") &&
        !file.endsWith(".spec.ts") &&
        !file.includes("pluginTypes") &&
        !file.includes("pluginLoader")
      ) {
        const modulePath = path.join(dirPath, file);
        try {
          const module = await import(modulePath);
          const plugin = module.default || module;
          if (this.isValidPlugin(plugin)) {
            plugins.push(plugin);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(`Failed to load plugin from ${modulePath}:`, error);
        }
      }
    }

    return plugins;
  }

  /**
   * Validates if a loaded module is a valid plugin
   */
  private isValidPlugin(plugin: any): plugin is IPlugin {
    return (
      plugin &&
      typeof plugin === "object" &&
      typeof plugin.name === "string" &&
      (Array.isArray(plugin.notionBlockModifications) ||
        Array.isArray(plugin.notionToMarkdownTransforms) ||
        plugin.linkModifier ||
        Array.isArray(plugin.regexMarkdownModifications))
    );
  }
}
