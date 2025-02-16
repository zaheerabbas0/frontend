pipeline {
    agent any

    environment {
        NODEJS_HOME = "/home/aone/.nvm/versions/node/v23.6.1/bin"
        PATH = "${NODEJS_HOME}:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/zaheerabbas0/frontend.git'
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
                    scp -r dist/* ubuntu@192.168.122.83:/var/www/frontend
                    ssh ubuntu@192.168.122.83 'sudo systemctl restart nginx'
                    """
                }
            }
        }
    }
}
