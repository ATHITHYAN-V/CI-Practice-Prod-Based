pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    GITHUB_TOKEN = credentials('github-pat')
    EMAIL_TO = "athithyanv33@gmail.com"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
      post {
        success {
          emailext(
            subject: "Jenkins | Checkout | SUCCESS",
            body: "Checkout completed successfully\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
        failure {
          emailext(
            subject: "Jenkins | Checkout | FAILED",
            body: "Checkout failed\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm ci'
      }
      post {
        success {
          emailext(
            subject: "Jenkins | Install Dependencies | SUCCESS",
            body: "Dependencies installed\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
        failure {
          emailext(
            subject: "Jenkins | Install Dependencies | FAILED",
            body: "npm ci failed\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
      }
    }

    stage('Lint') {
      steps {
        bat 'npm run lint'
      }
      post {
        success {
          emailext(
            subject: "Jenkins | Lint | SUCCESS",
            body: "Lint passed\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
        failure {
          emailext(
            subject: "Jenkins | Lint | FAILED",
            body: "Lint failed\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
      }
    }

    stage('Security Scan (npm audit)') {
      steps {
        bat 'npm audit --audit-level=high'
      }
      post {
        success {
          emailext(
            subject: "Jenkins | Security Scan | SUCCESS",
            body: "No vulnerabilities found\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
        failure {
          emailext(
            subject: "Jenkins | Security Scan | FAILED",
            body: "Vulnerabilities detected\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
      }
    }

    stage('Build Validation') {
      steps {
        bat 'npm run build'
      }
      post {
        success {
          emailext(
            subject: "Jenkins | Build | SUCCESS",
            body: "Build completed successfully\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
        failure {
          emailext(
            subject: "Jenkins | Build | FAILED",
            body: "Build failed\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
      }
    }

    stage('Create Release Tag') {
      when {
        branch 'main'
      }
      steps {
        script {
          def version = "v1.0.${env.BUILD_NUMBER}"

          bat """
            git config user.name "jenkins-ci"
            git config user.email "jenkins@ci.local"
            git tag ${version}
            git push https://${GITHUB_TOKEN}@github.com/ATHITHYAN-V/CI-Practice-Prod-Based.git ${version}
          """
        }
      }
      post {
        success {
          emailext(
            subject: "Jenkins | Release Tag Created",
            body: "Tag created successfully\nTag: v1.0.${env.BUILD_NUMBER}\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
        failure {
          emailext(
            subject: "Jenkins | Tag Creation FAILED",
            body: "Failed to create git tag\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
      }
    }
  }

  post {
    success {
      emailext(
        subject: "✅ Jenkins PIPELINE SUCCESS | ${env.JOB_NAME}",
        body: """
Pipeline completed successfully 🎉

Job: ${env.JOB_NAME}
Build: #${env.BUILD_NUMBER}
URL: ${env.BUILD_URL}
""",
        to: env.EMAIL_TO
      )
    }

    failure {
      emailext(
        subject: "❌ Jenkins PIPELINE FAILED | ${env.JOB_NAME}",
        body: """
Pipeline FAILED ❌

Job: ${env.JOB_NAME}
Build: #${env.BUILD_NUMBER}
URL: ${env.BUILD_URL}
""",
        to: env.EMAIL_TO
      )
    }
  }
}
