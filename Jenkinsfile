pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    GITHUB_TOKEN = credentials('github-pat')
    EMAIL_TO = "athithyanv402@gmail.com"
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
            subject: "Jenkins | Dependencies | SUCCESS",
            body: "npm ci completed\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
        failure {
          emailext(
            subject: "Jenkins | Dependencies | FAILED",
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

    stage('Security Scan') {
      steps {
        bat 'npm audit --audit-level=high'
      }
      post {
        success {
          emailext(
            subject: "Jenkins | Security Scan | SUCCESS",
            body: "No high vulnerabilities\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
        failure {
          emailext(
            subject: "Jenkins | Security Scan | FAILED",
            body: "Vulnerabilities found\n${env.BUILD_URL}",
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
            body: "Build completed\n${env.BUILD_URL}",
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
      steps {
        script {
          def version = "v1.0.${env.BUILD_NUMBER}"

          echo "Creating Git tag: ${version}"

          bat """
            git config user.name "jenkins-ci"
            git config user.email "jenkins@ci.local"

            git fetch --tags

            git tag ${version} || echo "Tag ${version} already exists"

            git push https://${GITHUB_TOKEN}@github.com/ATHITHYAN-V/CI-Practice-Prod-Based.git ${version} || echo "Tag already pushed"
          """
        }
      }
      post {
        success {
          emailext(
            subject: "Jenkins | Tag Created | ${env.BUILD_NUMBER}",
            body: "Git tag created or already exists\nTag: v1.0.${env.BUILD_NUMBER}\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
        failure {
          emailext(
            subject: "Jenkins | Tag Creation FAILED",
            body: "Failed to create Git tag\n${env.BUILD_URL}",
            to: env.EMAIL_TO
          )
        }
      }
    }
  }

  post {
    success {
      emailext(
        subject: " Jenkins PIPELINE SUCCESS | ${env.JOB_NAME}",
        body: """
Pipeline completed successfully 

Job: ${env.JOB_NAME}
Build: #${env.BUILD_NUMBER}
Tag: v1.0.${env.BUILD_NUMBER}
URL: ${env.BUILD_URL}
""",
        to: env.EMAIL_TO
      )
    }

    failure {
      emailext(
        subject: " Jenkins PIPELINE FAILED | ${env.JOB_NAME}",
        body: """
Pipeline FAILED 

Job: ${env.JOB_NAME}
Build: #${env.BUILD_NUMBER}
URL: ${env.BUILD_URL}
""",
        to: env.EMAIL_TO
      )
    }
  }
}
