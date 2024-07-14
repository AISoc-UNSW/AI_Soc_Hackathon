import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import imports from 'eslint-plugin-import';

export default [ 
    {
        files: ["src/**/*.{ts,tsx,js,jsx}"],
        ignores: ["dist/*", "build/*", "coverage/*", "public/*", ".github/*", "node_modules/*", ".vscode/*"],
        languageOptions: {
            parser: parser
        },
        plugins: {
            imports: imports.configs.recommended,
            '@typescript-eslint': tseslint
        },
        rules: {
         
        }
    }
]
