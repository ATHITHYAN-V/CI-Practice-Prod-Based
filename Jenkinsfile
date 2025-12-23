pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    GITHUB_TOKEN = credentials('github-pat')
    APP_NAME = "electron-react-app"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        bat 'npm run lint'
      }
    }

    stage('Unit Tests') {
      steps {
        bat 'npm test -- --watch=false'
      }
    }

    stage('Security Scan (npm audit)') {
      steps {
        bat 'npm audit --audit-level=high'
      }
    }

    stage('Build Validation') {
      steps {
        bat 'npm run build'
      }
    }

    stage('Create Release Tag') {
      when {
        branch 'main'
      }
      steps {
        script {
          def version = "v1.0.${env.BUILD_NUMBER}"

          echo "Creating release tag: ${version}"

          bat """
            git config user.name "jenkins-ci"
            git config user.email "jenkins@ci.local"

            git tag %version%
            git push https://${GITHUB_TOKEN}@github.com/ATHITHYAN-V/CI-Practice-Prod-Based.git %version%
          """
        }
      }
    }
  }

  post {
    success {
      echo " CI Passed → Tag pushed → GitHub Actions triggered"
    }
    failure {
      echo " CI Failed → No release triggered"
    }
  }
}
