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
            set -euxo pipefail  # Enables strict error handling
            
            # Deployment Variables
            DEPLOY_USER="ubuntu"
            DEPLOY_HOST="192.168.122.252"
            DEPLOY_PATH="/var/www/frontend"
            TEMP_PATH="/tmp/frontend_deploy"

            echo "Starting deployment to $DEPLOY_USER@$DEPLOY_HOST"

            # Ensure the remote host's key is added to known_hosts safely
            ssh-keygen -R $DEPLOY_HOST || true
            ssh-keyscan -H $DEPLOY_HOST 2>/dev/null | tee -a ~/.ssh/known_hosts > /dev/null

            # Ensure temporary path exists on the remote server
            ssh -o BatchMode=yes -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST "mkdir -p $TEMP_PATH"

            # Copy files to the temporary directory using rsync for better performance
            rsync -avz --delete build/ $DEPLOY_USER@$DEPLOY_HOST:$TEMP_PATH/

            # Move files to the final destination on the remote server
            ssh -o BatchMode=yes -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST << 'EOF'
                set -euxo pipefail
                sudo mkdir -p "$DEPLOY_PATH"
                sudo rsync -av --delete "$TEMP_PATH/" "$DEPLOY_PATH/"
                sudo rm -rf "$TEMP_PATH"
                sudo chown -R www-data:www-data "$DEPLOY_PATH"
                sudo systemctl restart nginx
            EOF

            echo "Deployment completed successfully!"
            '''
        }
    }
}


    }
}
