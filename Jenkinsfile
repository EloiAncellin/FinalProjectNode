pipeline {
  agent any
  tools {nodejs "nodejs"}
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
