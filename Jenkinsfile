pipeline {
  agent any
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
