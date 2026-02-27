import { defineConfig } from "eslint/config";
import html from "eslint-plugin-html";
import lit from "eslint-plugin-lit";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import neostandard, { plugins as neoPlugins } from "neostandard";

export default defineConfig([
	// 1. Neostandard replaces: standard, n, promise, and import plugins
	...neostandard({
		noSemicolon: false, // Set to true for classic standard style
		globals: {
			...globals.browser,
			...globals.commonjs,
			...globals.worker,
			...globals.amd,
			...globals.jquery,
			...globals.node,
			$: "readonly",
			tsParticles: "readonly",
			loadFirePreset: "readonly",
			loadFireworksPreset: "readonly",
			loadPolygonPath: "readonly",
			dataLayer: "readonly",
		}
	}),

	// 2. Modern Flat Plugin Configs
	prettierRecommended,
	lit.configs["flat/recommended"],

	// 3. Your Custom Overrides & Plugin Setup
	{
		plugins: {
			html,
			import: neoPlugins['import-x']
		},
		settings: {
			"html/html-extensions": [".html", ".we"],
			"html/report-bad-indent": "error",
		},
		rules: {
			// General Overrides
			"no-undef": "off",
			"no-unused-vars": [1, { varsIgnorePattern: "init*" }],
			"no-tabs": ["error", { allowIndentationTabs: true }],
			"prettier/prettier": "off",
			"camelcase": "off",
			"one-var": "off",
			"prefer-const": "off",
			"prefer-template": "error",
			"max-params": ["warn", 5],

			// Formatting
			"semi": ["error", "always", { omitLastInOneLineClassBody: true }],
			"indent": ["error", "tab", { MemberExpression: "off", SwitchCase: 1 }],
			"object-curly-spacing": ["error", "always"],
			"operator-linebreak": ["error", "after"],

			// Import Rule Fixes (Neostandard already includes the plugin)
			"import/extensions": ["error", "ignorePackages", { js: "always" }],
			"import/no-cycle": ["error", { ignoreExternal: true }],
			"import/order": [
				"error",
				{
					"groups": ["type", "builtin", "external", "internal"],
					'newlines-between': 'always-and-inside-groups',
					named: true,
					'alphabetize': {
						'order': 'ignore',
						'caseInsensitive': true,
					},
				}
			],
			"import/no-self-import": "error",
			"import/no-extraneous-dependencies": "error",
		}
	},

	// 4. Special handling for config files
	{
		files: ["**/*.cjs"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "latest",
			globals: {
				...globals.node,
				Config: "readonly",
			}
		}
	}
]);
