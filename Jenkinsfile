pipeline {
    agent any

    environment {
        IMAGE_NAME = "frontend-app:latest"
        CONTAINER_NAME = "frontend-container"
        DOCKER_HUB_USER = "zaheer00901"  // Change this
        DOCKER_HUB_PASS = credentials('dockerhub-credentials') // Add this in Jenkins credentials
        //GIT_REPO = git changelog: false, branch: 'master', credentialsId: 'github-credentials', poll: false, url: 'https://github.com/zaheerabbas0/frontend.git'
        SERVER_USER = 'ubuntu'  // Change this
        SERVER_IP = '192.168.247.27'  // Change this
        RECIPIENT_EMAIL = "za00901@gmail.com"
    }

    stages {
        stage('Clone Repository') {
            steps {
              git branch: 'master', credentialsId: 'github-credentials', url: 'https://github.com/zaheerabbas0/frontend.git'
            }
        }
        
        stage('Lint Code') {
            steps {
                sh 'npm run lint || true'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        
        stage('Push Image to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PASS')]) {
                    sh '''
                        echo "$DOCKER_HUB_PASS" | docker login -u "$DOCKER_HUB_USER" --password-stdin
                        docker tag ${IMAGE_NAME} ${DOCKER_HUB_USER}/${IMAGE_NAME}
                        docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}
                        docker logout
                    '''
                }
            }
        }
        
        stage('Deploy to Server') {
            steps {
                script {
                    sshagent(['deploy-key']) {
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@192.168.247.27 'docker pull ${DOCKER_HUB_USER}/${IMAGE_NAME}'"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@192.168.247.27 'docker stop ${CONTAINER_NAME} || true'"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@192.168.247.27 'docker rm ${CONTAINER_NAME} || true'"
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@192.168.247.27 'docker run -d --name ${CONTAINER_NAME} -p 80:80 ${DOCKER_HUB_USER}/${IMAGE_NAME}'"
                    }
                }
            }
        }
    }
    
    
    post {
        always {
            emailext( 
                subject: "pipeline status: Status: ${BUILD_NUMBER}" ,
                body: '''<html>
                            <body>
                                <p>Build Status: ${BUILD_STATUS}</p>
                                <p>Build Status: ${BUILD_NUMBER}</p>
                                <p>Check the <a href= "${BUILD_URL}">console output</p>
                            </body>
                        </html>''',
                to: 'sufyanabu91@gmail.com , abdulmuswardevops@gmail.com',
                from: 'jenkins@example.com',
                replyTo: 'jenkins@example.com',
                mimeType: 'text/html'
            )
        }
       
    }
}

// mioz ljzl oavx joww