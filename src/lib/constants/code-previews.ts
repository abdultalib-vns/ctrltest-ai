import type { DemoConfig } from "./demo";

type CodeGenerator = (config: DemoConfig) => string;

const playwrightTS = `import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should display hero section', async () => {
    await expect(homePage.heroTitle).toBeVisible();
    await expect(homePage.ctaButton).toBeEnabled();
  });

  test('should navigate to features', async () => {
    await homePage.clickFeatures();
    await expect(homePage.featuresSection).toBeInViewport();
  });
});`;

const playwrightLoginTS = `import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login with valid credentials', async () => {
    await loginPage.login('user@test.com', 'password123');
    await expect(loginPage.page).toHaveURL('/dashboard');
  });

  test('should show error for invalid credentials', async () => {
    await loginPage.login('wrong@test.com', 'wrong');
    await expect(loginPage.errorMessage).toContainText('Invalid');
  });
});`;

const basePageTS = `import { type Page, type Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/') {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  protected getByTestId(id: string): Locator {
    return this.page.getByTestId(id);
  }
}`;

const cypressJS = `describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the hero section', () => {
    cy.get('[data-testid="hero-title"]').should('be.visible');
    cy.get('[data-testid="cta-button"]').should('be.enabled');
  });

  it('should navigate to features section', () => {
    cy.get('[data-testid="features-link"]').click();
    cy.get('#features').should('be.visible');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('[data-testid="mobile-menu"]').should('exist');
  });
});`;

const cypressLoginJS = `describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully', () => {
    cy.get('[data-testid="email"]').type('user@test.com');
    cy.get('[data-testid="password"]').type('password123');
    cy.get('[data-testid="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should show validation errors', () => {
    cy.get('[data-testid="submit"]').click();
    cy.get('.error-message').should('be.visible');
  });
});`;

const cypressCommandsJS = `Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});

Cypress.Commands.add('apiLogin', (email, password) => {
  cy.request('POST', '/api/auth/login', { email, password })
    .then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });
});`;

const seleniumJava = `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class HomeTest {
    private WebDriver driver;
    private HomePage homePage;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
        homePage = new HomePage(driver);
    }

    @Test
    void shouldDisplayHeroSection() {
        homePage.navigate();
        assertTrue(homePage.isHeroVisible());
        assertTrue(homePage.isCtaEnabled());
    }

    @AfterEach
    void tearDown() {
        if (driver != null) driver.quit();
    }
}`;

const pytestPython = `import pytest
from pages.home_page import HomePage

class TestHome:
    @pytest.fixture(autouse=True)
    def setup(self, page):
        self.home_page = HomePage(page)
        self.home_page.navigate()

    def test_hero_is_visible(self):
        assert self.home_page.hero_title.is_visible()
        assert self.home_page.cta_button.is_enabled()

    def test_navigation_to_features(self):
        self.home_page.click_features()
        assert self.home_page.features_section.is_visible()`;

const pytestLoginPython = `import pytest
from pages.login_page import LoginPage

class TestLogin:
    @pytest.fixture(autouse=True)
    def setup(self, page):
        self.login_page = LoginPage(page)
        self.login_page.navigate()

    def test_valid_login(self):
        self.login_page.login("user@test.com", "password123")
        assert self.login_page.page.url.endswith("/dashboard")

    def test_invalid_login_shows_error(self):
        self.login_page.login("wrong@test.com", "wrong")
        assert "Invalid" in self.login_page.error_message.text`;

const pytestConftest = `import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        yield browser
        browser.close()

@pytest.fixture
def page(browser):
    context = browser.new_context()
    page = context.new_page()
    yield page
    context.close()`;

const basePagePython = `class BasePage:
    def __init__(self, page):
        self.page = page

    def navigate(self, path="/"):
        self.page.goto(f"http://localhost:3000{path}")
        self.page.wait_for_load_state("networkidle")

    @property
    def title(self):
        return self.page.title()

    def get_by_test_id(self, test_id):
        return self.page.get_by_test_id(test_id)`;

const apiTestTS = `import request from 'supertest';
import { app } from '../src/app';

describe('GET /api/users', () => {
  it('should return a list of users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', \`Bearer \${token}\`)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should return 401 without auth', async () => {
    await request(app)
      .get('/api/users')
      .expect(401);
  });
});`;

const apiAuthTestTS = `import request from 'supertest';
import { app } from '../src/app';

describe('POST /api/auth', () => {
  it('should return a token for valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@test.com', password: 'password123' })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@test.com', password: 'wrong' })
      .expect(401);

    expect(response.body).toHaveProperty('error');
  });
});`;

const apiClientTS = `import request from 'supertest';

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async authenticate(email: string, password: string) {
    const res = await request(this.baseUrl)
      .post('/api/auth/login')
      .send({ email, password });
    this.token = res.body.token;
  }

  async get(path: string) {
    return request(this.baseUrl)
      .get(path)
      .set('Authorization', \`Bearer \${this.token}\`);
  }
}`;

const testDataTS = `export const testData = {
  validUser: {
    email: 'user@test.com',
    password: 'password123',
    name: 'Test User',
  },
  invalidUser: {
    email: 'wrong@test.com',
    password: 'wrongpassword',
  },
  newUser: {
    email: \`test+\${Date.now()}@test.com\`,
    password: 'newPassword123',
    name: 'New User',
  },
};`;

const authHelperTS = `import { type Page } from '@playwright/test';

export async function loginAsUser(page: Page) {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'user@test.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="submit"]');
  await page.waitForURL('/dashboard');
}

export async function loginViaApi(page: Page) {
  const response = await page.request.post('/api/auth/login', {
    data: { email: 'user@test.com', password: 'password123' },
  });
  const { token } = await response.json();
  await page.evaluate((t) => localStorage.setItem('token', t), token);
}`;

const homePageTS = `import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heroTitle: Locator;
  readonly ctaButton: Locator;
  readonly featuresSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heroTitle = page.getByTestId('hero-title');
    this.ctaButton = page.getByTestId('cta-button');
    this.featuresSection = page.locator('#features');
  }

  async navigate() {
    await super.navigate('/');
  }

  async clickFeatures() {
    await this.page.getByTestId('features-link').click();
  }
}`;

const loginPageTS = `import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.submitButton = page.getByTestId('submit');
    this.errorMessage = page.locator('.error-message');
  }

  async navigate() {
    await super.navigate('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}`;

const playwrightConfig = `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});`;

const githubActionsYml = `name: Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: test-results/`;

const gitlabCiYml = `stages:
  - test

test:
  stage: test
  image: node:20
  script:
    - npm ci
    - npx playwright install --with-deps
    - npx playwright test
  artifacts:
    when: on_failure
    paths:
      - test-results/`;

const jenkinsfile = `pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
    post {
        failure {
            archiveArtifacts artifacts: 'test-results/**'
        }
    }
}`;

const envExample = `# Base URL for the application
BASE_URL=http://localhost:3000

# Test credentials
TEST_USER_EMAIL=user@test.com
TEST_USER_PASSWORD=password123

# CI-specific
CI=false
HEADLESS=true`;

const tsconfigJson = `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "rootDir": "./"
  },
  "include": ["tests/**/*.ts"],
  "exclude": ["node_modules"]
}`;

const mobileAppLaunchTS = `import { test, expect } from '@playwright/test';

test.describe('App Launch', () => {
  test('should launch the app successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('splash-screen')).toBeVisible();
    await page.waitForTimeout(2000);
    await expect(page.getByTestId('home-screen')).toBeVisible();
  });

  test('should show onboarding for new users', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('onboarding-step-1')).toBeVisible();
  });
});`;

const mobileLoginTS = `import { test, expect } from '@playwright/test';
import { LoginScreen } from '../screens/LoginScreen';

test.describe('Mobile Login', () => {
  test('should login with biometrics', async ({ page }) => {
    const loginScreen = new LoginScreen(page);
    await loginScreen.navigate();
    await loginScreen.tapBiometricLogin();
    await expect(page).toHaveURL('/home');
  });
});`;

const k6LoadTest = `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/users');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}`;

const k6StressTest = `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 0 },
  ],
};

export default function () {
  const res = http.get('http://localhost:3000/api/health');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.5);
}`;

const unitTestTS = `import { describe, it, expect } from 'vitest';
import { formatDate, truncate, slugify } from '../src/utils';

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format ISO date to readable string', () => {
      expect(formatDate('2024-01-15')).toBe('Jan 15, 2024');
    });

    it('should handle invalid dates', () => {
      expect(formatDate('invalid')).toBe('Invalid Date');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
    });

    it('should not truncate short strings', () => {
      expect(truncate('Hi', 5)).toBe('Hi');
    });
  });
});`;

const schemasTS = `export interface UserSchema {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: UserSchema;
}

export function validateUserSchema(data: unknown): data is UserSchema {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return typeof obj.id === 'string'
    && typeof obj.email === 'string'
    && typeof obj.name === 'string';
}`;

// Robot Framework snippets
const robotHomeTest = `*** Settings ***
Library    SeleniumLibrary
Resource   ../resources/common.resource
Resource   ../resources/pages.resource

Suite Setup    Open Browser To Home Page
Suite Teardown    Close All Browsers

*** Test Cases ***
Verify Hero Section Is Visible
    [Documentation]    Verify the hero section loads correctly
    Page Should Contain Element    css=[data-testid="hero-title"]
    Element Should Be Enabled      css=[data-testid="cta-button"]

Navigate To Features Section
    [Documentation]    Click features link and verify scroll
    Click Element    css=[data-testid="features-link"]
    Wait Until Element Is Visible    id=features`;

const robotLoginTest = `*** Settings ***
Library    SeleniumLibrary
Resource   ../resources/common.resource

*** Test Cases ***
Login With Valid Credentials
    [Documentation]    Verify successful login flow
    Go To    \${BASE_URL}/login
    Input Text    css=[data-testid="email"]    user@test.com
    Input Text    css=[data-testid="password"]    password123
    Click Button    css=[data-testid="submit"]
    Location Should Contain    /dashboard

Login With Invalid Credentials Shows Error
    [Documentation]    Verify error message on invalid login
    Go To    \${BASE_URL}/login
    Input Text    css=[data-testid="email"]    wrong@test.com
    Input Text    css=[data-testid="password"]    wrong
    Click Button    css=[data-testid="submit"]
    Page Should Contain    Invalid`;

const robotCommonResource = `*** Settings ***
Library    SeleniumLibrary

*** Variables ***
\${BROWSER}         chrome
\${BASE_URL}        http://localhost:3000
\${TIMEOUT}         10s

*** Keywords ***
Open Browser To Home Page
    Open Browser    \${BASE_URL}    \${BROWSER}
    Set Selenium Timeout    \${TIMEOUT}
    Maximize Browser Window

Open Browser To Login Page
    Open Browser    \${BASE_URL}/login    \${BROWSER}
    Set Selenium Timeout    \${TIMEOUT}`;

const robotYaml = `# robot.yaml - Robot Framework configuration
tasks:
  Run Tests:
    command: robot --outputdir results tests/suites/

condaConfigFile: conda.yaml
artifactsDir: results

environmentConfigs:
  - name: dev
    variables:
      BASE_URL: http://localhost:3000
  - name: staging
    variables:
      BASE_URL: https://staging.example.com`;

// Cucumber BDD snippets
const cucumberFeature = `Feature: Login functionality
  As a user
  I want to log in to the application
  So that I can access my dashboard

  Background:
    Given the user is on the login page

  Scenario: Successful login with valid credentials
    When the user enters "user@test.com" as email
    And the user enters "password123" as password
    And the user clicks the login button
    Then the user should be redirected to the dashboard

  Scenario: Failed login with invalid credentials
    When the user enters "wrong@test.com" as email
    And the user enters "wrong" as password
    And the user clicks the login button
    Then an error message should be displayed`;

const cucumberHomeFeature = `Feature: Home page
  As a visitor
  I want to see the home page
  So that I can learn about the product

  Scenario: Hero section is visible
    Given the user navigates to the home page
    Then the hero title should be visible
    And the CTA button should be enabled

  Scenario: Navigate to features
    Given the user navigates to the home page
    When the user clicks the features link
    Then the features section should be visible`;

const cucumberStepsJava = `import io.cucumber.java.en.*;
import static org.junit.Assert.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;

public class LoginSteps {
    private WebDriver driver;

    @Given("the user is on the login page")
    public void userIsOnLoginPage() {
        driver.get("http://localhost:3000/login");
    }

    @When("the user enters {string} as email")
    public void userEntersEmail(String email) {
        driver.findElement(By.cssSelector("[data-testid='email']"))
              .sendKeys(email);
    }

    @When("the user enters {string} as password")
    public void userEntersPassword(String password) {
        driver.findElement(By.cssSelector("[data-testid='password']"))
              .sendKeys(password);
    }

    @When("the user clicks the login button")
    public void userClicksLogin() {
        driver.findElement(By.cssSelector("[data-testid='submit']"))
              .click();
    }

    @Then("the user should be redirected to the dashboard")
    public void userRedirectedToDashboard() {
        assertTrue(driver.getCurrentUrl().contains("/dashboard"));
    }

    @Then("an error message should be displayed")
    public void errorMessageDisplayed() {
        assertTrue(driver.findElement(By.className("error-message"))
                         .isDisplayed());
    }
}`;

const cucumberHooksJava = `import io.cucumber.java.Before;
import io.cucumber.java.After;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Hooks {
    private static WebDriver driver;

    @Before
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static WebDriver getDriver() {
        return driver;
    }
}`;

const cucumberRunnerJava = `import org.junit.runner.RunWith;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    glue = "stepdefs",
    plugin = {
        "pretty",
        "html:target/cucumber-reports.html",
        "json:target/cucumber.json"
    },
    monochrome = true
)
public class TestRunner {
}`;

const cucumberStepsPython = `from behave import given, when, then
from selenium import webdriver
from selenium.webdriver.common.by import By

@given('the user is on the login page')
def step_user_on_login(context):
    context.driver.get("http://localhost:3000/login")

@when('the user enters "{text}" as email')
def step_enter_email(context, text):
    context.driver.find_element(By.CSS_SELECTOR, "[data-testid='email']").send_keys(text)

@when('the user enters "{text}" as password')
def step_enter_password(context, text):
    context.driver.find_element(By.CSS_SELECTOR, "[data-testid='password']").send_keys(text)

@when('the user clicks the login button')
def step_click_login(context):
    context.driver.find_element(By.CSS_SELECTOR, "[data-testid='submit']").click()

@then('the user should be redirected to the dashboard')
def step_redirected_dashboard(context):
    assert "/dashboard" in context.driver.current_url

@then('an error message should be displayed')
def step_error_displayed(context):
    error = context.driver.find_element(By.CLASS_NAME, "error-message")
    assert error.is_displayed()`;

const cucumberEnvironmentPy = `from selenium import webdriver

def before_scenario(context, scenario):
    context.driver = webdriver.Chrome()
    context.driver.maximize_window()

def after_scenario(context, scenario):
    context.driver.quit()`;

const behaveIni = `[behave]
paths = features
format = pretty
stdout_capture = false
stderr_capture = false
log_capture = false`;

// Map file names to code snippets based on config
export function getCodePreview(fileName: string | null, config: DemoConfig): string {
  if (!fileName) return "// Select a file to preview its code";

  const { framework, language, testingType } = config;

  // CI/CD files
  if (fileName.includes("workflows/") || fileName === ".github/workflows/tests.yml" || fileName === ".github/workflows/mobile-tests.yml" || fileName === ".github/workflows/api-tests.yml")
    return githubActionsYml;
  if (fileName === ".gitlab-ci.yml") return gitlabCiYml;
  if (fileName === "Jenkinsfile") return jenkinsfile;
  if (fileName.includes("azure-pipelines")) return githubActionsYml.replace("GitHub Actions", "Azure DevOps");
  if (fileName.includes("circleci")) return gitlabCiYml;

  // Config files
  if (fileName === ".env.example") return envExample;
  if (fileName === "tsconfig.json") return tsconfigJson;
  if (fileName.startsWith("playwright.config")) return playwrightConfig;
  if (fileName.startsWith("cypress.config")) return `const { defineConfig } = require('cypress');\n\nmodule.exports = defineConfig({\n  e2e: {\n    baseUrl: 'http://localhost:3000',\n    supportFile: 'cypress/support/e2e.js',\n    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',\n    video: false,\n    screenshotOnRunFailure: true,\n  },\n});`;
  if (fileName.startsWith("jest.config")) return `export default {\n  preset: 'ts-jest',\n  testEnvironment: 'node',\n  testMatch: ['**/tests/**/*.test.ts'],\n  setupFilesAfterSetup: ['./tests/helpers/setup.ts'],\n  coverageDirectory: 'coverage',\n  collectCoverageFrom: ['src/**/*.ts'],\n};`;
  if (fileName === "pytest.ini") return `[pytest]\ntestpaths = tests\npython_files = test_*.py\npython_classes = Test*\npython_functions = test_*\naddopts = -v --tb=short\nmarkers =\n    smoke: Smoke tests\n    regression: Regression tests`;
  if (fileName === "requirements.txt") {
    if (framework === "Robot Framework") return `robotframework==7.0\nrobotframework-seleniumlibrary==6.2.0\nrobotframework-requests==0.9.5\nwebdriver-manager==4.0.1`;
    if (framework === "Cucumber BDD") return `behave==1.2.6\nselenium==4.15.0\nwebdriver-manager==4.0.1`;
    return `pytest==7.4.3\npytest-playwright==0.4.3\nplaywright==1.40.0\npytest-html==4.1.1\npython-dotenv==1.0.0`;
  }
  if (fileName === "robot.yaml") return robotYaml;
  if (fileName === "behave.ini") return behaveIni;
  if (fileName === "pom.xml") {
    if (framework === "Cucumber BDD") return `<?xml version="1.0"?>\n<project>\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.ctrltest</groupId>\n  <artifactId>cucumber-tests</artifactId>\n  <version>1.0</version>\n  <dependencies>\n    <dependency>\n      <groupId>io.cucumber</groupId>\n      <artifactId>cucumber-java</artifactId>\n      <version>7.14.0</version>\n    </dependency>\n    <dependency>\n      <groupId>io.cucumber</groupId>\n      <artifactId>cucumber-junit</artifactId>\n      <version>7.14.0</version>\n    </dependency>\n    <dependency>\n      <groupId>org.seleniumhq.selenium</groupId>\n      <artifactId>selenium-java</artifactId>\n      <version>4.15.0</version>\n    </dependency>\n  </dependencies>\n</project>`;
    return `<?xml version="1.0"?>\n<project>\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.ctrltest</groupId>\n  <artifactId>tests</artifactId>\n  <version>1.0</version>\n  <dependencies>\n    <dependency>\n      <groupId>org.seleniumhq.selenium</groupId>\n      <artifactId>selenium-java</artifactId>\n      <version>4.15.0</version>\n    </dependency>\n    <dependency>\n      <groupId>org.junit.jupiter</groupId>\n      <artifactId>junit-jupiter</artifactId>\n      <version>5.10.1</version>\n    </dependency>\n  </dependencies>\n</project>`;
  }
  if (fileName.startsWith("wdio.conf")) return `export const config = {\n  runner: 'local',\n  specs: ['./tests/specs/**/*.spec.ts'],\n  capabilities: [{ browserName: 'chrome' }],\n  framework: 'mocha',\n  reporters: ['spec'],\n  mochaOpts: { timeout: 60000 },\n};`;

  // Performance testing
  if (testingType === "Performance Testing") {
    if (fileName.includes("load")) return k6LoadTest;
    if (fileName.includes("stress")) return k6StressTest;
    if (fileName.includes("spike")) return k6LoadTest.replace("load", "spike").replace("50", "200");
    if (fileName.includes("scenarios")) return `export const scenarios = {\n  homepage: { url: '/', method: 'GET' },\n  login: { url: '/api/auth/login', method: 'POST', body: { email: 'test@test.com', password: 'pass' } },\n  dashboard: { url: '/api/dashboard', method: 'GET', auth: true },\n};`;
    if (fileName.includes("thresholds")) return `export const thresholds = {\n  http_req_duration: ['p(95)<500', 'p(99)<1000'],\n  http_req_failed: ['rate<0.01'],\n  http_reqs: ['rate>100'],\n};`;
  }

  // Unit testing
  if (testingType === "Unit Testing") {
    if (fileName.includes("utils") || fileName.includes("validators") || fileName.includes("formatters"))
      return unitTestTS;
  }

  // API testing
  if (testingType === "API Testing") {
    if (fileName.includes("users") || fileName.includes("get_users")) return apiTestTS;
    if (fileName.includes("auth") || fileName.includes("post_auth")) return apiAuthTestTS;
    if (fileName.includes("products") || fileName.includes("crud")) return apiTestTS.replace("users", "products");
    if (fileName.includes("api-client")) return apiClientTS;
    if (fileName.includes("test-data")) return testDataTS;
    if (fileName.includes("schemas")) return schemasTS;
  }

  // Robot Framework
  if (framework === "Robot Framework") {
    if (fileName.includes("home.robot")) return robotHomeTest;
    if (fileName.includes("login.robot")) return robotLoginTest;
    if (fileName.includes("dashboard.robot")) return robotHomeTest.replace("Home", "Dashboard").replace("hero", "dashboard");
    if (fileName.includes("common.resource")) return robotCommonResource;
    if (fileName.includes("pages.resource")) return `*** Settings ***\nLibrary    SeleniumLibrary\n\n*** Keywords ***\nVerify Page Title\n    [Arguments]    \${expected}\n    Title Should Be    \${expected}\n\nClick Navigation Link\n    [Arguments]    \${link_text}\n    Click Link    \${link_text}\n    Sleep    1s`;
    if (fileName.includes("CustomLibrary")) return `class CustomLibrary:\n    """Custom Robot Framework library for project-specific keywords."""\n\n    def generate_test_email(self, prefix="test"):\n        import time\n        return f"{prefix}+{int(time.time())}@test.com"\n\n    def verify_json_response(self, response, expected_key):\n        import json\n        data = json.loads(response)\n        assert expected_key in data, f"Key '{expected_key}' not found"`;
    return robotHomeTest;
  }

  // Cucumber BDD
  if (framework === "Cucumber BDD") {
    if (fileName.includes("login.feature")) return cucumberFeature;
    if (fileName.includes("home.feature")) return cucumberHomeFeature;
    if (fileName.includes("dashboard.feature")) return cucumberHomeFeature.replace("Home page", "Dashboard").replace("home page", "dashboard");
    if (fileName.includes("LoginSteps.java")) return cucumberStepsJava;
    if (fileName.includes("HomeSteps.java")) return cucumberStepsJava.replace("Login", "Home").replace("login", "home");
    if (fileName.includes("Hooks.java")) return cucumberHooksJava;
    if (fileName.includes("TestRunner")) return cucumberRunnerJava;
    if (fileName.includes("login_steps.py")) return cucumberStepsPython;
    if (fileName.includes("home_steps.py")) return cucumberStepsPython.replace("login", "home");
    if (fileName.includes("environment.py")) return cucumberEnvironmentPy;
    if (fileName.endsWith(".feature")) return cucumberFeature;
    return cucumberStepsJava;
  }

  // Cypress-specific
  if (framework === "Cypress") {
    if (fileName.includes("commands")) return cypressCommandsJS;
    if (fileName.includes("e2e.")) return `import './commands';`;
    if (fileName.includes("test-data") || fileName.includes("users.json")) return `{\n  "validUser": {\n    "email": "user@test.com",\n    "password": "password123"\n  },\n  "products": [\n    { "id": 1, "name": "Widget", "price": 9.99 }\n  ]\n}`;
    if (fileName.includes("login")) return cypressLoginJS;
    return cypressJS;
  }

  // Python
  if (language === "Python") {
    if (fileName === "conftest.py") return pytestConftest;
    if (fileName.includes("base_page")) return basePagePython;
    if (fileName.includes("home_page")) return `from pages.base_page import BasePage\n\nclass HomePage(BasePage):\n    def __init__(self, page):\n        super().__init__(page)\n        self.hero_title = page.get_by_test_id("hero-title")\n        self.cta_button = page.get_by_test_id("cta-button")\n        self.features_section = page.locator("#features")\n\n    def navigate(self):\n        super().navigate("/")\n\n    def click_features(self):\n        self.page.get_by_test_id("features-link").click()`;
    if (fileName.includes("login")) return pytestLoginPython;
    return pytestPython;
  }

  // Java / Selenium
  if (language === "Java" || framework === "Selenium") {
    if (fileName.includes("BasePage")) return `import org.openqa.selenium.*;\n\npublic class BasePage {\n    protected WebDriver driver;\n\n    public BasePage(WebDriver driver) {\n        this.driver = driver;\n    }\n\n    public void navigate(String path) {\n        driver.get("http://localhost:3000" + path);\n    }\n\n    protected WebElement findByTestId(String id) {\n        return driver.findElement(By.cssSelector("[data-testid='" + id + "']"));\n    }\n}`;
    if (fileName.includes("Home")) return seleniumJava;
    if (fileName.includes("Login")) return seleniumJava.replace("Home", "Login").replace("Hero", "Login Form");
    return seleniumJava;
  }

  // Mobile
  if (config.appType === "Mobile Application") {
    if (fileName.includes("app") || fileName.includes("launch")) return mobileAppLaunchTS;
    if (fileName.includes("login")) return mobileLoginTS;
    if (fileName.includes("onboarding")) return mobileAppLaunchTS.replace("App Launch", "Onboarding");
    if (fileName.includes("BaseScreen")) return `import { type Page, type Locator } from '@playwright/test';\n\nexport class BaseScreen {\n  readonly page: Page;\n\n  constructor(page: Page) {\n    this.page = page;\n  }\n\n  async waitForScreen(testId: string) {\n    await this.page.getByTestId(testId).waitFor({ state: 'visible' });\n  }\n\n  async tap(locator: Locator) {\n    await locator.tap();\n  }\n}`;
    if (fileName.includes("LoginScreen")) return `import { type Page } from '@playwright/test';\nimport { BaseScreen } from './BaseScreen';\n\nexport class LoginScreen extends BaseScreen {\n  constructor(page: Page) {\n    super(page);\n  }\n\n  async navigate() {\n    await this.page.goto('/login');\n  }\n\n  async tapBiometricLogin() {\n    await this.page.getByTestId('biometric-btn').tap();\n  }\n\n  async loginWithCredentials(email: string, password: string) {\n    await this.page.fill('[data-testid="email"]', email);\n    await this.page.fill('[data-testid="password"]', password);\n    await this.page.getByTestId('submit').tap();\n  }\n}`;
    if (fileName.includes("HomeScreen")) return `import { type Page } from '@playwright/test';\nimport { BaseScreen } from './BaseScreen';\n\nexport class HomeScreen extends BaseScreen {\n  constructor(page: Page) {\n    super(page);\n  }\n\n  async waitForHome() {\n    await this.waitForScreen('home-screen');\n  }\n\n  async navigateToProfile() {\n    await this.page.getByTestId('profile-tab').tap();\n  }\n}`;
  }

  // Default: Playwright TS
  if (fileName.includes("BasePage")) return basePageTS;
  if (fileName.includes("HomePage")) return homePageTS;
  if (fileName.includes("LoginPage")) return loginPageTS;
  if (fileName.includes("test-data")) return testDataTS;
  if (fileName.includes("auth.helper") || fileName.includes("auth")) return authHelperTS;
  if (fileName.includes("login")) return playwrightLoginTS;
  if (fileName.includes("dashboard")) return playwrightTS.replace("Home Page", "Dashboard").replace("HomePage", "DashboardPage").replace("heroTitle", "dashboardTitle");

  return playwrightTS;
}
