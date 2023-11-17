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
        this.pluginName = 'MassPluginEnabler'; // Store the actual plugin name
    }

    // Called when the plugin is loaded
    load() {
        console.log(`${this.pluginName} loaded`);
    }

    // Called when the plugin is started
    start() {
        this.enableAllPlugins();
        this.enabled = true;
    }

    // Called when the plugin is stopped
    stop() {
        console.log(`${this.pluginName} stopped`);
        this.enabled = false;
    }

    // Enables all other plugins
    enableAllPlugins() {
        const allPlugins = BdApi.Plugins.getAll();
        allPlugins.forEach(plugin => {
            if (plugin.id !== this.pluginName && !BdApi.Plugins.isEnabled(plugin.id)) {
                BdApi.Plugins.enable(plugin.id);
            }
        });
    }

    // Utility method to get the plugin's display name
    getName() {
        return '!' + this.pluginName; // Prefix the actual name with '!' for display
    }
};
