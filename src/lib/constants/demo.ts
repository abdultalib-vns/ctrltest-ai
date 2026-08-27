export interface DemoConfig {
  appType: string;
  framework: string;
  language: string;
  testingType: string;
  cicd: string;
}

export interface FileTreeNode {
  name: string;
  type: "folder" | "file";
  children?: FileTreeNode[];
}

// File extensions by language
const extMap: Record<string, { test: string; src: string; config: string }> = {
  TypeScript: { test: ".spec.ts", src: ".ts", config: ".ts" },
  JavaScript: { test: ".spec.js", src: ".js", config: ".js" },
  Python: { test: ".py", src: ".py", config: ".ini" },
  Java: { test: ".java", src: ".java", config: ".xml" },
  "C#": { test: ".cs", src: ".cs", config: ".csproj" },
  Ruby: { test: "_spec.rb", src: ".rb", config: ".rb" },
  Go: { test: "_test.go", src: ".go", config: ".go" },
  Kotlin: { test: ".kt", src: ".kt", config: ".kts" },
};

// CI/CD config files
const cicdFiles: Record<string, string> = {
  "GitHub Actions": ".github/workflows/tests.yml",
  "GitLab CI": ".gitlab-ci.yml",
  Jenkins: "Jenkinsfile",
  "Azure DevOps": "azure-pipelines.yml",
  CircleCI: ".circleci/config.yml",
};

// Framework config files
const frameworkConfigs: Record<string, (lang: string) => string> = {
  Playwright: (l) => `playwright.config${extMap[l]?.config || ".ts"}`,
  Cypress: (l) => `cypress.config${extMap[l]?.config || ".js"}`,
  Selenium: (l) => l === "Java" ? "pom.xml" : l === "Python" ? "requirements.txt" : `selenium.config${extMap[l]?.config || ".js"}`,
  WebdriverIO: (l) => `wdio.conf${extMap[l]?.config || ".ts"}`,
  Appium: (l) => `wdio.conf${extMap[l]?.config || ".ts"}`,
  Detox: () => ".detoxrc.js",
  Jest: (l) => `jest.config${extMap[l]?.config || ".ts"}`,
  Pytest: () => "pytest.ini",
  Supertest: (l) => `jest.config${extMap[l]?.config || ".ts"}`,
  k6: () => "k6.config.js",
  "Robot Framework": () => "robot.yaml",
  "Cucumber BDD": (l) => l === "Java" ? "pom.xml" : l === "Python" ? "behave.ini" : `cucumber.config${extMap[l]?.config || ".js"}`,
};

// Page object / screen pattern names
const pageObjectNames: Record<string, string> = {
  "Web Application": "pages",
  "Mobile Application": "screens",
  API: "helpers",
};

function buildTree(config: DemoConfig): FileTreeNode[] {
  const ext = extMap[config.language] || extMap.TypeScript;
  const isJava = config.language === "Java";
  const isPython = config.language === "Python";
  const prefix = isPython ? "test_" : "";
  const suffix = ext.test;

  // Test file names based on app type
  const testFiles: string[] = [];
  const poFiles: string[] = [];

  if (config.appType === "Web Application") {
    testFiles.push(`${prefix}home${suffix}`, `${prefix}login${suffix}`, `${prefix}dashboard${suffix}`);
    poFiles.push(`BasePage${ext.src}`, `HomePage${ext.src}`, `LoginPage${ext.src}`);
  } else if (config.appType === "Mobile Application") {
    testFiles.push(`${prefix}app_launch${suffix}`, `${prefix}login${suffix}`, `${prefix}onboarding${suffix}`);
    poFiles.push(`BaseScreen${ext.src}`, `LoginScreen${ext.src}`, `HomeScreen${ext.src}`);
  } else {
    testFiles.push(`${prefix}users${suffix}`, `${prefix}auth${suffix}`, `${prefix}products${suffix}`);
    poFiles.push(`api-client${ext.src}`, `test-data${ext.src}`);
  }

  // Adjust naming for testing type
  if (config.testingType === "Unit Testing") {
    testFiles.length = 0;
    testFiles.push(`${prefix}utils${suffix}`, `${prefix}validators${suffix}`, `${prefix}formatters${suffix}`);
  } else if (config.testingType === "Performance Testing") {
    testFiles.length = 0;
    testFiles.push(`load-test${ext.src}`, `stress-test${ext.src}`, `spike-test${ext.src}`);
    poFiles.length = 0;
    poFiles.push(`scenarios${ext.src}`, `thresholds${ext.src}`);
  } else if (config.testingType === "API Testing") {
    testFiles.length = 0;
    testFiles.push(`${prefix}get_users${suffix}`, `${prefix}post_auth${suffix}`, `${prefix}crud_products${suffix}`);
    poFiles.length = 0;
    poFiles.push(`api-client${ext.src}`, `test-data${ext.src}`, `schemas${ext.src}`);
  }

  // Robot Framework-specific structure
  if (config.framework === "Robot Framework") {
    return [
      {
        name: "tests/", type: "folder", children: [
          {
            name: "suites/", type: "folder", children: [
              { name: "home.robot", type: "file" },
              { name: "login.robot", type: "file" },
              { name: "dashboard.robot", type: "file" },
            ]
          },
          {
            name: "resources/", type: "folder", children: [
              { name: "common.resource", type: "file" },
              { name: "pages.resource", type: "file" },
            ]
          },
          {
            name: "libraries/", type: "folder", children: [
              { name: "CustomLibrary.py", type: "file" },
            ]
          },
        ]
      },
      { name: "robot.yaml", type: "file" },
      { name: "requirements.txt", type: "file" },
      { name: cicdFiles[config.cicd] || cicdFiles["GitHub Actions"], type: "file" },
    ];
  }

  // Cucumber BDD-specific structure
  if (config.framework === "Cucumber BDD") {
    const isJavaCuke = config.language === "Java" || config.language === "Kotlin";
    if (isJavaCuke) {
      return [
        {
          name: "src/test/", type: "folder", children: [
            {
              name: "resources/features/", type: "folder", children: [
                { name: "login.feature", type: "file" },
                { name: "home.feature", type: "file" },
                { name: "dashboard.feature", type: "file" },
              ]
            },
            {
              name: "java/stepdefs/", type: "folder", children: [
                { name: "LoginSteps.java", type: "file" },
                { name: "HomeSteps.java", type: "file" },
                { name: "Hooks.java", type: "file" },
              ]
            },
            {
              name: "java/runners/", type: "folder", children: [
                { name: "TestRunner.java", type: "file" },
              ]
            },
          ]
        },
        { name: "pom.xml", type: "file" },
        { name: cicdFiles[config.cicd] || cicdFiles["GitHub Actions"], type: "file" },
      ];
    }
    // Python Behave
    return [
      {
        name: "features/", type: "folder", children: [
          { name: "login.feature", type: "file" },
          { name: "home.feature", type: "file" },
          { name: "dashboard.feature", type: "file" },
          {
            name: "steps/", type: "folder", children: [
              { name: "login_steps.py", type: "file" },
              { name: "home_steps.py", type: "file" },
            ]
          },
          { name: "environment.py", type: "file" },
        ]
      },
      { name: "behave.ini", type: "file" },
      { name: "requirements.txt", type: "file" },
      { name: cicdFiles[config.cicd] || cicdFiles["GitHub Actions"], type: "file" },
    ];
  }

  // Cypress-specific structure
  if (config.framework === "Cypress") {
    const cyExt = config.language === "TypeScript" ? ".cy.ts" : ".cy.js";
    return [
      {
        name: "cypress/", type: "folder", children: [
          {
            name: "e2e/", type: "folder", children:
              testFiles.map((f) => ({ name: f.replace(suffix, cyExt), type: "file" as const }))
          },
          {
            name: "support/", type: "folder", children: [
              { name: `commands${ext.src}`, type: "file" },
              { name: `e2e${ext.src}`, type: "file" },
            ]
          },
          { name: "fixtures/", type: "folder", children: [{ name: "test-data.json", type: "file" }] },
        ]
      },
      { name: frameworkConfigs.Cypress(config.language), type: "file" },
      { name: cicdFiles[config.cicd] || cicdFiles["GitHub Actions"], type: "file" },
    ];
  }

  // Java uses src/test/java structure
  const rootTestFolder = isJava ? "src/test/java/" : "tests/";
  const poFolderName = pageObjectNames[config.appType] || "helpers";

  const testsDir: FileTreeNode = {
    name: rootTestFolder, type: "folder", children: [
      {
        name: config.testingType === "Unit Testing" ? "unit/" : config.testingType === "Performance Testing" ? "scenarios/" : config.appType === "API" ? "api/" : "e2e/",
        type: "folder",
        children: testFiles.map((f) => ({ name: f, type: "file" as const })),
      },
      {
        name: `${poFolderName}/`, type: "folder",
        children: poFiles.map((f) => ({ name: f, type: "file" as const })),
      },
    ]
  };

  // Add conftest for Python
  if (isPython) {
    testsDir.children!.push({ name: "conftest.py", type: "file" });
  }

  const tree: FileTreeNode[] = [testsDir];

  // Framework config
  const cfgFn = frameworkConfigs[config.framework];
  if (cfgFn) tree.push({ name: cfgFn(config.language), type: "file" });

  // CI/CD
  tree.push({ name: cicdFiles[config.cicd] || cicdFiles["GitHub Actions"], type: "file" });

  // Env / deps
  if (isPython) tree.push({ name: "requirements.txt", type: "file" });
  else if (isJava) tree.push({ name: "pom.xml", type: "file" });

  tree.push({ name: ".env.example", type: "file" });

  if (config.language === "TypeScript") tree.push({ name: "tsconfig.json", type: "file" });

  return tree;
}

export { buildTree };

export const appTypes = ["Web Application", "Mobile Application", "API"];
export const frameworks = ["Playwright", "Cypress", "Selenium", "WebdriverIO", "Appium", "Detox", "Jest", "Pytest", "Supertest", "k6", "Robot Framework", "Cucumber BDD"];
export const languages = ["TypeScript", "JavaScript", "Python", "Java", "C#", "Ruby", "Go", "Kotlin"];
export const testingTypes = ["E2E Testing", "API Testing", "Unit Testing", "Performance Testing"];
export const cicdProviders = ["GitHub Actions", "GitLab CI", "Jenkins", "Azure DevOps", "CircleCI"];
