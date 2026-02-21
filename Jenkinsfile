pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t partyhub-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat 'docker stop partyhub-container || exit 0'
                bat 'docker rm partyhub-container || exit 0'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker run -d --name partyhub-container -p 8080:80 partyhub-app'
            }
        }
    }

    post {
        success {
            echo 'Docker deployment successful 🚀'
        }
        failure {
            echo 'Build failed ❌'
        }
    }
}