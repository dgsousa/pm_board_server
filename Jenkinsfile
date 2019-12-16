pipeline {
    agent any
    stages {
        stage('Deploy') { 
            steps {
                sh 'chmod 700 deploy.sh'
                sh './deploy.sh' 
            }
        }
    }
}