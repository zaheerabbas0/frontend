pipeline {
    agent any

    environment {
        NVM_DIR = "/home/aone/.nvm"
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
                sh 'export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && node -v'
                sh 'export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && npm -v'
                sh 'export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && npm run build'
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
