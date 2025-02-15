pipeline {
    agent any

    environment {
        NODE_VERSION = "18"  // Set your Node.js version
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/zaheerabbas0/frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def nodeHome = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['deploy-key']) {
                    sh """
                    scp -r dist/* user@your-server:/var/www/frontend
                    ssh user@your-server 'sudo systemctl restart nginx'
                    """
                }
            }
        }
    }
}
