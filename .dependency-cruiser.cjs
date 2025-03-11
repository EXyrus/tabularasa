
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'This dependency is part of a circular relationship.',
      from: {},
      to: {
        circular: true
      }
    },
    {
      name: 'no-orphans',
      comment: 'This file has no incoming or outgoing dependencies.',
      severity: 'warn',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$', // dot files
          '\\.d\\.ts$',                            // TypeScript declaration files
          '(^|/)tsconfig\\.json$',                 // TypeScript config
          '(^|/)(babel|webpack)\\.config\\.(js|cjs|mjs|ts|json)$' // build config
        ]
      },
      to: {}
    },
    {
      name: 'no-deprecated-core',
      comment: 'This module is using a deprecated core module.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'core'
        ],
        path: [
          '^(punycode|domain|constants|sys|_linklist|_stream_wrap)$'
        ]
      }
    },
    {
      name: 'not-to-deprecated',
      comment: 'This module uses a deprecated module.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'deprecated'
        ]
      }
    },
    {
      name: 'no-non-package-json',
      severity: 'error',
      comment: 'This module depends on an npm package not in the package.json.',
      from: {},
      to: {
        dependencyTypes: [
          'npm-no-pkg',
          'npm-unknown'
        ]
      }
    },
    {
      name: 'not-to-unresolvable',
      comment: 'This module depends on a module that cannot be found.',
      severity: 'error',
      from: {},
      to: {
        couldNotResolve: true
      }
    },
    {
      name: 'no-duplicate-dep-types',
      comment: 'This dependency is specified more than once in package.json.',
      severity: 'warn',
      from: {},
      to: {
        moreThanOneDependencyType: true
      }
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
      dependencyTypes: [
        'npm',
        'npm-dev',
        'npm-optional',
        'npm-peer',
        'npm-bundled',
        'npm-no-pkg'
      ]
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: './tsconfig.json'
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
      mainFields: ['main', 'module', 'types', 'typings']
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
        theme: {
          graph: {
            splines: 'ortho'
          }
        }
      },
      archi: {
        collapsePattern: '^(node_modules|packages|src|lib|app|bin|test(s?)|spec(s?))/[^/]+',
        theme: {
          graph: {
            rankdir: 'TB',
            splines: 'ortho'
          }
        }
      }
    }
  }
};
