/**
 * @name MassPluginEnabler
 * @description Enables all your plugins at once.
 * @version 1.0.0
 * @author Aelerity
 * @source https://github.com/Aelerity/MassPluginEnabler
 */

module.exports = class MassPluginEnabler {
    constructor() {
        this.enabled = false;
        this.pluginName = 'MassPluginEnabler'; 
        this.excludedPlugins = ["example1", "example2"]; // List of plugin names to be excluded from enabling
    }

    load() {
        console.log(`${this.pluginName} loaded`);
    }

    start() {
        this.enableAllPlugins();
        this.enabled = true;
    }

    stop() {
        console.log(`${this.pluginName} stopped`);
        this.enabled = false;
    }

    enableAllPlugins() {
        const allPlugins = BdApi.Plugins.getAll();
        allPlugins.forEach(plugin => {
            if (plugin.id !== this.pluginName && !this.excludedPlugins.includes(plugin.id) && !BdApi.Plugins.isEnabled(plugin.id)) {
                BdApi.Plugins.enable(plugin.id);
            }
        });
    }

    setExcludedPlugins(pluginList) {
        this.excludedPlugins = pluginList;
    }

    getName() {
        return '!' + this.pluginName;
    }
};
