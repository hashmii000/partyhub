pipeline {
    agent any

    tools {
        nodejs "node"   // Jenkins NodeJS tool name
    }

    environment {
        CI = "true"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully ✔'
        }
        failure {
            echo 'Build failed ❌'
        }
        always {
            cleanWs()
        }
    }
}