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
                    url: 'git@github.com:zaheerabbas0/frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                    set -e
                    export NVM_DIR="$HOME/.nvm"
                    . "$NVM_DIR/nvm.sh"
                    cd $WORKSPACE
                    echo "Node Version: $(node -v)"
                    echo "NPM Version: $(npm -v)"
                    npm install
                    '''
                }
            }
        }

        stage('Lint Code') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Build') {
            steps {
                script {
                    sh '''
                    set -e
                    export NVM_DIR="$HOME/.nvm"
                    . "$NVM_DIR/nvm.sh"
                    cd $WORKSPACE
                    npm run build
                    '''
                }
            }
        }
       
       stage('Deploy') {
            steps {
                sshagent(['deploy-key']) {
                    sh '''
                    set -e
                    export DEPLOY_USER="ubuntu"
                    export DEPLOY_HOST="192.168.122.252"
                    export DEPLOY_PATH="/var/www/frontend"
                    export TEMP_PATH="/tmp/frontend_deploy"

                    echo "Deploying files to $DEPLOY_USER@$DEPLOY_HOST"

                    # Ensure the remote host's key is added to known_hosts
                    ssh-keyscan -H $DEPLOY_HOST >> ~/.ssh/known_hosts

                    # Ensure the temporary deployment path exists
                    ssh $DEPLOY_USER@$DEPLOY_HOST "mkdir -p $TEMP_PATH"

                    # Copy files to a temporary directory
                    scp -r build/* $DEPLOY_USER@$DEPLOY_HOST:$TEMP_PATH/

                    # Move files to the final destination inside the remote server
                    ssh -t $DEPLOY_USER@$DEPLOY_HOST << 'EOF'
                        sudo mkdir -p /var/www/frontend
                        sudo cp -r /tmp/frontend_deploy/* /var/www/frontend/
                        sudo rm -rf /tmp/frontend_deploy
                        sudo chown -R www-data:www-data /var/www/frontend
                        sudo systemctl restart nginx
                    EOF
                    '''
                }
            }
        }


    }
}
