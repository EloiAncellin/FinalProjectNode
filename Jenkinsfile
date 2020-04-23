pipeline {
  agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
  stages {
    stage('start') {
      steps {
        sh 'npm start'
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
